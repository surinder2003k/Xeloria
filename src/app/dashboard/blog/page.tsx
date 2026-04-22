"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  EyeOff, 
  Eye, 
  ExternalLink,
  RotateCcw,
  Layers,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function BlogListPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoaded } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "xyzg135@gmail.com";

  const fetchBlogs = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setBlogs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.push("/dashboard");
      return;
    }
    fetchBlogs();
  }, [isLoaded, isAdmin]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (!error) fetchBlogs();
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("blogs")
      .update({ is_published: !currentStatus })
      .eq("id", id);
    if (!error) fetchBlogs();
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="flex items-center gap-2 text-purple-400 bg-purple-500/10 w-fit px-4 py-2 rounded-full mb-4 border border-purple-500/20">
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Editorial Pipeline</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight leading-none uppercase">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Stories</span>
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mt-4">
            Manage Autonomous Content & Strategic Broadcaster Syncs
          </p>
        </div>

        <Button className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-slate-200 font-black text-lg shadow-2xl shadow-white/10 group transition-all" asChild>
          <Link href="/dashboard/blog/new">
            <Plus className="mr-3 h-6 w-6 group-hover:rotate-90 transition-transform" />
            NEW STORY
          </Link>
        </Button>
      </div>

      {/* Filter & Search */}
      <section className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-4 border border-white/10 shadow-2xl">
         <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
               <input 
                 type="text" 
                 placeholder="SEARCH ASSETS BY METADATA..." 
                 className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 pl-14 pr-6 text-[11px] font-black uppercase tracking-widest text-white placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500/50 transition-all"
               />
            </div>
            <Button variant="ghost" className="h-16 w-16 rounded-2xl border border-white/10 bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all" onClick={fetchBlogs}>
               <RotateCcw className={cn("h-6 w-6", isLoading && "animate-spin")} />
            </Button>
         </div>
      </section>

      {/* Grid View instead of Table for better Figma aesthetic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-white/5 rounded-[3rem] border border-white/10 animate-pulse" />
            ))
          ) : blogs.length === 0 ? (
            <div className="col-span-full h-96 bg-white/5 rounded-[4rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12">
               <Layers className="h-16 w-16 text-slate-700 mb-6" />
               <h3 className="text-2xl font-black uppercase">Archive Empty</h3>
               <p className="text-slate-500 mt-4 max-w-md uppercase text-[10px] font-bold tracking-widest">No autonomous signals detected in current sector.</p>
            </div>
          ) : (
            blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 hover:border-purple-500/50 transition-all overflow-hidden flex flex-col h-[480px] shadow-2xl"
              >
                {/* Status Badge */}
                <div className="absolute top-6 right-6 z-20">
                   <div className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border transition-all flex items-center gap-2 ${
                      blog.is_published 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                      : "bg-slate-500/10 text-slate-500 border-white/10"
                   }`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${blog.is_published ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
                      {blog.is_published ? "Broadcasting" : "Offline"}
                   </div>
                </div>

                {/* Image Section */}
                <div className="h-48 relative overflow-hidden">
                  {blog.image_url ? (
                    <img src={blog.image_url} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <Layers className="h-10 w-10 text-slate-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                </div>

                {/* Content Section */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex gap-3 mb-4">
                     <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-purple-500/10">
                        {blog.category || "General"}
                     </span>
                  </div>
                  
                  <h3 className="text-xl font-black uppercase tracking-tight line-clamp-2 group-hover:text-purple-400 transition-colors mb-4 leading-tight">
                    {blog.title}
                  </h3>
                  
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-auto">
                    ID: {blog.id.split('-')[0].toUpperCase()} // {new Date(blog.created_at).toLocaleDateString()}
                  </p>

                  <div className="flex gap-3 pt-6 border-t border-white/5 mt-auto">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                      onClick={() => togglePublish(blog.id, blog.is_published)}
                    >
                       {blog.is_published ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-purple-400 hover:bg-white/10"
                      asChild
                    >
                       <Link href={`/dashboard/blog/${blog.id}`}><Edit2 className="h-5 w-5" /></Link>
                    </Button>
                    <Button 
                      className="flex-1 h-12 rounded-xl bg-purple-600 hover:bg-purple-500 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-purple-500/20"
                      asChild
                    >
                       <Link href={`/blog/${blog.slug}`} target="_blank">View Live <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 text-slate-500 hover:text-red-500 hover:bg-red-500/10"
                      onClick={() => handleDelete(blog.id)}
                    >
                       <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
