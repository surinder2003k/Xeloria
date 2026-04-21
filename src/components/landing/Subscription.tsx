"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, Mail } from "lucide-react";

export const Subscription = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Welcome aboard! Please check your email.");
        setEmail("");
      } else {
        const data = await response.json();
        const errorMsg = typeof data.error === 'string' ? data.error : "Something went wrong.";
        if (errorMsg.toLowerCase().includes("sandbox mode")) {
          toast.info("Subscription is currently in dev/sandbox mode.");
        } else {
          toast.error(errorMsg);
        }
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-slate-900 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-24 shadow-2xl rounded-3xl sm:px-24 xl:py-32">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stay Ahead of the Curve
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-slate-300">
            Get portfolio design tips, career branding advice, and new theme announcements delivered to your inbox.
          </p>
          <form 
            onSubmit={handleSubscribe}
            className="mx-auto mt-10 flex max-w-md gap-x-4"
          >
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <div className="relative flex-auto">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder-slate-400 focus:ring-0 focus:border-indigo-500"
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 px-8 bg-indigo-600 text-white font-semibold hover:bg-indigo-500 rounded-lg shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "SUBSCRIBE"
              )}
            </Button>
          </form>
          
          {/* Subtle background circles */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#subscription-gradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="subscription-gradient">
                <stop stopColor="#4f46e5" />
                <stop offset={1} stopColor="#1e293b" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};
