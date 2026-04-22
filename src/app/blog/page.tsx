import { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Tag, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Blog | Xeloria Insights",
  description: "Career advice, resume tips, and professional portfolio guides to help you land your dream job.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogArchivePage() {
  const { data: posts, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-32 relative z-10">
        <header className="mb-32 text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
             <Terminal className="h-3 w-3" /> Intel Feed Sync
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight uppercase leading-none">
             Xeloria <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 italic">Insights</span>
          </h1>
          <p className="text-sm md:text-lg text-slate-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
            EXPERT PROTOCOLS ON CAREER GROWTH, PERSONAL BRANDING, AND THE ARCHITECTURE OF PROFESSIONAL STORYTELLING.
          </p>
        </header>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {posts.map((post, idx) => (
              <article key={post.id} className="group cursor-pointer">
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] rounded-[3.5rem] overflow-hidden border border-white/10 mb-10 relative bg-white/5 shadow-2xl transition-all duration-500 group-hover:border-indigo-500/30">
                    {post.image_url ? (
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center text-slate-700">
                         <Tag className="h-20 w-20" />
                      </div>
                    )}
                    <div className="absolute top-8 left-8">
                      <span className="px-6 py-2 bg-indigo-600/90 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] border border-white/20 shadow-2xl">
                        {post.category || "SYSTEM_LOG"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-6 px-4">
                    <div className="flex items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                      <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-indigo-500" /> {format(new Date(post.created_at), 'MMM dd, yyyy')}</span>
                      <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-purple-500" /> 5 MIN READ</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight uppercase leading-none">
                      {post.title}
                    </h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] leading-relaxed line-clamp-3">
                      {post.excerpt || "DECRYPTING THE LATEST ARCHITECTURES IN PROFESSIONAL PERFORMANCE AND CAREER OPTIMIZATION."}
                    </p>
                    <div className="pt-6">
                      <Button variant="link" className="p-0 text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 group-hover:gap-6 transition-all">
                        Access Intel <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center space-y-8 bg-white/[0.02] border border-dashed border-white/10 rounded-[4rem]">
             <div className="h-24 w-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-700">
                <Tag className="h-12 w-12" />
             </div>
             <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tight">Archives Locked</h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">No active signals detected in this sector.</p>
             </div>
          </div>
        )}
      </main>

      {/* Newsletter Section */}
      <section className="py-40 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto bg-white/[0.03] backdrop-blur-3xl p-16 md:p-28 rounded-[4rem] border border-white/10 text-center space-y-12 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <div className="space-y-6">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-slate-500 text-[10px] font-black uppercase tracking-widest mx-auto">
               <Sparkles className="h-3 w-3" /> Protocol Sync
             </div>
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
               Career protocols <br />
               <span className="text-indigo-500 italic">transmitted weekly.</span>
             </h2>
             <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-relaxed">JOIN 10,000+ PROFESSIONALS RECEIVING STRATEGIC INTELLIGENCE.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
             <input 
              type="email" 
              placeholder="IDENTITY@PROTOCOL.SYS" 
              className="flex-grow px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest text-white placeholder:text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all"
             />
             <Button className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-slate-200 font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-white/10">
               Authorize
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
