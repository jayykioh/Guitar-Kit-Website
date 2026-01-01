'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        console.log('[LOGIN CLIENT] Starting credentials login:', email)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            console.log('[LOGIN CLIENT] Credentials result:', {
                ok: result?.ok,
                error: result?.error,
                status: result?.status
            })

            if (result?.error) {
                setError('Invalid email or password');
            } else {
                console.log('[LOGIN CLIENT] Success! Redirecting to dashboard...')
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('[LOGIN CLIENT] Error:', err)
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        console.log('[LOGIN CLIENT] Starting Google OAuth flow')
        try {
            await signIn('google', { callbackUrl: '/dashboard' });
        } catch (err) {
            console.error('[LOGIN CLIENT] Google error:', err)
            setError('Failed to sign in with Google');
            setIsLoading(false);
        }
    };

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-bg-page relative overflow-hidden font-sans selection:bg-accent-primary/30">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-page via-bg-page/80 to-transparent"></div>

                {/* Glow Orbs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[120px]"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"
                />
            </div>

            {/* Main Login Card */}
            <div className="relative z-10 w-full max-w-[440px] mx-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <GlassPanel className="p-8 md:p-12 flex flex-col gap-8 shadow-2xl border-border-subtle/40 backdrop-blur-3xl">

                        {/* Header */}
                        <motion.div variants={itemVariants} className="text-center">
                            <h1 className="text-4xl font-black text-text-primary tracking-tight mb-2">Welcome Back</h1>
                            <p className="text-text-secondary font-medium text-lg">Continue your guitar journey</p>
                        </motion.div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            {/* Email */}
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-sm font-bold text-text-secondary ml-1">Email</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">person</span>
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-bg-surface-hover border border-border-subtle rounded-xl py-3.5 pl-12 pr-4 text-text-primary placeholder-text-tertiary focus:ring-1 focus:ring-accent-primary focus:border-accent-primary/50 transition-all outline-none disabled:opacity-50"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </motion.div>

                            {/* Password */}
                            <motion.div variants={itemVariants} className="space-y-2">
                                <div className="flex justify-between ml-1">
                                    <label className="text-sm font-bold text-text-secondary">Password</label>
                                    <a href="#" className="text-xs font-bold text-accent-primary hover:text-accent-primary/80 transition-colors">Forgot Password?</a>
                                </div>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">lock</span>
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-bg-surface-hover border border-border-subtle rounded-xl py-3.5 pl-12 pr-12 text-text-primary placeholder-text-tertiary focus:ring-1 focus:ring-accent-primary focus:border-accent-primary/50 transition-all outline-none disabled:opacity-50"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors flex items-center disabled:opacity-50"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </motion.div>

                            {/* Error Message */}
                            {error && (
                                <motion.div variants={itemVariants} className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-red-500 text-[20px]">error</span>
                                    <p className="text-sm text-red-500 font-medium">{error}</p>
                                </motion.div>
                            )}

                            {/* Submit */}
                            <motion.button
                                variants={itemVariants}
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
                                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                className="w-full bg-accent-primary text-black font-bold h-12 rounded-xl shadow-lg shadow-accent-primary/20 hover:bg-accent-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Log In</span>
                                        <span className="material-symbols-outlined text-[20px]">login</span>
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <motion.div variants={itemVariants} className="relative flex items-center">
                            <div className="flex-grow border-t border-border-subtle"></div>
                            <span className="flex-shrink-0 mx-4 text-xs font-bold text-text-tertiary uppercase tracking-wider bg-bg-surface px-2">Or continue with</span>
                            <div className="flex-grow border-t border-border-subtle"></div>
                        </motion.div>

                        {/* Google Login */}
                        <motion.button
                            variants={itemVariants}
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            className="w-full flex items-center justify-center gap-3 h-12 rounded-xl border border-border-subtle hover:bg-bg-surface-hover hover:border-text-secondary/20 transition-all text-sm font-bold text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                            <span>Continue with Google</span>
                        </motion.button>

                        {/* Footer */}
                        <motion.p variants={itemVariants} className="text-center text-sm text-text-secondary">
                            Don't have an account? <Link href="/signup" className="font-bold text-accent-primary hover:underline">Sign up</Link>
                        </motion.p>

                    </GlassPanel>
                    <div className="mt-8 text-center text-xs text-text-tertiary">
                        © 2024 GuitArt. All rights reserved.
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

