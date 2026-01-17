import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Loader2, XCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const PaymentSuccessPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    // Get params from Razorpay callback
    const razorpayPaymentId = searchParams.get('razorpay_payment_id');
    const razorpayPaymentLinkId = searchParams.get('razorpay_payment_link_id');
    const razorpayPaymentLinkStatus = searchParams.get('razorpay_payment_link_status');

    useEffect(() => {
        // If we have payment params and status is 'paid', payment was successful
        if (razorpayPaymentLinkStatus === 'paid' || razorpayPaymentId) {
            // Give webhook a moment to process
            const timer = setTimeout(() => {
                setStatus('success');
            }, 2000);
            return () => clearTimeout(timer);
        } else if (razorpayPaymentLinkStatus === 'cancelled') {
            setStatus('error');
        } else {
            // Assume success if user landed here (webhook handles the rest)
            const timer = setTimeout(() => {
                setStatus('success');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [razorpayPaymentId, razorpayPaymentLinkStatus]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-[#030014] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <Loader2 className="w-16 h-16 animate-spin text-purple-500 mx-auto mb-4" />
                    <p className="text-white text-xl">Confirming your payment...</p>
                    <p className="text-gray-400 text-sm mt-2">Please wait, this may take a moment</p>
                </motion.div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md mx-auto"
                >
                    <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-white mb-4">Payment Cancelled</h1>
                    <p className="text-gray-400 mb-8">
                        Your payment was cancelled. No charges were made.
                    </p>
                    <Link
                        to="/#tickets"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-colors"
                    >
                        Try Again <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md mx-auto"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                >
                    <CheckCircle className="w-24 h-24 text-emerald-500 mx-auto mb-6" />
                </motion.div>

                <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
                <p className="text-gray-400 mb-8">
                    Your BECon 2026 pass has been activated. Check your dashboard for details and your QR code.
                </p>

                {razorpayPaymentId && (
                    <p className="text-xs text-gray-500 mb-6">
                        Payment ID: {razorpayPaymentId}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-colors font-medium"
                    >
                        Go to Dashboard
                    </button>
                    <Link
                        to="/"
                        className="px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors font-medium border border-white/20"
                    >
                        Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};
