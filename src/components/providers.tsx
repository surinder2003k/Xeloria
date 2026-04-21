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
        toastOptions={{
          style: {
            borderRadius: '1rem',
            padding: '0.75rem 1rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            background: 'white',
          },
          className: "font-semibold",
        }}
      />
    </ClerkProvider>
  );
}
