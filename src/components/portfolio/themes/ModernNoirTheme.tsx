"use client";

import { motion } from "framer-motion";
import { 
  Square, 
  Circle, 
  Triangle, 
  Minus, 
  Plus, 
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink
} from "lucide-react";

interface ThemeProps {
  username: string;
  data: any;
  pData?: any;
}

export const PortfolioThemeModernNoir = ({ username, data, pData }: ThemeProps) => {
  const personalInfo = data.personalInfo || {};
  const experiences = data.experience || [];
  const projects = data.projects || [];
  const skills = data.skills || [];
  const sections = pData?.sections || { hero: true, experience: true, education: true, skills: true, projects: true };

  return (
    <div className="bg-[#080808] text-white min-h-screen font-sans selection:bg-white selection:text-black">
      {/* Precision Lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.03]" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-white/[0.03]" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-white/[0.03]" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.03]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference">
        <div className="flex items-center gap-4">
          <Square className="h-4 w-4 fill-white" />
          <span className="text-xs font-black uppercase tracking-[0.4em]">{username}</span>
        </div>
        <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">
          {sections.experience && <a href="#experience">History</a>}
          {sections.projects && <a href="#projects">Work</a>}
          {sections.skills && <a href="#skills">Stack</a>}
          <a href="#contact">End</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-12"
        >
          <div className="flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
            <Minus className="w-8" /> Established Presence <Minus className="w-8" />
          </div>
          <h1 className="text-[12vw] font-black leading-[0.8] tracking-tighter uppercase">
            {personalInfo.fullName?.split(' ')[0]}<br/>
            {personalInfo.fullName?.split(' ').slice(1).join(' ')}
          </h1>
          <p className="max-w-xl mx-auto text-sm font-bold uppercase tracking-[0.2em] leading-relaxed opacity-40 italic">
            {personalInfo.summary || "Redefining the digital frontier through precision and purposeful design."}
          </p>
        </motion.div>
        
        <div className="absolute bottom-12 flex gap-4 opacity-20">
            {pData?.socialLinks?.github && (
              <a href={pData.socialLinks.github.startsWith('http') ? pData.socialLinks.github : `https://${pData.socialLinks.github}`} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            )}
            {pData?.socialLinks?.linkedin && (
              <a href={pData.socialLinks.linkedin.startsWith('http') ? pData.socialLinks.linkedin : `https://${pData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            <a href={`mailto:${personalInfo.email}`}>
              <Mail className="h-4 w-4" />
            </a>
        </div>
      </section>

      {/* Experience */}
      {sections.experience && (
        <section id="experience" className="py-40 px-8 max-w-6xl mx-auto z-10 border-t border-white/[0.05]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
            <div className="md:col-span-4 sticky top-40 h-fit">
                <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">Chronology</h2>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] opacity-20">Professional Trajectory</p>
            </div>
            <div className="md:col-span-8 space-y-24">
              {experiences.map((exp: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="space-y-6 group"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 group-hover:opacity-100 transition-opacity">{exp.startDate} — {exp.endDate}</p>
                  <h3 className="text-4xl font-black uppercase tracking-tighter">{exp.position}</h3>
                  <p className="text-xl font-bold uppercase opacity-40">{exp.company}</p>
                  <p className="text-sm font-bold uppercase tracking-widest leading-relaxed opacity-40 group-hover:opacity-70 transition-opacity">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {sections.projects && (
        <section id="projects" className="py-40 px-8 max-w-[90rem] mx-auto z-10">
          <div className="flex justify-between items-end mb-32 px-4">
             <h2 className="text-8xl font-black uppercase tracking-tighter leading-none">Curation</h2>
             <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20 mb-4">Selected Builds</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {projects.map((project: any, i: number) => (
              <motion.div
                key={i}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                className="p-16 space-y-12 transition-all cursor-none group"
              >
                <div className="flex justify-between items-start">
                    <div className="h-16 w-16 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <span className="text-xl font-black">0{i+1}</span>
                    </div>
                    <ArrowUpRight className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <div className="space-y-6">
                    <h3 className="text-5xl font-black uppercase tracking-tighter">{project.name}</h3>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-40 leading-relaxed">
                        {project.description}
                    </p>
                </div>
                <div className="flex flex-wrap gap-6 pt-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    {project.technologies?.map((t: string, idx: number) => (
                        <span key={idx} className="text-[10px] font-black uppercase tracking-[0.2em]">{t}</span>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {sections.skills && (
        <section id="skills" className="py-40 px-8 max-w-6xl mx-auto z-10 text-center">
            <h2 className="text-9xl font-black uppercase tracking-tighter opacity-5 mb-20">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                {skills.map((group: any, i: number) => (
                    <div key={i} className="space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">{group.category}</h3>
                        <div className="space-y-4">
                            {group.items.map((skill: string, sid: number) => (
                                <div key={sid} className="text-2xl font-black uppercase tracking-tighter hover:scale-110 transition-transform cursor-default">{skill}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="py-60 px-8 text-center z-10 border-t border-white/[0.05]">
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="space-y-12"
        >
            <h2 className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter leading-none">Establish Link</h2>
            <div className="pt-12">
                <a 
                    href={`mailto:${personalInfo.email}`}
                    className="inline-block h-24 px-20 bg-white text-black text-xl font-black uppercase tracking-[0.3em] hover:bg-transparent hover:text-white border-2 border-white transition-all flex items-center justify-center mx-auto w-fit"
                >
                    Initialize_Node
                </a>
            </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="p-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.5em] opacity-20">
        <p>&copy; {new Date().getFullYear()} {username} // All Systems Nominal</p>
        <div className="flex gap-12">
            {pData?.socialLinks?.github && (
              <a href={pData.socialLinks.github.startsWith('http') ? pData.socialLinks.github : `https://${pData.socialLinks.github}`} target="_blank" rel="noopener noreferrer">Github</a>
            )}
            {pData?.socialLinks?.linkedin && (
              <a href={pData.socialLinks.linkedin.startsWith('http') ? pData.socialLinks.linkedin : `https://${pData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            )}
            {pData?.socialLinks?.twitter && (
              <a href={pData.socialLinks.twitter.startsWith('http') ? pData.socialLinks.twitter : `https://${pData.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer">Twitter</a>
            )}
        </div>
      </footer>
    </div>
  );
};
