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
  Layers,
  Timer
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
      toast.success("New project started!");
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
    <div className="min-h-screen bg-[#030303] text-slate-200 noise-bg p-6 md:p-10 lg:p-14 space-y-12">
      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest"
          >
            <div className="h-1 w-8 bg-indigo-500 rounded-full" />
            Studio Dashboard
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Welcome back, <span className="text-indigo-400">{user?.firstName || "Creator"}</span>
          </h1>
          <p className="text-slate-400 font-medium text-base max-w-xl">
            {portfolios.length > 0 
              ? `You have ${portfolios.length} active projects. Keep building your legacy.` 
              : "Ready to showcase your best work? Start by creating your first portfolio."}
          </p>
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full md:w-auto"
        >
           <Button 
            onClick={createNewPortfolio}
            size="lg"
            className="w-full md:w-auto h-14 px-10 rounded-xl bg-white text-black hover:bg-slate-100 font-bold text-sm shadow-xl transition-all active:scale-95 group"
           >
            <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
            NEW PROJECT
           </Button>
        </motion.div>
      </div>

      {/* Portfolios Grid */}
      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between border-b border-white/[0.05] pb-6">
           <h3 className="text-xl font-bold text-white">Your Projects</h3>
           {portfolios.length > 0 && (
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
               {portfolios.length} Total
             </span>
           )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-64 bg-white/5 rounded-3xl border border-white/10 animate-pulse" />
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
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/[0.05] hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all h-full flex flex-col justify-between overflow-hidden shadow-xl">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                        <Layout className="h-6 w-6" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-white/5 hover:bg-white/10" onClick={() => router.push(`/dashboard/portfolio-builder?id=${p.id}`)}>
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400" onClick={() => deletePortfolio(p.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                       <Timer className="h-3 w-3" />
                       Edited {new Date(p.updated_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="relative z-10 pt-10 flex gap-4">
                    <Button variant="ghost" className="flex-1 h-11 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] font-bold uppercase tracking-widest" asChild>
                      <Link href={`/p/${(p.resume_data as any)?.personalInfo?.fullName?.toLowerCase().replace(/\s+/g, '-') || 'user'}?theme=${p.template_id}`} target="_blank">
                        <Eye className="mr-2 h-4 w-4" /> Preview
                      </Link>
                    </Button>
                    <Button className="flex-1 h-11 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20" onClick={() => router.push(`/dashboard/portfolio-builder?id=${p.id}`)}>
                      Edit project
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="lg:col-span-3 h-80 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/[0.1] flex flex-col items-center justify-center text-center p-12">
              <div className="h-16 w-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
                <Plus className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white">No active projects</h3>
              <p className="text-slate-500 font-medium max-w-sm mt-3 mb-8 text-sm">Launch your professional presence today. Start by creating your first portfolio.</p>
              <Button onClick={createNewPortfolio} className="h-12 px-10 rounded-xl bg-indigo-500 text-white hover:bg-indigo-400 font-bold tracking-widest uppercase text-xs">
                Create My First Portfolio
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Admin Operations - Studio Styled */}
      {isAdmin && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 pt-12 border-t border-white/[0.05]"
        >
          <div className="flex items-center gap-4 mb-10">
             <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-purple-400" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-white">Admin Operations</h2>
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1">Multi-Node Management // Privileged Mode</p>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/dashboard/blog" className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all group">
              <Layers className="h-8 w-8 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-white text-lg">Journal Editor</h4>
              <p className="text-xs text-slate-500 mt-2 font-medium">Manage editorial content and synchronization.</p>
            </Link>
            
            <Link href="/dashboard/automate" className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all group">
              <Activity className="h-8 w-8 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-white text-lg">System Health</h4>
              <p className="text-xs text-slate-500 mt-2 font-medium">Real-time automation logs and metrics.</p>
            </Link>
          </div>
        </motion.section>
      )}
    </div>
  );
}
