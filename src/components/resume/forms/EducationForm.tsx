"use client";

import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
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
    <div className="space-y-6">
      <AnimatePresence>
        {data.education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border border-slate-200 rounded-xl space-y-4 bg-slate-50 relative group"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
              onClick={() => removeEducation(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>School / University</Label>
                <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(index, { ...edu, school: e.target.value })}
                  placeholder="Harvard University"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Degree / Certification</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, { ...edu, degree: e.target.value })}
                  placeholder="B.Sc. in Computer Science"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  value={edu.startDate}
                  onChange={(e) => updateEducation(index, { ...edu, startDate: e.target.value })}
                  placeholder="2018"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date (or Expected)</Label>
                <Input
                  value={edu.endDate}
                  onChange={(e) => updateEducation(index, { ...edu, endDate: e.target.value })}
                  placeholder="2022"
                  className="bg-white"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label>Additional Info (Optional)</Label>
                <Textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(index, { ...edu, description: e.target.value })}
                  placeholder="GPA, relevant coursework, etc."
                  rows={2}
                  className="bg-white"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        className="w-full border-dashed border-2 py-8 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 group"
        onClick={handleAdd}
      >
        <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Add Education
      </Button>
    </div>
  );
};
