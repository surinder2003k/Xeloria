"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Menu, X, LayoutDashboard } from "lucide-react";
import { XeloriaLogo } from "../BrandLogo";
import { useState } from "react";

export const Navbar = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.9)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(24px)"]
  );

  return (
    <>
      <motion.nav 
        style={{ backgroundColor, backdropFilter: backdropBlur as any }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 z-[100] w-full border-b border-white/5 h-20"
      >
        <div className="container mx-auto flex h-full items-center justify-between px-6 lg:px-12">
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <XeloriaLogo className="h-10 w-10 group-hover:scale-110 group-hover:rotate-6 transition-all drop-shadow-2xl" />
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">XEL<span className="text-indigo-500">ORIA</span></span>
          </Link>

          {/* Desktop Navigation */}
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

          <div className="flex items-center space-x-4 md:space-x-6">
            {!isLoaded ? (
              <div className="h-10 w-24 bg-white/5 animate-pulse rounded-xl" />
            ) : !isSignedIn ? (
              <div className="flex items-center gap-4">
                <SignInButton mode="modal">
                  <button className="hidden sm:block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Authorize</button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button className="h-10 md:h-11 px-4 md:px-8 rounded-xl bg-white text-black hover:bg-slate-200 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-white/10 transition-all active:scale-95">
                    Get Access
                  </Button>
                </SignInButton>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="hidden sm:block">
                  <Button variant="ghost" className="h-11 px-8 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all">
                    Command Center
                  </Button>
                </Link>
                <div className="p-1 bg-white/5 rounded-xl border border-white/10 shadow-2xl">
                   <UserButton 
                      appearance={{
                          elements: {
                              avatarBox: "h-8 w-8 md:h-9 md:w-9 rounded-lg"
                          }
                      }}
                   />
                </div>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] md:hidden bg-[#050505]/95 backdrop-blur-2xl flex flex-col pt-32 px-10 space-y-8"
          >
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-tighter text-slate-500 hover:text-indigo-500 transition-all"
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-tighter text-slate-500 hover:text-indigo-500 transition-all"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-tighter text-slate-500 hover:text-indigo-500 transition-all"
            >
              About Us
            </Link>
            {isSignedIn && (
              <Link 
                href="/dashboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-black uppercase tracking-tighter text-indigo-500"
              >
                Command Center
              </Link>
            )}
            {!isSignedIn && (
               <SignInButton mode="modal">
                 <button className="text-3xl font-black uppercase tracking-tighter text-white text-left">Get Access</button>
               </SignInButton>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
