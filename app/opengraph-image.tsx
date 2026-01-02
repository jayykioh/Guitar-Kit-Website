import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'GuitArt - Interactive Guitar Learning';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: 'linear-gradient(to bottom right, #09090b, #18181b)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Logo / Icon Placeholder */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 40,
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#10B981"
                        width="150"
                        height="150"
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 130, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.9 }}>
                        GuitArt
                    </div>
                </div>
                <div style={{ fontSize: 36, marginTop: 30, color: '#A1A1AA', fontWeight: 500 }}>
                    Master the Fretboard
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
