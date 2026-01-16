import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Check, Loader2, CreditCard, Ticket, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

// Pass pricing configuration
const PASS_CONFIG = {
    silver: {
        name: 'Silver Pass',
        price: 0,
        originalPrice: 99,
        color: 'text-gray-300',
        bgGradient: 'from-gray-600 to-gray-800',
        image: '/passes/silver.png',
    },
    gold: {
        name: 'Gold Pass',
        price: 199,
        originalPrice: 499,
        color: 'text-yellow-400',
        bgGradient: 'from-yellow-600 to-yellow-800',
        image: '/passes/gold.png',
    },
    platinum: {
        name: 'Platinum Pass',
        price: 399,
        originalPrice: 999,
        color: 'text-cyan-400',
        bgGradient: 'from-cyan-600 to-purple-800',
        image: '/passes/platinum.png',
    },
    iitd_student: {
        name: 'IIT Delhi Student Pass',
        price: 0,
        originalPrice: 999,
        color: 'text-rose-400',
        bgGradient: 'from-rose-600 to-pink-800',
        image: '/iitd_logo.avif',
    },
};

// Pass value for upgrade calculations
const PASS_VALUE: Record<string, number> = {
    silver: 0,
    gold: 199,
    platinum: 399,
};


const PASS_LEVELS: Record<string, number> = {
    silver: 1,
    gold: 2,
    platinum: 3,
};
declare global {
    interface Window {
        Razorpay: any;
    }
}

