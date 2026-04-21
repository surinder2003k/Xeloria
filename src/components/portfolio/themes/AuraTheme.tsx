"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Sparkles, Wand2, Bird, Moon, Sun, Star } from "lucide-react";
import { ResumeData } from "@/lib/store";
import { PortfolioData } from "@/lib/portfolio-store";

export const PortfolioThemeAura = ({ 
  username, 
  data, 
  pData 
}: { 
  username: string; 
  data: ResumeData; 
  pData: PortfolioData; 
}) => {

  return (
    <div className="bg-[#0a0a1a] min-h-screen text-white font-sans selection:bg-indigo-500/30 selection:text-white relative overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full animate-[pulse_8s_infinite]" />
        <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full animate-[pulse_12s_infinite]" />
        
        {/* Animated stars/particles */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: Math.random(), scale: Math.random() }}
              animate={{ 
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{ 
                duration: 2 + Math.random() * 4, 
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%` 
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 px-8 h-16 flex items-center justify-between bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-indigo-500/10">
        <span className="font-extrabold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-sm">
          {data.personalInfo.fullName || username}.
        </span>
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-[3px] text-white/50 uppercase">
          <a href="#hero" className="hover:text-indigo-400 transition-colors">Surface</a>
          <a href="#work" className="hover:text-indigo-400 transition-colors">Manifestations</a>
          <a href="#journey" className="hover:text-indigo-400 transition-colors">Trajectory</a>
          <a href="#contact" className="px-5 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full hover:bg-indigo-500/40 transition-all text-white">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      {pData.sectionsVisibility.hero && (
        <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center pt-32 px-6">
          <div className="max-w-6xl mx-auto text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-full text-indigo-300 font-bold text-[10px] uppercase tracking-widest"
            >
              <Sparkles className="w-3 h-3 text-indigo-400" /> Currently Inhabiting {data.personalInfo.location || "Earth"}
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-[8rem] font-black tracking-tighter leading-[0.85] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 drop-shadow-2xl"
            >
              Digital <br /> Ether.
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed italic">
                "{data.summary || "I weave complex logic into seamless digital experiences, elevating the mundane into the extraordinary through code."}"
              </p>
              <div className="flex justify-center gap-6">
                 <div className="text-xs font-bold tracking-[3px] uppercase text-indigo-400 border-b border-indigo-400/30 pb-2">{data.personalInfo.jobTitle}</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-12"
            >
               <a href="#work" className="group relative inline-flex items-center justify-center p-0.5 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500">
                 <span className="relative px-12 py-5 transition-all ease-in duration-75 bg-[#0a0a1a] rounded-full group-hover:bg-opacity-0">
                    <span className="relative text-white font-bold text-sm tracking-[2px] uppercase">Reveal Work</span>
                 </span>
               </a>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
             <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>
      )}

      {/* Manifestations (Projects) */}
      {pData.sectionsVisibility.projects && (
        <section id="work" className="relative z-10 py-32 px-6">
          <div className="max-w-6xl mx-auto">
             <header className="mb-24 text-center">
                <p className="text-indigo-400 text-[10px] font-bold tracking-[6px] uppercase mb-4">Curation</p>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">Digital <br/>Manifestations.</h2>
             </header>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {data.projects.map((proj, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">
                       <Wand2 className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div className="space-y-6 relative z-10">
                       <h3 className="text-4xl font-black tracking-tighter uppercase leading-none group-hover:text-indigo-400 transition-colors">{proj.name}</h3>
                       <p className="text-white/50 text-lg leading-relaxed font-medium">
                          {proj.description}
                       </p>
                       <div className="flex flex-wrap gap-3 pt-4">
                          {proj.technologies.map(t => (
                            <span key={t} className="px-4 py-2 bg-indigo-500/5 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-300">
                               {t}
                            </span>
                          ))}
                       </div>
                       <div className="pt-10">
                          <a href={proj.link} className="flex items-center gap-3 text-xs font-bold tracking-[3px] uppercase group-hover:gap-6 transition-all">
                             Enter Project <div className="h-[1px] w-12 bg-white/20 group-hover:w-24 group-hover:bg-indigo-400 transition-all" />
                          </a>
                       </div>
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/20 transition-all" />
                  </motion.div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Trajectory (Experience) */}
      {pData.sectionsVisibility.experience && (
        <section id="journey" className="relative z-10 py-32 px-6 bg-white/[0.02] backdrop-blur-sm">
          <div className="max-w-4xl mx-auto space-y-24">
             <div className="text-center">
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4">Trajectory.</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
             </div>

             <div className="space-y-20 relative">
                <div className="absolute left-[34px] top-4 bottom-4 w-[1px] bg-white/10 hidden md:block" />
                
                {data.experience.map((exp, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex flex-col md:flex-row gap-12 relative"
                  >
                    <div className="w-16 h-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl relative z-10">
                       <Moon className="w-6 h-6 text-indigo-400 animate-pulse" />
                    </div>
                    <div className="space-y-4">
                       <div className="text-[10px] font-bold tracking-[4px] text-indigo-400 uppercase">{exp.startDate} — {exp.current ? "Ongoing" : exp.endDate}</div>
                       <h3 className="text-3xl font-black uppercase tracking-tight leading-none">{exp.position}</h3>
                       <p className="text-white/40 font-bold uppercase tracking-widest text-sm">{exp.company}</p>
                       <p className="text-white/60 leading-relaxed max-w-2xl italic">
                          "{exp.description}"
                       </p>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <footer id="contact" className="relative z-10 py-44 px-6 text-center border-t border-white/5 bg-[#0a0a1a]">
        <div className="max-w-5xl mx-auto space-y-16">
           <p className="text-white/30 text-[10px] font-bold tracking-[8px] uppercase">Initialize Connection</p>
           
           <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block"
           >
              <a 
                href={`mailto:${data.personalInfo.email}`} 
                className="text-4xl md:text-7xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white/40 hover:from-indigo-400 hover:to-purple-400 transition-all"
              >
                {data.personalInfo.email?.toLowerCase()}
              </a>
           </motion.div>

           <div className="flex justify-center gap-16 pt-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <Github className="w-6 h-6" />
              <Linkedin className="w-6 h-6" />
              <Twitter className="w-6 h-6" />
           </div>

           <div className="pt-32 flex flex-col md:row justify-between items-center gap-8 text-[10px] uppercase tracking-[4px] font-bold text-white/20">
              <span>{data.personalInfo.fullName} // © {new Date().getFullYear()}</span>
              <span className="animate-pulse text-indigo-500/50 italic font-black">Aura Protocol v3.0</span>
              <span className="italic">Powered by Xeloria</span>
           </div>
        </div>
      </footer>
    </div>
  );
};
