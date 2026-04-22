import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone, MapPin, Send, ShieldCheck, Terminal, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>

      <main className="pt-40 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div className="space-y-12">
                <div className="space-y-8">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
                      <Terminal className="h-3 w-3" /> Communication Protocol
                   </div>
                   <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] uppercase italic">Open <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Channels.</span></h1>
                   <p className="text-sm md:text-lg text-slate-500 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-lg">
                      HAVE QUESTIONS ABOUT XELORIA SYNTHESIS? OUR CORE UNIT IS READY TO FACILITATE YOUR TRANSITION.
                   </p>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center gap-8 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 group hover:border-indigo-500/30 transition-all backdrop-blur-3xl relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 h-32 w-32 bg-indigo-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="h-16 w-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-2xl relative z-10">
                         <Mail className="h-8 w-8" />
                      </div>
                      <div className="relative z-10">
                         <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Primary Uplink</p>
                         <p className="text-xl font-black text-white uppercase italic tracking-tight">SUPPORT@XELORIA.IO</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-8 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 group hover:border-purple-500/30 transition-all backdrop-blur-3xl relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 h-32 w-32 bg-purple-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="h-16 w-16 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-2xl relative z-10">
                         <MessageSquare className="h-8 w-8" />
                      </div>
                      <div className="relative z-10">
                         <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Neural Chat</p>
                         <p className="text-xl font-black text-white uppercase italic tracking-tight">AVAILABLE 24/7 // GLOBAL</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[4rem] p-12 md:p-20 shadow-2xl border border-white/10 space-y-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -mr-32 -mt-32" />
                <div className="space-y-4 relative">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      <ShieldCheck className="h-3 w-3 text-emerald-500" /> Secure Transmission
                   </div>
                   <h2 className="text-4xl font-black text-white tracking-tight uppercase italic">Initiate <span className="text-indigo-500">Signal</span></h2>
                </div>
                
                <div className="space-y-8 relative">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Identity Label</label>
                         <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-[11px] font-black text-white focus:outline-none focus:border-indigo-500 transition-all uppercase tracking-widest placeholder:text-slate-800" placeholder="JOHN DOE" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Return Protocol</label>
                         <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-[11px] font-black text-white focus:outline-none focus:border-indigo-500 transition-all uppercase tracking-widest placeholder:text-slate-800" placeholder="NAME@DOMAIN.COM" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Encrypted Payload</label>
                      <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 text-[11px] font-black text-white focus:outline-none focus:border-indigo-500 transition-all resize-none uppercase tracking-widest leading-relaxed placeholder:text-slate-800" placeholder="DESCRIBE YOUR QUERY OR PROTOCOL ERROR..."></textarea>
                   </div>
                   <Button className="w-full rounded-2xl bg-white text-black hover:bg-slate-200 h-20 font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-white/10 transition-all hover:scale-105 active:scale-95 group">
                      Transmit Data <Send className="ml-4 h-5 w-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                   </Button>
                </div>
                
                <div className="flex items-center justify-center gap-3">
                   <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
                   <span className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em]">Subspace connection active // all systems nominal</span>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
