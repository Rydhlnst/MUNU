// app/thanks/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ThanksPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-full items-center flex justify-center">
            <Image src={"/success.svg"} alt="Success" width={450} height={450}/>
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Kamu Berhasil Bergabung ke Waitlist!
        </h1>
        <p className="text-muted-foreground">
          Terima kasih sudah mendaftar. Kami akan menghubungi kamu saat versi beta dari <span className="font-semibold text-primary">MUNU</span> siap diluncurkan.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    </div>
  );
}
