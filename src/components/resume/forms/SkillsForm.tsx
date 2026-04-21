"use client";

import { useResumeStore } from "@/lib/store";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X, Wrench } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const SkillsForm = () => {
  const { data, updateSkills, updateSummary, updateData } = useResumeStore();
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!data.skills.includes(skillInput.trim())) {
        updateData({ skills: [...data.skills, skillInput.trim()] });
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateSkills(data.skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <Wrench className="h-5 w-5" />
          <h3 className="font-bold">Skills & Technologies</h3>
        </div>
        <div className="space-y-2">
          <Label>Add Skills (Press Enter)</Label>
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
            placeholder="React, TypeScript, Figma..."
            className="focus-visible:ring-indigo-600"
          />
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {data.skills.map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="px-3 py-1 bg-indigo-50 text-indigo-700 border-indigo-100 flex items-center gap-1 hover:bg-indigo-100 transition-colors"
            >
              {skill}
              <button 
                onClick={() => removeSkill(skill)}
                className="hover:text-indigo-900 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {data.skills.length === 0 && (
            <p className="text-sm text-slate-400 italic">No skills added yet.</p>
          )}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <h3 className="font-bold">Professional Summary</h3>
        </div>
        <div className="space-y-2">
          <Label>Summary</Label>
          <Textarea
            value={data.summary}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="Briefly describe your career goals and key strengths..."
            rows={5}
            className="focus-visible:ring-indigo-600 resize-none"
          />
          <p className="text-xs text-slate-500">Aim for 3-5 sentences that highlight your expertise.</p>
        </div>
      </motion.div>
    </div>
  );
};
