import { loginServer } from "@/services/auth"
import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null

        const user = await loginServer(
          credentials.email,
          credentials.password
        )

        return {
          id: credentials.email,
          email: user.email,
          name: user.name,
          role: user.role,
          accessToken: user.token,
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
        token.name = user.name
        token.role = (user as any).role
        token.accessToken = (user as any).accessToken
      }
      return token
    },

    async session({ session, token }) {
      session.user.email = token.email as string
      session.user.name = token.name as string
      ;(session.user as any).role = token.role
      ;(session as any).accessToken = token.accessToken
      return session
    },
  },

  pages: {
    signIn: "/",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
