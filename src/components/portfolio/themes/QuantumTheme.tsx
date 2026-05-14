"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Zap, 
  Terminal, 
  Code, 
  Globe, 
  Cpu, 
  Activity, 
  Layers, 
  Server,
  Share2,
  ExternalLink,
  Github,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter
} from "lucide-react";
import { useRef } from "react";

interface ThemeProps {
  username: string;
  data: any;
  pData?: any;
}

export const PortfolioThemeQuantum = ({ username, data, pData }: ThemeProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const personalInfo = data.personalInfo || {};
  const experiences = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const projects = data.projects || [];
  const sections = pData?.sectionsVisibility || { hero: true, experience: true, education: true, skills: true, projects: true, contact: true };

  return (
    <div ref={containerRef} className="bg-[#020205] text-cyan-50 min-h-screen font-mono selection:bg-cyan-500 selection:text-black">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#164e6315,transparent)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-cyan-500/10 backdrop-blur-xl bg-black/40 px-6 md:px-12 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-cyan-500 flex items-center justify-center rounded-lg">
            <Cpu className="h-5 w-5 text-black" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-white">
            {username.toLowerCase()} studio
          </span>
        </div>
        <div className="flex items-center gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          {sections.hero && <a href="#hero" className="hover:text-cyan-400 transition-colors hidden sm:block">Home</a>}
          {sections.experience && <a href="#experience" className="hover:text-cyan-400 transition-colors hidden sm:block">Experience</a>}
          {sections.projects && <a href="#projects" className="hover:text-cyan-400 transition-colors hidden sm:block">Projects</a>}
          {sections.skills && <a href="#skills" className="hover:text-cyan-400 transition-colors hidden sm:block">Skills</a>}
          <a href="#contact" className="hover:text-cyan-400 transition-colors px-4 py-2 border border-cyan-500/20 rounded-lg bg-cyan-500/5">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      {sections.hero && (
        <section id="hero" className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10 min-h-screen flex flex-col justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            <Activity className="h-3 w-3 animate-pulse" /> Status: Available for Projects
          </div>
          <h1 className="text-6xl md:text-[10rem] font-bold tracking-tighter uppercase leading-[0.85] text-white">
            {personalInfo.fullName?.split(' ')[0]}<br/>
            <span className="text-transparent border-y border-white/10 pb-4 mt-4 inline-block [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">
              {personalInfo.fullName?.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-lg md:text-xl leading-relaxed border-l-2 border-cyan-500 pl-8 font-medium italic">
            {personalInfo.summary || "Building high-performance digital experiences through elegant architecture and creative engineering."}
          </p>
          
          <div className="flex flex-wrap gap-6 pt-6">
             <a href="#projects" className="px-10 py-4 bg-cyan-500 text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-cyan-400 transition-all">
                View Work
             </a>
             <a href="#contact" className="px-10 py-4 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:border-cyan-500 transition-all">
                Get In Touch
             </a>
          </div>
        </motion.div>
        </section>
      )}

      {/* Experience Section */}
      {sections.experience && experiences.length > 0 && (
        <section id="experience" className="py-32 px-6 md:px-12 max-w-7xl mx-auto z-10">
          <div className="flex items-center gap-6 mb-20">
             <div className="h-px flex-grow bg-white/10" />
             <h2 className="text-3xl font-bold uppercase tracking-[0.4em] text-white shrink-0">Experience</h2>
             <div className="h-px flex-grow bg-white/10" />
          </div>
          
          <div className="space-y-24">
            {experiences.map((exp: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start"
              >
                <div className="md:col-span-4">
                  <div className="text-cyan-400 font-bold text-sm tracking-widest mb-2">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">Timeline</div>
                </div>
                <div className="md:col-span-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight uppercase">{exp.position}</h3>
                  <div className="text-sm font-bold text-cyan-500 uppercase tracking-widest mb-8">{exp.company}</div>
                  <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )      {/* Projects Section */}
      {sections.projects && projects.length > 0 && (
        <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto z-10">
          <div className="mb-20">
             <div className="text-cyan-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-4">Portfolio</div>
             <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">Selected Work.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative p-10 md:p-16 border border-white/5 bg-white/[0.01] rounded-[3rem] hover:bg-white/[0.02] transition-all overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-40 transition-opacity">
                   <ExternalLink size={32} />
                </div>
                <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] mb-8">Project_{i.toString().padStart(2, '0')}</div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight group-hover:text-cyan-400 transition-colors uppercase leading-tight">{project.name}</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">{project.description}</p>
                <div className="flex flex-wrap gap-3 mb-12">
                   {project.technologies.map((tech: string) => (
                     <span key={tech} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-md">{tech}</span>
                   ))}
                </div>
                {project.link && (
                  <a href={project.link} className="inline-flex items-center gap-3 text-xs font-bold text-white uppercase tracking-widest border-b-2 border-cyan-500/30 pb-1 hover:border-cyan-500 transition-all">
                     View Project <ExternalLink size={14} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {sections.skills && skills.length > 0 && (
        <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto z-10">
           <div className="bg-white/[0.02] border border-white/5 rounded-[4rem] p-12 md:p-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                 <div className="lg:col-span-4">
                    <div className="text-cyan-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-6">Expertise</div>
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white mb-8">Tech <br />Stack.</h2>
                    <p className="text-slate-500 text-sm leading-relaxed uppercase tracking-widest font-bold">Comprehensive toolkit for modern digital solutions.</p>
                 </div>
                 <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {skills.map((skillGroup: any, i: number) => (
                      <div key={i} className="space-y-8">
                         <h4 className="text-xs font-bold text-white uppercase tracking-[0.4em] border-l-2 border-cyan-500 pl-4">{skillGroup.category}</h4>
                         <div className="flex flex-wrap gap-3">
                           {skillGroup.items.map((skill: string) => (
                             <span key={skill} className="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-default">{skill}</span>
                           ))}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Contact Section */}
      {sections.contact && (
        <section id="contact" className="py-48 px-6 text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-cyan-400 font-bold text-[10px] uppercase tracking-[0.6em] mb-12">Collaboration</div>
            <h2 className="text-5xl md:text-9xl font-bold uppercase tracking-tighter text-white mb-20 leading-[0.85]">
              Let&apos;s Build <br /> <span className="text-transparent [-webkit-text-stroke:1px_#06b6d4]">The Future.</span>
            </h2>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="text-2xl md:text-5xl font-bold text-white hover:text-cyan-400 transition-colors tracking-tight underline underline-offset-[20px] decoration-cyan-500/20 decoration-2"
            >
              {personalInfo.email}
            </a>
            
            <div className="mt-32 flex justify-center gap-12">
              {pData?.socialLinks?.linkedin && <a href={pData.socialLinks.linkedin.startsWith('http') ? pData.socialLinks.linkedin : `https://${pData.socialLinks.linkedin}`} className="text-slate-500 hover:text-white transition-colors"><Linkedin size={24} /></a>}
              {pData?.socialLinks?.github && <a href={pData.socialLinks.github.startsWith('http') ? pData.socialLinks.github : `https://${pData.socialLinks.github}`} className="text-slate-500 hover:text-white transition-colors"><Github size={24} /></a>}
              {pData?.socialLinks?.twitter && <a href={pData.socialLinks.twitter.startsWith('http') ? pData.socialLinks.twitter : `https://${pData.socialLinks.twitter}`} className="text-slate-500 hover:text-white transition-colors"><Twitter size={24} /></a>}
            </div>
          </motion.div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/5 text-center relative z-10">
        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.5em] mb-4">
          Built with Xeloria Professional Studio
        </div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          © {new Date().getFullYear()} {username.toUpperCase()} — ALL RIGHTS RESERVED
        </div>
      </footer>
    </div>
  );
};
;
