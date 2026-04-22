"use client";

import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Zap, Layout } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SkillsForm = () => {
  const { data, addSkill, updateSkill, removeSkill } = useResumeStore();

  const handleAdd = () => {
    addSkill({
      category: "",
      items: [],
    });
  };

  return (
    <div className="space-y-10">
      <AnimatePresence>
        {data.skills && Array.isArray(data.skills) && data.skills.map((skillGroup, index) => (
          typeof skillGroup === 'object' && skillGroup !== null && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] space-y-8 relative group hover:border-cyan-500/30 transition-all"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 h-10 w-10 rounded-xl bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white border border-red-500/20"
              onClick={() => removeSkill(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="space-y-6">
              <div className="space-y-3 max-w-md">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Layout className="h-3 w-3" /> Capability Cluster Name
                </Label>
                <Input
                  value={skillGroup.category}
                  onChange={(e) => updateSkill(index, { ...skillGroup, category: e.target.value })}
                  placeholder="E.G., TECH STACK, LANGUAGES"
                  className="bg-white/5 border-white/10 text-white h-14 rounded-2xl placeholder:text-slate-700 font-black uppercase tracking-widest"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Zap className="h-3 w-3" /> Competencies (Comma Separated)
                </Label>
                <Input
                  value={Array.isArray(skillGroup.items) ? skillGroup.items.join(", ") : ""}
                  onChange={(e) =>
                    updateSkill(index, {
                      ...skillGroup,
                      items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="REACT, NEXT.JS, TYPESCRIPT, TAILWIND..."
                  className="bg-white/5 border-white/10 text-white h-14 rounded-2xl placeholder:text-slate-700"
                />
              </div>
            </div>
          </motion.div>
          )
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        className="w-full h-20 border-dashed border-2 rounded-[2rem] border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 text-slate-400 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] group transition-all"
        onClick={handleAdd}
      >
        <Plus className="mr-3 h-5 w-5 group-hover:scale-125 transition-transform text-cyan-500" /> Initialize Skill Node
      </Button>
    </div>
  );
};
