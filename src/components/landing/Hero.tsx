"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Layers, Share2, Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#050505] pt-32 pb-40 sm:pt-40 sm:pb-52">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-indigo-600/10 blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, -45, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-600/10 blur-[120px]"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-indigo-500/20"
          >
            <Activity className="h-4 w-4 animate-pulse" />
            System Broadcast Active // v2.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tight text-white leading-[0.95] uppercase"
          >
            Architect Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 italic">Professional DNA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-sm md:text-lg leading-relaxed text-slate-500 max-w-2xl mx-auto font-bold uppercase tracking-[0.2em]"
          >
            Xeloria synchronizes your narrative into a high-performance portfolio node. Deploy your legacy across the digital spectrum in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-black hover:bg-slate-200 text-xs h-16 px-12 rounded-2xl shadow-2xl shadow-white/10 font-black uppercase tracking-widest gap-3 transition-all hover:scale-105">
                Initialize Synthesis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/templates" className="text-[10px] font-black leading-6 text-slate-400 uppercase tracking-widest flex items-center gap-3 hover:text-white transition-all group px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 shadow-2xl">
              <Layers className="h-4 w-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
              Design Architectures
            </Link>
          </motion.div>
        </div>

        {/* Feature Badges with 3D Tilt feel */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              icon: Globe,
              title: "EDGE BROADCAST",
              desc: "Instant node deployment with global low-latency synchronization.",
              color: "text-indigo-400",
              bgColor: "bg-indigo-500/10",
              borderColor: "border-indigo-500/20"
            },
            {
              icon: Sparkles,
              title: "PREMIUM SYNTHESIS",
              desc: "High-fidelity design systems architected for maximum impact.",
              color: "text-purple-400",
              bgColor: "bg-purple-500/10",
              borderColor: "border-purple-500/20"
            },
            {
              icon: Share2,
              title: "NEXUS PROTOCOL",
              desc: "Seamless narrative transmission across all social architectures.",
              color: "text-pink-400",
              bgColor: "bg-pink-500/10",
              borderColor: "border-pink-500/20"
            },
          ].map((f, i) => (
            <div
              key={i}
              className={`group flex flex-col items-center p-10 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-700 relative overflow-hidden`}
            >
              <div className={`absolute -top-10 -right-10 h-32 w-32 ${f.bgColor} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className={`h-16 w-16 flex items-center justify-center rounded-2xl ${f.bgColor} ${f.color} mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all border ${f.borderColor} shadow-2xl shadow-black/50`}>
                <f.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{f.title}</h3>
              <p className="mt-4 text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">{f.desc}</p>
              
              <div className="absolute bottom-6 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="h-1 w-8 bg-indigo-500 rounded-full" />
                 <div className="h-1 w-2 bg-indigo-500/30 rounded-full" />
                 <div className="h-1 w-2 bg-indigo-500/30 rounded-full" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
