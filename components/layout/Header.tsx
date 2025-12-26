'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, LayoutGroup } from 'framer-motion';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { UserMenu } from '@/components/ui/UserMenu';

export default function Header() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        setMounted(true);
    }, []);

    const navItems = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Practice', href: '/practice' },
        { name: 'Songs', href: '/songs' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full h-16 z-50 bg-bg-page/80 backdrop-blur-md border-b border-border-subtle flex items-center justify-center transition-colors duration-300">
            <div className="w-full max-w-[1400px] px-4 md:px-6 flex items-center justify-between">

                {/* Left: Brand */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center text-bg-page font-bold shadow-glow">
                        G
                    </div>
                    <span className="text-lg font-bold text-text-primary tracking-tight hidden md:block">
                        GuitArt
                    </span>
                </Link>

                {/* Center: Navigation (Apple-style Sliding Segmented Control) */}
                <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center p-1 bg-bg-surface/50 backdrop-blur-sm rounded-full border border-border-subtle shadow-sm">
                    <LayoutGroup>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                        relative px-6 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 z-10
                                        ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}
                                    `}
                                >
                                    {/* Text Label */}
                                    <span className="relative z-10">{item.name}</span>

                                    {/* Sliding Active Background Pill */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-bg-surface-hover rounded-full shadow-sm border border-border-subtle/50"
                                            initial={false}
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 30
                                            }}
                                            style={{ zIndex: 0 }}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </LayoutGroup>
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {/* Animated Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary transition-all relative overflow-hidden"
                        aria-label="Toggle Theme"
                    >
                        {mounted ? (
                            <div className="relative w-5 h-5 flex items-center justify-center">
                                {/* Sun Icon (Visible in Light) */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: theme === 'dark' ? 0.5 : 1,
                                        rotate: theme === 'dark' ? 90 : 0,
                                        opacity: theme === 'dark' ? 0 : 1
                                    }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="absolute inset-0 origin-center flex items-center justify-center"
                                >
                                    <span className="material-symbols-outlined text-[20px]">light_mode</span>
                                </motion.div>

                                {/* Moon Icon (Visible in Dark) */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: theme === 'dark' ? 1 : 0.5,
                                        rotate: theme === 'dark' ? 0 : -90,
                                        opacity: theme === 'dark' ? 1 : 0
                                    }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="absolute inset-0 origin-center flex items-center justify-center"
                                >
                                    <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>dark_mode</span>
                                </motion.div>
                            </div>
                        ) : (
                            <div className="w-5 h-5 bg-border-subtle/30 rounded-full animate-pulse"></div>
                        )}
                    </button>

                    {/* User Profile or Login */}
                    {user ? (
                        <UserMenu user={user} />
                    ) : (
                        pathname !== '/login' && (
                            <Link href="/login">
                                <button className="min-btn px-5 py-2 h-10 bg-bg-surface hover:bg-bg-surface-hover text-text-primary border border-border-subtle rounded-full text-sm font-bold shadow-sm transition-all flex items-center gap-2 group">
                                    <span className="material-symbols-outlined text-[20px] text-text-secondary group-hover:text-accent-primary transition-colors">login</span>
                                    <span>Log In</span>
                                </button>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </header>
    );
}

