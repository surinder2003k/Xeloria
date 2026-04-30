"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Sparkles, 
  Search, 
  ArrowLeft, 
  Image as ImageIcon, 
  Globe, 
  BarChart, 
  Type, 
  AlignLeft,
  ChevronRight,
  Loader2,
  Trash2,
  Zap,
  Tag,
  ShieldCheck,
  Activity,
  Send,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link2,
  Undo,
  Redo,
  Layers,
  LayoutDashboard
} from "lucide-react";
import { XeloriaLogo } from "@/components/BrandLogo";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function NewBlogPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "xyzg135@gmail.com";
  
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [pexelsLoading, setPexelsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    featured_image: "",
    category: "Technology",
    slug: "",
    meta_title: "",
    meta_description: "",
    keywords: ""
  });

  const [prompt, setPrompt] = useState("");
  const [pexelsQuery, setPexelsQuery] = useState("");
  const [pexelsImages, setPexelsImages] = useState<any[]>([]);

  useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.push("/dashboard");
    }
  }, [isLoaded, isAdmin, router]);

  // Update slug automatically from title
  useEffect(() => {
    if (formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""),
        meta_title: formData.title
      }));
    }
  }, [formData.title]);

  const generateContent = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt for the AI");
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/generate-blog", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.blog) {
        setFormData(prev => ({
          ...prev,
          title: data.blog.title,
          content: data.blog.content,
          excerpt: data.blog.excerpt,
          meta_description: data.blog.excerpt
        }));
        toast.success("AI Content Generated!");
      }
    } catch (e) {
      toast.error("AI Generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  const searchPexels = async () => {
    if (!pexelsQuery) return;
    setPexelsLoading(true);
    try {
      const res = await fetch(`/api/pexels?query=${encodeURIComponent(pexelsQuery)}`);
      const data = await res.json();
      setPexelsImages(data.photos || []);
    } catch (e) {
      toast.error("Image search failed");
    } finally {
      setPexelsLoading(false);
    }
  };

  const handleSave = async (isPublished = false) => {
    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      return;
    }
    setLoading(true);
    try {
        const { error } = await supabase.from("blogs").insert([{
          ...formData,
          is_published: isPublished
        }]);

      if (error) throw error;
      toast.success(isPublished ? "Post Published!" : "Draft Saved!");
      router.push("/dashboard/blog");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("content-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const newText = before + prefix + selection + suffix + after;
    setFormData({ ...formData, content: newText });

    // Reset cursor position after state update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  const toolbarTools = [
    { icon: Bold, action: () => insertMarkdown("**", "**"), label: "Bold" },
    { icon: Italic, action: () => insertMarkdown("*", "*"), label: "Italic" },
    { icon: Underline, action: () => insertMarkdown("<u>", "</u>"), label: "Underline" },
    { icon: Strikethrough, action: () => insertMarkdown("~~", "~~"), label: "Strike" },
    { icon: Heading1, action: () => insertMarkdown("# ", ""), label: "H1" },
    { icon: Heading2, action: () => insertMarkdown("## ", ""), label: "H2" },
    { icon: List, action: () => insertMarkdown("- ", ""), label: "List" },
    { icon: ListOrdered, action: () => insertMarkdown("1. ", ""), label: "Ordered List" },
    { icon: Quote, action: () => insertMarkdown("> ", ""), label: "Quote" },
    { icon: Link2, action: () => insertMarkdown("[", "](url)"), label: "Link" },
    { icon: ImageIcon, action: () => insertMarkdown("![alt](", ")"), label: "Image" },
  ];

  if (!isLoaded || (isLoaded && !isAdmin)) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 max-w-[1600px] mx-auto min-h-screen bg-[#050505] -m-4 md:-m-12 p-4 md:p-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Premium Header */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-white/5 pb-10">
          <div className="flex items-center gap-6">
             <XeloriaLogo className="h-12 w-12 group-hover:scale-110 transition-all drop-shadow-2xl" />
             <div className="space-y-1">
                <div className="flex items-center gap-4 mb-2">
                   <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                      <LayoutDashboard className="h-3 w-3" /> Back to Portal
                   </Link>
                   <Link href="/dashboard/blog" className="flex items-center gap-2 text-slate-600 hover:text-indigo-400 transition-colors text-[10px] font-black uppercase tracking-widest">
                      <Layers className="h-3 w-3" /> All Stories
                   </Link>
                </div>
                <h1 className="text-4xl font-black text-white tracking-tight uppercase italic">Synthesize <span className="text-indigo-500">Asset</span></h1>
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                   <ShieldCheck className="h-3 w-3 text-emerald-500" /> Secure Protocol v4.0
                   <Activity className="h-3 w-3 text-indigo-500 animate-pulse ml-2" /> Live Connection
                </div>
             </div>
          </div>
         
         <div className="flex items-center gap-4 w-full lg:w-auto">
            <Button 
               variant="ghost" 
               className="flex-1 lg:flex-none h-16 rounded-2xl px-10 font-black text-[11px] uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 border border-white/10"
               onClick={() => handleSave(false)}
               disabled={loading}
            >
               {loading ? <Loader2 className="animate-spin h-5 w-5 mr-3" /> : "Store Local Draft"}
            </Button>
            <Button 
               className="flex-1 lg:flex-none h-16 rounded-2xl px-12 bg-white text-black hover:bg-slate-200 font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-white/5"
               onClick={() => handleSave(true)}
               disabled={loading}
            >
               {loading ? <Loader2 className="animate-spin h-5 w-5 mr-3" /> : <span className="flex items-center gap-3">Deploy Intel <Send className="h-4 w-4" /></span>}
            </Button>
         </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-12">
         {/* Main Editor Section */}
         <div className="xl:col-span-8 space-y-10">
            {/* Title & Excerpt */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 shadow-2xl p-12 space-y-12 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/[0.03] blur-[80px] -mr-32 -mt-32" />
               
               <div className="space-y-6 relative">
                  <div className="flex items-center gap-3 text-slate-500">
                     <Type className="h-4 w-4 text-indigo-500" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">Asset Headline</span>
                  </div>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="ENTER ASSET TITLE..." 
                    className="w-full text-4xl md:text-5xl font-black text-white placeholder:text-white/10 bg-transparent focus:outline-none tracking-tighter uppercase italic"
                  />
               </div>

               <div className="h-[1px] bg-white/5" />

               <div className="space-y-6">
                  <div className="flex items-center gap-3 text-slate-500">
                     <AlignLeft className="h-4 w-4 text-purple-500" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">Contextual Summary</span>
                  </div>
                  <textarea 
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    placeholder="PROVIDE AN EXECUTIVE SUMMARY FOR GLOBAL DISSEMINATION..." 
                    rows={3}
                    className="w-full text-lg font-bold text-slate-400 placeholder:text-white/10 bg-transparent focus:outline-none resize-none uppercase tracking-widest leading-relaxed"
                  />
               </div>
            </motion.section>

            {/* Content Editor */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 shadow-2xl p-12 space-y-8 min-h-[800px] flex flex-col"
            >
               <div className="flex flex-wrap items-center justify-between border-b border-white/5 pb-8 gap-6">
                  <div className="flex items-center gap-4">
                    <ChevronRight className="h-5 w-5 text-indigo-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Core Narrative (Full Article)</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    {toolbarTools.map((tool, index) => (
                      <div key={index} className="flex items-center">
                        <button 
                          onClick={tool.action}
                          title={tool.label}
                          className="p-2.5 text-slate-500 hover:text-white bg-white/5 hover:bg-indigo-600 rounded-lg transition-all border border-transparent hover:border-white/10"
                        >
                          <tool.icon className="h-3.5 w-3.5" />
                        </button>
                        {(index === 3 || index === 5 || index === 8) && (
                          <div className="w-[1px] h-4 bg-white/10 mx-2" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="hidden md:flex items-center gap-1">
                    <button className="p-2.5 text-slate-500 hover:text-white bg-white/5 rounded-lg transition-all border border-transparent hover:border-white/10">
                      <Undo className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-2.5 text-slate-500 hover:text-white bg-white/5 rounded-lg transition-all border border-transparent hover:border-white/10">
                      <Redo className="h-3.5 w-3.5" />
                    </button>
                  </div>
               </div>
               
               <textarea 
                  id="content-textarea"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="BEGIN NARRATIVE SYNTHESIS... MARKDOWN PROTOCOLS ACTIVE."
                  className="w-full flex-1 bg-transparent text-slate-300 font-bold text-xl leading-relaxed focus:outline-none min-h-[500px] resize-none placeholder:text-white/5 mt-6"
               />

               <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex gap-10">
                     <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Entropy Level</p>
                        <p className="text-[11px] font-black text-white uppercase">{(formData.content || "").split(/\s+/).filter(Boolean).length} WORDS</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Transmission Time</p>
                        <p className="text-[11px] font-black text-indigo-400 uppercase">EST. {Math.ceil((formData.content || "").split(/\s+/).length / 200)} MIN</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                     <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_#6366f1]" />
                     <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Global Sync Locked</span>
                  </div>
               </div>
            </motion.section>
         </div>

         {/* Sidebar Controls */}
         <div className="xl:col-span-4 space-y-10">
            {/* Visual Asset Section */}
            <motion.section 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 shadow-2xl p-10 space-y-10"
            >
               <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-4 uppercase italic">
                  <ImageIcon className="h-6 w-6 text-indigo-500" /> Visual Engine
               </h3>

               {formData.featured_image ? (
                  <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
                     <img src={formData.featured_image} alt="Featured" className="w-full aspect-square object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="ghost" className="h-16 w-16 rounded-full bg-white text-black border border-white hover:bg-red-500 hover:text-white transition-all shadow-2xl" onClick={() => setFormData({...formData, featured_image: ""})}>
                           <Trash2 className="h-6 w-6" />
                        </Button>
                     </div>
                  </div>
               ) : (
                  <div className="space-y-8">
                     <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                        <input 
                           type="text" 
                           placeholder="SEARCH GLOBAL IMAGERY..." 
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-24 text-[11px] font-black text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600"
                           value={pexelsQuery}
                           onChange={(e) => setPexelsQuery(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && searchPexels()}
                        />
                        <button onClick={searchPexels} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 px-6 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">SCAN</button>
                     </div>
                     
                     <AnimatePresence>
                        {pexelsImages.length > 0 && (
                           <motion.div 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             className="grid grid-cols-2 gap-4"
                           >
                              {pexelsImages.slice(0, 4).map(img => (
                                 <button key={img.id} onClick={() => setFormData({...formData, featured_image: img.src.large})} className="rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500 transition-all group relative aspect-square shadow-sm">
                                    <img src={img.src.medium} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500" />
                                    <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                 </button>
                              ))}
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               )}
            </motion.section>

            {/* AI Assistant */}
            <motion.section 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 }}
               className="bg-indigo-600 rounded-[3rem] p-10 text-white space-y-8 relative overflow-hidden group shadow-2xl shadow-indigo-500/30"
            >
               <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xl font-black tracking-tight flex items-center gap-4 uppercase italic">
                        <Sparkles className="h-6 w-6 text-indigo-200" /> AI Co-Pilot
                     </h3>
                     <Activity className="h-4 w-4 animate-pulse text-indigo-300" />
                  </div>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="DESCRIBE ASSET REQUIREMENTS OR SECTION TARGETS..." 
                    className="w-full bg-black/20 border border-white/10 rounded-2xl p-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-white/5 transition-all placeholder:text-indigo-200/30 resize-none h-40 uppercase tracking-widest leading-relaxed"
                  />
                  <Button 
                     className="w-full h-16 rounded-2xl bg-white text-indigo-600 hover:bg-slate-100 font-black text-[11px] uppercase tracking-widest transition-all hover:scale-105 shadow-2xl active:scale-95"
                     onClick={generateContent}
                     disabled={aiLoading}
                  >
                     {aiLoading ? <Loader2 className="animate-spin h-6 w-6" /> : (
                        <span className="flex items-center gap-3">Run Synthesis <Zap className="h-4 w-4 fill-indigo-600 text-indigo-600" /></span>
                     )}
                  </Button>
               </div>
               <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full -mr-40 -mt-40 group-hover:bg-white/20 transition-all duration-1000" />
            </motion.section>

            {/* SEO Matrix */}
            <motion.section 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 shadow-2xl p-10 space-y-10"
            >
               <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-4 uppercase italic">
                  <BarChart className="h-6 w-6 text-indigo-500" /> SEO Matrix
               </h3>
               
               <div className="space-y-8">
                  <div className="space-y-4">
                     <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Asset Permalink</Label>
                     <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 font-black text-[10px] tracking-widest">/BLOG/</div>
                        <input 
                           type="text" 
                           value={formData.slug}
                           onChange={(e) => setFormData({...formData, slug: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-20 pr-6 text-[10px] font-black text-white focus:border-indigo-500 focus:outline-none transition-all uppercase tracking-[0.2em]"
                        />
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Global Metadata</Label>
                        <span className="text-[8px] font-black text-slate-600 tracking-widest">{(formData.meta_description || "").length}/160</span>
                     </div>
                     <textarea 
                        value={formData.meta_description}
                        onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                        placeholder="OPTIMIZE FOR SEARCH ENGINE DISCOVERY..." 
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-[10px] font-black text-white focus:border-indigo-500 focus:outline-none transition-all resize-none uppercase tracking-[0.2em] leading-relaxed placeholder:text-slate-700"
                     />
                  </div>
               </div>
            </motion.section>
         </div>
      </div>
    </div>
  );
}
