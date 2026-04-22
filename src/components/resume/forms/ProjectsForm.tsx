"use client";

import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Rocket, Link2, Code, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ProjectsForm = () => {
  const { data, addProject, updateProject, removeProject } = useResumeStore();

  const handleAdd = () => {
    addProject({
      name: "",
      description: "",
      technologies: [],
      link: "",
    });
  };

  return (
    <div className="space-y-10">
      <AnimatePresence mode="popLayout">
        {data.projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="p-6 md:p-10 bg-white/[0.03] border border-white/10 rounded-[1.5rem] md:rounded-[3rem] space-y-8 relative group hover:border-emerald-500/30 transition-all shadow-2xl"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 md:top-8 md:right-8 h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white border border-red-500/20"
              onClick={() => removeProject(index)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Rocket className="h-4 w-4" /> Deployment Name
                </Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(index, { ...project, name: e.target.value })}
                  placeholder="E.G., XELORIA PROTOCOL"
                  className="bg-white/5 border-white/10 text-white h-14 md:h-16 rounded-xl md:rounded-2xl placeholder:text-slate-700 font-black tracking-widest uppercase text-base md:text-lg"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Code className="h-4 w-4" /> Technology Stack (Comma Separated)
                </Label>
                <Input
                  value={project.technologies?.join(", ") ?? ""}
                  onChange={(e) =>
                    updateProject(index, {
                      ...project,
                      technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="NEXT.JS, SUPABASE, FRAMER MOTION..."
                  className="bg-white/5 border-white/10 text-white h-16 rounded-2xl placeholder:text-slate-700"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Link2 className="h-4 w-4" /> Live URL
                </Label>
                <Input
                  value={project.link}
                  onChange={(e) => updateProject(index, { ...project, link: e.target.value })}
                  placeholder="HTTPS://XELORIA.DEV"
                  className="bg-white/5 border-white/10 text-white h-14 rounded-2xl placeholder:text-slate-700"
                />
              </div>



              <div className="col-span-1 md:col-span-2 space-y-4">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Operational Overview</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, { ...project, description: e.target.value })}
                  placeholder="DESCRIBE THE CORE VALUE AND TECHNICAL ARCHITECTURE..."
                  rows={5}
                  className="bg-white/5 border-white/10 text-white rounded-[2rem] placeholder:text-slate-700 resize-none p-6"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        className="w-full h-16 md:h-24 border-dashed border-2 rounded-2xl md:rounded-[2.5rem] border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 text-slate-400 hover:text-white font-black text-[10px] uppercase tracking-[0.4em] group transition-all"
        onClick={handleAdd}
      >
        <Plus className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform text-emerald-500" /> Deploy New Project Node
      </Button>
    </div>
  );
};
