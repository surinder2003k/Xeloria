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
  Linkedin
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
  const sections = pData?.sections || { hero: true, experience: true, education: true, skills: true, projects: true };

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
      <nav className="fixed top-0 w-full z-50 border-b border-cyan-500/10 backdrop-blur-xl bg-black/50 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-cyan-500 flex items-center justify-center rounded-sm">
            <Cpu className="h-5 w-5 text-black" />
          </div>
          <span className="text-sm font-black uppercase tracking-[0.3em]">QUANTUM_NODE // {username.toUpperCase()}</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold text-cyan-500/60 uppercase tracking-widest">
          {sections.experience && <a href="#experience" className="hover:text-cyan-400 transition-colors">EXPERIENCE</a>}
          {sections.projects && <a href="#projects" className="hover:text-cyan-400 transition-colors">PROJECTS</a>}
          {sections.skills && <a href="#skills" className="hover:text-cyan-400 transition-colors">SKILLS</a>}
          <a href="#contact" className="hover:text-cyan-400 transition-colors">CONTACT</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-8 max-w-7xl mx-auto z-10 min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em]">
            <Activity className="h-3 w-3 animate-pulse" /> SYSTEM_ONLINE // BROADCAST_ACTIVE
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none">
            {personalInfo.fullName?.split(' ')[0]}<br/>
            <span className="text-transparent border-t border-b border-cyan-500/20 pb-4 mt-4 inline-block [-webkit-text-stroke:1px_#06b6d4]">
              {personalInfo.fullName?.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          <p className="max-w-2xl text-cyan-500/60 text-sm leading-relaxed uppercase tracking-widest border-l-2 border-cyan-500 pl-8 font-bold">
            {personalInfo.summary || "NO_SUMMARY_DATA_FOUND // INITIALIZING_DEFAULT_LOCUS"}
          </p>
          
          <div className="pt-10 flex flex-wrap gap-4">
            <a href="#projects" className="h-14 px-10 bg-cyan-500 text-black flex items-center justify-center font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all rounded-sm shadow-xl shadow-cyan-500/20">
              INIT_OPERATIONS
            </a>
            <div className="flex items-center gap-4 px-6 h-14 border border-cyan-500/20 rounded-sm">
                <Github className="h-4 w-4 text-cyan-500/60 hover:text-cyan-400 cursor-pointer" />
                <Linkedin className="h-4 w-4 text-cyan-500/60 hover:text-cyan-400 cursor-pointer" />
                <Share2 className="h-4 w-4 text-cyan-500/60 hover:text-cyan-400 cursor-pointer" />
            </div>
          </div>
        </motion.div>
        
        {/* Decorative Data Nodes */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block space-y-12">
            {[1, 2, 3].map((i) => (
                <motion.div 
                    key={i}
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i }}
                    className="flex items-center gap-6"
                >
                    <div className="text-right">
                        <p className="text-[10px] font-black text-cyan-500/40">DATA_NODE_0{i}</p>
                        <p className="text-xs font-bold text-cyan-400 uppercase">SYNCHRONIZING...</p>
                    </div>
                    <div className="h-12 w-12 border border-cyan-500/20 rounded-sm flex items-center justify-center bg-cyan-500/5">
                        <Layers className="h-6 w-6 text-cyan-500/40" />
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Experience Section */}
      {sections.experience && (
        <section id="experience" className="py-32 px-8 max-w-7xl mx-auto z-10">
          <div className="flex items-center gap-6 mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">OPERATIONAL_HISTORY</h2>
            <div className="flex-1 h-px bg-cyan-500/20" />
          </div>
          
          <div className="space-y-12">
            {experiences.map((exp: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 border-l border-cyan-500/20 hover:bg-cyan-500/5 transition-all group"
              >
                <div className="md:col-span-3 text-[10px] font-black text-cyan-500/40 uppercase tracking-widest pt-2">
                  {exp.startDate} - {exp.endDate}
                </div>
                <div className="md:col-span-9 space-y-4">
                  <h3 className="text-2xl font-black uppercase text-cyan-400 group-hover:text-white transition-colors">
                    {exp.position} // <span className="text-cyan-500/60 font-bold">{exp.company}</span>
                  </h3>
                  <p className="text-sm text-cyan-500/60 leading-relaxed uppercase tracking-widest max-w-3xl">
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
        <section id="projects" className="py-32 px-8 max-w-7xl mx-auto z-10">
          <div className="flex items-center gap-6 mb-20">
            <div className="flex-1 h-px bg-cyan-500/20" />
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-right">ACTIVE_DEPLOYMENTS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="p-10 border border-cyan-500/10 bg-cyan-500/5 rounded-sm space-y-8 group hover:border-cyan-500/40 transition-all shadow-2xl"
              >
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 border border-cyan-500/20 rounded-sm flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    <Terminal className="h-6 w-6" />
                  </div>
                  <div className="flex gap-4">
                    {project.link && <ExternalLink className="h-4 w-4 text-cyan-500/40 hover:text-cyan-400 cursor-pointer" />}
                    {project.github && <Github className="h-4 w-4 text-cyan-500/40 hover:text-cyan-400 cursor-pointer" />}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-cyan-500/60 leading-relaxed uppercase tracking-widest">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.technologies?.map((tech: string, tid: number) => (
                      <span key={tid} className="text-[10px] font-black text-cyan-500 border border-cyan-500/20 px-3 py-1 rounded-sm uppercase bg-black/40">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {sections.skills && (
        <section id="skills" className="py-32 px-8 max-w-7xl mx-auto z-10">
          <div className="flex items-center gap-6 mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">TECH_SPECIFICATIONS</h2>
            <div className="flex-1 h-px bg-cyan-500/20" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((group: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="p-8 border border-cyan-500/10 hover:border-cyan-500/30 transition-all space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-cyan-500" />
                  <h3 className="text-sm font-black uppercase tracking-[0.2em]">{group.category}</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {group.items.map((skill: string, sid: number) => (
                    <div key={sid} className="flex items-center justify-between text-[10px] font-bold text-cyan-500/60 uppercase tracking-widest">
                      <span>{skill}</span>
                      <div className="h-0.5 w-8 bg-cyan-500/20" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-40 px-8 max-w-7xl mx-auto z-10">
        <div className="bg-cyan-500 p-12 md:p-20 flex flex-col md:flex-row justify-between items-center gap-12 rounded-sm shadow-[0_0_100px_rgba(6,182,212,0.15)] text-black">
          <div className="space-y-6 max-w-xl text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">ESTABLISH_LINK</h2>
            <p className="text-sm font-bold uppercase tracking-widest opacity-80 leading-relaxed">
              NODE IS READY FOR INCOMING COMMUNICATIONS. INITIALIZE SECURE PROTOCOL FOR COLLABORATIVE VENTURES.
            </p>
          </div>
          <div className="flex flex-col gap-6 w-full md:w-auto">
             <a href={`mailto:${personalInfo.email}`} className="h-20 px-12 bg-black text-cyan-500 flex items-center justify-center font-black text-lg uppercase tracking-widest hover:bg-black/90 transition-all rounded-sm shadow-2xl">
               OPEN_PORT
             </a>
             <div className="flex justify-center md:justify-start gap-8">
                <Github className="h-6 w-6 hover:scale-125 transition-transform cursor-pointer" />
                <Linkedin className="h-6 w-6 hover:scale-125 transition-transform cursor-pointer" />
                <Share2 className="h-6 w-6 hover:scale-125 transition-transform cursor-pointer" />
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-cyan-500/10 px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-cyan-500/40 uppercase tracking-[0.3em]">
        <div className="flex items-center gap-2">
            <Server className="h-3 w-3" /> NODE_STATUS: OPTIMAL
        </div>
        <p>&copy; 2024 QUANTUM_SHELL // ALL_RIGHTS_RESERVED</p>
        <div className="flex gap-4">
            <span>LATENCY: 14MS</span>
            <span>ENCRYPTION: AES-256</span>
        </div>
      </footer>
    </div>
  );
};
