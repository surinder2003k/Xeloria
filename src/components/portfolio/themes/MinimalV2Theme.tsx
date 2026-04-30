"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, ExternalLink } from "lucide-react";
import { ResumeData } from "@/lib/store";
import { PortfolioData } from "@/lib/portfolio-store";

export const PortfolioThemeMinimalV2 = ({ 
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
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  return (
    <div className="bg-[#fafafafa] min-h-screen text-[#111] font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background ambient gradient */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #000 0%, transparent 70%)' }}></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#fafafafa]/80 backdrop-blur-xl border-b border-black/[0.03]">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <span className="font-sans text-xl tracking-tighter font-extrabold uppercase">
            {data.personalInfo.fullName || username}
          </span>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[2px] text-[#666] uppercase">
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#work" className="hover:text-black transition-colors">Work</a>
            <a href="#experience" className="hover:text-black transition-colors">History</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {pData.sectionsVisibility.hero && (
        <section id="hero" className="min-h-screen flex items-center pt-24 px-6 lg:px-12 relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto w-full relative z-10">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-[#666] text-xs tracking-[4px] uppercase font-bold mb-6"
            >
              {data.personalInfo.jobTitle || "SOFTWARE DEVELOPER"}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-sans text-[clamp(4rem,10vw,10rem)] leading-[0.85] font-black tracking-tighter mb-8"
            >
              {data.personalInfo.fullName?.split(' ')[0]}<br />
              <span className="text-black/30">{data.personalInfo.fullName?.split(' ').slice(1).join(' ')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-[#666] max-w-2xl leading-relaxed font-light mb-12"
            >
              {data.summary || "Crafting digital systems with precision and purpose. Focused on clean architecture and meaningful user impact."}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 md:gap-6"
            >
              <a href="#work" className="px-6 md:px-8 py-4 bg-black text-white text-[11px] font-bold tracking-[2px] uppercase rounded-full hover:bg-black/80 hover:shadow-lg hover:shadow-black/20 transition-all text-center w-full sm:w-auto">
                View Work
              </a>
              <a href="#contact" className="px-6 md:px-8 py-4 border border-black/10 text-black text-[11px] font-bold tracking-[2px] uppercase rounded-full hover:border-black/30 transition-all hover:bg-black/5 text-center w-full sm:w-auto">
                Contact Me
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* About Section */}
      {pData.sectionsVisibility.hero && (
        <section id="about" className="py-32 px-6 lg:px-12 border-b border-[#e8e8e4]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-1 text-[10px] font-bold tracking-[4px] text-[#888] uppercase pt-2">
              01 / About
            </div>
            <div className="lg:col-span-6">
              <motion.h2 {...fadeIn} className="font-serif text-4xl md:text-6xl font-light leading-tight mb-8">
                Building the future of the web through <span className="italic font-black decoration-indigo-600 decoration-4 underline-offset-8 underline">elegant engineering</span> and clean code.
              </motion.h2>
              <motion.p {...fadeIn} className="text-xl text-[#888] leading-relaxed mb-6 font-light">
                {data.summary || "Building the future of the web through elegant engineering and clean code."}
              </motion.p>
            </div>
            <div className="lg:col-span-5">
               <ul className="space-y-6">
                 {[
                   { label: "Focus", val: data.personalInfo.jobTitle },
                   { label: "Location", val: data.personalInfo.location },
                   { label: "Experience", val: data.experience[0]?.company || "Available" },
                   { label: "Email", val: data.personalInfo.email },
                 ].map((item, i) => (
                   <motion.li 
                      key={i} 
                      {...fadeIn} 
                      transition={{ delay: i * 0.1 }}
                      className="flex justify-between py-4 border-b border-[#e8e8e4] text-sm"
                   >
                     <span className="text-[#888] uppercase tracking-[2px] text-[10px] font-bold">{item.label}</span>
                     <span className="font-medium">{item.val}</span>
                   </motion.li>
                 ))}
               </ul>
            </div>
          </div>
        </section>
      )}

      {/* Skills / Stack */}
      {pData.sectionsVisibility.skills && (
        <section id="skills" className="py-32 px-6 lg:px-12 border-b border-[#e8e8e4] bg-white">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-1 text-[10px] font-bold tracking-[4px] text-[#888] uppercase pt-2">
              02 / Stack
            </div>
            <div className="lg:col-span-11 grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
              {data.skills.map((skillGroup, idx) => (
                <div key={idx} className="space-y-6">
                  <h3 className="text-indigo-600 text-[10px] font-bold tracking-[4px] uppercase">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    {skillGroup.items?.map(item => (
                      <span key={item} className="text-2xl font-serif font-light italic text-[#1a1a1a]">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Work Section */}
      {pData.sectionsVisibility.projects && (
        <section id="work" className="py-32 px-6 lg:px-12 border-b border-[#e8e8e4]">
          <div className="max-w-[1400px] mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                <div className="lg:col-span-1 text-[10px] font-bold tracking-[4px] text-[#888] uppercase pt-2">
                  03 / Work
                </div>
                <div className="lg:col-span-8">
                   <h2 className="font-serif text-5xl md:text-7xl font-black tracking-tighter">Selected <span className="italic font-light">Deployments.</span></h2>
                </div>
             </div>

             <div className="divide-y divide-[#e8e8e4] border-t border-[#e8e8e4]">
                {data.projects.map((proj, i) => (
                  <motion.div 
                    key={i}
                    {...fadeIn}
                    className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 py-16 group cursor-default"
                  >
                    <div className="md:col-span-1 text-[10px] font-bold text-[#888] pt-2">2024</div>
                    <div className="md:col-span-7">
                      <h3 className="font-serif text-3xl md:text-5xl font-black mb-6 group-hover:text-indigo-600 transition-colors uppercase tracking-tight italic">
                        {proj.name}
                      </h3>
                      <p className="text-[#888] max-w-xl text-lg leading-relaxed font-light">
                        {proj.description}
                      </p>
                    </div>
                    <div className="md:col-span-4 flex flex-col justify-between items-end">
                       <span className="text-indigo-600 font-bold text-[10px] tracking-[4px] uppercase text-right leading-loose">
                          {proj.technologies.join(' · ')}
                       </span>
                       <a href={proj.link} className="w-12 h-12 rounded-full border border-[#e8e8e4] flex items-center justify-center hover:bg-black hover:text-white transition-all mt-8 group-hover:scale-110">
                          <ArrowUpRight className="w-5 h-5" />
                       </a>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {pData.sectionsVisibility.experience && (
        <section id="experience" className="py-32 px-6 lg:px-12 border-b border-[#e8e8e4] bg-white">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-1 text-[10px] font-bold tracking-[4px] text-[#888] uppercase pt-2">
              04 / History
            </div>
            <div className="lg:col-span-11 space-y-24">
              {data.experience.map((exp, i) => (
                <motion.div 
                   key={i}
                   {...fadeIn}
                   className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                >
                  <div className="space-y-4">
                    <p className="text-[10px] tracking-[4px] font-bold text-[#888]">{exp.startDate.toUpperCase()} — {exp.endDate.toUpperCase()}</p>
                    <h3 className="font-serif text-4xl font-extrabold italic">{exp.position}</h3>
                    <p className="text-indigo-600 font-bold text-sm tracking-tight uppercase">{exp.company}</p>
                  </div>
                  <div className="text-lg text-[#888] leading-relaxed font-light border-t border-[#e8e8e4] pt-8">
                    {exp.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <footer id="contact" className="py-32 px-6 lg:px-12 text-center bg-black text-white relative">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
           <motion.p {...fadeIn} className="text-[#888] text-[11px] tracking-[6px] uppercase font-bold">Currently Available</motion.p>
           <motion.h2 {...fadeIn} className="font-sans text-5xl md:text-[6rem] font-black tracking-tighter leading-[0.9] uppercase">
             Let's Create <br /> <span className="text-white/40">Something.</span>
           </motion.h2>
           <div className="pt-12">
              <a href={`mailto:${data.personalInfo.email}`} className="inline-block text-xl md:text-3xl font-bold bg-[#222] hover:bg-[#333] px-8 py-5 rounded-full transition-all text-white">
                {data.personalInfo.email}
              </a>
           </div>
           
           <div className="flex justify-center gap-12 pt-24">
              {pData.socialLinks.linkedin && <a href={pData.socialLinks.linkedin.startsWith('http') ? pData.socialLinks.linkedin : `https://${pData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold tracking-[3px] text-[#888] uppercase hover:text-white transition-colors">LinkedIn</a>}
              {pData.socialLinks.github && <a href={pData.socialLinks.github.startsWith('http') ? pData.socialLinks.github : `https://${pData.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold tracking-[3px] text-[#888] uppercase hover:text-white transition-colors">GitHub</a>}
              {pData.socialLinks.twitter && <a href={pData.socialLinks.twitter.startsWith('http') ? pData.socialLinks.twitter : `https://${pData.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold tracking-[3px] text-[#888] uppercase hover:text-white transition-colors">Twitter</a>}
           </div>

           <div className="pt-32 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-[2px] text-[#444] uppercase">
             <span>{data.personalInfo.fullName} © {new Date().getFullYear()}</span>
             <span className="text-white/40">Xeloria Platform</span>
           </div>
        </div>
      </footer>
    </div>
  );
};
