"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  ExternalLink, 
  ArrowRight,
  ChevronDown,
  Circle
} from "lucide-react";
import { useRef } from "react";

interface ThemeProps {
  username: string;
  data: any;
  pData?: any;
}

export const PortfolioThemeElysian = ({ username, data, pData }: ThemeProps) => {
  const personalInfo = data.personalInfo || {};
  const experiences = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const projects = data.projects || [];
  const sections = pData?.sections || { hero: true, experience: true, education: true, skills: true, projects: true };

  return (
    <div className="bg-[#fdfcfb] text-[#1a1a1a] min-h-screen font-serif selection:bg-[#e2d1c3] selection:text-[#1a1a1a]">
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/fine-paper.png')]" />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-[#fdfcfb] via-white to-[#e2d1c3]/20" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-12 py-8 flex justify-between items-center mix-blend-difference">
        <span className="text-xl font-bold tracking-[0.2em] uppercase text-white">{username}</span>
        <div className="hidden md:flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
          {sections.experience && <a href="#experience" className="hover:text-white transition-colors">Experience</a>}
          {sections.projects && <a href="#projects" className="hover:text-white transition-colors">Curation</a>}
          {sections.skills && <a href="#skills" className="hover:text-white transition-colors">Expertise</a>}
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-12 max-w-5xl"
        >
          <div className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-[#8e7f74]">
            <Circle className="h-1.5 w-1.5 fill-current" /> Available for exclusive ventures
          </div>
          <h1 className="text-7xl md:text-[10rem] font-medium leading-[0.85] tracking-tighter italic">
            {personalInfo.fullName}
          </h1>
          <div className="h-20 w-px bg-[#8e7f74]/30 mx-auto" />
          <p className="text-xl md:text-2xl text-[#5a5a5a] max-w-2xl mx-auto leading-relaxed font-light italic">
            {personalInfo.summary || "Architecting digital elegance and functional sophistication."}
          </p>
          <motion.div 
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="pt-20"
          >
            <ChevronDown className="h-6 w-6 text-[#8e7f74]" />
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
      {sections.experience && (
        <section id="experience" className="py-40 px-12 max-w-7xl mx-auto z-10 relative">
          <div className="space-y-4 mb-32">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#8e7f74]">The Narrative</span>
            <h2 className="text-5xl md:text-7xl font-medium italic">Professional Tenure</h2>
          </div>
          
          <div className="space-y-32">
            {experiences.map((exp: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-12"
              >
                <div className="md:col-span-4">
                  <p className="text-sm font-bold text-[#8e7f74] uppercase tracking-[0.2em]">{exp.startDate} — {exp.endDate}</p>
                  <h3 className="text-3xl mt-4 font-medium italic">{exp.company}</h3>
                </div>
                <div className="md:col-span-8 space-y-6">
                  <h4 className="text-2xl font-medium text-[#1a1a1a] uppercase tracking-wider">{exp.position}</h4>
                  <p className="text-lg text-[#5a5a5a] leading-relaxed font-light italic">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {sections.projects && (
        <section id="projects" className="py-40 bg-[#1a1a1a] text-white z-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#242424] -skew-x-12 translate-x-1/2" />
          
          <div className="max-w-7xl mx-auto px-12 relative z-10">
            <div className="space-y-4 mb-32">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">The Curation</span>
              <h2 className="text-5xl md:text-7xl font-medium italic">Selected Works</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              {projects.map((project: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="space-y-8 group"
                >
                  <div className="aspect-[16/10] bg-[#242424] overflow-hidden relative border border-white/5">
                    <div className="absolute inset-0 bg-[#e2d1c3]/10 mix-blend-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                        <Button variant="ghost" className="rounded-full h-20 w-20 bg-white text-black p-0">
                            <ExternalLink className="h-6 w-6" />
                        </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-medium italic">{project.name}</h3>
                    <p className="text-sm text-white/60 leading-relaxed font-light uppercase tracking-widest italic">
                      {project.description}
                    </p>
                    <div className="flex gap-4 pt-4">
                       {project.technologies?.slice(0, 3).map((t: string, idx: number) => (
                           <span key={idx} className="text-[9px] font-bold uppercase tracking-[0.2em] border-b border-white/20 pb-1">{t}</span>
                       ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Expertise Section */}
      {sections.skills && (
        <section id="skills" className="py-40 px-12 max-w-7xl mx-auto z-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
            <div className="md:col-span-4 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#8e7f74]">Expertise</span>
              <h2 className="text-5xl font-medium italic leading-tight">Mastered Domains</h2>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-16">
              {skills.map((group: any, i: number) => (
                <div key={i} className="space-y-8">
                  <h3 className="text-lg font-bold uppercase tracking-[0.3em] border-b border-[#8e7f74]/20 pb-4">{group.category}</h3>
                  <div className="space-y-4">
                    {group.items.map((skill: string, sid: number) => (
                      <div key={sid} className="text-xl font-light italic text-[#5a5a5a]">{skill}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-60 px-12 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-12 max-w-3xl mx-auto"
        >
          <h2 className="text-6xl md:text-[8rem] font-medium italic leading-none">Let's Converse.</h2>
          <p className="text-xl text-[#8e7f74] font-light italic">Currently accepting new inquiries for visionary projects.</p>
          <div className="pt-12">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-4 text-2xl font-medium italic border-b-2 border-[#1a1a1a] pb-2 hover:text-[#8e7f74] hover:border-[#8e7f74] transition-all"
            >
              Reach out <ArrowRight className="h-6 w-6" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-[#8e7f74]/10 px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-[0.4em] text-[#8e7f74]">
        <p>&copy; 2024 {personalInfo.fullName} // Designed for distinction</p>
        <div className="flex gap-12">
            <a href="#" className="hover:text-[#1a1a1a]">LinkedIn</a>
            <a href="#" className="hover:text-[#1a1a1a]">Twitter</a>
            <a href="#" className="hover:text-[#1a1a1a]">Studio</a>
        </div>
      </footer>
    </div>
  );
};

const Button = ({ children, variant, className, ...props }: any) => (
    <button className={`flex items-center justify-center transition-all ${className}`} {...props}>
        {children}
    </button>
);
