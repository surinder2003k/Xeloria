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
          <div className="flex items-center gap-4 md:gap-10 text-[10px] font-bold uppercase tracking-[2px] text-slate-500">
            {pData.sectionsVisibility.hero && <a href="#hero" className="hover:text-cyan-400 transition-colors hidden sm:block">Home</a>}
            {pData.sectionsVisibility.skills && <a href="#skills" className="hover:text-cyan-400 transition-colors hidden sm:block">Skills</a>}
            {pData.sectionsVisibility.projects && <a href="#projects" className="hover:text-cyan-400 transition-colors hidden sm:block">Projects</a>}
            {pData.sectionsVisibility.experience && <a href="#experience" className="hover:text-cyan-400 transition-colors hidden sm:block">Experience</a>}
            <a href="#contact" className="hover:text-cyan-400 transition-colors px-4 py-2 border border-white/10 rounded-full bg-white/[0.02]">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {pData.sectionsVisibility.hero && (
        <section className="relative z-10 pt-44 pb-24 px-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 px-5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-bold text-[10px] uppercase tracking-[3px]"
            >
              Professional Portfolio // {data.personalInfo.jobTitle || "Creative Developer"}
            </motion.div>

            <motion.h1 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-10"
            >
              Crafting the <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]">Digital Frontier.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl max-w-3xl mb-16 leading-relaxed font-medium"
            >
              Specializing in the intersection of high-performance architecture and elegant user experiences. Building scalable solutions as a <span className="text-white border-b border-cyan-500/30">{data.personalInfo.jobTitle}</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6"
            >
               <a href="#projects" className="px-10 py-4 bg-white text-black font-bold text-xs uppercase tracking-[2px] rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                 Explore Work
               </a>
               <a href="#contact" className="px-10 py-4 border border-white/10 text-white font-bold text-xs uppercase tracking-[2px] rounded-full hover:border-violet-500 transition-all bg-white/[0.01]">
                 Get In Touch
               </a>
            </motion.div>
          </div>

          <div className="mt-32 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
             {[
               { icon: <Cpu className="w-5 h-5 text-cyan-400" />, label: "Solutions" },
               { icon: <Layers className="w-5 h-5 text-blue-400" />, label: "Architecture" },
               { icon: <Zap className="w-5 h-5 text-violet-400" />, label: "Performance" },
               { icon: <Atom className="w-5 h-5 text-white" />, label: "Innovation" },
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

      {/* Projects */}
      {sections.projects && projects.length > 0 && (
        <section id="projects" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
               <div className="space-y-4">
                  <div className="text-cyan-400 font-bold text-[10px] uppercase tracking-[4px]">Portfolio</div>
                  <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">Featured Projects.</h2>
               </div>
               <p className="text-slate-500 text-sm max-w-xs uppercase tracking-widest font-bold leading-relaxed border-l border-white/10 pl-6">
                  A curated selection of my most impactful work and technical explorations.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 border border-white/5 bg-white/[0.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all">
                       <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black">
                          <ExternalLink size={24} />
                       </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech: string) => (
                          <span key={tech} className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{tech}</span>
                        ))}
                     </div>
                     <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{project.name}</h3>
                     <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                     
                     {project.link && (
                        <a href={project.link} className="inline-flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-[2px] border-b border-white/10 pb-1 hover:border-cyan-500 transition-all">
                           View Details <ArrowUpRight size={14} />
                        </a>
                     )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {sections.experience && experiences.length > 0 && (
        <section id="experience" className="py-32 px-6">
           <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                 <div className="text-violet-400 font-bold text-[10px] uppercase tracking-[4px] mb-4">Experience</div>
                 <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Career Journey.</h2>
              </div>

              <div className="space-y-12">
                 {experiences.map((exp: any, i: number) => (
                   <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all"
                   >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                         <div className="space-y-2">
                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">{exp.position}</h3>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-[2px]">{exp.company}</div>
                         </div>
                         <p className="text-slate-400 text-sm md:text-base max-w-md leading-relaxed">{exp.description}</p>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* Skills */}
      {sections.skills && skills.length > 0 && (
        <section id="skills" className="py-32 px-6">
           <div className="max-w-6xl mx-auto space-y-24">
              <div className="text-center">
                 <div className="text-cyan-400 font-bold text-[10px] uppercase tracking-[4px] mb-4">Expertise</div>
                 <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Technical Stack.</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {skills.map((group: any, i: number) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:border-cyan-500/30 transition-all group"
                   >
                      <h3 className="text-xs font-bold text-cyan-400 tracking-[2px] uppercase mb-8 border-b border-white/5 pb-4 group-hover:text-white transition-colors">{group.category}</h3>
                      <div className="flex flex-wrap gap-3">
                         {group.items.map((skill: string, sid: number) => (
                           <span key={sid} className="px-5 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                             {skill}
                           </span>
                         ))}
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* Contact */}
      {sections.contact && (
        <section id="contact" className="py-48 px-6 text-center">
           <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-12"
           >
              <div className="inline-block px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] text-slate-500 font-bold text-[10px] uppercase tracking-[4px]">
                 Get In Touch
              </div>
              <h2 className="text-6xl md:text-[8rem] font-black text-white leading-[0.8] tracking-tighter uppercase">
                 Let&apos;s Build <br /> <span className="text-transparent border-y border-white/10 py-2 inline-block [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">Something New.</span>
              </h2>
              
              <div className="pt-12">
                 <a 
                   href={`mailto:${data.personalInfo.email}`}
                   className="text-2xl md:text-5xl font-black text-white hover:text-cyan-400 transition-colors underline underline-offset-[20px] decoration-white/10"
                 >
                   {data.personalInfo.email}
                 </a>
              </div>

              <div className="flex justify-center gap-12 pt-20">
                {pData?.socialLinks?.linkedin && <a href={pData.socialLinks.linkedin.startsWith('http') ? pData.socialLinks.linkedin : `https://${pData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={24} /></a>}
                {pData?.socialLinks?.github && <a href={pData.socialLinks.github.startsWith('http') ? pData.socialLinks.github : `https://${pData.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><Github size={24} /></a>}
                {pData?.socialLinks?.twitter && <a href={pData.socialLinks.twitter.startsWith('http') ? pData.socialLinks.twitter : `https://${pData.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><Twitter size={24} /></a>}
              </div>
           </motion.div>
           
           <div className="mt-48 flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-white/5 text-[10px] font-bold uppercase tracking-[4px] text-slate-600">
              <span>{data.personalInfo.fullName} © {new Date().getFullYear()}</span>
              <span>Built with Xeloria Studio</span>
    </div>
  );
};
