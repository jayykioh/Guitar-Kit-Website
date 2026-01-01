import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt", // Use JWT instead of database sessions
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    trustHost: true, // Required for Vercel deployment
    providers: [
        // Google OAuth (optional - only enabled if credentials are provided)
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
            ? [Google({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            })]
            : []
        ),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log("[Auth] Missing credentials");
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        image: true,
                        password: true,
                    }
                })

                if (!user) {
                    console.log("[Auth] User not found:", credentials.email);
                    return null;
                }

                if (!user.password) {
                    console.log("[Auth] User has no password (OAuth?):", credentials.email);
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                )

                if (!isPasswordValid) {
                    console.log("[Auth] Invalid password for:", credentials.email);
                    return null
                }

                console.log("[Auth] Login successful:", user.email);

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            console.log('[AUTH JWT] Trigger:', trigger)
            console.log('[AUTH JWT] Has user:', !!user)
            console.log('[AUTH JWT] Token before:', { email: token.email, id: token.id })

            if (user) {
                token.id = user.id
                console.log('[AUTH JWT] Added user.id to token:', user.id)
            }
            if (trigger === "update" && session?.name) {
                token.name = session.name;
                console.log('[AUTH JWT] Updated name:', session.name)
            }

            console.log('[AUTH JWT] Token after:', { email: token.email, id: token.id })
            return token
        },
        async session({ session, token }) {
            console.log('[AUTH SESSION] Building session')
            console.log('[AUTH SESSION] Token:', { email: token.email, id: token.id })

            if (session.user) {
                session.user.id = token.id as string
                console.log('[AUTH SESSION] Added user.id:', session.user.id)
            }

            console.log('[AUTH SESSION] Final session:', {
                userEmail: session.user?.email,
                userId: session.user?.id
            })
            return session
        },
    },
    pages: {
        signIn: "/login",
    },
})
