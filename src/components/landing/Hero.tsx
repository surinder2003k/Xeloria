"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Layers, Share2, Sparkles } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#020817] pt-24 pb-32 sm:pt-32 sm:pb-40">
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.3, 0.5, 0.3],
             rotate: [0, 90, 0]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-indigo-600/20 blur-[120px]"
         />
         <motion.div 
           animate={{ 
             scale: [1, 1.5, 1],
             opacity: [0.2, 0.4, 0.2],
             rotate: [0, -90, 0]
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-violet-600/20 blur-[120px]"
         />
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#020817_100%)]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.05]"
          >
            Build Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Professional Portfolio</span>
              <span className="absolute -bottom-2 left-0 right-0 h-4 bg-indigo-600/20 blur-xl -z-0" />
            </span>
            <br className="hidden lg:block" />
            <span className="text-slate-300"> That Gets You Hired</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-slate-400 max-w-2xl mx-auto font-medium"
          >
            Xeloria gives you a stunning, hosted personal site in minutes. Enter your profile, choose a theme, and share your live link — no code needed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-indigo-950 hover:bg-slate-100 text-base h-14 px-8 rounded-full shadow-[0_0_40px_rgba(79,70,229,0.3)] font-black gap-2 transition-transform hover:scale-105">
                Create Your Portfolio <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/templates" className="text-sm font-bold leading-6 text-slate-300 flex items-center gap-2 hover:text-white transition-colors group px-6 py-4 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10">
              <Layers className="h-4 w-4 group-hover:text-indigo-400" />
              Browse Themes
            </Link>
          </motion.div>
        </div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              icon: Globe,
              title: "Instant Live Hosting",
              desc: "Your portfolio is live at a unique link the moment you finish — no deployment needed.",
              color: "bg-indigo-600",
            },
            {
              icon: Sparkles,
              title: "Professional Themes",
              desc: "Choose from premium, hand-crafted portfolio themes designed to impress.",
              color: "bg-violet-600",
            },
            {
              icon: Share2,
              title: "One-Tap Sharing",
              desc: "Share your live portfolio link via WhatsApp, LinkedIn, or any platform instantly.",
              color: "bg-sky-600",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="group flex flex-col items-center p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500"
            >
              <div className={`h-14 w-14 flex items-center justify-center rounded-2xl ${f.color} text-white mb-6 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.1)]`}>
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-white relative z-10">{f.title}</h3>
              <p className="mt-3 text-center text-slate-400 text-sm leading-relaxed relative z-10">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
