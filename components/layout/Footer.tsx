'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-bg-surface relative overflow-hidden pt-16 pb-12 border-t border-border-subtle transition-colors duration-300">
            {/* Ambient Background Effects - Subtler in Light Mode */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-50 dark:opacity-100"></div>
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-accent-primary/5 rounded-full blur-[80px] translate-y-1/3 pointer-events-none opacity-50 dark:opacity-100"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-6">

                    {/* Brand & Quote */}
                    <div className="flex flex-col gap-6 max-w-md">
                        <div className="relative">
                            <h2 className="text-[3.5rem] leading-[0.9] font-light tracking-tighter text-text-primary font-display">
                                GUIT<br />
                                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-tertiary">ART</span>.
                            </h2>
                        </div>
                        <p className="text-base text-text-secondary font-light leading-relaxed border-l border-accent-primary/20 pl-4 py-1">
                            Your ultimate command center for guitar mastery. Practice scales contextually, jam with high-quality backing tracks, and track your progress in real-time.
                        </p>
                    </div>

                    {/* Navigation - Real Routes */}
                    <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
                        <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-widest opacity-70">Navigation</h3>
                        <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
                            <Link href="/dashboard" className="text-lg font-light text-text-secondary hover:text-text-primary hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                Dashboard
                            </Link>
                            <Link href="/practice" className="text-lg font-light text-text-secondary hover:text-text-primary hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                Practice
                            </Link>
                            <Link href="/practice" className="text-lg font-light text-text-secondary hover:text-text-primary hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                Tuner <span className="text-xs align-top text-accent-primary opacity-60">●</span>
                            </Link>
                            <Link href="/songs" className="text-lg font-light text-text-secondary hover:text-text-primary hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                Songs
                            </Link>
                            <Link href="/profile" className="text-lg font-light text-text-secondary hover:text-text-primary hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Creator Section */}
                <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary opacity-70">Architecture by</span>
                        <div className="flex items-center gap-3">
                            <span className="text-base font-medium text-text-primary tracking-wide">Doan Luc</span>
                        </div>
                    </div>

                    {/* Social Icons (Creator) */}
                    <div className="flex items-center gap-5">
                        {/* Facebook */}
                        <a href="https://www.facebook.com/jeckyoh/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-[#1877F2] transition-colors hover:scale-110 transform duration-200" aria-label="Facebook">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>
                        {/* Github */}
                        <a href="https://github.com/jayykioh" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors hover:scale-110 transform duration-200" aria-label="GitHub">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                        {/* Gmail (Mail Icon) */}
                        <a href="mailto:trongluc8@gmail.com" className="text-text-secondary hover:text-[#EA4335] transition-colors hover:scale-110 transform duration-200" aria-label="Email">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
