import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { generateBeconIdFromUserId } from '../utils/beconId';

export const PronoteSignupPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        college: 'IIT Delhi', // Default and read-only
        phone: '',
    });
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { signUp } = useAuth(); // Removed google auth for strict flow, or we can keep it if we can validate email domain after google sign in. 
    // Plan asked for restricted flow. Google Sign in with restricted domain is harder to enforce on client side pre-click without custom config. 
    // Safest to just keep email/pass or check google result. 
    // For now, I'll remove Google Sign In to strictly enforce the domain check on the input form.

    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    const validateIITDEmail = (email: string) => {
        // Regex for @iitd.ac.in or @*.iitd.ac.in
        const regex = /^[\w.-]+@([\w-]+\.)*iitd\.ac\.in$/;
        return regex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateIITDEmail(formData.email)) {
            toast.error('Registration for Pronote is valid only for IIT Delhi students (@iitd.ac.in).');
            return;
        }

        setIsLoading(true);

        try {
            const fullName = `${formData.firstName} ${formData.lastName}`;
            const { data, error } = await signUp(
                formData.email,
                formData.password,
                {
                    full_name: fullName,
                    college: formData.college,
                    phone: formData.phone,
                }
            );

            if (error) throw error;

            if (data?.user) {
                // Generate BECon ID locally if needed
                generateBeconIdFromUserId(data.user.id);
            }

            toast.success('Welcome to Pronote! Registration successful.');
            navigate('/dashboard');
        } catch (error: any) {
            toast.error(error.message || 'Failed to create account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-[#05020a] text-white overflow-hidden flex overflow-y-auto relative group"
        >
            {/* Dynamic Cursor Spotlight */}
            <div
                className="absolute pointer-events-none inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                    background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
                }}
            />

            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-black/20 border-r border-white/5 z-10">
                {/* Background Objects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
                </div>

                <div className="relative z-10" />

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Pronote <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Registration</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Exclusive portal for IIT Delhi students to register, connect, and innovate.
                    </p>
                </div>

                <div className="relative z-10 space-y-4">
                    <Link to="/" className="inline-block">
                        <img src="/logo1.avif" alt="BECon Logo" className="h-14 w-auto" />
                    </Link>
                    <p className="text-sm text-gray-500">
                        © 2026 Entrepreneurship Development Cell, IIT Delhi
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
                <div className="absolute top-0 right-0 w-full h-full lg:hidden overflow-hidden pointer-events-none">
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]" />
                </div>

                <div className="w-full max-w-md space-y-8 relative z-10">
                    <div className="lg:hidden mb-8">
                        <Link to="/" className="inline-block mb-8">
                            <img src="/logo1.avif" alt="BECon Logo" className="h-10 w-auto" />
                        </Link>
                        <h2 className="text-3xl font-bold">Pronote Registration</h2>
                        <p className="text-gray-400 mt-2">IIT Delhi Students Only</p>
                    </div>

                    <div className="hidden lg:block">
                        <h2 className="text-3xl font-bold">Pronote Registration</h2>
                        <p className="text-gray-400 mt-2">Enter your IIT Delhi email to proceed</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">First Name</label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder-gray-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder-gray-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">IIT Delhi Email</label>
                            <input
                                type="email"
                                placeholder="entry_no@iitd.ac.in"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder-gray-500"
                                required
                            />
                            <p className="text-xs text-blue-400 ml-1">Must use an @iitd.ac.in email address</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">College/Organization</label>
                                <input
                                    type="text"
                                    value={formData.college}
                                    disabled
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Phone</label>
                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder-gray-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder-gray-500 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Complete Prone Registration <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
