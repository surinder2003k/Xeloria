"use client";

import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, GraduationCap, School, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const EducationForm = () => {
  const { data, addEducation, updateEducation, removeEducation } = useResumeStore();

  const handleAdd = () => {
    addEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  return (
    <div className="space-y-10">
      <AnimatePresence>
        {data?.education?.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 md:p-8 bg-white/[0.03] border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] space-y-8 relative group hover:border-purple-500/30 transition-all"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 h-10 w-10 rounded-xl bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white border border-red-500/20"
              onClick={() => removeEducation(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <School className="h-3 w-3" /> Institution
                </Label>
                <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(index, { ...edu, school: e.target.value })}
                  placeholder="STANFORD UNIVERSITY"
                  className="bg-white/5 border-white/10 text-white h-14 rounded-2xl placeholder:text-slate-700"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <GraduationCap className="h-3 w-3" /> Degree / Certification
                </Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, { ...edu, degree: e.target.value })}
                  placeholder="MSC COMPUTER SCIENCE"
                  className="bg-white/5 border-white/10 text-white h-14 rounded-2xl placeholder:text-slate-700"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Calendar className="h-3 w-3" /> Start Date
                </Label>
                <Input
                  value={edu.startDate}
                  onChange={(e) => updateEducation(index, { ...edu, startDate: e.target.value })}
                  placeholder="SEP 2020"
                  className="bg-white/5 border-white/10 text-white h-14 rounded-2xl placeholder:text-slate-700"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Calendar className="h-3 w-3" /> Graduation Date
                </Label>
                <Input
                  value={edu.endDate}
                  onChange={(e) => updateEducation(index, { ...edu, endDate: e.target.value })}
                  placeholder="JUN 2022"
                  className="bg-white/5 border-white/10 text-white h-14 rounded-2xl placeholder:text-slate-700"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        className="w-full h-16 md:h-20 border-dashed border-2 rounded-2xl md:rounded-[2rem] border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/50 text-slate-400 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] group transition-all"
        onClick={handleAdd}
      >
        <Plus className="mr-3 h-5 w-5 group-hover:scale-125 transition-transform text-purple-500" /> Add Academic Node
      </Button>
    </div>
  );
};
