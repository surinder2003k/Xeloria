"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink, Briefcase, GraduationCap, Terminal, Shield, Zap, Code } from "lucide-react";
import { ResumeData } from "@/lib/store";
import { PortfolioData } from "@/lib/portfolio-store";

export const PortfolioThemeCyberpunk = ({ 
  username, 
  data, 
  pData 
}: { 
  username: string; 
  data: ResumeData; 
  pData: PortfolioData; 
}) => {
  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4 }
  };

  return (
    <div className="bg-[#020402] min-h-screen text-[#a0e0a0] font-mono selection:bg-[#00ff41] selection:text-black scroll-smooth relative">
      {/* Subtle Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)] opacity-30" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#020402]/90 backdrop-blur-md border-b border-[#00ff41]/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xs tracking-widest text-[#00ff41] uppercase">
            {username.toLowerCase()}<span className="animate-pulse">_</span>
          </span>
          <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            {pData.sectionsVisibility.hero && <a href="#hero" className="hover:text-[#00ff41] transition-colors hidden sm:block">Home</a>}
            {pData.sectionsVisibility.experience && <a href="#experience" className="hover:text-[#00ff41] transition-colors hidden sm:block">Experience</a>}
            {pData.sectionsVisibility.skills && <a href="#skills" className="hover:text-[#00ff41] transition-colors hidden sm:block">Skills</a>}
            {pData.sectionsVisibility.projects && <a href="#projects" className="hover:text-[#00ff41] transition-colors hidden sm:block">Projects</a>}
            <a href="#contact" className="hover:text-[#00ff41] transition-colors px-3 py-1 border border-[#00ff41]/30 hover:border-[#00ff41]">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {pData.sectionsVisibility.hero && (
        <section id="hero" className="min-h-screen flex items-center pt-20 px-6 relative">
          <div className="max-w-5xl mx-auto w-full">
             <div className="inline-block px-3 py-1 bg-[#00ff41]/10 border border-[#00ff41]/20 text-[10px] text-[#00ff41] tracking-widest uppercase mb-8 rounded-sm">
               Developer Profile
             </div>
             
             <motion.h1 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className="text-5xl md:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tighter"
             >
               {data.personalInfo.fullName?.split(' ')[0]}<br />
               <span className="text-[#00ff41]">{data.personalInfo.fullName?.split(' ').slice(1).join(' ')}</span>
             </motion.h1>

             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-cyan-400 mb-8 text-sm font-bold tracking-widest uppercase">
               {data.personalInfo.jobTitle || "Full Stack Developer"}
             </motion.div>

             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-slate-400 max-w-2xl text-lg leading-relaxed mb-12 border-l border-slate-800 pl-8 italic">
                {data.summary || "Focused on building elegant solutions to complex problems through clean, performance-optimized code."}
                <span className="inline-block w-2 h-5 bg-[#00ff41] ml-3 animate-pulse align-middle" />
             </motion.p>

             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-6">
               <a href="#projects" className="px-8 py-4 bg-[#00ff41] text-black font-bold text-xs tracking-widest uppercase transition-all hover:bg-[#00cc33] rounded-sm">
                 View Projects
               </a>
               <a href="#contact" className="px-8 py-4 bg-transparent border border-slate-700 text-white font-bold text-xs tracking-widest uppercase transition-all hover:border-[#00ff41] hover:text-[#00ff41] rounded-sm">
                 Get In Touch
               </a>
             </motion.div>
          </div>
        </section>
      )}

      {/* About Section */}
      {pData.sectionsVisibility.hero && (
        <section id="about" className="py-32 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-slate-600 text-[10px] tracking-widest uppercase mb-3">About Me</p>
            <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Core Expertise</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8 text-slate-400 text-lg leading-relaxed">
              <p>{data.summary || "Exploring the intersection of design and technology to create meaningful digital experiences."}</p>
              <div className="p-8 border border-slate-800 bg-white/[0.02] rounded-xl">
                {[
                  { k: "Name", v: data.personalInfo.fullName },
                  { k: "Location", v: data.personalInfo.location || "Available Worldwide" },
                  { k: "Role", v: data.personalInfo.jobTitle || "Developer" },
                  { k: "Status", v: "Open to Collaborate", color: "text-cyan-400" }
                ].map(row => (
                  <div key={row.k} className="flex justify-between py-4 border-b border-slate-900 last:border-0 text-sm">
                    <span className="text-slate-600 font-bold uppercase tracking-wider">{row.k}</span>
                    <span className={row.color || "text-slate-200"}>{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               {[
                 { icon: Terminal, label: "Development", color: "text-[#00ff41]" },
                 { icon: Shield, label: "Security", color: "text-cyan-400" },
                 { icon: Zap, label: "Performance", color: "text-pink-500" },
                 { icon: Code, label: "Quality", color: "text-yellow-400" }
               ].map((item, i) => (
                 <div key={i} className="p-8 border border-slate-800 bg-white/[0.01] flex flex-col items-center justify-center text-center group hover:border-[#00ff41]/30 transition-all rounded-xl">
                    <item.icon size={32} className={`mb-4 transition-transform group-hover:scale-110 ${item.color}`} />
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Skills Matrix */}
      {pData.sectionsVisibility.skills && data.skills.length > 0 && (
        <section id="skills" className="py-32 px-6 bg-white/[0.01] border-y border-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-slate-600 text-[10px] tracking-widest uppercase mb-3">Expertise</p>
              <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Technical Stack</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.skills.map((skillGroup, i) => (
                <motion.div 
                  key={skillGroup.category} 
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 border border-slate-800 bg-white/[0.01] group hover:border-[#00ff41]/20 transition-all rounded-2xl relative overflow-hidden"
                >
                  <div className="text-[10px] text-slate-600 mb-6 font-bold tracking-widest uppercase">
                    {skillGroup.category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map(skill => (
                      <span key={skill} className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#00ff41] border border-slate-800 px-3 py-1.5 bg-black/40 rounded-md transition-colors">
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

      {/* Projects Grid */}
      {pData.sectionsVisibility.projects && data.projects.length > 0 && (
        <section id="projects" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-slate-600 text-[10px] tracking-widest uppercase mb-3">Portfolio</p>
              <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Selected Projects</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.projects.map((proj, i) => (
                <motion.div 
                  key={i} 
                  {...fadeIn}
                  className="p-8 md:p-12 border border-slate-800 bg-white/[0.01] group hover:border-cyan-500/20 transition-all rounded-3xl relative overflow-hidden"
                >
                  <div className="text-[10px] tracking-widest text-slate-600 uppercase mb-6">Featured Project</div>
                  <h3 className="text-2xl font-bold text-white mb-6 tracking-tight group-hover:text-[#00ff41] transition-all">{proj.name}</h3>
                  <p className="text-lg text-slate-500 leading-relaxed mb-10 border-l border-slate-800 pl-8">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {proj.technologies.map(tech => (
                      <span key={tech} className="text-[10px] px-3 py-1 bg-white/[0.03] border border-slate-800 text-slate-400 uppercase tracking-widest rounded-md">{tech}</span>
                    ))}
                  </div>
                  {proj.link && (
                    <a href={proj.link} className="inline-flex items-center gap-3 text-xs font-bold text-cyan-400 uppercase tracking-widest group-hover:translate-x-2 transition-all">
                      <span>View Source</span> <ExternalLink size={16} />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {pData.sectionsVisibility.experience && data.experience.length > 0 && (
        <section id="experience" className="py-32 px-6 bg-white/[0.01] border-t border-slate-900">
          <div className="max-w-7xl mx-auto">
             <div className="mb-16">
                <p className="text-slate-600 text-[10px] tracking-widest uppercase mb-3">Journey</p>
                <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Professional History</h2>
             </div>

             <div className="border border-slate-800 bg-[#020402] rounded-3xl overflow-hidden">
               <div className="p-4 bg-slate-900/50 flex gap-2 items-center border-b border-slate-800">
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                 <span className="text-[10px] text-slate-500 uppercase font-bold ml-4 tracking-widest">Work History</span>
               </div>
               <div className="p-10 md:p-16 space-y-16">
                 {data.experience.map((exp, i) => (
                   <motion.div key={i} {...fadeIn} className="relative pl-12 border-l border-slate-800">
                      <div className="absolute top-0 left-[-6px] w-3 h-3 bg-[#00ff41] rounded-full shadow-[0_0_15px_rgba(0,255,65,0.5)]" />
                      <div className="text-xs text-cyan-400 mb-4 font-bold tracking-widest uppercase">
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{exp.position}</h3>
                      <div className="text-sm font-bold text-slate-500 uppercase mb-6 tracking-widest">{exp.company}</div>
                      <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">{exp.description}</p>
                   </motion.div>
                 ))}
               </div>
             </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {pData.sectionsVisibility.contact && (
        <section id="contact" className="py-48 px-6 text-center">
           <div className="max-w-3xl mx-auto border border-slate-800 p-12 md:p-20 bg-white/[0.01] relative rounded-3xl">
             <p className="text-slate-600 text-[10px] font-bold tracking-widest uppercase mb-12">Connect</p>
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 tracking-tight uppercase leading-tight">Let&apos;s build something<br/><span className="text-[#00ff41]">exceptional</span></h2>
             <a 
               href={`mailto:${data.personalInfo.email}`} 
               className="text-xl md:text-4xl font-bold text-[#00ff41] block mb-16 hover:text-white transition-all break-all tracking-tighter underline underline-offset-8 decoration-[#00ff41]/30"
             >
               {data.personalInfo.email}
             </a>
             <div className="flex justify-center gap-12 text-[10px] font-bold text-slate-600 tracking-widest uppercase pt-12 border-t border-slate-900">
                {pData.socialLinks.linkedin && <a href={pData.socialLinks.linkedin.startsWith('http') ? pData.socialLinks.linkedin : `https://${pData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all">linkedin</a>}
                {pData.socialLinks.github && <a href={pData.socialLinks.github.startsWith('http') ? pData.socialLinks.github : `https://${pData.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all">github</a>}
                {pData.socialLinks.twitter && <a href={pData.socialLinks.twitter.startsWith('http') ? pData.socialLinks.twitter : `https://${pData.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all">twitter</a>}
             </div>
           </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-slate-900 text-[10px] font-bold text-slate-700 tracking-widest uppercase flex flex-col md:flex-row justify-between items-center gap-8">
        <span>Built with Xeloria Studio</span>
        <span>{username.toLowerCase()} © {new Date().getFullYear()}</span>
        <span>All Rights Reserved</span>
      </footer>
    </div>
  );
};
