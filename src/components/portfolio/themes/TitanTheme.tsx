"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Construction, 
  HardHat, 
  Hammer, 
  Wrench, 
  Cog, 
  MoveRight,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  Twitter
} from "lucide-react";

interface ThemeProps {
  username: string;
  data: any;
  pData?: any;
}

export const PortfolioThemeTitan = ({ username, data, pData }: ThemeProps) => {
  const personalInfo = data.personalInfo || {};
  const experiences = data.experience || [];
  const projects = data.projects || [];
  const skills = data.skills || [];
  const sections = pData?.sectionsVisibility || { hero: true, experience: true, education: true, skills: true, projects: true, contact: true };

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen font-sans selection:bg-[#ff5500] selection:text-white relative overflow-hidden">
      {/* Industrial Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Industrial Accents */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#ff5500] z-[100]" />
      <div className="fixed bottom-0 left-0 w-full h-1 bg-[#ff5500] z-[100]" />

      {/* Header */}
      <header className="relative z-50 px-4 md:px-8 py-8 flex justify-between items-center border-b border-white/10 bg-[#0a0a0c]/80 backdrop-blur-md">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-8 md:h-10 w-8 md:w-10 bg-[#ff5500] flex items-center justify-center shrink-0">
            <Shield className="h-5 md:h-6 w-5 md:w-6 text-white" />
          </div>
          <span className="text-lg md:text-2xl font-black uppercase tracking-tighter truncate max-w-[120px] md:max-w-none">Studio // {username}</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-3 md:gap-8 text-[8px] md:text-[10px] font-black uppercase tracking-wider md:tracking-[0.2em] text-[#888888]">
            {sections.hero && <a href="#hero" className="hover:text-[#ff5500] transition-colors hidden sm:block">Home</a>}
            {sections.experience && <a href="#experience" className="hover:text-[#ff5500] transition-colors hidden sm:block">Experience</a>}
            {sections.projects && <a href="#projects" className="hover:text-[#ff5500] transition-colors hidden sm:block">Portfolio</a>}
            {sections.skills && <a href="#skills" className="hover:text-[#ff5500] transition-colors hidden sm:block">Skills</a>}
          </div>
          <a href="#contact" className="px-3 md:px-6 py-2 bg-[#ff5500] text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest shrink-0 hover:bg-[#ff6611] transition-all">
             Work With Me
          </a>
        </div>
      </header>

      {/* Hero Section */}
      {sections.hero && (
        <section id="hero" className="relative z-10 py-24 md:py-40 px-6 md:px-8 max-w-7xl mx-auto flex flex-col justify-center min-h-[calc(100vh-80px)]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 md:space-y-12"
        >
          <h1 className="text-5xl md:text-8xl lg:text-[12rem] font-black uppercase leading-[0.8] tracking-tighter break-words">
            DESIGNED<br/>
            <span className="text-[#ff5500]">WITH PURPOSE</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="max-w-xl space-y-8">
                <p className="text-xl font-bold uppercase tracking-tight text-[#888888] leading-relaxed">
                    {personalInfo.summary || "Delivering high-impact digital solutions through bold design and structural excellence."}
                </p>
                <div className="flex gap-6">
                    <a href="#projects" className="h-16 px-12 bg-[#ff5500] text-white font-black uppercase tracking-widest hover:bg-[#ff6611] transition-all flex items-center gap-3">
                        View Projects <MoveRight className="h-5 w-5" />
                    </a>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-8 w-full">
                <div className="p-8 border border-white/10 bg-white/5 space-y-2">
                    <p className="text-[10px] font-black text-[#ff5500] uppercase">Professional</p>
                    <p className="text-4xl font-black">{experiences.length} ROLES</p>
                </div>
                <div className="p-8 border border-white/10 bg-white/5 space-y-2">
                    <p className="text-[10px] font-black text-[#ff5500] uppercase">Creative</p>
                    <p className="text-4xl font-black">{projects.length} PROJECTS</p>
                </div>
            </div>
          </div>
        </motion.div>
      </section>
      )}

      {/* Experience Section */}
      {sections.experience && experiences.length > 0 && (
        <section id="experience" className="relative z-10 py-32 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center gap-8 mb-20">
                <h2 className="text-6xl font-black uppercase tracking-tighter">History</h2>
                <div className="flex-1 h-2 bg-[#ff5500]/10" />
            </div>
            
            <div className="space-y-4">
              {experiences.map((exp: any, i: number) => (
                <div key={i} className="group p-12 border border-white/10 hover:bg-[#ff5500]/5 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="space-y-2">
                    <p className="text-[#ff5500] font-black text-xs uppercase tracking-widest">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</p>
                    <h3 className="text-4xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform">{exp.position}</h3>
                    <p className="text-xl font-bold text-[#888888] uppercase">{exp.company}</p>
                  </div>
                  <div className="max-w-md text-right text-sm font-medium text-slate-400 leading-relaxed uppercase tracking-wider">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {sections.projects && projects.length > 0 && (
        <section id="projects" className="relative z-10 py-32 bg-[#ff5500] text-black">
          <div className="max-w-7xl mx-auto px-8">
             <div className="flex justify-between items-end mb-20">
                <h2 className="text-8xl font-black uppercase tracking-tighter leading-none">Selected<br/>Works</h2>
                <Construction className="h-20 w-20 opacity-20" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border border-black/10">
                {projects.map((project: any, i: number) => (
                    <div key={i} className="bg-[#ff5500] p-10 space-y-8 hover:bg-[#ff6611] transition-all group">
                        <div className="flex justify-between items-start">
                            <h3 className="text-3xl font-black uppercase tracking-tighter">{project.name}</h3>
                            <ExternalLink className="h-6 w-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="font-bold text-sm uppercase leading-tight opacity-80">
                            {project.description}
                        </p>
                        <div className="pt-4 flex flex-wrap gap-2">
                            {project.technologies?.map((tech: string, tid: number) => (
                                <span key={tid} className="px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {sections.skills && skills.length > 0 && (
        <section id="skills" className="relative z-10 py-32 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-20">
                {skills.map((group: any, i: number) => (
                    <div key={i} className="space-y-10">
                        <div className="flex items-center gap-4">
                            <Cog className="h-8 w-8 text-[#ff5500] animate-spin-slow" />
                            <h3 className="text-3xl font-black uppercase tracking-tighter">{group.category}</h3>
                        </div>
                        <div className="space-y-4">
                            {group.items.map((skill: string, sid: number) => (
                                <div key={sid} className="flex items-center gap-4 group">
                                    <div className="h-2 w-2 bg-[#ff5500] group-hover:scale-150 transition-transform" />
                                    <span className="text-lg font-black uppercase tracking-tight">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* Contact Section */}
      {sections.contact && (
        <footer id="contact" className="relative z-10 py-20 md:py-40 px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-8">
                <h2 className="text-6xl font-black uppercase tracking-tighter text-white">Let&apos;s Build <br/>Together</h2>
                <div className="space-y-4">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Direct: {personalInfo.phone}</p>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Email: {personalInfo.email}</p>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <a href={`mailto:${personalInfo.email}`} className="h-24 bg-white text-black flex items-center justify-center font-black text-2xl uppercase tracking-widest hover:bg-[#ff5500] hover:text-white transition-all">
                    Start a Project
                </a>
                 <div className="flex gap-4 h-16">
                    {pData?.socialLinks?.github && (
                      <a href={pData.socialLinks.github.startsWith('http') ? pData.socialLinks.github : `https://${pData.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="flex-1 border border-white/10 flex items-center justify-center hover:bg-[#ff5500] hover:text-white transition-all">
                        <Github />
                      </a>
                    )}
                    {pData?.socialLinks?.linkedin && (
                      <a href={pData.socialLinks.linkedin.startsWith('http') ? pData.socialLinks.linkedin : `https://${pData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex-1 border border-white/10 flex items-center justify-center hover:bg-[#ff5500] hover:text-white transition-all">
                        <Linkedin />
                      </a>
                    )}
                    {pData?.socialLinks?.twitter && (
                      <a href={pData.socialLinks.twitter.startsWith('http') ? pData.socialLinks.twitter : `https://${pData.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="flex-1 border border-white/10 flex items-center justify-center hover:bg-[#ff5500] hover:text-white transition-all">
                        <Twitter />
                      </a>
                    )}
                 </div>
            </div>
        </div>
      </footer>
      )}

      <footer className="relative z-10 py-10 px-8 border-t border-white/5 text-center">
         <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-4">
            Built with Xeloria Studio
         </p>
         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            © {new Date().getFullYear()} {username.toUpperCase()} — ALL RIGHTS RESERVED
         </p>
      </footer>

      <style jsx global>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

const Button = ({ children, className, ...props }: any) => (
    <button className={className} {...props}>
        {children}
    </button>
);
