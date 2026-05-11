import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 heures
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "PIN",
      credentials: {
        userId: { label: "Utilisateur", type: "text" },
        pin: { label: "PIN", type: "password" },
      },
      authorize: async (credentials) => {
        const userId = credentials?.userId as string | undefined;
        const pin = credentials?.pin as string | undefined;
        if (!userId || !pin) return null;

        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!user || !user.isActive) return null;

        const ok = await bcrypt.compare(pin, user.pinHash);
        if (!ok) return null;

        // Mise à jour du dernier login (best-effort, non bloquant)
        prisma.user
          .update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          })
          .catch(() => {});

        return {
          id: user.id,
          name: user.name,
          email: null,
          role: user.role,
          color: user.color,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.color = (user as any).color;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).color = token.color;
      }
      return session;
    },
  },
});
