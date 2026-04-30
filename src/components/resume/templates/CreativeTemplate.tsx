import { ResumeData } from "@/lib/store";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter, Award, Briefcase, GraduationCap, User } from "lucide-react";

export const CreativeTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="bg-white shadow-lg min-h-[1122px] w-[794px] text-slate-900 border border-slate-200 flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-slate-900 text-white p-8">
        {data.personalInfo.avatar ? (
          <img 
            src={data.personalInfo.avatar} 
            alt={data.personalInfo.fullName} 
            className="w-32 h-32 rounded-full mb-6 mx-auto object-cover border-4 border-indigo-600"
          />
        ) : (
          <div className="h-32 w-32 bg-indigo-600 rounded-full mb-6 mx-auto flex items-center justify-center text-5xl font-bold">
            {data.personalInfo.fullName ? data.personalInfo.fullName.charAt(0) : "U"}
          </div>
        )}
        
        <div className="space-y-6">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4 border-b border-white/10 pb-2">Contact</h2>
            <div className="space-y-3 text-xs">
              {data.personalInfo.email && (
                <a href={`mailto:${data.personalInfo.email}`} className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                  <Mail className="h-3 w-3" /> {data.personalInfo.email}
                </a>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" /> {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" /> {data.personalInfo.location}
                </div>
              )}
              {data.personalInfo.website && (
                <a href={data.personalInfo.website.startsWith('http') ? data.personalInfo.website : `https://${data.personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                  <Globe className="h-3 w-3" /> Website
                </a>
              )}
              {data.personalInfo.linkedin && (
                <a href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                  <Linkedin className="h-3 w-3" /> LinkedIn
                </a>
              )}
              {data.personalInfo.github && (
                <a href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                  <Github className="h-3 w-3" /> GitHub
                </a>
              )}
              {data.personalInfo.twitter && (
                <a href={data.personalInfo.twitter.startsWith('http') ? data.personalInfo.twitter : `https://${data.personalInfo.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                  <Twitter className="h-3 w-3" /> Twitter
                </a>
              )}
            </div>
          </section>

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4 border-b border-white/10 pb-2">Skills</h2>
                {data.skills.map((skill, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-tighter mb-1.5">{skill.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.items.map((item, j) => (
                        <span key={j} className="text-[10px] bg-indigo-600/20 text-indigo-100 px-2 py-0.5 rounded border border-indigo-600/30">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </section>
          )}

          {data.certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4 border-b border-white/10 pb-2">Awards</h2>
              <div className="space-y-3">
                {data.certifications.map((cert, i) => (
                  <div key={i} className="text-[10px]">
                    <p className="font-bold">{cert.name}</p>
                    <p className="opacity-70">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-none">{data.personalInfo.fullName || "Your Name"}</h1>
          <p className="text-xl text-indigo-600 font-semibold mt-3">{data.personalInfo.jobTitle || "Job Title"}</p>
          <div className="h-1.5 w-20 bg-indigo-600 mt-4 rounded-full" />
        </header>

        {data.summary && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Profile</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Experience</h2>
            </div>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
              {data.experience.map((exp, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-indigo-50 border-4 border-indigo-600" />
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-base text-slate-900">{exp.position}</h3>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-500 mb-2">{exp.company}</p>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Education</h2>
            </div>
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-indigo-600 font-medium">{edu.school}</span>
                    <span className="text-slate-400 font-bold">{edu.startDate} - {edu.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
