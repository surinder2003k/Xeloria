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
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="bg-[#030a03] min-h-screen text-[#b3ffb3] font-mono selection:bg-[#00ff41] selection:text-black scroll-smooth relative">
      {/* Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)]" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#030a03]/95 border-b border-[#00ff41]">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-black text-sm tracking-[3px] text-[#00ff41] uppercase drop-shadow-[0_0_10px_rgba(0,255,65,0.4)]">
            {username.toUpperCase()}<span className="animate-pulse">_</span>EXE
          </span>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-[2px] text-[#1a4d1a] uppercase">
            {pData.sectionsVisibility.hero && <a href="#hero" className="hover:text-[#00ff41] transition-all hover:drop-shadow-[0_0_5px_rgba(0,255,65,0.4)]">{"> home"}</a>}
            {pData.sectionsVisibility.experience && <a href="#experience" className="hover:text-[#00ff41] transition-all hover:drop-shadow-[0_0_5px_rgba(0,255,65,0.4)]">{"> exp"}</a>}
            {pData.sectionsVisibility.projects && <a href="#projects" className="hover:text-[#00ff41] transition-all hover:drop-shadow-[0_0_5px_rgba(0,255,65,0.4)]">{"> projects"}</a>}
            {pData.sectionsVisibility.contact && <a href="#contact" className="hover:text-[#00ff41] transition-all hover:drop-shadow-[0_0_5px_rgba(0,255,65,0.4)]">{"> contact"}</a>}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {pData.sectionsVisibility.hero && (
        <section id="hero" className="min-h-screen flex items-center pt-20 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto border border-[#00cc33] p-6 md:p-16 bg-black/50 relative">
             <div className="absolute top-[-1px] left-4 bg-[#030a03] px-2 text-[10px] text-[#00ff41] tracking-[2px]">
               {username.toUpperCase()}.system_init
             </div>
             
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#00ffff] mb-4 text-xs font-bold drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]">
               $ whoami
             </motion.div>
             
             <motion.h1 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="text-4xl md:text-8xl font-black text-[#00ff41] leading-[1.1] md:leading-none mb-6 drop-shadow-[0_0_15px_rgba(0,255,65,0.4)] tracking-tighter"
             >
               {data.personalInfo.fullName?.split(' ')[0]}<br />
               {data.personalInfo.fullName?.split(' ').slice(1).join(' ')}
             </motion.h1>

             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[#00ffff] mb-8 text-xs font-bold tracking-[2px] drop-shadow-[0_0_8px_rgba(0,255,255,0.4)] uppercase">
               {">> "}{data.personalInfo.jobTitle || "Cyber Architect"}
             </motion.div>

             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-[#6aaa6a] max-w-xl text-sm leading-relaxed mb-10 border-l-2 border-[#1a4d1a] pl-6 font-medium italic">
               {data.summary || "Infiltrating traditional workflows with advanced technological integration and clean code execution."}
               <span className="inline-block w-2 h-4 bg-[#00ff41] ml-2 animate-pulse align-middle" />
             </motion.p>

             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-4">
               <a href="#projects" className="px-8 py-3 bg-transparent border border-[#00ff41] text-[#00ff41] font-bold text-[10px] tracking-[2px] uppercase transition-all hover:bg-[#00ff41]/10 hover:shadow-[0_0_15px_rgba(0,255,65,0.3)]">
                 ./root_access
               </a>
               <a href="#contact" className="px-8 py-3 bg-transparent border border-[#00ffff] text-[#00ffff] font-bold text-[10px] tracking-[2px] uppercase transition-all hover:bg-[#00ffff]/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                 ./ping_host
               </a>
             </motion.div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="text-[#1a4d1a] text-[10px] tracking-[4px] uppercase mb-2">{"// "}log_01</p>
            <h2 className="text-2xl font-bold text-[#00ff41] tracking-[3px] uppercase drop-shadow-[0_0_8px_rgba(0,255,65,0.2)]">Core Profile</h2>
            <div className="h-px w-24 bg-gradient-to-r from-[#00ff41] to-transparent mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6 text-[#7acc7a] text-sm leading-relaxed">
              <p>{"// "} {data.summary || "System override initialized. Analyzing professional data points..."}</p>
              <div className="p-8 border border-[#0d3d0d] bg-black/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[8px] text-[#1a4d1a] uppercase font-bold">SYSTEM_INFO</div>
                {[
                  { k: "IDENTITY", v: data.personalInfo.fullName },
                  { k: "NODE_LOC", v: data.personalInfo.location || "REMOTE_NODE" },
                  { k: "PROTOCOL", v: data.personalInfo.jobTitle || "SECURE_ENGINEERING" },
                  { k: "STATUS", v: "AVAILABLE", color: "text-[#00ffff]" }
                ].map(row => (
                  <div key={row.k} className="flex justify-between py-3 border-b border-[#0d3d0d] last:border-0 text-[10px] tracking-[1px]">
                    <span className="text-[#1a4d1a] font-bold uppercase">{"> "}{row.k}</span>
                    <span className={row.color || "text-[#00ff41]"}>{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 border border-[#0d3d0d] bg-black/20 flex flex-col items-center justify-center text-center group hover:border-[#00ff41] transition-all">
                  <Terminal size={32} className="text-[#00ff41] mb-4 group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
                  <span className="text-[10px] font-bold text-[#1a4d1a] uppercase">Secure Shell</span>
               </div>
               <div className="p-6 border border-[#0d3d0d] bg-black/20 flex flex-col items-center justify-center text-center group hover:border-[#00ffff] transition-all">
                  <Shield size={32} className="text-[#00ffff] mb-4 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]" />
                  <span className="text-[10px] font-bold text-[#1a4d1a] uppercase">Data Integrity</span>
               </div>
               <div className="p-6 border border-[#0d3d0d] bg-black/20 flex flex-col items-center justify-center text-center group hover:border-pink-500 transition-all">
                  <Zap size={32} className="text-pink-500 mb-4 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                  <span className="text-[10px] font-bold text-[#1a4d1a] uppercase">High Latency</span>
               </div>
               <div className="p-6 border border-[#0d3d0d] bg-black/20 flex flex-col items-center justify-center text-center group hover:border-yellow-400 transition-all">
                  <Code size={32} className="text-yellow-400 mb-4 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                  <span className="text-[10px] font-bold text-[#1a4d1a] uppercase">Clean Export</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      {pData.sectionsVisibility.skills && data.skills.length > 0 && (
        <section id="skills" className="py-24 px-6 bg-[#050f05]">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-12">
              <p className="text-[#1a4d1a] text-[10px] tracking-[4px] uppercase mb-2">{"// "}capabilities_matrix</p>
              <h2 className="text-2xl font-bold text-[#00ff41] tracking-[3px] uppercase">Tech Stack</h2>
              <div className="h-px w-24 bg-[#00ff41] mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.skills.map((skillGroup, i) => (
                <motion.div 
                  key={skillGroup.category} 
                  {...fadeIn}
                  transition={{ delay: i * 0.05 }}
                  className="p-8 border border-[#0d3d0d] bg-black/30 group hover:border-[#00ff41] transition-all relative"
                >
                  <div className="text-[9px] text-[#1a4d1a] mb-4 font-bold select-none tracking-[2px]">
                    [CAT_NODE_{i.toString().padStart(2, '0')}] // {skillGroup.category.toUpperCase()}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map(skill => (
                      <span key={skill} className="text-[11px] font-bold uppercase tracking-widest text-[#7acc7a] group-hover:text-[#00ff41] border border-[#0d3d0d] px-2 py-1 bg-black/40">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#1a4d1a] group-hover:border-[#00ff41]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      {pData.sectionsVisibility.projects && data.projects.length > 0 && (
        <section id="projects" className="py-24 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-12">
              <p className="text-[#1a4d1a] text-[10px] tracking-[4px] uppercase mb-2">{"// "}deployment_logs</p>
              <h2 className="text-2xl font-bold text-[#00ff41] tracking-[3px] uppercase">Project Nodes</h2>
              <div className="h-px w-24 bg-[#00ff41] mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((proj, i) => (
                <motion.div 
                  key={i} 
                  {...fadeIn}
                  className="p-6 md:p-10 border border-[#0d3d0d] bg-black/40 group hover:border-[#00ffff] transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.5)]" />
                  <div className="text-[9px] tracking-[4px] text-[#1a4d1a] uppercase mb-4">NODE_{i.toString().padStart(2, '0')} // DEPLOYED</div>
                  <h3 className="text-xl font-bold text-[#00ff41] mb-6 tracking-wide group-hover:text-[#00ffff] transition-all uppercase">{proj.name}</h3>
                  <p className="text-sm text-[#5a8a5a] leading-relaxed mb-8 border-l-2 border-[#1a4d1a] pl-6 font-medium italic">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.technologies.map(tech => (
                      <span key={tech} className="text-[9px] px-3 py-1 bg-[#00ff41]/5 border border-[#00ff41]/20 text-[#00ff41] uppercase tracking-widest">{tech}</span>
                    ))}
                  </div>
                  {proj.link && (
                    <a href={proj.link} className="inline-flex items-center gap-3 text-[10px] font-bold text-[#00ffff] uppercase tracking-[2px] group-hover:translate-x-2 transition-all">
                      <span>./view_source</span> <ExternalLink size={14} />
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
        <section id="experience" className="py-24 px-6 bg-[#050f05]">
          <div className="max-w-[1400px] mx-auto">
             <div className="mb-12">
                <p className="text-[#1a4d1a] text-[10px] tracking-[4px] uppercase mb-2">{"// "}history.bash</p>
                <h2 className="text-2xl font-bold text-[#00ff41] tracking-[3px] uppercase">Career History</h2>
                <div className="h-px w-24 bg-[#00ff41] mt-4" />
             </div>

             <div className="border border-[#0d3d0d] bg-black relative">
               <div className="p-3 bg-[#0d3d0d] flex gap-2 items-center">
                 <div className="w-2 h-2 rounded-full bg-red-500" />
                 <div className="w-2 h-2 rounded-full bg-yellow-400" />
                 <div className="w-2 h-2 rounded-full bg-[#00ff41]" />
                 <span className="text-[8px] text-[#1a4d1a] uppercase font-bold ml-4">root@main_frame:~/work_logs</span>
               </div>
               <div className="p-8 space-y-12">
                 {data.experience.map((exp, i) => (
                   <motion.div key={i} {...fadeIn} className="relative pl-8 border-l border-[#1a4d1a]">
                      <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] bg-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,1)]" />
                      <div className="text-[10px] text-[#00ffff] mb-2 font-bold tracking-[2px]">
                        $ cat log_{i}.txt | {exp.startDate} - {exp.current ? "ACTIVE" : exp.endDate}
                      </div>
                      <h3 className="text-lg font-black text-[#00ff41] uppercase tracking-wide mb-1">{exp.position}</h3>
                      <div className="text-[10px] font-bold text-[#1a4d1a] uppercase mb-4 tracking-[3px]">{exp.company}</div>
                      <p className="text-sm text-[#7acc7a] leading-relaxed max-w-2xl font-medium">{exp.description}</p>
                   </motion.div>
                 ))}
               </div>
             </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {pData.sectionsVisibility.contact && (
        <section id="contact" className="py-40 px-6 text-center">
           <div className="max-w-2xl mx-auto border border-[#00ff41] p-6 md:p-12 bg-black/40 relative">
             <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 bg-[#030a03] px-4 text-[10px] text-[#00ff41] font-bold tracking-[4px] uppercase">
               Transmission_Start
             </div>
             <p className="text-[10px] text-[#1a4d1a] font-bold tracking-[2px] uppercase mb-12">{"$ "}echo "Send protocol request for collaboration"</p>
             <a 
               href={`mailto:${data.personalInfo.email}`} 
               className="text-lg md:text-5xl font-black text-[#00ff41] uppercase tracking-tighter block mb-12 hover:text-[#00ffff] hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all break-all"
             >
               {data.personalInfo.email}
             </a>
             <div className="flex justify-center gap-10 text-[10px] font-bold text-[#1a4d1a] tracking-[4px] uppercase border-t border-[#0d3d0d] pt-12">
                {pData.socialLinks.linkedin && <a href={pData.socialLinks.linkedin.startsWith('http') ? pData.socialLinks.linkedin : `https://${pData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#00ff41] transition-all">linkedin</a>}
                {pData.socialLinks.github && <a href={pData.socialLinks.github.startsWith('http') ? pData.socialLinks.github : `https://${pData.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#00ffff] transition-all">github</a>}
                {pData.socialLinks.twitter && <a href={pData.socialLinks.twitter.startsWith('http') ? pData.socialLinks.twitter : `https://${pData.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-all">twitter</a>}
             </div>
           </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#0d3d0d] text-[8px] font-bold text-[#1a4d1a] tracking-[4px] uppercase flex flex-col md:flex-row justify-between items-center gap-6">
        <span>{"// "}PROTOCOL: SUMMIT_PORTFOLIO_CYBERPUNK</span>
        <span>NODE_{username.toUpperCase()} © {new Date().getFullYear()}</span>
        <span>ACCESS: GRANTED</span>
      </footer>
    </div>
  );
};
