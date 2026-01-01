'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-bg-page text-text-primary flex items-center justify-center p-6">
            <div className="text-center max-w-2xl">
                {/* 404 Number */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-[120px] md:text-[180px] font-black leading-none bg-gradient-to-br from-accent-primary to-blue-500 bg-clip-text text-transparent">
                        404
                    </h1>
                </motion.div>

                {/* Guitar Icon */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                >
                    <span className="material-symbols-outlined text-6xl text-accent-primary">
                        music_note
                    </span>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
                    <p className="text-text-secondary text-lg mb-8">
                        The page you're looking for doesn't exist or has been moved.
                        Let's get you back on track!
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-primary text-black font-bold rounded-xl hover:bg-accent-primary/90 transition-all hover:scale-105"
                    >
                        <span className="material-symbols-outlined">home</span>
                        Go to Dashboard
                    </Link>
                    <Link
                        href="/practice"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bg-surface border border-border-subtle text-text-primary font-semibold rounded-xl hover:bg-bg-surface-hover transition-all"
                    >
                        <span className="material-symbols-outlined">music_note</span>
                        Start Practicing
                    </Link>
                </motion.div>

                {/* Additional Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-sm text-text-tertiary"
                >
                    <p>
                        Or go back to{' '}
                        <Link href="/" className="text-accent-primary hover:underline">
                            home page
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
