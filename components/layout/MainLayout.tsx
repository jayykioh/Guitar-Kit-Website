'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from '@/components/layout/Footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if current page is an authentication page
    const isAuthPage = pathname === '/login' || pathname === '/signup';

    // If Auth Page: Render ONLY content (no header, no padding)
    if (isAuthPage) {
        return <>{children}</>;
    }

    // Other Pages: Render Header + Content with padding + Footer
    const isHomePage = pathname === '/';

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className={`flex-grow ${isHomePage ? '' : 'pt-16'}`}>
                {children}
            </main>
            <Footer />
        </div>
    );
}
