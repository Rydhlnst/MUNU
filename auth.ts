import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from '@/lib/generated/prisma';
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    Github({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Cari user dari database menggunakan Prisma
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.hashedPassword) return null;

        const passwordCorrect = credentials.password === user.hashedPassword;
        // ⚠️ Gantilah dengan bcrypt.compare() kalau sudah hash password

        if (!passwordCorrect) return null;

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        // Cek apakah sudah masuk waitlist
        const existing = await prisma.waitlistUser.findUnique({
          where: { email: user.email },
        });

        if (!existing) {
          await prisma.waitlistUser.create({
            data: {
              email: user.email,
              name: user.name,
              provider: account?.provider || "unknown",
              image: user.image,
            },
          });
        }
      } catch (error) {
        console.error("Gagal menyimpan ke waitlist:", error);
        return false;
      }

      return true;
    },
  },
});
