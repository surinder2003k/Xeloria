"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Terminal, Menu, X, LayoutDashboard } from "lucide-react";
import { XeloriaLogo } from "../BrandLogo";

export const Navbar = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.8)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(20px)"]
  );

  return (
    <motion.nav 
      style={{ backgroundColor, backdropFilter: backdropBlur as any }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 z-[100] w-full border-b border-white/5"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center space-x-3 group">
          <XeloriaLogo className="h-10 w-10 group-hover:scale-110 group-hover:rotate-6 transition-all drop-shadow-2xl" />
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">XEL<span className="text-indigo-500">ORIA</span></span>
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all">
            Home
          </Link>
          <Link href="/blog" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all">
            Blog
          </Link>
          <Link href="/about" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all">
            About Us
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          {!isLoaded ? (
            <div className="h-10 w-24 bg-white/5 animate-pulse rounded-xl" />
          ) : !isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Authorize</button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button className="h-11 px-8 rounded-xl bg-white text-black hover:bg-slate-200 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-white/10 transition-all active:scale-95">
                  Get Access
                </Button>
              </SignInButton>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="h-11 px-8 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all">
                  Command Center
                </Button>
              </Link>
              <div className="p-1 bg-white/5 rounded-xl border border-white/10 shadow-2xl">
                 <UserButton 
                    appearance={{
                        elements: {
                            avatarBox: "h-9 w-9 rounded-lg"
                        }
                    }}
                 />
              </div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
