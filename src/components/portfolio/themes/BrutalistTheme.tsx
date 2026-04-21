"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink, Briefcase, GraduationCap, Phone, MapPin, ArrowRight } from "lucide-react";
import { ResumeData } from "@/lib/store";
import { PortfolioData } from "@/lib/portfolio-store";

export const PortfolioThemeBrutalist = ({ 
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
    <div className="bg-[#0a0a0a] min-h-screen text-[#f5f5f0] font-sans selection:bg-[#ffe600] selection:text-black scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 h-[52px] bg-[#ffe600] border-b-[3px] border-black flex items-center justify-between px-[5%]">
        <span className="font-bebas text-2xl tracking-[3px] text-black">
          {username.toUpperCase()}
        </span>
        <div className="hidden md:flex items-center h-full">
          {pData.sectionsVisibility.hero && (
            <a href="#hero" className="h-full flex items-center px-6 border-l-2 border-black font-mono text-[10px] font-bold text-black uppercase tracking-wider hover:bg-black/5 transition-colors">Front</a>
          )}
          {pData.sectionsVisibility.experience && (
            <a href="#experience" className="h-full flex items-center px-6 border-l-2 border-black font-mono text-[10px] font-bold text-black uppercase tracking-wider hover:bg-black/5 transition-colors">History</a>
          )}
          {pData.sectionsVisibility.projects && (
            <a href="#projects" className="h-full flex items-center px-6 border-l-2 border-black font-mono text-[10px] font-bold text-black uppercase tracking-wider hover:bg-black/5 transition-colors">Works</a>
          )}
          {pData.sectionsVisibility.contact && (
            <a href="#contact" className="h-full flex items-center px-6 border-l-2 border-black font-mono text-[10px] font-bold text-black uppercase tracking-wider hover:bg-black/5 transition-colors">Ping</a>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      {pData.sectionsVisibility.hero && (
        <section id="hero" className="min-h-screen grid grid-cols-1 md:grid-cols-[1fr_400px] border-b-[3px] border-[#f5f5f0]">
          <div className="pt-32 pb-20 px-[5%] border-r-[3px] border-[#f5f5f0] flex flex-col justify-center">
             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[10px] tracking-[3px] text-[#ffe600] uppercase mb-6">
               Software Developer & AI/ML Engineer
             </motion.p>
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="font-bebas text-7xl md:text-[12rem] leading-[0.85] tracking-[-2px] mb-12"
             >
               <span className="block border-text-white text-transparent" style={{ WebkitTextStroke: '2px #f5f5f0' }}>
                 {data.personalInfo.fullName?.split(' ')[0].toUpperCase()}
               </span>
               <span className="block text-[#ffe600]">
                 {data.personalInfo.fullName?.split(' ').slice(1).join(' ').toUpperCase()}
               </span>
             </motion.h1>
             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-[#888] text-lg max-w-xl leading-relaxed mb-12 font-medium">
               {data.summary || "Implementing scalable enterprise software solutions with precision and high-level architectural standards."}
             </motion.p>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-0">
                <a href="#projects" className="px-10 py-5 bg-[#ffe600] border-2 border-[#ffe600] text-black font-mono text-[11px] font-bold uppercase tracking-[2px] transition-all hover:bg-transparent hover:text-[#ffe600]">
                  Browse Work
                </a>
                <a href="#contact" className="px-10 py-5 bg-transparent border-2 border-[#f5f5f0] text-[#f5f5f0] font-mono text-[11px] font-bold uppercase tracking-[2px] transition-all hover:bg-[#f5f5f0] hover:text-black">
                  Establish Link
                </a>
             </motion.div>
          </div>
          
          <div className="hidden md:flex flex-col justify-end p-10 space-y-0">
             {[
               { val: "5+", label: "Regional Deployments" },
               { val: "8+", label: "Tech Stacks" },
               { val: "86%", label: "Top Optimization" },
               { val: "99.9", label: "Logic Accuracy" }
             ].map(stat => (
               <div key={stat.label} className="py-6 border-t font-bebas text-[#ffe600] bg-[#0a0a0a] group hover:bg-[#ffe600] hover:text-black transition-all">
                  <div className="text-6xl leading-none">{stat.val}</div>
                  <div className="font-mono text-[9px] tracking-[2px] uppercase opacity-60 group-hover:opacity-100">{stat.label}</div>
               </div>
             ))}
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-32 px-[5%]">
        <div className="flex items-stretch border-2 border-[#f5f5f0] mb-16 overflow-hidden">
           <div className="bg-[#ffe600] text-black font-mono text-[10px] font-bold px-6 py-3 flex items-center border-r-2 border-[#f5f5f0]">01</div>
           <div className="px-6 py-3 font-mono text-[9px] tracking-[2px] uppercase text-[#888] flex items-center">Profile_Module</div>
        </div>
        
        <h2 className="font-bebas text-6xl md:text-8xl leading-none mb-10">
          <span className="text-transparent" style={{ WebkitTextStroke: '2px #f5f5f0' }}>About</span> Me
        </h2>
        <div className="w-20 h-1 bg-[#ffe600] mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
           <div className="space-y-8 text-[#aaa] text-base leading-relaxed font-normal">
              <p>{data.summary || "Systematic approach to software development, prioritizing scalability and maintainable architecture."}</p>
              <p>Specializing in enterprise environments, I bridge the gap between complex requirements and high-performance digital solutions.</p>
           </div>
           
           <div className="border-t border-[#f5f5f0]/10">
              {[
                { k: "Nodes", v: data.personalInfo.location || "REMOTE_NODE" },
                { k: "Role", v: data.personalInfo.jobTitle },
                { k: "Stack", v: "FULL_ENTERPRISE" },
                { k: "Uptime", v: "AVAILABLE", color: "text-[#ffe600]" }
              ].map(item => (
                <div key={item.k} className="flex justify-between items-center py-5 border-b border-[#f5f5f0]/10 group">
                   <span className="font-mono text-[10px] tracking-[2px] uppercase text-[#ffe600] group-hover:pl-2 transition-all">{item.k}</span>
                   <span className={`text-[12px] font-bold ${item.color || "text-[#ccc]"}`}>{item.v}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Skills Matrix */}
      {pData.sectionsVisibility.skills && data.skills.length > 0 && (
        <section id="skills" className="py-32 px-[5%] bg-[#111]">
          <div className="flex items-stretch border-2 border-[#f5f5f0] mb-16 overflow-hidden">
             <div className="bg-[#ffe600] text-black font-mono text-[10px] font-bold px-6 py-3 flex items-center border-r-2 border-[#f5f5f0]">02</div>
             <div className="px-6 py-3 font-mono text-[9px] tracking-[2px] uppercase text-[#888] flex items-center">Expertise_Graph</div>
          </div>
          
          <h2 className="font-bebas text-6xl md:text-8xl leading-none mb-10">
            Tech <span className="text-transparent" style={{ WebkitTextStroke: '2px #f5f5f0' }}>Stack</span>
          </h2>
          <div className="w-20 h-1 bg-[#ffe600] mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-[#f5f5f0]">
             {data.skills.map((skill, i) => (
                <div key={skill} className="p-10 border-r-2 border-b-2 border-[#f5f5f0] last:border-r-0 hover:bg-[#ffe600] hover:text-black transition-all group">
                   <div className="font-bebas text-2xl tracking-[2px] mb-4 text-[#ffe600] group-hover:text-black">CAPABILITY_{i + 1}</div>
                   <div className="font-mono text-[12px] font-bold uppercase tracking-widest">{skill}</div>
                </div>
             ))}
          </div>
        </section>
      )}

      {/* Projects Grid */}
      {pData.sectionsVisibility.projects && data.projects.length > 0 && (
        <section id="projects" className="py-32 px-[5%]">
           <div className="flex items-stretch border-2 border-[#f5f5f0] mb-16 overflow-hidden">
             <div className="bg-[#ffe600] text-black font-mono text-[10px] font-bold px-6 py-3 flex items-center border-r-2 border-[#f5f5f0]">03</div>
             <div className="px-6 py-3 font-mono text-[9px] tracking-[2px] uppercase text-[#888] flex items-center">Portfolio_Nodes</div>
          </div>
          
          <h2 className="font-bebas text-6xl md:text-8xl leading-none mb-10">
            Selected <span className="text-transparent" style={{ WebkitTextStroke: '2px #f5f5f0' }}>Works</span>
          </h2>
          <div className="w-20 h-1 bg-[#ffe600] mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-[#f5f5f0]">
             {data.projects.map((proj, i) => (
               <motion.div key={i} {...fadeIn} className="p-12 border-r-2 border-b-2 border-[#f5f5f0] last:border-r-0 relative group overflow-hidden">
                  <div className="font-bebas text-6xl text-[#ffe600]/10 absolute -top-4 -right-4 group-hover:text-[#ffe600]/20 transition-all">0{i+1}</div>
                  <h3 className="font-bebas text-3xl mb-6 text-white group-hover:text-[#ffe600] transition-colors">{proj.name}</h3>
                  <p className="text-[#888] text-sm leading-relaxed mb-10 font-medium">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {proj.technologies.map(tech => (
                      <span key={tech} className="font-mono text-[9px] border border-[#ffe600]/40 text-[#ffe600] px-3 py-1 uppercase">{tech}</span>
                    ))}
                  </div>
                  {proj.link && (
                    <a href={proj.link} className="inline-flex items-center gap-3 font-mono text-[10px] font-black uppercase text-white hover:text-[#ffe600] transition-all">
                      View Deployment <ArrowRight size={14} />
                    </a>
                  )}
               </motion.div>
             ))}
          </div>
        </section>
      )}

      {/* Experience Section */}
      {pData.sectionsVisibility.experience && data.experience.length > 0 && (
        <section id="experience" className="py-32 px-[5%] bg-[#111]">
           <div className="flex items-stretch border-2 border-[#f5f5f0] mb-16 overflow-hidden">
             <div className="bg-[#ffe600] text-black font-mono text-[10px] font-bold px-6 py-3 flex items-center border-r-2 border-[#f5f5f0]">04</div>
             <div className="px-6 py-3 font-mono text-[9px] tracking-[2px] uppercase text-[#888] flex items-center">Work_History</div>
          </div>

          <div className="space-y-px bg-[#f5f5f0] border-2 border-[#f5f5f0]">
             {data.experience.map((exp, i) => (
                <motion.div key={i} {...fadeIn} className="grid grid-cols-1 md:grid-cols-[200px_1fr] bg-[#0a0a0a]">
                   <div className="p-10 border-r-2 border-[#f5f5f0] bg-[#111] flex flex-col justify-center">
                      <div className="font-bebas text-5xl text-[#ffe600] leading-none mb-2">{exp.startDate.split(' ')[1] || exp.startDate}</div>
                      <div className="font-mono text-[10px] uppercase text-[#888]">Deployment_{i+1}</div>
                   </div>
                   <div className="p-12">
                      <h3 className="font-bebas text-3xl mb-1 text-white">{exp.position}</h3>
                      <div className="font-mono text-sm text-[#ffe600] uppercase mb-8">{exp.company}</div>
                      <p className="text-[#888] text-base leading-relaxed max-w-2xl italic">"{exp.description}"</p>
                   </div>
                </motion.div>
             ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      {pData.sectionsVisibility.contact && (
        <section id="contact" className="py-48 px-[5%] bg-[#ffe600] text-black">
           <div className="flex items-stretch border-2 border-black mb-16 overflow-hidden">
             <div className="bg-black text-[#ffe600] font-mono text-[10px] font-bold px-6 py-3 flex items-center border-r-2 border-black">05</div>
             <div className="px-6 py-3 font-mono text-[9px] tracking-[2px] uppercase text-black/60 flex items-center">Link_Protocol</div>
          </div>
          
          <h2 className="font-bebas text-6xl md:text-8xl leading-none mb-16">
            Get In <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Touch</span>
          </h2>

          <div className="border-4 border-black p-12 max-w-3xl group hover:bg-black transition-colors">
             <a 
               href={`mailto:${data.personalInfo.email}`} 
               className="font-bebas text-4xl md:text-7xl leading-none block mb-8 border-b-4 border-black group-hover:border-[#ffe600] group-hover:text-[#ffe600] transition-colors overflow-hidden text-ellipsis pb-4"
             >
               {data.personalInfo.email}
             </a>
             <div className="font-mono text-xl font-bold group-hover:text-[#ffe600]">
                {data.personalInfo.phone || "NODE_COMM_INACTIVE"}
             </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-[5%] border-t-[3px] border-[#f5f5f0] flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] text-[#888] uppercase tracking-[2px]">
         <span>{data.personalInfo.fullName} // PORTFOLIO_SUMMIT // © {new Date().getFullYear()}</span>
         <span className="text-[#ffe600]">SYSTEM_ORIGIN: BRUTALIST_ARCHITECTURE</span>
      </footer>
    </div>
  );
};
