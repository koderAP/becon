import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Check, Loader2, CreditCard, Sparkles } from 'lucide-react';
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
};

// Pass value for upgrade calculations
const PASS_VALUE: Record<string, number> = {
    silver: 0,
    gold: 199,
    platinum: 399,
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

    const passType = searchParams.get('pass') as 'silver' | 'gold' | 'platinum' || 'gold';
    const isUpgrade = searchParams.get('upgrade') === 'true';

    const [loading, setLoading] = useState(false);
    const [currentPass, setCurrentPass] = useState<string | null>(null);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    const passConfig = PASS_CONFIG[passType] || PASS_CONFIG.gold;

    // Calculate price (differential for upgrades)
    const calculatePrice = () => {
        if (passType === 'silver') return 0;
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
        }
    }, [user, authLoading, navigate, passType, isUpgrade]);

    // Fetch current pass if upgrade
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

        if (isUpgrade && user) {
            fetchCurrentPass();
        }
    }, [user, isUpgrade]);

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Handle Silver (FREE) pass
    const handleFreeClaim = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const { error } = await supabase.from('user_passes').insert({
                user_id: user.id,
                pass_type: 'silver',
                amount_paid: 0,
                purchased_at: new Date().toISOString(),
            });

            if (error) throw error;

            toast.success('Silver Pass claimed successfully!');
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
                description: `${passConfig.name} ${isUpgrade ? '(Upgrade)' : ''}`,
                image: '/logo.avif',
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
                    to="/tickets"
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
