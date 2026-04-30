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
  ArrowRight,
  LayoutDashboard
} from "lucide-react";
import { XeloriaLogo } from "@/components/BrandLogo";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    if (!confirm("Are you sure you want to delete this asset?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (!error) {
      toast.success("Asset decommissioned successfully.");
      fetchBlogs();
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("blogs")
      .update({ is_published: !currentStatus })
      .eq("id", id);
    if (!error) {
      toast.success(currentStatus ? "Asset taken offline." : "Asset broadcasted successfully.");
      fetchBlogs();
    }
  };

  return (
    <div className="space-y-12 pb-20 max-w-[1600px] mx-auto">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/5 pb-10">
        <div>
           <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-4 w-fit">
              <LayoutDashboard className="h-3.5 w-3.5" /> Back to Portal
           </Link>
           <div className="flex items-center gap-4">
              <XeloriaLogo className="h-12 w-12 group-hover:scale-110 transition-all drop-shadow-2xl" />
              <div>
                 <div className="flex items-center gap-3 mb-3">
                    <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_#6366f1]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Live Asset Pipeline</span>
                 </div>
                 <h1 className="text-5xl font-black text-white tracking-tight uppercase italic leading-none">
                    All <span className="text-indigo-500">Stories</span>
                 </h1>
                 <p className="text-slate-600 font-bold text-xs uppercase tracking-[0.3em] mt-4 flex items-center gap-2">
                    <Layers className="h-4 w-4" /> Global Content Synchronization Matrix
                 </p>
              </div>
           </div>
        </div>

        <Link href="/dashboard/blog/new">
           <Button className="h-20 px-12 rounded-[2rem] bg-white text-black hover:bg-slate-100 font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-105 active:scale-95 group">
              <Plus className="mr-4 h-6 w-6 group-hover:rotate-90 transition-transform" />
              Initialize New Asset
           </Button>
        </Link>
      </div>

      {/* Modern List View */}
      <div className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] border border-white/10 overflow-hidden shadow-2xl">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-10 py-8 border-b border-white/5 bg-white/[0.02]">
           <div className="col-span-2 text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Status</div>
           <div className="col-span-5 text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Asset Details</div>
           <div className="col-span-2 text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Taxonomy</div>
           <div className="col-span-3 text-right text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Actions</div>
        </div>

        <div className="divide-y divide-white/5">
           <AnimatePresence mode="popLayout">
              {isLoading ? (
                 [...Array(5)].map((_, i) => (
                    <div key={i} className="h-24 bg-white/[0.01] animate-pulse mx-10 my-4 rounded-2xl" />
                 ))
              ) : blogs.length === 0 ? (
                 <div className="py-32 flex flex-col items-center justify-center text-center">
                    <div className="h-20 w-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-6">
                       <Layers className="h-10 w-10 text-slate-700" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-widest text-slate-400">Archive Offline</h3>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-2">No signals detected in current sector.</p>
                 </div>
              ) : (
                 blogs.map((blog, idx) => (
                    <motion.div
                       key={blog.id}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: idx * 0.05 }}
                       className="grid grid-cols-12 px-10 py-8 items-center group hover:bg-white/[0.02] transition-all"
                    >
                       {/* Status */}
                       <div className="col-span-2">
                          <div className={cn(
                             "w-fit px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all flex items-center gap-2",
                             blog.is_published 
                             ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                             : "bg-slate-500/10 text-slate-500 border-white/5"
                          )}>
                             <div className={cn("h-1.5 w-1.5 rounded-full", blog.is_published ? "bg-indigo-500 animate-pulse" : "bg-slate-500")} />
                             {blog.is_published ? "Published" : "Draft"}
                          </div>
                       </div>

                       {/* Asset Details */}
                       <div className="col-span-5 flex items-center gap-6 min-w-0">
                          <div className="h-16 w-24 rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0 relative group-hover:border-indigo-500/50 transition-all">
                             {blog.featured_image ? (
                                <img src={blog.featured_image} alt="" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                   <Layers className="h-6 w-6 text-slate-800" />
                                </div>
                             )}
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                             <h3 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-indigo-400 transition-colors truncate italic">
                                {blog.title}
                             </h3>
                             <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] truncate">
                                SERIAL_{blog.id.split('-')[0].toUpperCase()}
                             </p>
                          </div>
                       </div>

                       {/* Taxonomy */}
                       <div className="col-span-2 min-w-0">
                          <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 truncate block w-fit max-w-full">
                             {blog.category || "General"}
                          </span>
                       </div>

                       {/* Actions */}
                       <div className="col-span-3 flex justify-end gap-3 opacity-40 group-hover:opacity-100 transition-all">
                          <Button 
                             variant="ghost" 
                             size="icon" 
                             className="h-12 w-12 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                             onClick={() => togglePublish(blog.id, blog.is_published)}
                             title={blog.is_published ? "Take Offline" : "Broadcast Live"}
                          >
                             {blog.is_published ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </Button>
                          
                          <Button 
                             variant="ghost" 
                             size="icon" 
                             className="h-12 w-12 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-indigo-400 hover:bg-white/10 transition-all"
                             asChild
                             title="External Preview"
                          >
                             <Link href={`/blog/${blog.slug}`} target="_blank">
                                <ExternalLink className="h-5 w-5" />
                             </Link>
                          </Button>

                          <Button 
                             variant="ghost" 
                             size="icon" 
                             className="h-12 w-12 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                             asChild
                             title="Modify Asset"
                          >
                             <Link href={`/dashboard/blog/${blog.id}`}>
                                <Edit2 className="h-5 w-5" />
                             </Link>
                          </Button>

                          <Button 
                             variant="ghost" 
                             size="icon" 
                             className="h-12 w-12 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
                             onClick={() => handleDelete(blog.id)}
                             title="Decommission Asset"
                          >
                             <Trash2 className="h-5 w-5" />
                          </Button>
                       </div>
                    </motion.div>
                 ))
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
