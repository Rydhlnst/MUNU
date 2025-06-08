import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Hapus `: Promise<PrismaUser | null>` agar lebih sederhana
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new Error("Email dan password dibutuhkan.");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        // Jika user login dengan Google, dia tidak punya hashedPassword
        if (!user || !user.hashedPassword) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
          return null;
        }

        // Return user object yang akan diteruskan ke callback jwt
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // TAMBAHKAN: Callback jwt sangat penting untuk strategi JWT
    async jwt({ token, user }) {
      // Saat pertama kali sign-in, objek `user` akan ada.
      // Kita tambahkan ID-nya ke dalam token.
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    // PERBAIKI: Ambil ID dari token untuk dimasukkan ke sesi
    async session({ session, token }) {
      // Pastikan objek user di sesi ada
      if (session.user) {
        // Ambil id dari token (yang sudah kita isi di callback jwt)
        // dan masukkan ke dalam objek sesi.
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});