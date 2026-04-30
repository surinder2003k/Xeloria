"use client";

import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Briefcase, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ExperienceForm = () => {
  const { data, addExperience, updateExperience, removeExperience } = useResumeStore();

  const handleAdd = () => {
    addExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    });
  };

  return (
    <div className="space-y-10">
      <AnimatePresence>
        {data?.experience?.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 md:p-8 bg-white/[0.03] border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] space-y-8 relative group hover:border-indigo-500/30 transition-all"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 h-10 w-10 rounded-xl bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white border border-red-500/20"
              onClick={() => removeExperience(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Briefcase className="h-3 w-3" /> Organization
                </Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(index, { ...exp, company: e.target.value })}
                  placeholder="ACME CORP"
                  className="bg-white/5 border-white/10 text-white h-14 rounded-2xl placeholder:text-slate-700"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Plus className="h-3 w-3 rotate-45" /> Position
                </Label>
                <Input
                  value={exp.position}
                  onChange={(e) => updateExperience(index, { ...exp, position: e.target.value })}
                  placeholder="LEAD ARCHITECT"
                  className="bg-white/5 border-white/10 text-white h-14 rounded-2xl placeholder:text-slate-700"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Calendar className="h-3 w-3" /> Start Date
                </Label>
                <Input
                  value={exp.startDate}
                  onChange={(e) => updateExperience(index, { ...exp, startDate: e.target.value })}
                  placeholder="JAN 2024"
                  className="bg-white/5 border-white/10 text-white h-14 rounded-2xl placeholder:text-slate-700"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Calendar className="h-3 w-3" /> End Date
                </Label>
                <Input
                  value={exp.endDate}
                  onChange={(e) => updateExperience(index, { ...exp, endDate: e.target.value })}
                  placeholder="PRESENT"
                  disabled={exp.current}
                  className="bg-white/5 border-white/10 text-white h-14 rounded-2xl placeholder:text-slate-700"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-3">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Contextual Achievements</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, { ...exp, description: e.target.value })}
                  placeholder="DESCRIBE YOUR IMPACT..."
                  rows={4}
                  className="bg-white/5 border-white/10 text-white rounded-3xl placeholder:text-slate-700 resize-none"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        className="w-full h-16 md:h-20 border-dashed border-2 rounded-2xl md:rounded-[2rem] border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 text-slate-400 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] group transition-all"
        onClick={handleAdd}
      >
        <Plus className="mr-3 h-5 w-5 group-hover:scale-125 transition-transform text-indigo-500" /> Add Experience Node
      </Button>
    </div>
  );
};
