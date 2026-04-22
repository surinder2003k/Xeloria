"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink, Briefcase, GraduationCap, Phone, MapPin, Zap, Shield, Code, Cpu } from "lucide-react";
import { ResumeData } from "@/lib/store";
import { PortfolioData } from "@/lib/portfolio-store";

export const PortfolioThemeGlass = ({ 
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
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-[#020817] min-h-screen text-[#e2e8f0] font-sans selection:bg-[#3b82f6] selection:text-white scroll-smooth relative overflow-x-hidden">
      {/* Ambient Grid & Orbs */}
      <div className="fixed inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-50" />
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#3b82f6] rounded-full blur-[150px] opacity-15 pointer-events-none mix-blend-screen" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#8b5cf6] rounded-full blur-[150px] opacity-15 pointer-events-none mix-blend-screen" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#10b981] rounded-full blur-[150px] opacity-[0.07] pointer-events-none mix-blend-screen" />

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-4 md:gap-10 px-6 md:px-8 py-3 bg-[#020817]/70 border border-white/10 rounded-full backdrop-blur-xl">
          <span className="font-bold text-sm bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">
            {username.toUpperCase()}
          </span>
          <div className="hidden md:flex items-center gap-6 text-[10px] font-bold tracking-[2px] text-[#64748b] uppercase">
            {pData.sectionsVisibility.hero && <a href="#hero" className="hover:text-white transition-colors">Start</a>}
            {pData.sectionsVisibility.experience && <a href="#experience" className="hover:text-white transition-colors">Nodes</a>}
            {pData.sectionsVisibility.projects && <a href="#projects" className="hover:text-white transition-colors">Deploy</a>}
            {pData.sectionsVisibility.contact && <a href="#contact" className="hover:text-white transition-colors">Ping</a>}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {pData.sectionsVisibility.hero && (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="inline-block px-4 py-1.5 mb-8 bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-full text-[#60a5fa] text-[10px] font-bold tracking-[2px] uppercase"
            >
               🚀 SYSTEM STATUS: OPERATIONAL
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-5xl md:text-9xl font-extrabold leading-[1.1] md:leading-[0.9] mb-8 tracking-tighter"
            >
               <span className="bg-gradient-to-r from-white to-[#94a3b8] bg-clip-text text-transparent">
                 {data.personalInfo.fullName?.split(' ')[0]}
               </span><br />
               <span className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">
                 {data.personalInfo.fullName?.split(' ').slice(1).join(' ')}
               </span>
            </motion.h1>

            <motion.p 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               transition={{ delay: 0.4 }}
               className="text-[#64748b] text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12"
            >
               {data.personalInfo.jobTitle || "Next-gen Software Architect focusing on scalable digital infrastructure."}
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="flex flex-wrap justify-center gap-4"
            >
               <a href="#projects" className="px-8 py-3.5 bg-[#3b82f6] text-white rounded-xl text-sm font-bold shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-1">
                 Initialize View
               </a>
               <a href="#contact" className="px-8 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-bold backdrop-blur-lg hover:bg-white/10 transition-all hover:-translate-y-1">
                 Establish Link
               </a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
               className="mt-20 flex flex-wrap justify-center gap-4 md:gap-6"
            >
               {[
                 { label: "Systems", val: "5+" },
                 { label: "Languages", val: "8+" },
                 { label: "Frameworks", val: "12+" },
                 { label: "Uptime", val: "99%" }
               ].map(stat => (
                 <div key={stat.label} className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md min-w-[120px]">
                    <div className="text-2xl font-black bg-gradient-to-br from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">{stat.val}</div>
                    <div className="text-[9px] uppercase tracking-[2px] font-bold text-[#64748b] mt-1">{stat.label}</div>
                 </div>
               ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-[#60a5fa] text-[10px] tracking-[4px] uppercase font-bold mb-4">Core Metadata</div>
          <h2 className="text-4xl font-extrabold mb-12">Who Am <span className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">I?</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-[#94a3b8] text-base leading-relaxed">
               <p>{data.summary || "Infiltrating technological sectors with advanced automation and precision-crafted codebases."}</p>
               <p>Specializing in full-cycle enterprise development, I build systems that don't just work—they scale predictably and perform exceptionally.</p>
            </div>
            
            <div className="space-y-3">
               {[
                 { k: "Role", v: data.personalInfo.jobTitle },
                 { k: "Base", v: data.personalInfo.location || "REMOTE_NODE" },
                 { k: "Stack", v: "FULL_ENTERPRISE" },
                 { k: "Status", v: "AVAILABLE", color: "text-[#2dd4bf]" }
               ].map(item => (
                 <div key={item.k} className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                    <span className="text-[10px] tracking-[2px] uppercase font-bold text-[#64748b]">{item.k}</span>
                    <span className={`text-[11px] font-bold ${item.color || "text-white"}`}>{item.v}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Bento */}
      {pData.sectionsVisibility.skills && data.skills.length > 0 && (
        <section id="skills" className="py-32 px-6 bg-white/[0.01]">
          <div className="max-w-[1400px] mx-auto">
             <div className="text-[#60a5fa] text-[10px] tracking-[4px] uppercase font-bold mb-4">Capabilities Matrix</div>
             <h2 className="text-4xl font-extrabold mb-12">Tech <span className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">Stack</span></h2>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.skills.map((skillGroup, groupIdx) => (
                  <motion.div 
                    key={skillGroup.category} 
                    {...fadeIn}
                    className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md group hover:bg-white/10 transition-all hover:border-[#3b82f6]/30"
                  >
                    <div className="text-[10px] text-[#60a5fa] mb-6 font-bold tracking-[3px] uppercase">
                      CAT_{String(groupIdx + 1).padStart(2, '0')} // {skillGroup.category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[11px] font-bold text-white group-hover:text-[#60a5fa] transition-colors uppercase tracking-widest">
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
          <div className="max-w-[1400px] mx-auto">
             <div className="text-[#60a5fa] text-[10px] tracking-[4px] uppercase font-bold mb-4">Project Logs</div>
             <h2 className="text-4xl font-extrabold mb-12">Deployed <span className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">Infrastructure</span></h2>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {data.projects.map((proj, i) => (
                 <motion.div 
                   key={i} 
                   {...fadeIn}
                   className="p-6 md:p-10 bg-white/[0.02] border border-white/5 rounded-[1.5rem] md:rounded-3xl backdrop-blur-2xl relative overflow-hidden group hover:bg-white/[0.04] transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.1)]"
                 >
                   <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, white, transparent)' }} />
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                   <div className="text-[9px] font-bold text-[#64748b] uppercase tracking-[3px] mb-6 relative z-10">PROJECT_REF // {i + 1}</div>
                   <h3 className="text-2xl font-extrabold mb-4 group-hover:text-[#60a5fa] transition-colors relative z-10">{proj.name}</h3>
                   <p className="text-sm text-[#94a3b8] leading-relaxed mb-8 h-20 overflow-hidden line-clamp-3">{proj.description}</p>
                   <div className="flex flex-wrap gap-2 mb-8">
                     {proj.technologies.map(tech => (
                       <span key={tech} className="px-3 py-1 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-lg text-[9px] text-[#60a5fa] font-bold uppercase">{tech}</span>
                     ))}
                   </div>
                   {proj.link && (
                     <a href={proj.link} className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[2px] uppercase text-white hover:text-[#60a5fa] transition-all">
                       Initialize Root <ExternalLink size={14} />
                     </a>
                   )}
                 </motion.div>
               ))}
             </div>
          </div>
        </section>
      )}

      {/* Experience History */}
      {pData.sectionsVisibility.experience && data.experience.length > 0 && (
        <section id="experience" className="py-32 px-6 bg-white/[0.01]">
          <div className="max-w-4xl mx-auto">
             <div className="text-[#60a5fa] text-[10px] tracking-[4px] uppercase font-bold mb-4">Career Timeline</div>
             <h2 className="text-4xl font-extrabold mb-12">Professional <span className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">History</span></h2>

             <div className="space-y-4">
                {data.experience.map((exp, i) => (
                  <motion.div 
                    key={i} 
                    {...fadeIn}
                    className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl group hover:border-[#3b82f6]/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                       <div>
                          <h3 className="text-xl font-bold">{exp.position}</h3>
                          <p className="text-sm bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent font-bold mt-1 uppercase tracking-widest">{exp.company}</p>
                       </div>
                       <span className="px-4 py-1.5 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full text-[10px] font-bold text-[#60a5fa]">{exp.startDate} — {exp.current ? "ACTIVE" : exp.endDate}</span>
                    </div>
                    <p className="text-sm text-[#94a3b8] leading-relaxed italic">"{exp.description}"</p>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {pData.sectionsVisibility.contact && (
        <section id="contact" className="py-48 px-6 text-center">
           <motion.div 
             {...fadeIn}
             className="max-w-xl mx-auto p-6 md:p-12 bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-2xl relative shadow-2xl"
           >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 bg-[#020817] border border-white/10 rounded-2xl shadow-xl">
                 <Mail size={24} className="text-[#60a5fa]" />
              </div>
              <h2 className="text-3xl font-extrabold mb-6 mt-4">Establish <span className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">Link</span></h2>
              <p className="text-[#64748b] text-sm mb-10">Currently open for architectural partnerships and professional inquiries.</p>
              <a 
                href={`mailto:${data.personalInfo.email}`} 
                className="text-xl md:text-2xl font-black text-white hover:text-[#60a5fa] transition-all block mb-10 overflow-hidden text-ellipsis"
              >
                {data.personalInfo.email}
              </a>
              <div className="flex justify-center gap-6 pt-10 border-t border-white/10">
                 {pData.socialLinks.linkedin && <a href={pData.socialLinks.linkedin} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-[#64748b] hover:text-[#60a5fa] hover:bg-white/10 transition-all"><Linkedin size={18} /></a>}
                 {pData.socialLinks.github && <a href={pData.socialLinks.github} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-[#64748b] hover:text-[#60a5fa] hover:bg-white/10 transition-all"><Github size={18} /></a>}
                 {pData.socialLinks.twitter && <a href={pData.socialLinks.twitter} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-[#64748b] hover:text-[#60a5fa] hover:bg-white/10 transition-all"><Twitter size={18} /></a>}
              </div>
           </motion.div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 text-center font-bold text-[9px] text-[#64748b] tracking-[4px] uppercase relative z-10">
        {data.personalInfo.fullName} // PORTFOLIO_V2 // © {new Date().getFullYear()} // POWERED BY SUMMITPORTFOLIO
      </footer>
    </div>
  );
};
