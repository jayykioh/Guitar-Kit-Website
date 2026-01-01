'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function SettingsPage() {
    const [selectedTab, setSelectedTab] = useState('general');

    return (
        <div className="min-h-screen bg-bg-page text-text-primary p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link href="/dashboard" className="text-text-secondary hover:text-accent-primary transition-colors mb-4 inline-flex items-center gap-2">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold mt-4">Settings</h1>
                    <p className="text-text-secondary mt-2">Manage your preferences and account settings</p>
                </motion.div>

                <div className="grid md:grid-cols-[250px_1fr] gap-6">
                    {/* Sidebar */}
                    <motion.nav
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-2"
                    >
                        {[
                            { id: 'general', icon: 'settings', label: 'General' },
                            { id: 'account', icon: 'person', label: 'Account' },
                            { id: 'audio', icon: 'volume_up', label: 'Audio' },
                            { id: 'appearance', icon: 'palette', label: 'Appearance' },
                            { id: 'notifications', icon: 'notifications', label: 'Notifications' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${selectedTab === tab.id
                                        ? 'bg-accent-primary text-black font-semibold'
                                        : 'text-text-secondary hover:bg-bg-surface hover:text-text-primary'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </motion.nav>

                    {/* Content Area - Under Construction */}
                    <motion.div
                        key={selectedTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-bg-surface border border-border-subtle rounded-2xl p-8 min-h-[500px] flex flex-col items-center justify-center"
                    >
                        <div className="text-center max-w-md">
                            {/* Construction Icon */}
                            <div className="mb-6 relative inline-block">
                                <span className="material-symbols-outlined text-8xl text-accent-primary animate-pulse">
                                    construction
                                </span>
                                <div className="absolute inset-0 bg-accent-primary/20 blur-3xl rounded-full"></div>
                            </div>

                            <h2 className="text-3xl font-bold mb-4">Under Construction</h2>
                            <p className="text-text-secondary text-lg mb-6">
                                We're working hard to bring you an amazing settings experience.
                                This section will be available soon!
                            </p>

                            {/* Coming Soon Features */}
                            <div className="mt-8 space-y-3 text-left bg-bg-page border border-border-subtle rounded-xl p-6">
                                <h3 className="font-semibold mb-3 text-center">Coming Soon</h3>
                                {[
                                    'Custom audio preferences',
                                    'Theme customization',
                                    'Practice session goals',
                                    'Notification preferences',
                                    'Account security settings'
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-text-secondary">
                                        <span className="material-symbols-outlined text-sm text-accent-primary">check_circle</span>
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-8">
                                <div className="flex justify-between text-xs text-text-tertiary mb-2">
                                    <span>Development Progress</span>
                                    <span>35%</span>
                                </div>
                                <div className="h-2 bg-bg-page rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '35%' }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-accent-primary to-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
