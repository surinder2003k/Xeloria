"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

export const Navbar = () => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 group">
          <img src="/logo.svg" alt="Xeloria Logo" className="w-8 h-8 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.8)] transition-all" />
          <span className="text-2xl font-bold tracking-tight text-primary">Xel<span className="text-indigo-600">oria</span></span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
          <Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link>
        </div>

        <div className="flex items-center space-x-4">
          {!isLoaded ? (
            <div className="h-8 w-16 bg-muted animate-pulse rounded" />
          ) : !isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">Log in</Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
              </SignInButton>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <UserButton />
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
