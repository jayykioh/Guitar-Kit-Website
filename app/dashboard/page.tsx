'use client';

import { motion } from 'framer-motion';
import { TunerWidget } from '../../components/dashboard/TunerWidget';
import { useUserStats } from '@/hooks/useUserStats';
import { useUser } from '@/hooks/useUser';

export default function DashboardPage() {
    const { user } = useUser();
    const { stats, isLoading } = useUserStats();
    return (
        <main className="min-h-screen w-full pt-24 pb-12 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col gap-10">
            {/* Header Section */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-end justify-between gap-6"
            >
                <div>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-text-primary">
                        Good Afternoon, {isLoading ? '...' : (user?.name || user?.email.split('@')[0] || 'Guitarist')}
                    </h2>
                    <p className="text-xl text-text-secondary mt-2">
                        Ready to shred today? {stats && stats.totalSessions > 0 && `You've practiced ${stats.totalSessions} times!`} 🔥
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 25px var(--accent-primary)" }}
                    whileTap={{ scale: 0.98 }}
                    className="min-btn bg-accent-primary text-bg-page border-transparent hover:opacity-90 px-8 py-3 rounded-full font-bold text-lg shadow-glow flex items-center gap-3"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    Start Session
                </motion.button>
            </motion.header>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Daily Goal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:col-span-2 glass-panel p-8 flex flex-col justify-between gap-6 group hover:border-accent-primary/30 transition-colors"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <motion.div
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.5 }}
                                className="w-12 h-12 flex items-center justify-center bg-accent-primary/20 rounded-full text-accent-primary cursor-pointer"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34 4.86-9.24 4.86-9.24C12.3 3.68 12.45 4 12.45 4h5c.59 0 .58.32.38.66-.2.34-4.86 9.24-4.86 9.24C12.7 14.32 12.55 14 12.55 14h-1.55z" /></svg>
                            </motion.div>
                            <div>
                                <h3 className="font-bold text-xl text-text-primary">Daily Goal</h3>
                                <p className="text-sm text-text-secondary">Keep the momentum going</p>
                            </div>
                        </div>
                        <span className="text-3xl font-black text-text-primary">
                            {isLoading ? '...' : stats ? Math.round((stats.dailyProgress / stats.dailyGoal) * 100) : 0}%
                        </span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="w-full h-4 bg-bg-surface-hover rounded-full overflow-hidden">
                            <div
                                className="h-full bg-accent-primary rounded-full relative shadow-[0_0_20px_var(--accent-primary)] opacity-90 transition-all duration-500"
                                style={{ width: `${isLoading ? 0 : stats ? Math.min((stats.dailyProgress / stats.dailyGoal) * 100, 100) : 0}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-text-tertiary">
                            <span>{isLoading ? '...' : stats ? `${stats.dailyProgress} mins played` : '0 mins'}</span>
                            <span>Target: {isLoading ? '...' : stats ? `${stats.dailyGoal} mins` : '45 mins'}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Total Practice - Restored specific layout with Big Timer SVG and Green BG */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-panel p-8 flex flex-col justify-center items-start gap-1 relative overflow-hidden group shadow-lg hover:shadow-xl border-border-strong/50 cursor-default"
                >
                    {/* SVG Clock: Subtle and correctly colored */}
                    <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:opacity-20 transition-opacity rotate-12 text-text-primary pointer-events-none">
                        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
                    </div>

                    <span className="text-text-tertiary font-bold text-sm uppercase tracking-wider relative z-10">Total Practice</span>
                    <span className="text-5xl font-black text-text-primary tracking-tight relative z-10">
                        {isLoading ? '...' : stats ? (stats.totalPractice / 60).toFixed(1) : '0'}
                        <span className="text-2xl align-top text-text-secondary"> hrs</span>
                    </span>
                    <div className="mt-4 inline-flex items-center gap-1 bg-bg-surface-hover px-3 py-1.5 rounded-full backdrop-blur-sm relative z-10 border border-border-subtle">
                        <svg className="w-4 h-4 text-text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" /></svg>
                        <span className="text-text-primary text-sm font-bold">
                            {isLoading ? '...' : stats ? `${stats.totalSessions} sessions total` : 'No sessions yet'}
                        </span>
                    </div>
                </motion.div>
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Left Column (Skills & Songs) */}
                <div className="xl:col-span-8 flex flex-col gap-12">

                    {/* Technical Skills */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-text-primary">
                                Technical Skills
                                <span className="text-xs px-2 py-1 rounded bg-bg-surface-hover text-text-secondary border border-border-subtle">3 New</span>
                            </h3>
                            <a className="text-sm font-bold text-accent-primary hover:underline cursor-pointer">View All</a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Scales & Modes", desc: "Master the fretboard with pentatonic drills.", img: "text-blue-500", icon: "M3 3v18h18V3H3zm16 16H5V5h14v14zM11 7h2v2h-2zM7 7h2v2H7zM7 11h2v2H7zM7 15h2v2H7zM15 15h2v2h-2zM15 11h2v2h-2z" },
                                { title: "Backing Tracks", desc: "Jam along in any key. Blues, Rock, Jazz.", img: "text-purple-500", icon: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" }
                            ].map((item, i) => (
                                <div key={i} className="group relative overflow-hidden rounded-2xl glass-panel p-0 cursor-pointer hover:border-accent-primary/50 transition-all">
                                    <div className={`aspect-[16/9] w-full bg-bg-surface-hover relative overflow-hidden flex items-center justify-center ${item.img} opacity-20 group-hover:opacity-30 transition-opacity`}>
                                        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d={item.icon} /></svg>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-page/90 via-bg-page/20 to-transparent"></div>

                                    <div className="absolute bottom-0 left-0 p-6 w-full">
                                        <h4 className="text-xl font-bold mb-1 text-text-primary">{item.title}</h4>
                                        <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="absolute bottom-4 right-4 w-10 h-10 bg-accent-primary rounded-full flex items-center justify-center text-bg-page opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-glow"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </motion.button>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Songbook */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold tracking-tight text-text-primary">Songbook</h3>
                            <div className="flex gap-2">
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="min-btn px-3 flex items-center justify-center text-text-secondary hover:text-text-primary">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="min-btn px-3 flex items-center justify-center text-text-secondary hover:text-text-primary">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                                </motion.button>
                            </div>
                        </div>
                        <div className="glass-panel overflow-hidden">
                            {[
                                { title: "Wonderwall", artist: "Oasis", diff: "Easy", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
                                { title: "Hotel California", artist: "Eagles", diff: "Intermediate", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
                                { title: "Neon", artist: "John Mayer", diff: "Hard", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" }
                            ].map((song, i) => (
                                <div key={i} className="group flex items-center justify-between p-5 hover:bg-bg-surface-hover/50 transition-colors cursor-pointer border-b border-border-subtle last:border-0">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-lg bg-bg-surface-hover flex items-center justify-center text-text-tertiary">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v9.28a4.39 4.39 0 00-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" /></svg>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-lg text-text-primary group-hover:text-accent-primary transition-colors">{song.title}</h5>
                                            <p className="text-sm text-text-secondary">{song.artist}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border border-transparent ${song.color}`}>
                                            {song.diff}
                                        </span>
                                        <motion.button
                                            whileHover={{ scale: 1.2, color: "var(--accent-primary)" }}
                                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-bg-surface text-text-tertiary transition-colors"
                                        >
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                                        </motion.button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                </div>

                {/* Right Column (Tuner Widget & Upcoming) */}
                <div className="xl:col-span-4 flex flex-col gap-6">
                    {/* Tuner Widget */}
                    {/* Tuner Widget */}
                    <TunerWidget />

                    {/* Upcoming */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="glass-panel p-8 flex flex-col gap-6"
                    >
                        <h3 className="font-bold text-xl text-text-primary">Upcoming</h3>
                        <div className="flex gap-5 items-start">
                            <div className="flex flex-col items-center bg-bg-surface-hover rounded-2xl p-3 min-w-[4rem] shadow-inner border border-border-subtle">
                                <span className="text-xs font-bold text-text-tertiary uppercase mb-1">Oct</span>
                                <span className="text-2xl font-black text-text-primary">24</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-text-primary">Live Jam Session</h4>
                                <p className="text-sm text-text-secondary mt-1">Community event • 8:00 PM</p>
                                <div className="flex -space-x-3 mt-3">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full ring-2 ring-bg-surface bg-bg-surface-hover flex items-center justify-center text-xs font-bold text-text-secondary">U{i}</div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full ring-2 ring-bg-surface bg-bg-surface-hover flex items-center justify-center text-xs font-bold text-text-primary">+5</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Pro Tip - Upgraded UI: Magic Card Effect with Gradient Border & Glow */}
                    {/* Pro Tip - Apple Style: Minimalist, clean, subtle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="glass-panel p-8 flex flex-col gap-4 relative overflow-hidden group border-border-subtle/50"
                    >
                        {/* Subtle background decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h4 className="font-semibold text-sm text-text-tertiary uppercase tracking-wider">Pro Tip</h4>
                        </div>

                        <p className="relative z-10 text-lg font-medium text-text-primary leading-relaxed">
                            Relax your fretting hand. Tension kills speed. Try playing with the <span className="text-accent-primary">lightest touch possible</span> today.
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
