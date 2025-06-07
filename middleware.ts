import { auth } from "@/auth"
import { NextResponse } from "next/server"

// 'auth' di sini adalah fungsi middleware dari Auth.js
// yang kita bungkus dengan logika kustom kita.
export default auth((req) => {
  const { nextUrl } = req;
  // req.auth berisi informasi sesi jika pengguna sudah login.
  // Jika belum, nilainya akan null.
  const isLoggedIn = !!req.auth;

  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

  // Logika utama untuk melindungi rute dashboard
  if (isOnDashboard) {
    if (isLoggedIn) {
      // Jika pengguna sudah login dan mengakses dashboard, biarkan saja.
      // Dengan mengembalikan `null` atau `NextResponse.next()`, 
      // kita membiarkan permintaan dilanjutkan.
      return; 
    }
    // Jika pengguna belum login dan mencoba akses dashboard,
    // arahkan (redirect) mereka ke halaman login.
    return NextResponse.redirect(new URL("/auth/sign-in", nextUrl));
  } 
  
  // (Opsional) Logika tambahan:
  // Jika pengguna sudah login tapi mencoba mengakses halaman login/signup,
  // arahkan mereka ke dashboard.
  else if (isLoggedIn) {
    const isOnAuthPage = nextUrl.pathname.startsWith("/auth/sign-in") || nextUrl.pathname.startsWith("/auth/sign-up");
    if (isOnAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  // Untuk semua kasus lain (misal: user belum login dan akses halaman utama),
  // biarkan saja tanpa melakukan apa-apa.
  return;
});

// Konfigurasi Matcher (PENTING!)
// Ini memberitahu middleware untuk HANYA berjalan pada rute-rute tertentu.
// Ini meningkatkan performa karena middleware tidak berjalan pada file statis (gambar, css).
export const config = {
  matcher: [
    // Cocokkan semua rute yang dimulai dengan:
    "/dashboard/:path*", // Semua rute di bawah dashboard
    "/auth/sign-in",     // Halaman login
    "/auth/sign-up",     // Halaman signup
  ],
}