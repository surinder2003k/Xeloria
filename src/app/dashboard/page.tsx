"use client";

import { Button } from "@/components/ui/button";
import { 
  Zap, 
  ArrowRight, 
  Plus, 
  Activity, 
  Globe, 
  ExternalLink,
  FileText,
  User,
  Layout,
  LayoutDashboard,
  MoreVertical,
  Trash2,
  Edit3,
  Eye,
  Loader2,
  Sparkles,
  Search,
  Layers
} from "lucide-react";
import { XeloriaLogo } from "@/components/BrandLogo";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// 3D Tilt Card Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "xyzg135@gmail.com";

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchPortfolios();
  }, [user, isLoaded]);

  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user!.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setPortfolios(data || []);
    } catch (e: any) {
      toast.error("Failed to fetch portfolios");
    } finally {
      setLoading(false);
    }
  };

  const createNewPortfolio = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          name: `Portfolio #${portfolios.length + 1}`,
          resume_data: { personalInfo: { fullName: user.fullName || "" } },
          template_id: 'glass'
        })
        .select()
        .single();

      if (error) throw error;
      toast.success("New portfolio initialized!");
      router.push(`/dashboard/portfolio-builder?id=${data.id}`);
    } catch (e: any) {
      toast.error("Creation failed");
    }
  };

  const deletePortfolio = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio?")) return;
    try {
      const { error } = await supabase.from('resumes').delete().eq('id', id);
      if (error) throw error;
      toast.success("Portfolio deleted");
      fetchPortfolios();
    } catch (e: any) {
      toast.error("Delete failed");
    }
  };

  if (!isLoaded) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 lg:p-12 space-y-8 md:space-y-12">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4 md:gap-6">
            <XeloriaLogo className="h-12 w-12 md:h-16 md:w-16 drop-shadow-2xl transition-all" />
           <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-indigo-400 bg-indigo-500/10 w-fit px-3 py-1.5 rounded-full mb-2 md:mb-3 border border-indigo-500/20"
              >
                <Activity className="h-3 w-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">Portal Status: Active</span>
              </motion.div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase">
                Main <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Portal</span>
              </h1>
              <p className="text-slate-500 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] mt-2">
                {isAdmin ? "SYSTEM ADMINISTRATOR" : "ASSET CREATOR"} // {portfolios.length} NODES
              </p>
           </div>
        </div>

        <div className="w-full sm:w-auto">
           <Button 
            onClick={createNewPortfolio}
            className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-10 rounded-2xl bg-white text-black hover:bg-slate-200 font-black text-sm md:text-lg shadow-2xl shadow-white/10 group transition-all"
           >
            <Plus className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 group-hover:rotate-90 transition-transform" />
            <span>CREATE PORTFOLIO</span>
           </Button>
        </div>
      </div>

      {/* Portfolios Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-64 bg-white/5 rounded-[2.5rem] border border-white/10 animate-pulse" />
          ))
        ) : portfolios.length > 0 ? (
          portfolios.map((p, i) => (
            <motion.div 
              key={p.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 border border-white/10 hover:border-indigo-500/50 transition-all h-full flex flex-col justify-between overflow-hidden relative shadow-2xl">
                {/* Gradient Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <Globe className="h-7 w-7" />
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10" onClick={() => router.push(`/dashboard/portfolio-builder?id=${p.id}`)}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 hover:bg-red-500/20 text-red-400" onClick={() => deletePortfolio(p.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-indigo-400 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Last Modified: {new Date(p.updated_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="relative z-10 pt-10 flex gap-4">
                  <Button variant="outline" className="flex-1 h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest" asChild>
                    <Link href={`/p/${(p.resume_data as any)?.personalInfo?.fullName?.toLowerCase().replace(/\s+/g, '-') || 'user'}?theme=${p.template_id}`} target="_blank">
                      <Eye className="mr-2 h-4 w-4" /> Preview
                    </Link>
                  </Button>
                  <Button className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20" onClick={() => router.push(`/dashboard/portfolio-builder?id=${p.id}`)}>
                    EDIT ASSET
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="lg:col-span-3 h-80 md:h-96 bg-white/5 rounded-[2rem] md:rounded-[4rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-6 md:p-12">
            <div className="h-20 w-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
              <Plus className="h-10 w-10 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-black uppercase">No Active Assets Found</h3>
            <p className="text-slate-500 font-medium max-w-md mt-4 mb-8">Launch your professional presence today. Start by creating your first portfolio synthesis.</p>
            <Button onClick={createNewPortfolio} className="h-14 px-10 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-500 font-black tracking-widest uppercase">
              Initialize First Portfolio
            </Button>
          </div>
        )}
      </div>

      {/* Admin Specific Section (Visible to Admin Only but below main user flow) */}
      {isAdmin && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 pt-12 border-t border-white/10"
        >
          <div className="flex items-center gap-4 mb-10">
            <XeloriaLogo className="h-12 w-12 group-hover:scale-110 transition-all drop-shadow-2xl" />
            <div>
              <h2 className="text-3xl font-black tracking-tight uppercase">Admin <span className="text-purple-400">Operations</span></h2>
              <div className="flex items-center gap-2 mt-2">
                <Zap className="h-3 w-3 text-purple-400" />
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Privileged Access Mode // Multi-Node Control</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/dashboard/blog" className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group">
              <Layers className="h-10 w-10 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-black uppercase tracking-tight text-lg">Manage Blog</h4>
              <p className="text-xs text-slate-500 mt-2">Editorial pipeline & content sync.</p>
            </Link>
            
            <Link href="/dashboard/automate" className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group">
              <Activity className="h-10 w-10 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-black uppercase tracking-tight text-lg">Automation Logs</h4>
              <p className="text-xs text-slate-500 mt-2">System health & execution metrics.</p>
            </Link>
          </div>
        </motion.section>
      )}
    </div>
  );
}
