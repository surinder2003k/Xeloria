"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, Mail, Sparkles, Send } from "lucide-react";

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
        toast.info(errorMsg);
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-[#050505] py-32 sm:py-48 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative isolate overflow-hidden bg-white/[0.02] backdrop-blur-3xl px-8 py-24 shadow-2xl rounded-[4rem] border border-white/5 sm:px-24 xl:py-32"
        >
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-widest">
               <Sparkles className="h-3 w-3" /> System Intelligence
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
               Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 italic">Vanguard</span>
            </h2>
            
            <p className="text-slate-500 font-bold text-sm uppercase tracking-[0.2em] leading-relaxed">
               RECEIVE INTEL ON PORTFOLIO ARCHITECTURE, CAREER BRANDING PROTOCOLS, AND NEW THEME DEPLOYMENTS.
            </p>

            <form 
              onSubmit={handleSubscribe}
              className="mt-12 flex flex-col sm:flex-row max-w-lg mx-auto gap-4"
            >
              <div className="relative flex-auto group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-14 h-16 bg-white/5 border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all"
                  placeholder="IDENTITY@PROTOCOL.SYS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-16 px-10 bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-200 rounded-2xl shadow-2xl shadow-white/10 transition-all transform hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-3">INITIALIZE <Send className="h-4 w-4" /></span>
                )}
              </Button>
            </form>
            
            <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">
               PROTOCOL SECURED // 256-BIT ENCRYPTION ACTIVE
            </p>
          </div>
          
          {/* Subtle decoration */}
          <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-indigo-500/10 blur-[80px] rounded-full" />
          <div className="absolute -top-20 -right-20 h-64 w-64 bg-purple-500/10 blur-[80px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};
