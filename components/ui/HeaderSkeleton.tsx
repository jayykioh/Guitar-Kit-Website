export function HeaderSkeleton() {
    return (
        <header className="fixed top-0 left-0 w-full h-16 z-50 bg-bg-page/80 backdrop-blur-md border-b border-border-subtle flex items-center justify-center">
            <div className="w-full max-w-[1400px] px-4 md:px-6 flex items-center justify-between">

                {/* Brand Skeleton */}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-24 bg-border-subtle/20 rounded animate-pulse"></div>
                </div>

                {/* Nav Skeleton (Center) - Hidden on Mobile */}
                <div className="hidden md:flex items-center gap-1 p-1 bg-border-subtle/10 rounded-full border border-transparent">
                    <div className="h-8 w-24 bg-border-subtle/20 rounded-full animate-pulse"></div>
                    <div className="h-8 w-24 bg-border-subtle/20 rounded-full animate-pulse"></div>
                    <div className="h-8 w-24 bg-border-subtle/20 rounded-full animate-pulse"></div>
                </div>

                {/* Right Actions Skeleton */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle Skeleton */}
                    <div className="w-10 h-10 rounded-full bg-border-subtle/20 animate-pulse"></div>

                    {/* User Menu / Login Skeleton */}
                    <div className="h-10 w-24 bg-border-subtle/20 rounded-full animate-pulse"></div>
                </div>
            </div>
        </header>
    );
}
