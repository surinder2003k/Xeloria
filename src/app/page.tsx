"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/landing/Navbar";
import { Github, Twitter, Linkedin, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Hero = dynamic(() => import("@/components/landing/Hero").then(m => ({ default: m.Hero })), { ssr: false });
const Subscription = dynamic(() => import("@/components/landing/Subscription").then(m => ({ default: m.Subscription })), { ssr: false });

const TiltCard = ({ children, idx }: { children: React.ReactNode, idx: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="custom-reveal bg-white/[0.03] backdrop-blur-2xl p-12 rounded-[3.5rem] border border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.05] transition-all group shadow-2xl relative overflow-hidden"
    >
      <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
    
    <div className="container mx-auto px-6 lg:px-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-16 border-b border-white/5">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black group-hover:scale-110 group-hover:rotate-6 transition-all shadow-xl shadow-indigo-600/20">X</div>
            <span className="text-3xl font-black tracking-tighter uppercase italic">XEL<span className="text-indigo-500">ORIA</span></span>
          </Link>
          <p className="text-slate-500 max-w-sm text-sm font-bold uppercase tracking-widest leading-relaxed">
            THE ARCHITECTURAL SYNTHESIS FOR PROFESSIONAL NARRATIVES. BROADCAST YOUR LEGACY IN HIGH DEFINITION.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-slate-600 hover:text-indigo-400 transition-all transform hover:scale-110">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-slate-600 hover:text-indigo-400 transition-all transform hover:scale-110">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-slate-600 hover:text-indigo-400 transition-all transform hover:scale-110">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
        
        <div>
          <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Asset Core</h3>
          <ul className="space-y-4">
            <li><Link href="/templates" className="text-slate-500 hover:text-indigo-400 text-xs font-black uppercase tracking-widest transition-colors">Design Systems</Link></li>
            <li><Link href="/blog" className="text-slate-500 hover:text-indigo-400 text-xs font-black uppercase tracking-widest transition-colors">Intel Feed</Link></li>
            <li><Link href="/dashboard" className="text-slate-500 hover:text-indigo-400 text-xs font-black uppercase tracking-widest transition-colors">Command Center</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8">Nexus</h3>
          <ul className="space-y-4">
            <li><Link href="/privacy" className="text-slate-500 hover:text-indigo-400 text-xs font-black uppercase tracking-widest transition-colors">Protocol</Link></li>
            <li><Link href="/terms" className="text-slate-500 hover:text-indigo-400 text-xs font-black uppercase tracking-widest transition-colors">Terms</Link></li>
            <li><Link href="/contact" className="text-slate-500 hover:text-indigo-400 text-xs font-black uppercase tracking-widest transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-slate-700 text-[10px] font-black uppercase tracking-[0.3em] gap-4">
        <p>© {new Date().getFullYear()} XELORIA AI // ALL SYSTEMS OPERATIONAL</p>
        <p>REFINING HUMAN POTENTIAL AT SCALE</p>
      </div>
    </div>
  </footer>
);

export default function Home() {
  const contentRef = useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white overflow-hidden pt-16">
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        </div>

        <Navbar />
        <main className="flex-grow relative z-10">
        <Hero />

        {/* Features Section */}
        <section id="features" className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center mb-24 space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 text-indigo-400 bg-indigo-500/10 px-6 py-2 rounded-full border border-indigo-500/20 text-[10px] font-black uppercase tracking-[0.3em]"
              >
                <Sparkles className="h-4 w-4" />
                Why Xeloria Synthesis
              </motion.div>
              <h2 className="text-6xl md:text-7xl font-black tracking-tight leading-none uppercase">
                Everything you need <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 italic">to stand out</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-sm font-bold uppercase tracking-widest leading-relaxed">
                FROM BUILDING YOUR PROFILE TO SHARING YOUR LIVE SITE — IT'S ALL HERE, ARCHITECTED FOR PEAK PERFORMANCE.
              </p>
            </div>

            <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  step: "01",
                  title: "Synthesis Input",
                  desc: "AGGREGATE YOUR EXPERIENCE, PROJECTS, AND SKILLS INTO OUR HIGH-PRECISION DATA ENGINE.",
                },
                {
                  step: "02",
                  title: "Theme Mapping",
                  desc: "SELECT FROM ELITE DESIGN ARCHITECTURES — ONE CLICK TO DEPLOY YOUR PROFESSIONAL DNA.",
                },
                {
                  step: "03",
                  title: "Global Broadcast",
                  desc: "YOUR ASSET IS INSTANTLY LIVE. TRANSMIT YOUR NARRATIVE TO THE ENTIRE DIGITAL SPECTRUM.",
                },
              ].map((item, idx) => (
                <TiltCard key={item.step} idx={idx}>
                  <div className="text-7xl font-black text-white/5 group-hover:text-indigo-500/20 transition-all duration-700 mb-6 leading-none absolute -top-4 -right-4 italic" style={{ transform: "translateZ(50px)" }}>{item.step}</div>
                  <div className="h-14 w-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 border border-indigo-500/10 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-xl shadow-indigo-500/10" style={{ transform: "translateZ(60px)" }}>
                    {idx === 0 ? <Github className="h-7 w-7" /> : idx === 1 ? <Linkedin className="h-7 w-7" /> : <Twitter className="h-7 w-7" />}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-indigo-400 transition-colors" style={{ transform: "translateZ(80px)" }}>{item.title}</h3>
                  <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed" style={{ transform: "translateZ(40px)" }}>{item.desc}</p>
                  
                  <div className="mt-8 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ transform: "translateZ(30px)" }}>
                     <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">Initialize Module <ArrowRight className="h-3 w-3" /></span>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <Subscription />
        </main>
        <Footer />
        
        <style jsx global>{`
          body {
            background-color: #050505;
          }
        `}</style>
    </div>
  );
}
