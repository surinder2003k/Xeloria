"use client";

import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ImageUpload } from "../ImageUpload";

export const PersonalInfoForm = () => {
  const { data, updatePersonalInfo } = useResumeStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-center pb-4 border-b border-slate-100">
        <ImageUpload 
          value={data.personalInfo.avatar}
          onChange={(val) => updatePersonalInfo({ avatar: val })}
          onRemove={() => updatePersonalInfo({ avatar: "" })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            name="fullName" 
            placeholder="John Doe" 
            value={data.personalInfo.fullName}
            onChange={handleChange}
            className="focus-visible:ring-indigo-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Desired Job Title</Label>
          <Input 
            id="jobTitle" 
            name="jobTitle" 
            placeholder="Senior Software Engineer" 
            value={data.personalInfo.jobTitle}
            onChange={handleChange}
            className="focus-visible:ring-indigo-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="john@example.com" 
            value={data.personalInfo.email}
            onChange={handleChange}
            className="focus-visible:ring-indigo-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            name="phone" 
            placeholder="+1 234 567 890" 
            value={data.personalInfo.phone}
            onChange={handleChange}
            className="focus-visible:ring-indigo-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            name="location" 
            placeholder="New York, USA" 
            value={data.personalInfo.location}
            onChange={handleChange}
            className="focus-visible:ring-indigo-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website / Portfolio</Label>
          <Input 
            id="website" 
            name="website" 
            placeholder="https://johndoe.com" 
            value={data.personalInfo.website}
            onChange={handleChange}
            className="focus-visible:ring-indigo-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input 
            id="linkedin" 
            name="linkedin" 
            placeholder="linkedin.com/in/johndoe" 
            value={data.personalInfo.linkedin}
            onChange={handleChange}
            className="focus-visible:ring-indigo-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub URL</Label>
          <Input 
            id="github" 
            name="github" 
            placeholder="github.com/johndoe" 
            value={data.personalInfo.github || ""}
            onChange={handleChange}
            className="focus-visible:ring-indigo-600"
          />
        </div>
      </div>
    </motion.div>
  );
};
