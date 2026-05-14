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
  
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(3, 3, 3, 0)", "rgba(3, 3, 3, 0.8)"]
  );
  
  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]
  );

  return (
    <>
      <motion.nav 
        style={{ backgroundColor: navBackground, borderBottomColor: navBorder as any }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 z-[100] w-full border-b border-transparent h-20 backdrop-blur-md transition-colors"
      >
        <div className="container mx-auto flex h-full items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <XeloriaLogo className="h-9 w-9 group-hover:scale-105 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-white">Xeloria</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[11px] font-medium uppercase tracking-wider text-slate-400 hover:text-white transition-all">
              Home
            </Link>
            <Link href="/blog" className="text-[11px] font-medium uppercase tracking-wider text-slate-400 hover:text-white transition-all">
              Blog
            </Link>
            <Link href="/about" className="text-[11px] font-medium uppercase tracking-wider text-slate-400 hover:text-white transition-all">
              About Us
            </Link>
            <Link href="/contact" className="text-[11px] font-medium uppercase tracking-wider text-slate-400 hover:text-white transition-all">
              Contact Us
            </Link>
            <Link href="/terms" className="text-[11px] font-medium uppercase tracking-wider text-slate-400 hover:text-white transition-all">
              Terms
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!isLoaded ? (
              <div className="h-9 w-20 bg-white/5 animate-pulse rounded-lg" />
            ) : !isSignedIn ? (
              <div className="flex items-center gap-4">
                <SignInButton mode="modal">
                   <button className="hidden sm:block text-[11px] font-semibold text-slate-400 hover:text-white transition-colors">Sign In</button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button className="h-10 px-6 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                    Start Creating
                  </Button>
                </SignInButton>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="hidden sm:block">
                  <Button variant="ghost" className="h-10 px-6 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 text-[11px] font-bold uppercase tracking-widest transition-all">
                    Dashboard
                  </Button>
                </Link>
                <div className="p-0.5 bg-gradient-to-br from-indigo-500/50 to-purple-500/50 rounded-full shadow-lg">
                   <div className="bg-[#030303] rounded-full p-0.5">
                      <UserButton 
                        appearance={{
                            elements: {
                                avatarBox: "h-8 w-8 rounded-full"
                            }
                        }}
                      />
                   </div>
                </div>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-[90] md:hidden bg-[#030303]/98 backdrop-blur-xl flex flex-col pt-24 px-8 space-y-6"
          >
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-slate-200 hover:text-indigo-400 transition-all"
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-slate-200 hover:text-indigo-400 transition-all"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-slate-200 hover:text-indigo-400 transition-all"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-slate-200 hover:text-indigo-400 transition-all"
            >
              Contact Us
            </Link>
            <Link 
              href="/terms" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-slate-200 hover:text-indigo-400 transition-all"
            >
              Terms
            </Link>
            {isSignedIn && (
              <Link 
                href="/dashboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-indigo-400"
              >
                Go to Dashboard
              </Link>
            )}
            {!isSignedIn && (
               <SignInButton mode="modal">
                 <button className="text-2xl font-bold text-white text-left">Start Creating</button>
               </SignInButton>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
