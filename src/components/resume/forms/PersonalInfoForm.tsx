"use client";

import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter } from "lucide-react";

export const PersonalInfoForm = () => {
  const { data, updatePersonalInfo, updateSummary } = useResumeStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <User className="h-3 w-3" /> Full Name
          </Label>
          <Input
            name="fullName"
            value={data?.personalInfo?.fullName || ""}
            onChange={handleChange}
            placeholder="John Doe"
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-700 h-14 rounded-2xl focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-3">
          <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Mail className="h-3 w-3" /> Email Address
          </Label>
          <Input
            name="email"
            type="email"
            value={data?.personalInfo?.email || ""}
            onChange={handleChange}
            placeholder="john@example.com"
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-700 h-14 rounded-2xl focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-3">
          <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Phone className="h-3 w-3" /> Phone Number
          </Label>
          <Input
            name="phone"
            value={data?.personalInfo?.phone || ""}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-700 h-14 rounded-2xl focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-3">
          <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <MapPin className="h-3 w-3" /> Location
          </Label>
          <Input
            name="location"
            value={data?.personalInfo?.location || ""}
            onChange={handleChange}
            placeholder="New York, NY"
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-700 h-14 rounded-2xl focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-3">
          <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Linkedin className="h-3 w-3" /> LinkedIn Profile
          </Label>
          <Input
            name="linkedin"
            value={data?.personalInfo?.linkedin || ""}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-700 h-14 rounded-2xl focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-3">
          <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Github className="h-3 w-3" /> GitHub Profile
          </Label>
          <Input
            name="github"
            value={data?.personalInfo?.github || ""}
            onChange={handleChange}
            placeholder="github.com/johndoe"
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-700 h-14 rounded-2xl focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-3">
          <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Twitter className="h-3 w-3" /> Twitter Profile
          </Label>
          <Input
            name="twitter"
            value={data?.personalInfo?.twitter || ""}
            onChange={handleChange}
            placeholder="twitter.com/johndoe"
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-700 h-14 rounded-2xl focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-3">
          <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Globe className="h-3 w-3" /> Portfolio Website
          </Label>
          <Input
            name="website"
            value={data?.personalInfo?.website || ""}
            onChange={handleChange}
            placeholder="johndoe.dev"
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-700 h-14 rounded-2xl focus:ring-indigo-500"
          />
        </div>
        <div className="col-span-1 md:col-span-2 space-y-3">
          <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Sparkles className="h-3 w-3" /> Professional Summary
          </Label>
          <Textarea
            name="summary"
            value={data.summary || ""}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="Tell your professional story..."
            rows={5}
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-700 rounded-3xl focus:ring-indigo-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

const Sparkles = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
