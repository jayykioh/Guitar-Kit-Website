import { motion } from 'framer-motion';

export function SkeletonCard({ className = '' }: { className?: string }) {
    return (
        <div className={`glass-panel p-8 ${className}`}>
            <div className="animate-pulse space-y-4">
                <div className="h-4 bg-bg-surface-hover rounded w-1/3"></div>
                <div className="h-8 bg-bg-surface-hover rounded w-2/3"></div>
                <div className="h-4 bg-bg-surface-hover rounded w-1/2"></div>
            </div>
        </div>
    );
}

export function SkeletonStat() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel p-8 flex flex-col gap-4"
        >
            <div className="animate-pulse space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-bg-surface-hover rounded-full"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-bg-surface-hover rounded w-1/3"></div>
                        <div className="h-3 bg-bg-surface-hover rounded w-1/2"></div>
                    </div>
                </div>
                <div className="h-4 bg-bg-surface-hover rounded-full w-full"></div>
                <div className="flex justify-between">
                    <div className="h-3 bg-bg-surface-hover rounded w-1/4"></div>
                    <div className="h-3 bg-bg-surface-hover rounded w-1/4"></div>
                </div>
            </div>
        </motion.div>
    );
}

export function SkeletonSongCard() {
    return (
        <div className="glass-panel p-4 flex items-center gap-6">
            <div className="animate-pulse flex items-center gap-6 w-full">
                {/* Cover placeholder */}
                <div className="w-24 h-24 bg-bg-surface-hover rounded-xl shrink-0"></div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                    <div className="h-5 bg-bg-surface-hover rounded w-1/3"></div>
                    <div className="h-4 bg-bg-surface-hover rounded w-1/4"></div>
                    <div className="flex gap-2">
                        <div className="h-6 bg-bg-surface-hover rounded-full w-16"></div>
                        <div className="h-6 bg-bg-surface-hover rounded-full w-16"></div>
                    </div>
                </div>

                {/* Progress */}
                <div className="hidden md:block w-32 space-y-2">
                    <div className="h-3 bg-bg-surface-hover rounded w-full"></div>
                    <div className="h-2 bg-bg-surface-hover rounded-full w-full"></div>
                </div>
            </div>
        </div>
    );
}

export function SkeletonDashboard() {
    return (
        <div className="space-y-10">
            {/* Header skeleton */}
            <div className="flex justify-between items-end">
                <div className="space-y-3 flex-1">
                    <div className="h-8 bg-bg-surface-hover rounded w-1/2 max-w-md animate-pulse"></div>
                    <div className="h-5 bg-bg-surface-hover rounded w-1/3 max-w-xs animate-pulse"></div>
                </div>
                <div className="h-12 bg-bg-surface-hover rounded-full w-40 animate-pulse"></div>
            </div>

            {/* Stats grid skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SkeletonStat />
                <SkeletonCard className="lg:col-span-2" />
            </div>

            {/* Content skeleton */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8 space-y-6">
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
                <div className="xl:col-span-4 space-y-6">
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
        </div>
    );
}
