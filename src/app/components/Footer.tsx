import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-zinc-800 mt-auto">
      <div className="max-w-[1232px] mx-auto w-full flex flex-col md:flex-row items-center justify-between px-4 py-8 md:px-8 gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo-icon.svg" alt="Logo" width={24} height={24} />
          <span className="font-oswald text-lg font-bold tracking-widest text-white uppercase">
            Fitlog
          </span>
        </Link>
        <p className="text-[#6B7280] text-sm text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}