'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if current page is an authentication page
    const isAuthPage = pathname === '/login' || pathname === '/signup';

    // If Auth Page: Render ONLY content (no header, no padding)
    if (isAuthPage) {
        return <>{children}</>;
    }

    // Other Pages: Render Header + Content with padding
    return (
        <>
            <Header />
            <div className="pt-16">
                {children}
            </div>
        </>
    );
}
