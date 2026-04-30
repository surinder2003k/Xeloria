"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Zap, Cpu, Orbit, Atom, Layers, Rocket } from "lucide-react";
import { ResumeData } from "@/lib/store";
import { PortfolioData } from "@/lib/portfolio-store";

export const PortfolioThemeNova = ({ 
  username, 
  data, 
  pData 
}: { 
  username: string; 
  data: ResumeData; 
  pData: PortfolioData; 
}) => {

  return (
    <div className="bg-[#020205] min-h-screen text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-white relative overflow-hidden">
      {/* Quantum Background */}
      <div className="fixed inset-0 z-0">
         <div className="absolute top-0 right-0 w-full h-[500px] bg-[radial-gradient(circle_at_70%_20%,rgba(6,182,212,0.15),transparent_70%)]" />
         <div className="absolute bottom-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_30%_80%,rgba(139,92,246,0.1),transparent_70%)]" />
         
         <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020205]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                <Orbit className="w-5 h-5 text-white animate-spin-slow" />
             </div>
             <span className="font-black text-xl tracking-[4px] text-white uppercase italic">NOVA.</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[3px] text-slate-500">
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Nodes</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Core</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Comms</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {pData.sectionsVisibility.hero && (
        <section className="relative z-10 pt-44 pb-24 px-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 px-5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-black text-[10px] uppercase tracking-[4px]"
            >
              Quantum Computing // Digital Architect
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-10"
            >
              Building the <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">Next Era.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-400 text-lg md:text-xl max-w-3xl mb-16 leading-relaxed font-medium"
            >
              Mastering the intersection of enterprise complexity and futuristic UI. Specialist in <span className="text-white border-b border-cyan-500/30">{data.personalInfo.jobTitle}</span> and scalable Oracle systems.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6"
            >
               <button className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-[3px] rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                 Initialize View
               </button>
               <button className="px-10 py-4 border border-white/10 text-white font-black text-xs uppercase tracking-[3px] rounded-full hover:border-violet-500 transition-all bg-white/[0.02]">
                 Request Protocol
               </button>
            </motion.div>
          </div>

          <div className="mt-32 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
             {[
               { icon: <Cpu className="w-5 h-5 text-cyan-400" />, label: "Processors" },
               { icon: <Layers className="w-5 h-5 text-blue-400" />, label: "Layers" },
               { icon: <Zap className="w-5 h-5 text-violet-400" />, label: "Execution" },
               { icon: <Atom className="w-5 h-5 text-white" />, label: "Core" },
             ].map((item, i) => (
               <div key={i} className="group p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-cyan-500/20 transition-all text-center">
                  <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div className="text-[10px] font-black uppercase tracking-[5px] text-slate-500">{item.label}</div>
                  <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-auto mt-4" />
               </div>
             ))}
          </div>
        </section>
      )}

      {/* Projects - Horizontal Nodes */}
      {pData.sectionsVisibility.projects && (
        <section id="projects" className="relative z-10 py-32 px-6">
           <div className="max-w-7xl mx-auto space-y-16">
              <header className="flex flex-col md:row justify-between items-end gap-6 border-l-4 border-cyan-500 pl-8">
                 <div>
                    <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Active_Nodes</h2>
                    <p className="text-slate-500 mt-2 font-bold tracking-widest text-xs uppercase opacity-60">System Overhaul Deployments //</p>
                 </div>
                 <div className="text-xs font-black text-cyan-400 tracking-[5px] uppercase">Scroll Through Matrix</div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.projects.map((proj, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 0.98 }}
                    className="group bg-[#05050a] border border-white/5 rounded-[4rem] p-12 overflow-hidden relative"
                  >
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-100 transition-opacity">
                      <Rocket className="w-12 h-12 text-cyan-500" />
                    </div>
                    <div className="space-y-8 relative z-10">
                       <span className="text-xs font-black text-slate-600 tracking-[4px]">NODE_DATA_0{i+1}</span>
                       <h3 className="text-3xl md:text-4xl font-black text-white uppercase leading-none">{proj.name}</h3>
                       <p className="text-slate-400 text-lg leading-relaxed max-w-sm font-medium italic">
                          "{proj.description}"
                       </p>
                       <div className="flex flex-wrap gap-3">
                          {proj.technologies.map(t => (
                            <span key={t} className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                               {t}
                            </span>
                          ))}
                       </div>
                    </div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full group-hover:bg-cyan-500/10 transition-all" />
                  </motion.div>
                ))}
              </div>
           </div>
        </section>
      )}

      {/* Experience - Quantum Timeline */}
      {pData.sectionsVisibility.experience && (
        <section id="experience" className="relative z-10 py-32 px-6">
           <div className="max-w-4xl mx-auto space-y-24">
              <h2 className="text-6xl font-black text-center text-white italic tracking-tighter uppercase underline decoration-cyan-500 decoration-8 underline-offset-12">Core_Memory.</h2>
              
              <div className="space-y-16">
                 {data.experience.map((exp, i) => (
                   <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="relative pl-12 md:pl-24 group"
                   >
                      <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-4 border-cyan-500 bg-black z-20" />
                      <div className="absolute left-[7px] top-4 bottom-[-4rem] w-0.5 bg-gradient-to-b from-cyan-500 to-transparent opacity-20" />
                      
                      <div className="space-y-6">
                        <div className="text-xs font-black text-violet-500 tracking-[4px] uppercase">{exp.startDate} - {exp.endDate}</div>
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none group-hover:text-cyan-400 transition-colors">{exp.position}</h3>
                        <div className="inline-block px-4 py-1.5 bg-white text-black font-black text-[10px] uppercase tracking-[3px] rounded-full">{exp.company}</div>
                        <p className="text-slate-500 text-lg leading-relaxed font-medium max-w-2xl border-l border-white/10 pl-8">
                           {exp.description}
                        </p>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* Footer / Connect */}
      <footer id="contact" className="relative z-10 pt-44 pb-12 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-slate-900 to-[#020205] border border-white/5 rounded-[5rem] p-12 md:p-24 text-center overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.5),transparent)]" />
           
           <div className="relative z-10 space-y-12">
              <h2 className="text-5xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.8]">Signal <br/> Now.</h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto italic">Awaiting high-priority packets. Transmitting at speed of light.</p>
              
              <a href={`mailto:${data.personalInfo.email}`}>
                 <button className="px-16 py-8 bg-cyan-500 text-black font-black text-2xl rounded-[3rem] hover:bg-white hover:scale-110 transition-all shadow-[0_0_60px_rgba(6,182,212,0.4)] uppercase">
                   Signal Peer
                 </button>
              </a>

               <div className="flex justify-center gap-10 pt-20">
                  {pData?.socialLinks?.github && (
                    <a href={pData.socialLinks.github.startsWith('http') ? pData.socialLinks.github : `https://${pData.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:border-cyan-500 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {pData?.socialLinks?.linkedin && (
                    <a href={pData.socialLinks.linkedin.startsWith('http') ? pData.socialLinks.linkedin : `https://${pData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:border-cyan-500 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {pData?.socialLinks?.twitter && (
                    <a href={pData.socialLinks.twitter.startsWith('http') ? pData.socialLinks.twitter : `https://${pData.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:border-cyan-500 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
               </div>
           </div>

           <div className="mt-32 flex flex-col md:row justify-between items-center gap-10 pt-10 border-t border-white/5 text-[10px] font-black uppercase tracking-[4px] text-slate-600">
              <span>Nova Quantum Protocol © 2024</span>
              <span>{data.personalInfo.fullName} // Digital Architect</span>
              <span className="italic">Standard Issue Portfolios</span>
           </div>
        </div>
      </footer>
    </div>
  );
};
