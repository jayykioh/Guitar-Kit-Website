'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Client-side validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Auto sign in after signup
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError('Account created but failed to sign in automatically.');
            } else {
                router.push('/dashboard');
                router.refresh();
            }

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        signIn('google', { callbackUrl: '/dashboard' });
    };

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    return (
        <main className="h-[100dvh] w-full flex items-center justify-center bg-bg-page dark:bg-[#0a110c] md:p-4 font-sans selection:bg-[#13ec5b]/30 overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 opacity-20 dark:opacity-30 mix-blend-overlay grayscale bg-cover bg-center"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRR_dOg6ls8ETCWHFIbIZh0sS7qNp190FBRV6K_UbJvGzxvw7irJE2saNvuoeu9Be6HX6X_JskCf1I9JVo2E8NPaxzz2e8VXILm5TtnZLJZVsFqLtxvfRLgtzPAjOhW2kVVeu_EmmAyMOPo1S9KvA557TqrlKrLd4xwwE9cHWDpAd68vbiYCfGbey9YyZ4pDVOChIeYXXOPmmK4F7WIfB-P5Ly029mr3ZUMBQImt43MVBwy1QwkfOVV6Pii06g3bbOfYqg-oNApXAQ')" }}
                ></motion.div>
            </div>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-[1024px] bg-white dark:bg-[#151e18] md:border border-border-subtle dark:border-[#2a3d31] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-row h-full md:h-[680px] max-h-[100dvh]"
            >
                {/* Left Panel - Branding (Hidden on Mobile) */}
                <div className="hidden md:flex relative w-5/12 overflow-hidden flex-col justify-between p-12 bg-black">
                    {/* Mesh Gradient Background */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[#000000] [background-image:radial-gradient(at_0%_0%,hsla(140,100%,30%,0.3)_0px,transparent_50%),radial-gradient(at_100%_0%,hsla(150,100%,20%,0.3)_0px,transparent_50%),radial-gradient(at_100%_100%,hsla(140,100%,40%,0.1)_0px,transparent_50%),radial-gradient(at_0%_100%,hsla(160,100%,20%,0.5)_0px,transparent_50%),radial-gradient(at_50%_50%,hsla(140,100%,50%,0.2)_0px,transparent_50%)]"></div>
                    </div>

                    {/* Glow Effects */}
                    <motion.div
                        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#13ec5b]/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none"
                    ></motion.div>
                    <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.1, 1, 1.1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-600/30 rounded-full blur-[80px] mix-blend-screen pointer-events-none"
                    ></motion.div>
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCrFgxiKPrLAyRzI6I1JupUexWYuW4raRIIIsvocyI3cIc2_D1T5hMzp4LLfqe189orvP8zWSQC05ll9XyeflNd8k7uVVVULOrCaClnnYNWyjYu3LcS3Ma1uiHnvFz5sWM56YI6p9pvuRTdNU-2Xjh35AAcW72inAdQwc8lym6HIrikAgVqnJu0iSmeur227Uiq6FH0iDQBw7V6FNzQSb8jXKTOqfkAgOPthESAz7lFOLnCAck2S1BI60CRoi67y1P_7qJykZ5WmW6d')" }}></div>

                    {/* Logo */}
                    <div className="relative z-10">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-3"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white/90 border border-white/10 backdrop-blur-sm">
                                <span className="material-symbols-outlined text-2xl">music_note</span>
                            </div>
                            <span className="text-xl font-bold tracking-wide text-white/90">GuitArt</span>
                        </motion.div>
                    </div>

                    {/* Hero Text */}
                    <div className="relative z-10 flex-1 flex flex-col justify-center">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                        >
                            Start your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13ec5b] to-emerald-400">Journey.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-zinc-400 text-lg font-medium max-w-xs leading-relaxed"
                        >
                            Create an account to track your progress and access exclusive features.
                        </motion.p>
                    </div>

                    {/* Copyright */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="relative z-10"
                    >
                        <p className="text-xs text-zinc-500">© 2025 GuitArt Inc. Created by Doan Luc</p>
                    </motion.div>
                </div>

                {/* Right Panel - Signup Form */}
                <div className="w-full md:w-7/12 p-6 md:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-[#18201a] relative">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-[420px] mx-auto w-full h-full flex flex-col justify-center"
                    >
                        {/* Back Button */}
                        <Link
                            href="/"
                            className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors z-20 group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="group-hover:-translate-x-1 transition-transform"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            <span className="text-sm font-medium">Back</span>
                        </Link>

                        {/* Mobile Logo */}
                        <motion.div variants={itemVariants} className="md:hidden flex items-center justify-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-[#13ec5b]/10 text-[#13ec5b] flex items-center justify-center">
                                <span className="material-symbols-outlined text-xl">music_note</span>
                            </div>
                            <span className="text-lg font-bold text-text-primary dark:text-white">GuitArt</span>
                        </motion.div>

                        {/* Header */}
                        <motion.div variants={itemVariants} className="mb-4 md:mb-6 text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-white mb-1">Create Account</h2>
                            <p className="text-sm text-text-secondary dark:text-zinc-400">Join us and start learning today.</p>
                        </motion.div>

                        {/* Google Button */}
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(0,0,0,0.02)" }}
                            whileTap={{ scale: 0.99 }}
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 h-12 min-h-[48px] rounded-xl border border-border-subtle dark:border-[#2a3d31] bg-white dark:bg-[#121914] transition-all duration-200 group mb-5 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed flex-shrink-0"
                        >
                            <svg className="h-5 w-5 relative z-10 flex-shrink-0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                            <span className="text-text-primary dark:text-white font-medium text-sm relative z-10 whitespace-nowrap">Sign up with Google</span>
                        </motion.button>

                        {/* Divider */}
                        <motion.div variants={itemVariants} className="relative flex py-2 items-center mb-4">
                            <div className="flex-grow border-t border-border-subtle dark:border-[#2a3d31]"></div>
                            <span className="flex-shrink-0 mx-4 text-[10px] md:text-xs font-medium text-text-tertiary dark:text-zinc-600 uppercase tracking-wider">Or with email</span>
                            <div className="flex-grow border-t border-border-subtle dark:border-[#2a3d31]"></div>
                        </motion.div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-red-500 text-lg">error</span>
                                <p className="text-xs text-red-500 font-medium">{error}</p>
                            </motion.div>
                        )}


                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                            {/* Name */}
                            <motion.div variants={itemVariants} className="flex flex-col gap-1">
                                <label className="text-xs uppercase tracking-wider font-semibold text-text-tertiary dark:text-zinc-500 ml-1">Full Name</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 transition-colors group-focus-within:text-text-primary dark:group-focus-within:text-white">
                                        <span className="material-symbols-outlined text-[18px]">badge</span>
                                    </span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isLoading}
                                        placeholder="John Doe"
                                        className="w-full bg-slate-50 dark:bg-[#121914] text-text-primary dark:text-white border border-border-subtle dark:border-[#2a3d31] rounded-xl h-10 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-[#13ec5b] dark:focus:ring-zinc-600 focus:border-[#13ec5b] dark:focus:border-zinc-600 transition-all duration-200 placeholder:text-text-tertiary dark:placeholder:text-zinc-700/50 text-sm disabled:opacity-50"
                                    />
                                </div>
                            </motion.div>

                            {/* Email */}
                            <motion.div variants={itemVariants} className="flex flex-col gap-1">
                                <label className="text-xs uppercase tracking-wider font-semibold text-text-tertiary dark:text-zinc-500 ml-1">Email</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 transition-colors group-focus-within:text-text-primary dark:group-focus-within:text-white">
                                        <span className="material-symbols-outlined text-[18px]">mail</span>
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        placeholder="your@email.com"
                                        className="w-full bg-slate-50 dark:bg-[#121914] text-text-primary dark:text-white border border-border-subtle dark:border-[#2a3d31] rounded-xl h-10 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-[#13ec5b] dark:focus:ring-zinc-600 focus:border-[#13ec5b] dark:focus:border-zinc-600 transition-all duration-200 placeholder:text-text-tertiary dark:placeholder:text-zinc-700/50 text-sm disabled:opacity-50"
                                    />
                                </div>
                            </motion.div>

                            {/* Password */}
                            <motion.div variants={itemVariants} className="flex flex-col gap-1">
                                <label className="text-xs uppercase tracking-wider font-semibold text-text-tertiary dark:text-zinc-500 ml-1">Password</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 transition-colors group-focus-within:text-text-primary dark:group-focus-within:text-white">
                                        <span className="material-symbols-outlined text-[18px]">lock</span>
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        placeholder="Min. 8 chars"
                                        className="w-full bg-slate-50 dark:bg-[#121914] text-text-primary dark:text-white border border-border-subtle dark:border-[#2a3d31] rounded-xl h-10 pl-11 pr-11 focus:outline-none focus:ring-1 focus:ring-[#13ec5b] dark:focus:ring-zinc-600 focus:border-[#13ec5b] dark:focus:border-zinc-600 transition-all duration-200 placeholder:text-text-tertiary dark:placeholder:text-zinc-700/50 text-sm disabled:opacity-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary dark:text-zinc-500 hover:text-text-primary dark:hover:text-white transition-colors cursor-pointer flex items-center"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </motion.div>

                            {/* Confirm Password */}
                            <motion.div variants={itemVariants} className="flex flex-col gap-1">
                                <label className="text-xs uppercase tracking-wider font-semibold text-text-tertiary dark:text-zinc-500 ml-1">Confirm</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 transition-colors group-focus-within:text-text-primary dark:group-focus-within:text-white">
                                        <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                                    </span>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        placeholder="Repeat password"
                                        className="w-full bg-slate-50 dark:bg-[#121914] text-text-primary dark:text-white border border-border-subtle dark:border-[#2a3d31] rounded-xl h-10 pl-11 pr-11 focus:outline-none focus:ring-1 focus:ring-[#13ec5b] dark:focus:ring-zinc-600 focus:border-[#13ec5b] dark:focus:border-zinc-600 transition-all duration-200 placeholder:text-text-tertiary dark:placeholder:text-zinc-700/50 text-sm disabled:opacity-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary dark:text-zinc-500 hover:text-text-primary dark:hover:text-white transition-colors cursor-pointer flex items-center"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#13ec5b] hover:bg-[#11d652] text-black font-bold h-11 rounded-xl mt-2 transition-all duration-200 transform shadow-lg shadow-[#13ec5b]/20 hover:shadow-[#13ec5b]/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                ) : (
                                    "Create Account"
                                )}
                            </motion.button>
                        </form>

                        {/* Footer */}
                        <motion.div variants={itemVariants} className="mt-6 text-center">
                            <p className="text-sm text-text-secondary dark:text-zinc-400">
                                Already have an account?
                                <Link href="/login" className="font-bold text-[#13ec5b] hover:text-[#11d652] ml-1 transition-colors">
                                    Log in
                                </Link>
                            </p>
                        </motion.div>

                    </motion.div>
                </div>
            </motion.div>
        </main>
    );
}
