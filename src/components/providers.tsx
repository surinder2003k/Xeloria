"use client";

import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import NProgress from "nprogress";
import { useEffect } from "react";


export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    NProgress.configure({ 
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.3
    });
  }, []);

  return (
    <ClerkProvider>
      <NextTopLoader
        color="#6366f1"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #6366f1,0 0 5px #6366f1"
      />
      {children}
      <Toaster 
        position="top-right" 
        richColors 
        closeButton 
        theme="dark"
        toastOptions={{
          style: {
            borderRadius: '1.25rem',
            padding: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            background: 'rgba(10, 10, 10, 0.8)',
            color: 'white',
          },
          className: "font-black uppercase tracking-widest text-[10px]",
        }}
      />
    </ClerkProvider>
  );
}
