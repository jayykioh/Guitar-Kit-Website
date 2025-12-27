'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

interface UserMenuProps {
    user: {
        name: string | null;
        email: string;
        image: string | null;
    };
    onLogout?: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        setIsOpen(false);
        if (onLogout) {
            onLogout();
        } else {
            // Use NextAuth signOut
            await signOut({ callbackUrl: '/' });
        }
    };

    return (
        <div className="relative">
            {/* User Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-full bg-bg-surface hover:bg-bg-surface-hover border border-border-subtle transition-all group"
            >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-bold text-sm">
                    {user.image ? (
                        <img src={user.image} alt={user.name || user.email} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <span>{(user.name || user.email).charAt(0).toUpperCase()}</span>
                    )}
                </div>

                {/* Name (Desktop) */}
                <span className="hidden md:block text-sm font-medium text-text-primary group-hover:text-accent-primary transition-colors">
                    {user.name || user.email.split('@')[0]}
                </span>

                {/* Dropdown Icon */}
                <motion.span
                    className="material-symbols-outlined text-[18px] text-text-secondary"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    expand_more
                </motion.span>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 mt-2 w-64 bg-bg-surface border border-border-subtle rounded-2xl shadow-2xl z-50 overflow-hidden"
                        >
                            {/* User Info */}
                            <div className="p-4 border-b border-border-subtle bg-bg-surface-hover/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-bold text-lg">
                                        {user.image ? (
                                            <img src={user.image} alt={user.name || user.email} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <span>{(user.name || user.email).charAt(0).toUpperCase()}</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-text-primary truncate">
                                            {user.name || 'User'}
                                        </p>
                                        <p className="text-xs text-text-secondary truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        // Navigate to dashboard
                                        window.location.href = '/dashboard';
                                    }}
                                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-bg-surface-hover transition-colors text-left group"
                                >
                                    <span className="material-symbols-outlined text-[20px] text-text-secondary group-hover:text-accent-primary">
                                        dashboard
                                    </span>
                                    <span className="text-sm font-medium text-text-primary">Dashboard</span>
                                </button>

                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        window.location.href = '/practice';
                                    }}
                                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-bg-surface-hover transition-colors text-left group"
                                >
                                    <span className="material-symbols-outlined text-[20px] text-text-secondary group-hover:text-accent-primary">
                                        music_note
                                    </span>
                                    <span className="text-sm font-medium text-text-primary">Practice</span>
                                </button>

                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        window.location.href = '/songs';
                                    }}
                                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-bg-surface-hover transition-colors text-left group"
                                >
                                    <span className="material-symbols-outlined text-[20px] text-text-secondary group-hover:text-accent-primary">
                                        library_music
                                    </span>
                                    <span className="text-sm font-medium text-text-primary">My Songs</span>
                                </button>

                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        alert('Settings page coming soon!');
                                    }}
                                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-bg-surface-hover transition-colors text-left group"
                                >
                                    <span className="material-symbols-outlined text-[20px] text-text-secondary group-hover:text-accent-primary">
                                        settings
                                    </span>
                                    <span className="text-sm font-medium text-text-primary">Settings</span>
                                </button>

                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        alert('Profile page coming soon!');
                                    }}
                                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-bg-surface-hover transition-colors text-left group"
                                >
                                    <span className="material-symbols-outlined text-[20px] text-text-secondary group-hover:text-accent-primary">
                                        person
                                    </span>
                                    <span className="text-sm font-medium text-text-primary">Profile</span>
                                </button>
                            </div>

                            {/* Logout */}
                            <div className="border-t border-border-subtle p-2">
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-500/10 transition-colors text-left group rounded-lg"
                                >
                                    <span className="material-symbols-outlined text-[20px] text-red-500">
                                        logout
                                    </span>
                                    <span className="text-sm font-medium text-red-500">Log Out</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
