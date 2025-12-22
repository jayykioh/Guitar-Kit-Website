'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-bg-page relative overflow-hidden font-sans">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-page via-bg-page/80 to-transparent"></div>

                {/* Glow Orbs */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
            </div>

            {/* Main Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-[480px] mx-4"
            >
                <div className="glass-panel p-8 md:p-10 flex flex-col gap-8 shadow-2xl border-border-subtle/50">

                    {/* Header */}
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent-primary/20 flex items-center justify-center text-accent-primary shadow-glow">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                        </div>
                        <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-text-secondary font-medium">Continue your guitar journey</p>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-5">

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-secondary ml-1">Email or Username</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-bg-surface-hover border border-border-subtle rounded-xl py-3.5 pl-12 pr-4 text-text-primary placeholder-text-tertiary focus:ring-1 focus:ring-accent-primary focus:border-accent-primary/50 transition-all outline-none"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex justify-between ml-1">
                                <label className="text-sm font-bold text-text-secondary">Password</label>
                                <a href="#" className="text-xs font-bold text-accent-primary hover:text-accent-primary/80 transition-colors">Forgot Password?</a>
                            </div>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-bg-surface-hover border border-border-subtle rounded-xl py-3.5 pl-12 pr-12 text-text-primary placeholder-text-tertiary focus:ring-1 focus:ring-accent-primary focus:border-accent-primary/50 transition-all outline-none"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <Link href="/dashboard" className="mt-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-accent-primary text-black font-bold h-12 rounded-xl shadow-lg shadow-accent-primary/20 hover:bg-accent-primary/90 transition-all flex items-center justify-center gap-2"
                            >
                                <span>Log In</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" /></svg>
                            </motion.button>
                        </Link>
                    </form>

                    {/* Divider */}
                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-border-subtle"></div>
                        <span className="flex-shrink-0 mx-4 text-xs font-bold text-text-tertiary uppercase tracking-wider bg-bg-surface px-2">Or continue with</span>
                        <div className="flex-grow border-t border-border-subtle"></div>
                    </div>

                    {/* Social Login */}
                    <div className="flex gap-4">
                        <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-border-subtle hover:bg-bg-surface-hover hover:border-text-secondary/20 transition-all text-sm font-bold text-text-primary">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.2.02-1.44.67-2.69.45-3.82-.69C4.55 17.65 3.33 13.57 5.75 9.38c2.44-4.22 6.77-3.69 7.64-.17.18.73 1.25 1.58 2.44 1.24 3.03-.89 4.3 1.2 4.3 1.2s-2.35 1.21-1.95 4.79c.14 2.87 2.11 3.55 2.11 3.55-.22 1.04-1.34 3.55-3.24 3.59zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                            <span>Apple</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-border-subtle hover:bg-bg-surface-hover hover:border-text-secondary/20 transition-all text-sm font-bold text-text-primary">
                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                            <span>Google</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-text-secondary">
                        Don't have an account? <a href="#" className="font-bold text-accent-primary hover:underline">Sign up</a>
                    </p>

                </div>
                <div className="mt-8 text-center text-xs text-text-tertiary">
                    © 2024 GuitArt. All rights reserved.
                </div>
            </motion.div>
        </main>
    );
}
