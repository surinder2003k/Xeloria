"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink, Briefcase, GraduationCap, Phone, MapPin, Globe } from "lucide-react";
import { ResumeData } from "@/lib/store";
import { PortfolioData } from "@/lib/portfolio-store";

export const PortfolioThemeMagazine = ({ 
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
    transition: { duration: 0.8 }
  };

  return (
    <div className="bg-[#f8f4ee] min-h-screen text-[#2d1f0e] font-sans selection:bg-[#c4522a] selection:text-white scroll-smooth uppercase-links">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#f8f4ee] border-b border-[#ddd5c8]">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <span className="font-serif text-2xl font-bold tracking-tight text-[#1c1209]">
            {data.personalInfo.fullName?.split(' ')[0]} <em className="not-italic text-[#c4522a]">{data.personalInfo.fullName?.split(' ').slice(1).join(' ')}</em>
          </span>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-[2px] text-[#9a8070] uppercase">
            {pData.sectionsVisibility.hero && <a href="#hero" className="hover:text-[#c4522a] transition-colors">Front</a>}
            {pData.sectionsVisibility.experience && <a href="#experience" className="hover:text-[#c4522a] transition-colors">Feature</a>}
            {pData.sectionsVisibility.projects && <a href="#projects" className="hover:text-[#c4522a] transition-colors">Portfolio</a>}
            {pData.sectionsVisibility.contact && <a href="#contact" className="hover:text-[#c4522a] transition-colors">Connect</a>}
          </div>
        </div>
      </nav>

      {/* Hero Section — Magazine Split */}
      {pData.sectionsVisibility.hero && (
        <section id="hero" className="min-h-screen grid grid-cols-1 md:grid-cols-2 pt-20">
          <div className="bg-[#1c1209] p-12 md:p-24 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute bottom-[-5rem] right-[-2rem] font-serif text-[25rem] font-black text-white/5 leading-none pointer-events-none select-none">
               {data.personalInfo.fullName?.[0]}
             </div>
             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#e8724a] text-[10px] tracking-[5px] uppercase font-bold mb-12">
               Portfolio — Issue {new Date().getFullYear()}
             </motion.p>
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="font-serif text-6xl md:text-9xl font-light text-white leading-[0.95] mb-8 tracking-tighter"
             >
               {data.personalInfo.fullName?.split(' ')[0]}<br />
               <span className="italic text-[#e8724a]">
                 {data.personalInfo.fullName?.split(' ').slice(1).join(' ')}
               </span>
             </motion.h1>
             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[#9a8070] text-sm tracking-[2px] uppercase font-medium">
               {data.personalInfo.jobTitle || "Creative Director & Engineer"}
             </motion.p>
          </div>
          
          <div className="bg-[#f0e8dc] p-12 md:p-24 flex flex-col justify-center">
             <motion.blockquote initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-serif text-2xl md:text-3xl italic leading-relaxed text-[#2d1f0e] border-l-4 border-[#c4522a] pl-8 mb-12">
               "{data.summary || "Crafting digital narratives through sophisticated engineering and elegant design principles."}"
             </motion.blockquote>
             
             <div className="space-y-6 mb-12">
               {[
                 { k: "Role", v: data.personalInfo.jobTitle },
                 { k: "Focus", v: data.skills.slice(0, 3).join(" · ") },
                 { k: "Location", v: data.personalInfo.location || "Remote Node" }
               ].map(item => (
                 <div key={item.k} className="flex items-baseline gap-6 py-3 border-b border-[#ddd5c8] first:border-t">
                    <span className="text-[10px] tracking-[2px] uppercase text-[#9a8070] w-20 flex-shrink-0">{item.k}</span>
                    <span className="text-sm font-medium text-[#1c1209]">{item.v}</span>
                 </div>
               ))}
             </div>

             <div className="flex gap-4">
                <a href="#projects" className="px-8 py-4 bg-[#c4522a] text-white text-[10px] tracking-[2px] uppercase font-bold hover:bg-[#e8724a] transition-all">
                  Browse Works
                </a>
                <a href="#contact" className="px-8 py-4 border border-[#1c1109] text-[#1c1109] text-[10px] tracking-[2px] uppercase font-bold hover:bg-[#1c1109] hover:text-white transition-all">
                  Get In Touch
                </a>
             </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-start gap-12 mb-20">
             <div className="font-serif text-8xl font-light text-[#ddd5c8] leading-none">01</div>
             <div className="pt-4">
                <p className="text-[#c4522a] text-[10px] tracking-[4px] uppercase mb-2">Profile</p>
                <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">About <em className="italic text-[#c4522a] font-normal">Me</em></h2>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
             <div className="space-y-8">
                <p className="font-serif text-2xl italic leading-relaxed text-[#1c1209]">
                  {data.summary?.split('.')[0]}.
                </p>
                <div className="text-sm leading-relaxed text-[#9a8070] space-y-4">
                   <p>{data.summary || "Building the future of digital interaction with a focus on simplicity and professional excellence."}</p>
                </div>
             </div>
             <div className="space-y-12">
                <div className="border-t-4 border-[#1c1209] border-b border-[#ddd5c8] py-8">
                   <p className="font-serif text-2xl italic text-[#1c1209] leading-tight">
                     "Sophisticated systems require elegant implementation — this is my professional mantra."
                   </p>
                </div>
                <div className="grid grid-cols-1 gap-4 text-[10px] font-bold tracking-[2px] uppercase text-[#9a8070]">
                   {data.personalInfo.email && <p>Email: <span className="text-[#1c1209] ml-2">{data.personalInfo.email}</span></p>}
                   {data.personalInfo.phone && <p>Phone: <span className="text-[#1c1209] ml-2">{data.personalInfo.phone}</span></p>}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Skills Layout */}
      {pData.sectionsVisibility.skills && data.skills.length > 0 && (
        <section id="skills" className="py-32 px-6 bg-[#f0e8dc]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-start gap-12 mb-20">
               <div className="font-serif text-8xl font-light text-[#ddd5c8] leading-none">02</div>
               <div className="pt-4">
                  <p className="text-[#c4522a] text-[10px] tracking-[4px] uppercase mb-2">Expertise</p>
                  <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">Technical <em className="italic text-[#c4522a] font-normal">Skills</em></h2>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
               <p className="text-sm text-[#9a8070] leading-relaxed italic">
                 "A curated selection of technical proficiencies developed through rigorous project execution and continuous learning."
               </p>
               <div className="md:col-span-2">
                 <table className="w-full">
                    <tbody>
                      {data.skills.map((skill, i) => (
                        <tr key={skill} className="border-b border-[#ddd5c8] first:border-t">
                          <td className="py-6 text-[10px] tracking-[2px] uppercase font-bold text-[#9a8070] w-48">Skill_Node {i + 1}</td>
                          <td className="py-6 text-sm font-medium text-[#1c1209]">{skill}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Editorial */}
      {pData.sectionsVisibility.projects && data.projects.length > 0 && (
        <section id="projects" className="py-32 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-start gap-12 mb-20">
               <div className="font-serif text-8xl font-light text-[#ddd5c8] leading-none">03</div>
               <div className="pt-4">
                  <p className="text-[#c4522a] text-[10px] tracking-[4px] uppercase mb-2">Portfolio</p>
                  <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">Featured <em className="italic text-[#c4522a] font-normal">Works</em></h2>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#ddd5c8] border border-[#ddd5c8]">
              {data.projects.map((proj, i) => (
                <motion.div key={i} {...fadeIn} className="bg-[#f8f4ee] p-12 hover:bg-[#f0e8dc] transition-colors group">
                   <p className="text-[#c4522a] text-[10px] tracking-[3px] uppercase font-bold mb-4">Article {i + 1}</p>
                   <h3 className="font-serif text-3xl font-light mb-6 text-[#1c1209] group-hover:italic transition-all">{proj.name}</h3>
                   <p className="text-sm text-[#9a8070] leading-relaxed mb-8 h-24 overflow-hidden">{proj.description}</p>
                   <div className="flex flex-wrap gap-2 mb-8">
                     {proj.technologies.slice(0, 4).map(tech => (
                       <span key={tech} className="text-[9px] tracking-[1px] uppercase border border-[#ddd5c8] px-3 py-1 text-[#9a8070] group-hover:border-[#c4522a] group-hover:text-[#c4522a] transition-colors">
                         {tech}
                       </span>
                     ))}
                   </div>
                   {proj.link && (
                     <a href={proj.link} className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[2px] uppercase text-[#1c1209] border-b border-[#1c1209] pb-1 hover:border-[#c4522a] hover:text-[#c4522a] transition-all">
                       Read Case Study <ExternalLink size={12} />
                     </a>
                   )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {pData.sectionsVisibility.experience && data.experience.length > 0 && (
        <section id="experience" className="py-32 px-6 bg-[#f0e8dc]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-start gap-12 mb-20">
               <div className="font-serif text-8xl font-light text-[#ddd5c8] leading-none">04</div>
               <div className="pt-4">
                  <p className="text-[#c4522a] text-[10px] tracking-[4px] uppercase mb-2">Career</p>
                  <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">Work <em className="italic text-[#c4522a] font-normal">History</em></h2>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
               <div className="md:col-span-1">
                  <h3 className="font-serif text-3xl italic font-light text-[#1c1209] mb-6">A proven track record of excellence.</h3>
                  <p className="text-sm text-[#9a8070] leading-relaxed">
                    Collaborating with industry leaders to deliver high-performance solutions and enterprise-grade software.
                  </p>
               </div>
               <div className="md:col-span-2 space-y-px bg-[#ddd5c8]">
                  {data.experience.map((exp, i) => (
                    <motion.div key={i} {...fadeIn} className="bg-[#f0e8dc] py-10 first:pt-0">
                       <div className="flex justify-between items-baseline border-b border-[#ddd5c8] pb-4 mb-6">
                          <div>
                             <h4 className="font-bold text-sm text-[#1c1209]">{exp.position}</h4>
                             <p className="text-xs text-[#c4522a] mt-1 italic">{exp.company}</p>
                          </div>
                          <span className="text-[10px] font-bold text-[#9a8070] tracking-[1px]">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                       </div>
                       <p className="text-sm text-[#9a8070] leading-relaxed max-w-xl">{exp.description}</p>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {pData.sectionsVisibility.contact && (
        <section id="contact" className="py-40 px-6 bg-[#1c1209] text-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-start gap-12 mb-20">
               <div className="font-serif text-8xl font-light text-white/5 leading-none">05</div>
               <div className="pt-4">
                  <p className="text-[#e8724a] text-[10px] tracking-[4px] uppercase mb-2">Connect</p>
                  <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight text-white">Get In <em className="italic text-[#e8724a] font-normal">Touch</em></h2>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
               <div className="space-y-12">
                  <p className="font-serif text-3xl md:text-4xl italic font-light text-[#f0e8dc] leading-tight">
                    "Open to collaboration on projects that demand creative engineering and strategic thinking."
                  </p>
                  <ul className="space-y-4 text-[10px] tracking-[2px] uppercase font-bold text-[#9a8070]">
                     <li className="flex gap-10 border-b border-white/5 pb-4">
                        <span className="text-white w-20">Email</span>
                        <a href={`mailto:${data.personalInfo.email}`} className="text-[#e8724a] hover:text-white transition-colors">{data.personalInfo.email}</a>
                     </li>
                     <li className="flex gap-10 border-b border-white/5 pb-4">
                        <span className="text-white w-20">Phone</span>
                        <span className="text-[#f0e8dc]">{data.personalInfo.phone || "On Request"}</span>
                     </li>
                     <li className="flex gap-10 border-b border-white/5 pb-4">
                        <span className="text-white w-20">Social</span>
                        <div className="flex gap-4">
                           {pData.socialLinks.linkedin && <a href={pData.socialLinks.linkedin} className="text-[#f0e8dc] hover:text-[#e8724a]">IN</a>}
                           {pData.socialLinks.github && <a href={pData.socialLinks.github} className="text-[#f0e8dc] hover:text-[#e8724a]">GH</a>}
                        </div>
                     </li>
                  </ul>
               </div>
               <div className="flex flex-col items-end">
                  <a href={`mailto:${data.personalInfo.email}`} className="font-serif text-4xl md:text-6xl italic text-[#e8724a] hover:text-white transition-all border-b border-[#e8724a]/30 pb-4 mb-10 w-full text-right">
                    Say Hello →
                  </a>
                  <p className="text-[10px] text-[#9a8070] italic tracking-[1px] text-right">Prompt response guaranteed for professional inquiries.</p>
               </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#ddd5c8] bg-[#f8f4ee]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-[10px] tracking-[2px] uppercase font-bold text-[#9a8070]">
          <p>{data.personalInfo.fullName} © {new Date().getFullYear()}</p>
          <p className="text-[#c4522a]">Magazine Series · Xeloria</p>
        </div>
      </footer>
    </div>
  );
};
