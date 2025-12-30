'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { useUser } from '@/hooks/useUser';
import { HeaderSkeleton } from '@/components/ui/HeaderSkeleton';
import { UserMenu } from '@/components/ui/UserMenu';

export default function Header() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { user, isLoading } = useUser();

    // Hooks must be called before any return
    const navRef = useRef<HTMLElement>(null);
    const itemRefs = useRef<Map<string, HTMLAnchorElement | null>>(new Map());
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

    const navItems = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Practice', href: '/practice' },
        { name: 'Songs', href: '/songs' },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const activeItem = navItems.find(item =>
            pathname === item.href || (item.href === '/' && pathname === '/')
        );

        if (activeItem && navRef.current) {
            const el = itemRefs.current.get(activeItem.href);
            if (el) {
                setPillStyle({
                    left: el.offsetLeft,
                    width: el.offsetWidth,
                    opacity: 1
                });
            }
        }
    }, [pathname, mounted]);

    if (!mounted || isLoading) {
        return <HeaderSkeleton />;
    }

    return (
        <header className="fixed top-0 left-0 w-full h-16 z-50 bg-bg-page/80 backdrop-blur-md border-b border-border-subtle flex items-center justify-center transition-colors duration-300">
            <div className="w-full max-w-[1400px] px-4 md:px-6 flex items-center justify-between">

                {/* Left: Brand */}
                <Link href="/" className="flex items-baseline gap-[1px] hover:opacity-80 transition-opacity select-none">
                    <span className="text-2xl font-bold text-text-primary tracking-tighter">Guit</span>
                    <span className="text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-blue-600 tracking-tighter pr-1">Art</span>
                </Link>

                {/* Center: Navigation (Apple-style Sliding Segmented Control) */}
                <nav
                    ref={navRef}
                    className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center p-1 bg-bg-surface/50 backdrop-blur-sm rounded-full border border-border-subtle shadow-sm isolate"
                >
                    <motion.div
                        className="absolute bg-bg-surface-hover rounded-full shadow-sm border border-border-subtle/50 pointer-events-none"
                        initial={false}
                        animate={{
                            left: pillStyle.left,
                            width: pillStyle.width,
                            opacity: pillStyle.opacity
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                        }}
                        style={{ height: 'calc(100% - 8px)', top: '4px', zIndex: -1 }}
                    />

                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                ref={(el: HTMLAnchorElement | null) => { itemRefs.current.set(item.href, el); }}
                                className={`
                                    relative px-6 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 z-10
                                    ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}
                                `}
                            >
                                <span className="relative z-10">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {/* Animated Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary transition-all relative overflow-hidden"
                        aria-label="Toggle Theme"
                    >
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
                    </button>

                    {/* User Profile or Login */}
                    {user ? (
                        <UserMenu user={{
                            name: user.name ?? null,
                            email: user.email,
                            image: user.image ?? null
                        }} />
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

