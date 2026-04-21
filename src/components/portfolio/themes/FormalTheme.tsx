"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink, Briefcase, GraduationCap, Phone, MapPin } from "lucide-react";
import { ResumeData } from "@/lib/store";
import { PortfolioData } from "@/lib/portfolio-store";

export const PortfolioThemeFormal = ({ 
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
    <div className="bg-[#0d1b2a] min-h-screen text-[#f5f1eb] font-sans selection:bg-[#c9a84c] selection:text-[#0d1b2a] scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0d1b2a] border-b border-[#2a3d52]">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-serif text-lg tracking-[2px] text-[#c9a84c] uppercase font-bold">
            {data.personalInfo.fullName || username}
          </span>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-[2px] text-[#8899aa] uppercase">
            {pData.sectionsVisibility.hero && <a href="#hero" className="hover:text-[#c9a84c] transition-colors">Home</a>}
            {pData.sectionsVisibility.experience && <a href="#experience" className="hover:text-[#c9a84c] transition-colors">Career</a>}
            {pData.sectionsVisibility.projects && <a href="#projects" className="hover:text-[#c9a84c] transition-colors">Portfolio</a>}
            {pData.sectionsVisibility.contact && <a href="#contact" className="hover:text-[#c9a84c] transition-colors">Contact</a>}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {pData.sectionsVisibility.hero && (
        <section id="hero" className="min-h-screen flex items-center pt-20 px-6 relative overflow-hidden bg-gradient-to-br from-[#0d1b2a] to-[#1b2d42]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,168,76,0.08)_0%,transparent_60%)]" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-16 h-[3px] bg-[#c9a84c] mb-10" 
            />
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#c9a84c] text-[10px] tracking-[4px] uppercase font-bold mb-6"
            >
              {data.personalInfo.jobTitle || "Professional Portfolio"}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-serif text-6xl md:text-8xl font-bold text-white leading-[1.1] mb-8"
            >
              {data.personalInfo.fullName?.split(' ')[0]}<br />
              <span className="text-[#c9a84c]">
                {data.personalInfo.fullName?.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="max-w-xl text-[#aab8c6] text-lg leading-relaxed mb-12"
            >
              {data.summary || "Building efficient, scalable software solutions with a focus on enterprise-grade implementations and clean architecture."}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              <a href="#projects" className="px-10 py-4 bg-[#c9a84c] text-[#0d1b2a] font-bold text-[10px] tracking-[2px] uppercase hover:bg-[#e8c97a] transition-all">
                View Work
              </a>
              <a href="#contact" className="px-10 py-4 border border-[#c9a84c] text-[#c9a84c] font-bold text-[10px] tracking-[2px] uppercase hover:bg-[#c9a84c]/10 transition-all">
                Contact Me
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-[#0d1b2a]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[#c9a84c] text-[10px] tracking-[4px] uppercase mb-4">Profile</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8">About Me</h2>
          <div className="w-12 h-[2px] bg-[#c9a84c] mb-12" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-6 text-[#aab8c6] text-lg leading-relaxed">
              <p>{data.summary || "I am a dedicated professional with a passion for building scalable solutions."}</p>
              <ul className="space-y-4 pt-10 border-t border-[#2a3d52]">
                {[
                  { k: "Location", v: data.personalInfo.location || "Available Worldwide" },
                  { k: "Email", v: data.personalInfo.email },
                  { k: "Phone", v: data.personalInfo.phone || "On Request" }
                ].map(item => (
                  <li key={item.k} className="flex justify-between items-center py-3 border-b border-[#2a3d52]/50">
                    <span className="text-[10px] text-[#8899aa] uppercase tracking-[2px] font-bold">{item.k}</span>
                    <span className="text-white font-medium">{item.v}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1b2d42] border border-[#2a3d52] p-12 relative">
               <div className="absolute top-0 left-0 w-2 h-full bg-[#c9a84c]" />
               <h3 className="text-[#c9a84c] text-[10px] tracking-[4px] uppercase font-bold mb-8">Current Status</h3>
               <p className="text-2xl font-serif italic text-white leading-relaxed">
                 "{data.personalInfo.jobTitle || "Crafting digital experiences with precision."}"
               </p>
               <p className="mt-4 text-[#c9a84c] text-[10px] tracking-[2px] uppercase font-bold">Available for Projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      {pData.sectionsVisibility.experience && data.experience.length > 0 && (
        <section id="experience" className="py-32 px-6 bg-[#1b2d42]">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#c9a84c] text-[10px] tracking-[4px] uppercase mb-4">History</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-12">Professional Experience</h2>
            
            <div className="border-l-[2px] border-[#c9a84c] pl-10 space-y-20">
              {data.experience.map((exp, i) => (
                <motion.div 
                  key={i} 
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[3.15rem] top-2 w-4 h-4 rounded-full bg-[#c9a84c] border-[3px] border-[#1b2d42]" />
                  <p className="text-[#c9a84c] text-[10px] tracking-[2px] uppercase font-bold mb-4">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </p>
                  <h3 className="font-serif text-3xl text-white mb-2">{exp.position}</h3>
                  <p className="text-[#e8c97a] text-xs font-bold uppercase tracking-[2px] mb-6">{exp.company}</p>
                  <p className="text-[#8899aa] text-lg leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      {pData.sectionsVisibility.projects && data.projects.length > 0 && (
        <section id="projects" className="py-32 px-6 bg-[#0d1b2a]">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-[#c9a84c] text-[10px] tracking-[4px] uppercase mb-4">Portfolio</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-16">Selected Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {data.projects.map((proj, i) => (
                <motion.div 
                  key={i} 
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-[#1b2d42] border border-[#2a3d52] p-12 relative overflow-hidden transition-all hover:border-[#c9a84c]"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-[#c9a84c] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <p className="text-[#c9a84c] text-[10px] tracking-[2px] uppercase font-bold mb-6">Project {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="font-serif text-3xl text-white mb-6 group-hover:text-[#c9a84c] transition-colors">{proj.name}</h3>
                  <p className="text-[#8899aa] leading-relaxed mb-10 text-lg">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {proj.technologies.map(tech => (
                      <span key={tech} className="px-4 py-1.5 border border-[#2a3d52] text-[#8899aa] text-[10px] font-bold uppercase tracking-widest group-hover:border-[#c9a84c]/30 group-hover:text-[#c9a84c]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {proj.link && (
                    <a href={proj.link} className="text-white text-xs font-bold uppercase tracking-[2px] flex items-center gap-3 group-hover:text-[#c9a84c] transition-colors border-b border-white/10 pb-2 w-fit">
                      View Project <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {pData.sectionsVisibility.education && data.education.length > 0 && (
         <section id="education" className="py-32 px-6 bg-[#1b2d42]">
           <div className="max-w-[1400px] mx-auto">
             <p className="text-[#c9a84c] text-[10px] tracking-[4px] uppercase mb-4">Academic</p>
             <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-16">Education</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {data.education.map((edu, i) => (
                 <div key={i} className="border border-[#2a3d52] p-8 hover:border-[#c9a84c] transition-colors">
                    <div className="text-2xl mb-4">🎓</div>
                    <div className="font-bold text-white mb-2">{edu.degree}</div>
                    <div className="text-sm text-[#8899aa] mb-4">{edu.school} · {edu.duration}</div>
                    {edu.score && <span className="px-3 py-1 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-xs font-bold">{edu.score}</span>}
                 </div>
               ))}
             </div>
           </div>
         </section>
      )}

      {/* Skills Bar Chart */}
      {pData.sectionsVisibility.skills && data.skills.length > 0 && (
        <section id="skills" className="py-32 px-6 bg-[#0d1b2a]">
          <div className="max-w-4xl mx-auto">
            <p className="text-[#c9a84c] text-[10px] tracking-[4px] uppercase mb-4">Expertise</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-16">Technical Mastery</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
              {data.skills.map((skill, i) => (
                <div key={skill} className="space-y-4">
                  <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-[2px] text-[#aab8c6]">
                    <span>{skill}</span>
                    <span className="text-[#c9a84c]">Expert</span>
                  </div>
                  <div className="h-[2px] bg-[#2a3d52] relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute h-full bg-[#c9a84c]" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {pData.sectionsVisibility.contact && (
        <section id="contact" className="py-40 px-6 bg-[#1b2d42]/50 text-center border-t border-[#2a3d52]">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-6">
              <p className="text-[#c9a84c] text-[10px] tracking-[6px] uppercase font-bold">Contact</p>
              <h2 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight">Get In Touch</h2>
              <div className="w-16 h-[2px] bg-[#c9a84c] mx-auto" />
            </div>
            
            <p className="text-[#aab8c6] text-xl leading-relaxed italic max-w-xl mx-auto font-serif">
              "Professional consultation and project inquiries are always welcome. Let's discuss your next engineering challenge."
            </p>

            <a 
              href={`mailto:${data.personalInfo.email}`} 
              className="font-serif text-3xl md:text-5xl text-[#c9a84c] hover:text-[#e8c97a] transition-all underline decoration-1 underline-offset-[12px] block pt-10"
            >
              {data.personalInfo.email}
            </a>

            <div className="flex justify-center gap-12 pt-20 border-t border-[#2a3d52]">
              {pData.socialLinks.linkedin && (
                <a href={pData.socialLinks.linkedin} className="text-[#8899aa] hover:text-[#c9a84c] uppercase text-[10px] tracking-[3px] font-bold transition-all">LinkedIn</a>
              )}
              {pData.socialLinks.github && (
                <a href={pData.socialLinks.github} className="text-[#8899aa] hover:text-[#c9a84c] uppercase text-[10px] tracking-[3px] font-bold transition-all">GitHub</a>
              )}
              {pData.socialLinks.twitter && (
                <a href={pData.socialLinks.twitter} className="text-[#8899aa] hover:text-[#c9a84c] uppercase text-[10px] tracking-[3px] font-bold transition-all">Twitter</a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 bg-[#0d1b2a] px-6 border-t border-[#2a3d52]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] tracking-[4px] font-bold uppercase text-[#8899aa]">
          <span>{data.personalInfo.fullName} © {new Date().getFullYear()}</span>
          <span className="text-[#c9a84c]">Executive Series · Xeloria</span>
        </div>
      </footer>
    </div>
  );
};
