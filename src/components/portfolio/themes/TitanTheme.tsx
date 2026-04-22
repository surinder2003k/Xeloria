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
  Linkedin
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
  const sections = pData?.sections || { hero: true, experience: true, education: true, skills: true, projects: true };

  return (
    <div className="bg-[#111111] text-[#eeeeee] min-h-screen font-sans selection:bg-[#ff5500] selection:text-white">
      {/* Heavy Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)]" />
      </div>

      {/* Industrial Accents */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#ff5500] z-[100]" />
      <div className="fixed bottom-0 left-0 w-full h-1 bg-[#ff5500] z-[100]" />

      {/* Header */}
      <header className="relative z-10 px-8 py-12 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-[#ff5500] flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter">TITAN_NODE // {username}</span>
        </div>
        <div className="flex gap-4">
            <div className="px-4 py-2 border border-[#ff5500] text-[#ff5500] text-[10px] font-black uppercase tracking-widest">
                HEAVY_LOAD: ACTIVE
            </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 py-40 px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <h1 className="text-8xl md:text-[14rem] font-black uppercase leading-[0.8] tracking-tighter">
            INDUSTRIAL<br/>
            <span className="text-[#ff5500]">STRENGTH</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="max-w-xl space-y-6">
                <p className="text-xl font-bold uppercase tracking-tight text-[#888888]">
                    {personalInfo.summary || "No-nonsense engineering and structural integrity for the digital landscape."}
                </p>
                <div className="flex gap-6">
                    <Button className="h-16 px-12 bg-[#ff5500] text-white font-black uppercase tracking-widest hover:bg-[#ff6611] transition-all flex items-center gap-3">
                        INITIALIZE <MoveRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-8 w-full">
                <div className="p-8 border border-white/10 bg-white/5 space-y-2">
                    <p className="text-[10px] font-black text-[#ff5500] uppercase">Experience</p>
                    <p className="text-4xl font-black">{experiences.length} NODES</p>
                </div>
                <div className="p-8 border border-white/10 bg-white/5 space-y-2">
                    <p className="text-[10px] font-black text-[#ff5500] uppercase">Projects</p>
                    <p className="text-4xl font-black">{projects.length} BUILDS</p>
                </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Construction History (Experience) */}
      {sections.experience && (
        <section className="relative z-10 py-32 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center gap-8 mb-20">
                <h2 className="text-6xl font-black uppercase tracking-tighter">THE_RECORDS</h2>
                <div className="flex-1 h-2 bg-[#ff5500]/10" />
            </div>
            
            <div className="space-y-2">
              {experiences.map((exp: any, i: number) => (
                <div key={i} className="group p-12 border border-white/10 hover:bg-[#ff5500]/5 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="space-y-2">
                    <p className="text-[#ff5500] font-black text-xs uppercase tracking-widest">{exp.startDate} — {exp.endDate}</p>
                    <h3 className="text-4xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform">{exp.position}</h3>
                    <p className="text-xl font-bold text-[#888888] uppercase">{exp.company}</p>
                  </div>
                  <div className="max-w-md text-right text-xs font-bold text-[#666666] leading-relaxed uppercase">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Builds (Projects) */}
      {sections.projects && (
        <section className="relative z-10 py-32 bg-[#ff5500] text-black">
          <div className="max-w-7xl mx-auto px-8">
             <div className="flex justify-between items-end mb-20">
                <h2 className="text-8xl font-black uppercase tracking-tighter leading-none">STRUCTURAL<br/>WORKS</h2>
                <Construction className="h-20 w-20 opacity-20" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/20 border border-black/20">
                {projects.map((project: any, i: number) => (
                    <div key={i} className="bg-[#ff5500] p-10 space-y-8 hover:bg-[#ff6611] transition-all cursor-crosshair group">
                        <div className="flex justify-between items-start">
                            <h3 className="text-3xl font-black uppercase tracking-tighter">{project.name}</h3>
                            <ExternalLink className="h-6 w-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="font-bold text-sm uppercase leading-tight opacity-70">
                            {project.description}
                        </p>
                        <div className="pt-4 flex flex-wrap gap-2">
                            {project.technologies?.map((tech: string, tid: number) => (
                                <span key={tid} className="px-2 py-1 bg-black text-white text-[9px] font-black uppercase">
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

      {/* Specifications (Skills) */}
      {sections.skills && (
        <section className="relative z-10 py-32 border-b border-white/10">
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

      {/* Footer / Contact */}
      <footer className="relative z-10 py-40 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-8">
                <h2 className="text-6xl font-black uppercase tracking-tighter">LOAD_BEARING<br/>COMMUNICATIONS</h2>
                <div className="space-y-4">
                    <p className="text-[#888888] font-bold uppercase tracking-widest text-sm">Direct Line: {personalInfo.phone}</p>
                    <p className="text-[#888888] font-bold uppercase tracking-widest text-sm">Broadcast: {personalInfo.email}</p>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <a href={`mailto:${personalInfo.email}`} className="h-24 bg-white text-black flex items-center justify-center font-black text-2xl uppercase tracking-widest hover:bg-[#ff5500] hover:text-white transition-all">
                    OPEN_CONTRACT
                </a>
                <div className="flex gap-4 h-16">
                    <div className="flex-1 border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><Github /></div>
                    <div className="flex-1 border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><Linkedin /></div>
                    <div className="flex-1 border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><Mail /></div>
                </div>
            </div>
        </div>
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
