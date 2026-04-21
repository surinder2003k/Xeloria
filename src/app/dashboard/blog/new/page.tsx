"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Eye, Image as ImageIcon, Settings, Search, Check, Loader2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BlogEditorPage() {
  const { user } = useUser();
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isAdmin = user?.primaryEmailAddress?.emailAddress === "xyzg135@gmail.com";

  const handleSearchImages = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=6`, {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY || "",
        }
      });
      const data = await res.json();
      setSearchResults(data.photos || []);
    } catch (error) {
      toast.error("Failed to fetch images from Pexels.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSave = async () => {
    if (!title || !content) {
      toast.error("Title and Content are required.");
      return;
    }
    setIsSaving(true);
    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const { error } = await supabase
        .from('blogs')
        .insert({
          title,
          slug,
          content,
          featured_image: featuredImage,
          seo_title: seoTitle || title,
          seo_description: metaDescription,
          is_published: true,
          created_at: new Date().toISOString()
        });
      
      if (error) throw error;
      toast.success("Blog post published successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish blog post.");
    } finally {
      setIsSaving(false);
    }
  };

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <ShieldAlert className="h-16 w-16 text-red-500 mx-auto" />
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Unauthorized Area</h1>
            <p className="text-slate-500">Only the platform administrator can create and publish blog posts.</p>
            <Button asChild className="mt-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-bold">
               <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-10">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Post</h1>
            <p className="text-slate-500 font-medium">Craft a story that inspires your audience.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="rounded-full gap-2 border-slate-200">
                <Eye className="h-4 w-4" /> Preview
             </Button>
             <Button onClick={handleSave} disabled={isSaving} className="rounded-full bg-indigo-600 hover:bg-indigo-700 gap-2 shadow-lg shadow-indigo-100 px-8">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isSaving ? "Publishing..." : "Publish"}
             </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Editor */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post Title..." 
                className="text-4xl md:text-5xl font-black h-auto py-6 border-none px-0 focus-visible:ring-0 placeholder:text-slate-200 tracking-tight"
              />
              <div className="h-px bg-slate-100 w-full" />
            </div>

            <Tabs defaultValue="content" className="w-full">
               <TabsList className="bg-slate-50 p-1 mb-6 rounded-full w-fit">
                  <TabsTrigger value="content" className="rounded-full px-6">Content</TabsTrigger>
                  <TabsTrigger value="settings" className="rounded-full px-6"><Settings className="h-4 w-4 mr-2" /> SEO Settings</TabsTrigger>
               </TabsList>
               
               <TabsContent value="content" className="mt-0">
                  <Textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing..."
                    rows={20}
                    className="text-lg leading-relaxed border-none px-0 focus-visible:ring-0 resize-none placeholder:text-slate-200"
                  />
               </TabsContent>

               <TabsContent value="settings" className="space-y-6">
                  <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] space-y-4 bg-slate-50/50">
                     <div className="space-y-2">
                        <Label className="font-bold text-slate-700 uppercase tracking-widest text-xs">SEO Title</Label>
                        <Input 
                          value={seoTitle}
                          onChange={(e) => setSeoTitle(e.target.value)}
                          placeholder="Enter a search-friendly title..." 
                          className="rounded-xl border-slate-200" 
                        />
                     </div>
                     <div className="space-y-2">
                        <Label className="font-bold text-slate-700 uppercase tracking-widest text-xs">Meta Description</Label>
                        <Textarea 
                          value={metaDescription}
                          onChange={(e) => setMetaDescription(e.target.value)}
                          placeholder="Brief summary for search engines..." 
                          className="rounded-xl border-slate-200" 
                        />
                     </div>
                  </div>
               </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-6">
               <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200 pb-4">
                  <ImageIcon className="h-5 w-5" />
                  <h2 className="font-black uppercase tracking-tight">Featured Image</h2>
               </div>

               {featuredImage ? (
                 <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-indigo-600 shadow-xl shadow-indigo-500/10 mb-4">
                    <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setFeaturedImage("")}
                      className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-slate-900 shadow-lg"
                    >
                       <ImageIcon className="h-4 w-4" />
                    </button>
                 </div>
               ) : (
                 <div className="aspect-video bg-white rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 gap-2 mb-4">
                    <ImageIcon className="h-8 w-8" />
                    <p className="text-xs font-bold uppercase tracking-widest">No image selected</p>
                 </div>
               )}

               <div className="space-y-4">
                  <div className="relative">
                    <Input 
                      placeholder="Search Pexels..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearchImages()}
                      className="rounded-full bg-white border-slate-200 pl-10 h-11"
                    />
                    <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                  </div>
                  <Button 
                    onClick={handleSearchImages} 
                    disabled={isSearching}
                    variant="secondary" 
                    className="w-full rounded-full font-bold bg-white border border-slate-200"
                  >
                    {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search Photos"}
                  </Button>
               </div>

               <div className="grid grid-cols-2 gap-3 pt-4">
                  <AnimatePresence>
                    {searchResults.map((photo) => (
                      <motion.button
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={() => setFeaturedImage(photo.src.large)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all relative ${
                          featuredImage === photo.src.large ? "border-indigo-600 ring-2 ring-indigo-100" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={photo.src.small} className="w-full h-full object-cover" alt="Search result" />
                        {featuredImage === photo.src.large && (
                          <div className="absolute inset-0 bg-indigo-600/20 flex items-center justify-center">
                             <Check className="h-6 w-6 text-white bg-indigo-600 rounded-full p-1" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </AnimatePresence>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
