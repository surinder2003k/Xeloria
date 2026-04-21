"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink, Briefcase, GraduationCap, Phone, MapPin, Globe } from "lucide-react";
import { ResumeData } from "@/lib/store";
import { PortfolioData } from "@/lib/portfolio-store";

export const PortfolioThemeMinimal = ({ 
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
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-slate-900 selection:text-white scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">
            {data.personalInfo.fullName || username}
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            {pData.sectionsVisibility.hero && <a href="#hero" className="hover:text-slate-900 transition-colors">Home</a>}
            {pData.sectionsVisibility.experience && <a href="#experience" className="hover:text-slate-900 transition-colors">Experience</a>}
            {pData.sectionsVisibility.projects && <a href="#projects" className="hover:text-slate-900 transition-colors">Projects</a>}
            {pData.sectionsVisibility.contact && <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {pData.sectionsVisibility.hero && (
        <section id="hero" className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-8">
              {data.personalInfo.jobTitle || "Creative Professional"}
            </h1>
            <p className="max-w-2xl text-xl text-slate-500 leading-relaxed mb-12">
              {data.summary || "Focused on building elegant solutions and meaningful digital experiences."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="px-8 py-4 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-all">
                View Projects
              </a>
              <div className="flex gap-4 items-center px-4">
                {pData.socialLinks.linkedin && <a href={pData.socialLinks.linkedin} className="text-slate-400 hover:text-slate-900 transition-colors"><Linkedin size={24}/></a>}
                {pData.socialLinks.github && <a href={pData.socialLinks.github} className="text-slate-400 hover:text-slate-900 transition-colors"><Github size={24}/></a>}
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Experience Section */}
      {pData.sectionsVisibility.experience && data.experience.length > 0 && (
        <section id="experience" className="py-32 px-6 max-w-6xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-16">Experience</h2>
          <div className="space-y-24">
            {data.experience.map((exp, i) => (
              <motion.div key={i} {...fadeIn} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                  <p className="text-slate-400 font-medium">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</p>
                </div>
                <div className="md:col-span-8">
                  <h3 className="text-2xl font-bold mb-2">{exp.position}</h3>
                  <p className="text-lg font-medium text-slate-600 mb-4">{exp.company}</p>
                  <p className="text-slate-500 leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {pData.sectionsVisibility.projects && data.projects.length > 0 && (
        <section id="projects" className="py-32 px-6 max-w-6xl mx-auto border-t border-slate-100">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-16">Selected Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {data.projects.map((proj, i) => (
              <motion.div key={i} {...fadeIn} className="group">
                <div className="aspect-video bg-slate-100 rounded-2xl mb-8 overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold text-4xl group-hover:scale-110 transition-transform">
                     {proj.name[0]}
                   </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  {proj.name}
                  {proj.link && <a href={proj.link}><ExternalLink size={18} className="text-slate-400 hover:text-slate-900"/></a>}
                </h3>
                <p className="text-slate-500 leading-relaxed mb-6">{proj.description}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {pData.sectionsVisibility.skills && data.skills.length > 0 && (
        <section id="skills" className="py-32 px-6 max-w-6xl mx-auto border-t border-slate-100">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-16">Expertise</h2>
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            {data.skills.map((skill, i) => (
              <motion.div key={skill} {...fadeIn} className="text-3xl md:text-5xl font-bold text-slate-200 hover:text-slate-900 transition-colors cursor-default">
                {skill}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      {pData.sectionsVisibility.contact && (
        <section id="contact" className="py-40 px-6 max-w-6xl mx-auto border-t border-slate-100 text-center">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-12">Let's work together.</h2>
          <a href={`mailto:${data.personalInfo.email}`} className="text-2xl md:text-4xl text-slate-500 hover:text-slate-900 transition-colors border-b-2 border-slate-200 hover:border-slate-900 pb-2">
            {data.personalInfo.email}
          </a>
          <div className="mt-20 flex justify-center gap-12 text-slate-400 font-medium">
             {pData.socialLinks.twitter && <a href={pData.socialLinks.twitter} className="hover:text-slate-900 transition-colors">Twitter</a>}
             {pData.socialLinks.linkedin && <a href={pData.socialLinks.linkedin} className="hover:text-slate-900 transition-colors">LinkedIn</a>}
             {pData.socialLinks.github && <a href={pData.socialLinks.github} className="hover:text-slate-900 transition-colors">GitHub</a>}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} {data.personalInfo.fullName}</p>
          <p>Xeloria Minimal</p>
        </div>
      </footer>
    </div>
  );
};
