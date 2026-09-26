"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; 
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-[#0a0a0a] border-b border-zinc-800 relative z-50">
      <div className="max-w-[1232px] mx-auto w-full flex items-center justify-between px-4 py-4 md:px-8">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Image src="/images/logo-icon.svg" alt="Logo" width={28} height={28} />
          <span className="font-oswald text-xl font-bold tracking-widest text-white uppercase">
            Fitlog
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-[#ccff00]/10 text-[#ccff00]" 
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              pathname === "/my-plan"
                ? "bg-[#ccff00]/10 text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <Link 
            href="/my-plan" 
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            Plan
            <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-[#ccff00] text-black font-bold text-xs">
              0
            </span>
          </Link>
          <Link 
            href="/my-plan" 
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            Saved
            <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full border border-zinc-600 text-zinc-300 font-bold text-xs">
              0
            </span>
          </Link>
        </div>

        <button 
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-zinc-800 px-4 py-6 flex flex-col gap-4 shadow-xl">
          <Link
            href="/"
            onClick={closeMenu}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-[#ccff00]/10 text-[#ccff00]" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={closeMenu}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/my-plan"
                ? "bg-[#ccff00]/10 text-[#ccff00]"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            My Plan
          </Link>
          
          <div className="h-px bg-zinc-800 my-2 w-full"></div>

          <div className="flex items-center justify-around">
            <Link 
              href="/my-plan" 
              onClick={closeMenu}
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
            >
              Plan
              <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-[#ccff00] text-black font-bold text-xs">
                0
              </span>
            </Link>
            <Link 
              href="/my-plan" 
              onClick={closeMenu}
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
            >
              Saved
              <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full border border-zinc-600 text-zinc-300 font-bold text-xs">
                0
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}