export const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, loading: authLoading } = useAuth();

    const passType = searchParams.get('pass') || 'gold';
    const isUpgrade = searchParams.get('upgrade') === 'true';

    const [loading, setLoading] = useState(false);
    const [currentPass, setCurrentPass] = useState<string | null>(null);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    // Invite Code State
    const [inviteCode, setInviteCode] = useState('');
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [redeemLoading, setRedeemLoading] = useState(false);

    const passConfig = PASS_CONFIG[passType] || PASS_CONFIG.gold;

    // Robust check for IIT Delhi SSO or Domain
    const isIITD = user?.app_metadata?.provider === 'azure' ||
        user?.email?.endsWith('iitd.ac.in') ||
        user?.email?.endsWith('.iitd.ac.in') ||
        (user?.user_metadata?.mail && (user.user_metadata.mail.endsWith('iitd.ac.in') || user.user_metadata.mail.includes('@iitd.ac.in'))) ||
        (user?.user_metadata?.preferred_username && user.user_metadata.preferred_username.includes('iitd.ac.in'));

    // Calculate price (differential for upgrades)
    const calculatePrice = () => {
        if (passType === 'silver' || passType === 'iitd_student') return 0;
        if (isUpgrade && currentPass) {
            const currentValue = PASS_VALUE[currentPass] || 0;
            const newValue = PASS_VALUE[passType] || 0;
            return Math.max(0, newValue - currentValue);
        }
        return passConfig.price;
    };

    const finalPrice = calculatePrice();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            // Store intended destination
            sessionStorage.setItem('postLoginRedirect', `/checkout?pass=${passType}${isUpgrade ? '&upgrade=true' : ''}`);
            navigate('/login');
        } else if (!authLoading && user && passType === 'iitd_student' && !isIITD) {
            toast.error("This pass is exclusively for IIT Delhi students");
            navigate('/dashboard');
        }
    }, [user, authLoading, navigate, passType, isUpgrade, isIITD]);

    // Fetch current pass (ALWAYS check this to prevent downgrades)
    useEffect(() => {
        const fetchCurrentPass = async () => {
            if (!user) return;

            const { data, error } = await supabase
                .from('user_passes')
                .select('pass_type')
                .eq('user_id', user.id)
                .order('purchased_at', { ascending: false })
                .limit(1)
                .single();

            if (data && !error) {
                setCurrentPass(data.pass_type);
            }
        };

        if (user) {
            fetchCurrentPass();
        }
    }, [user]);

    // Prevent Downgrades / Re-purchasing same tier
    useEffect(() => {
        if (!currentPass || !user) return;

        const currentLevel = PASS_LEVELS[currentPass] || 0;
        const targetLevel = PASS_LEVELS[passType] || 0;

        if (currentLevel >= targetLevel) {
            toast.error(`You already have the ${PASS_CONFIG[currentPass as keyof typeof PASS_CONFIG]?.name} which covers this tier.`);
            navigate('/dashboard');
        }
    }, [currentPass, passType, user, navigate]);

    // Load Razorpay script
    useEffect(() => {
        // Check if script is already loaded
        if (window.Razorpay) {
            setRazorpayLoaded(true);
            return;
        }

        // Check if script tag already exists (but maybe not loaded yet)
        if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
            setRazorpayLoaded(true); // Assume it's loading or loaded
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        script.onerror = () => toast.error('Failed to load payment gateway. Please check connection.');
        document.body.appendChild(script);

        // Cleanup: Don't remove script on unmount to avoid re-loading on re-visits
    }, []);

    // Handle Invite Code Redemption
    const handleRedeem = async () => {
        if (!user || !inviteCode.trim()) return;

        setRedeemLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/payments/redeem-invite`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    code: inviteCode.trim()
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to redeem code');
            }

            toast.success(data.message);
            // Redirect to dashboard
            navigate('/dashboard');

        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setRedeemLoading(false);
        }
    };

    // Handle Silver (FREE) pass
    const handleFreeClaim = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const { error } = await supabase.from('user_passes').insert({
                user_id: user.id,
                pass_type: passType,
                amount_paid: 0,
                purchased_at: new Date().toISOString(),
            });

            if (error) throw error;

            toast.success(`${PASS_CONFIG[passType]?.name || 'Pass'} claimed successfully!`);
            navigate('/dashboard');
        } catch (err: any) {
            toast.error(err.message || 'Failed to claim pass');
        } finally {
            setLoading(false);
        }
    };

    // Handle paid pass purchase
    const handlePayment = async () => {
        if (!user || !razorpayLoaded) return;

        setLoading(true);
        try {
            // Create order on backend
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const orderResponse = await fetch(`${API_URL}/api/payments/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    passType,
                    userId: user.id,
                    isUpgrade,
                    currentPass,
                }),
            });

            if (!orderResponse.ok) {
                const err = await orderResponse.json();
                throw new Error(err.message || 'Failed to create order');
            }

            const { orderId, amount, currency } = await orderResponse.json();

            // Open Razorpay Checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: amount,
                currency: currency,
                name: 'BECon 2026',
                description: `${passConfig.name} ${isUpgrade ? '(Upgrade)' : ''} `,
                image: 'https://becon-2026.web.app/logo1.avif',
                order_id: orderId,
                handler: async function (response: any) {
                    // Verify payment
                    try {
                        const verifyResponse = await fetch(`${API_URL}/api/payments/verify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                userId: user.id,
                                passType,
                                isUpgrade,
                            }),
                        });

                        if (!verifyResponse.ok) {
                            const err = await verifyResponse.json();
                            throw new Error(err.message || 'Payment verification failed');
                        }

                        toast.success(`${passConfig.name} purchased successfully!`);
                        navigate('/dashboard');
                    } catch (err: any) {
                        toast.error(err.message || 'Payment verification failed');
                    }
                },
                prefill: {
                    name: user.user_metadata?.full_name || '',
                    email: user.email || '',
                    contact: user.user_metadata?.phone || '',
                },
                theme: {
                    color: '#7c3aed',
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err: any) {
            toast.error(err.message || 'Payment failed');
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#05020a] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#05020a] text-white pt-24 pb-16 px-4">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                {/* Back Button */}
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    Back to Passes
                </Link>

                {/* Checkout Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
                >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${passConfig.bgGradient} p-8 text-center`}>
                        <img
                            src={passConfig.image}
                            alt={passConfig.name}
                            className="w-32 h-32 mx-auto mb-4 object-contain"
                        />
                        <h1 className="text-3xl font-bold">{passConfig.name}</h1>
                        {isUpgrade && currentPass && (
                            <p className="text-white/70 mt-2">
                                Upgrading from {PASS_CONFIG[currentPass as keyof typeof PASS_CONFIG]?.name}
                            </p>
                        )}
                    </div>




                    {/* Price Section */}
                    <div className="p-8 border-b border-white/10">
                        {/* Invite Code Section */}
                        {finalPrice > 0 && (
                            <div className="mb-6">
                                <button
                                    onClick={() => setIsInviteOpen(!isInviteOpen)}
                                    className="text-sm text-purple-400/80 hover:text-purple-300 transition-colors font-medium flex items-center gap-2 group"
                                >
                                    <Ticket size={14} className="group-hover:rotate-12 transition-transform" />
                                    Have an invite code?
                                </button>

                                {isInviteOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-3 flex gap-2"
                                    >
                                        <input
                                            type="text"
                                            value={inviteCode}
                                            onChange={(e) => setInviteCode(e.target.value)}
                                            placeholder="Enter pass code"
                                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-600"
                                        />
                                        <button
                                            onClick={handleRedeem}
                                            disabled={redeemLoading || !inviteCode.trim()}
                                            className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                        >
                                            {redeemLoading ? <Loader2 size={16} className="animate-spin" /> : 'Apply'}
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <span className="text-gray-400">
                                {isUpgrade ? 'Upgrade Price' : 'Price'}
                            </span>
                            <div className="flex items-center gap-4">
                                {finalPrice > 0 && (
                                    <span className="text-gray-500 line-through text-lg">
                                        ₹{passConfig.originalPrice}
                                    </span>
                                )}
                                <span className={`text-3xl font-bold ${passConfig.color}`}>
                                    {finalPrice === 0 ? 'FREE' : `₹${finalPrice}`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="p-6 border-b border-white/10 bg-white/2">
                        <div className="flex items-center gap-3 text-green-400">
                            <Shield size={20} />
                            <span className="text-sm">Secure payment powered by Razorpay</span>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="p-6">
                        <h3 className="font-semibold mb-4 text-gray-300">What's Included:</h3>
                        <div className="space-y-3">
                            {passType === 'silver' && (
                                <>
                                    <Feature text="Startup Expo Access" />
                                    <Feature text="Tech Showcase Access" />
                                    <Feature text="Autospark Access" />
                                    <Feature text="LHC Speaker Sessions" />
                                </>
                            )}
                            {passType === 'gold' && (
                                <>
                                    <Feature text="All Silver Benefits" />
                                    <Feature text="Seminar+Dogra Speaker Sessions" />
                                    <Feature text="Moonshot Finale" />
                                    <Feature text="Blueprint Finale" />
                                </>
                            )}
                            {passType === 'platinum' && (
                                <>
                                    <Feature text="All Gold Benefits" />
                                    <Feature text="Influencer Conclave" />
                                    <Feature text="Incubator Summit" />
                                    <Feature text="Startup Clinic" />
                                </>
                            )}
                            {passType === 'iitd_student' && (
                                <>
                                    <Feature text="Verified IIT Delhi Student Access" />
                                    <Feature text="Full Access to All Events" />
                                    <Feature text="Speaker Sessions & Workshops" />
                                    <Feature text="Exclusive Networking Opportunities" />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="p-6">
                        <button
                            onClick={finalPrice === 0 ? handleFreeClaim : handlePayment}
                            disabled={loading || (!razorpayLoaded && finalPrice > 0)}
                            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${loading
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 hover:scale-[1.02]'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : finalPrice === 0 ? (
                                <>
                                    <Sparkles size={20} />
                                    Claim Free Pass
                                </>
                            ) : (
                                <>
                                    <CreditCard size={20} />
                                    Pay ₹{finalPrice}
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const Feature: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-center gap-3 text-gray-300">
        <Check size={16} className="text-green-400" />
        <span>{text}</span>
    </div>
);
