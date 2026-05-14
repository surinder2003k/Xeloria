"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Globe, Layers, Share2, Sparkles } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#030303] pt-32 pb-40 sm:pt-40 sm:pb-52 noise-bg">
      {/* Background Elements - Optimized */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/5 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-10">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/5 border border-indigo-500/10 text-indigo-400/80 text-[11px] font-semibold tracking-wide"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Join 10,000+ creators building their legacy
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Create a portfolio that <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">tells your story.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-base md:text-xl text-slate-400 max-w-2xl mx-auto font-medium"
          >
            Move beyond static resumes. Build a high-performance personal brand that captures your journey and showcases your best work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-10 rounded-xl bg-white text-black hover:bg-slate-100 font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                Get Started for Free
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="ghost" size="lg" className="h-14 px-10 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 font-bold text-sm">
                View Templates
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Core Value Props */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              icon: Globe,
              title: "Global Reach",
              desc: "Deploy your portfolio to a custom domain with lightning-fast performance worldwide.",
              color: "indigo"
            },
            {
              icon: Layers,
              title: "Studio Design",
              desc: "Choose from hand-crafted themes designed by industry professionals for maximum impact.",
              color: "purple"
            },
            {
              icon: Share2,
              title: "Smart Sharing",
              desc: "Share your journey with optimized social previews and analytics to track your growth.",
              color: "pink"
            },
          ].map((f, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
            >
              <div className={`h-12 w-12 flex items-center justify-center rounded-xl bg-${f.color}-500/10 text-${f.color}-400 mb-6 group-hover:scale-110 transition-transform`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
