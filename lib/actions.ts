'use server';

import { PrismaClient } from '@/lib/generated/prisma';
import bcrypt from 'bcryptjs';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

const prisma = new PrismaClient();

// --- SIGN IN DENGAN GOOGLE ---
export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/thanks' });
}

export async function signInWithGithub() {
  await signIn('github', { redirectTo: '/dashboard' });
}

// --- LOGOUT ---
export async function logout() {
  await signOut({ redirectTo: '/' });
}

// --- LOGIN DENGAN EMAIL/PASSWORD ---
export async function login(formData: FormData): Promise<void> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error(
        error.type === 'CredentialsSignin'
          ? 'Invalid email or password.'
          : 'Something went wrong.'
      );
      return;
    }

    throw error;
  }
}

// --- SIGN UP DENGAN EMAIL/PASSWORD (Prisma) ---
export async function signup(formData: FormData) {
  const firstName = formData.get('first-name') as string;
  const lastName = formData.get('last-name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    console.error('Email and password are required.');
    return;
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.error('User already exists.');
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user in DB
  await prisma.user.create({
    data: {
      name: `${firstName} ${lastName}`,
      email,
      hashedPassword,
    },
  });

  console.log('Account created successfully.');
}
