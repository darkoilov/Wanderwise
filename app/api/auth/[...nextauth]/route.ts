import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { UserService } from "@/lib/services/userService"
import bcrypt from "bcryptjs"

// Defensive env checks
if (!process.env.NEXTAUTH_SECRET) {
  console.warn("NEXTAUTH_SECRET is not set")
}
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn("Google OAuth not fully configured")
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim()
        const password = credentials?.password ?? ""

        if (!email || !password) return null

        const user = await UserService.getUserByEmail(email)
        if (!user || !user.passwordHash) {
          // If user exists but no passwordHash → likely OAuth account
          return null
        }

        const ok = await bcrypt.compare(password, user.passwordHash)
        if (!ok) return null

        return {
          id: user._id!.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role ?? "user",
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Optional
  },

  callbacks: {
    /**
     * Runs on sign in. Make sure Google users exist in DB.
     */
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google" && user?.email) {
          await UserService.findOrCreateUser({
            email: user.email.toLowerCase(),
            name: user.name ?? "",
            image: user.image,
            provider: "google",
            providerId: account.providerAccountId,
          })
        }
        return true
      } catch (e) {
        console.error("signIn callback error:", e)
        return false
      }
    },

    /**
     * Attach user.id and role into JWT token.
     * Runs on every request.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id
        token.role = (user as any).role ?? "user"
      }
      return token
    },

    /**
     * Make sure session.user has id and role.
     */
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id = token.id
        ;(session.user as any).role = token.role ?? "user"
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
