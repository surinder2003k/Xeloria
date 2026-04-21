"use client";

import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Briefcase, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ProjectsForm = () => {
  const { data, addProject, updateProject, removeProject, addCertification, removeCertification } = useResumeStore();

  return (
    <div className="space-y-12">
      {/* Projects Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <Briefcase className="h-5 w-5" />
          <h3 className="font-bold">Projects</h3>
        </div>
        
        <AnimatePresence>
          {data.projects.map((proj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 border border-slate-200 rounded-xl space-y-4 bg-slate-50 relative group"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                onClick={() => removeProject(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    value={proj.name}
                    onChange={(e) => updateProject(index, { ...proj, name: e.target.value })}
                    placeholder="E-commerce Platform"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={proj.description}
                    onChange={(e) => updateProject(index, { ...proj, description: e.target.value })}
                    placeholder="Built a full-stack e-commerce app using Next.js..."
                    rows={3}
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Link (Optional)</Label>
                  <Input
                    value={proj.link}
                    onChange={(e) => updateProject(index, { ...proj, link: e.target.value })}
                    placeholder="https://github.com/yourusername/project"
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
          onClick={() => addProject({ name: "", description: "", link: "", technologies: [] })}
        >
          <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Add Project
        </Button>
      </div>

      {/* Certifications Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <Award className="h-5 w-5" />
          <h3 className="font-bold">Certifications</h3>
        </div>

        <AnimatePresence>
          {data.certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 border border-slate-200 rounded-xl space-y-4 bg-slate-50 relative group"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                onClick={() => removeCertification(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Certification Name</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => {
                      const newCerts = [...data.certifications];
                      newCerts[index] = { ...cert, name: e.target.value };
                      useResumeStore.setState({ data: { ...data, certifications: newCerts } });
                    }}
                    placeholder="AWS Certified Developer"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issuer</Label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) => {
                      const newCerts = [...data.certifications];
                      newCerts[index] = { ...cert, issuer: e.target.value };
                      useResumeStore.setState({ data: { ...data, certifications: newCerts } });
                    }}
                    placeholder="Amazon Web Services"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Date</Label>
                  <Input
                    value={cert.date}
                    onChange={(e) => {
                      const newCerts = [...data.certifications];
                      newCerts[index] = { ...cert, date: e.target.value };
                      useResumeStore.setState({ data: { ...data, certifications: newCerts } });
                    }}
                    placeholder="June 2023"
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
          onClick={() => addCertification({ name: "", issuer: "", date: "" })}
        >
          <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Add Certification
        </Button>
      </div>
    </div>
  );
};
