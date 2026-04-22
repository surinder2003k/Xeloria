import { Navbar } from "@/components/landing/Navbar";
import { Sparkles, Target, Users, Zap, Terminal, ShieldCheck, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>

      <main className="pt-40 pb-32 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <header className="text-center mb-32 space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
               <Terminal className="h-3 w-3" /> System Manifest
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight uppercase leading-none">
               The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 italic">Vision</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
              XELORIA WAS ARCHITECTED TO SOLVE A FUNDAMENTAL FLAW: THE TRADITIONAL RESUME IS OBSOLETE. WE BUILD DYNAMIC NARRATIVES.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
             <div className="bg-white/[0.02] backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/5 space-y-8 hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 h-32 w-32 bg-indigo-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-14 w-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-2xl">
                   <Target className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-black uppercase italic tracking-tight">The Objective</h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] leading-relaxed">
                   EVERY PROFESSIONAL DESERVES A STRATEGIC HUB ON THE INTERNET. A PLACE THAT ISN'T JUST A LIST OF BULLETS, BUT A HIGH-FIDELITY SYNTHESIS OF THEIR ACHIEVEMENTS.
                </p>
             </div>
             <div className="bg-white/[0.02] backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/5 space-y-8 hover:border-purple-500/30 transition-all group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 h-32 w-32 bg-purple-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-14 w-14 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-2xl">
                   <Zap className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-black uppercase italic tracking-tight">The Tech Stack</h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] leading-relaxed">
                   BY LEVERAGING AI SYNTHESIS AND MODERN ARCHITECTURAL DESIGN SYSTEMS, WE ALLOW ANYONE TO DEPLOY A WORLD-CLASS ASSET IN MINUTES, NOT DAYS.
                </p>
             </div>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[4rem] p-16 md:p-28 border border-white/5 text-center space-y-12 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
             <div className="space-y-6 relative">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-slate-500 text-[10px] font-black uppercase tracking-widest mx-auto">
                   <ShieldCheck className="h-3 w-3 text-emerald-500" /> Operational Status
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">Built for the <br /><span className="text-indigo-500 italic">future of work.</span></h2>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
                   WHETHER YOU'RE A SOFTWARE ARCHITECT, DESIGNER, OR STRATEGIST, XELORIA IS ENGINEERED TO OPTIMIZE YOUR VISIBILITY IN THE DIGITAL LANDSCAPE.
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10 border-t border-white/5">
                <div className="text-center group">
                   <div className="text-5xl font-black text-white group-hover:text-indigo-500 transition-colors italic">10K+</div>
                   <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mt-3">Active Nodes</div>
                </div>
                <div className="text-center group">
                   <div className="text-5xl font-black text-white group-hover:text-purple-500 transition-colors italic">50+</div>
                   <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mt-3">Geosync Sectors</div>
                </div>
                <div className="text-center group">
                   <div className="text-5xl font-black text-white group-hover:text-pink-500 transition-colors italic">100+</div>
                   <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mt-3">Design Systems</div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
