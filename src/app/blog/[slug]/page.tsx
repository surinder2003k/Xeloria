import { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Simulated fetch
  return {
    title: `${slug.replace(/-/g, " ")} | Xeloria Blog`,
    description: "Expert career advice and tips.",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Placeholder post data
  const post = {
    title: "How to Build an ATS-Friendly Resume in 2024",
    content: `
      <p>The Application Tracking System (ATS) is often seen as a gatekeeper that stands between you and your dream job. In reality, it's just a tool—and like any tool, it can be understood and optimized for.</p>
      <h2>What is an ATS?</h2>
      <p>An ATS is a software application that enables the electronic handling of recruitment needs. It parses resumes and ranks candidates based on keywords and formatting.</p>
      <blockquote>"Your resume is not just a document; it's a data packet for a machine before it reaches a human."</blockquote>
      <h2>Keywords Matter</h2>
      <p>The best way to rank high is to use the exact terminology found in the job description. If they ask for "Adobe Creative Suite," don't just say "Photoshop."</p>
    `,
    date: "Oct 24, 2024",
    readTime: "5 min read",
    author: "Xeloria Team",
    category: "Career Advice",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  };

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 italic selection:not-italic">
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-6 py-20">
        <Link href="/blog">
          <Button variant="ghost" className="mb-12 gap-2 text-slate-400 hover:text-indigo-600 pl-0 group font-bold uppercase tracking-widest text-xs">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
          </Button>
        </Link>

        <header className="space-y-8 mb-16">
          <div className="flex items-center gap-3">
             <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-100">
               {post.category}
             </span>
             <span className="h-1 w-1 bg-slate-200 rounded-full" />
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <Calendar className="h-3 w-3" /> {post.date}
             </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-y border-slate-100 py-6">
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-black text-slate-400">
                   {post.author.charAt(0)}
                </div>
                <div>
                   <p className="text-sm font-black text-slate-900">{post.author}</p>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Content Strategist</p>
                </div>
             </div>
             <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors border-slate-200">
                   <Share2 className="h-4 w-4" />
                </Button>
             </div>
          </div>
        </header>

        <div className="aspect-[21/9] rounded-[3rem] overflow-hidden border border-slate-100 mb-16 shadow-2xl shadow-slate-200/50">
           <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
           />
        </div>

        <div 
          className="prose prose-lg max-w-none prose-slate prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:leading-relaxed prose-p:text-slate-600 prose-blockquote:border-l-4 prose-blockquote:border-indigo-600 prose-blockquote:bg-indigo-50/50 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:font-bold prose-blockquote:italic prose-a:text-indigo-600 prose-strong:text-slate-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-20 pt-12 border-t border-slate-100 flex justify-between items-center text-slate-400 font-bold uppercase tracking-widest text-xs">
           <span>No comments yet.</span>
           <span className="flex items-center gap-2 text-indigo-600 cursor-pointer hover:underline">
              Next Post <ArrowLeft className="h-4 w-4 rotate-180" />
           </span>
        </div>
      </article>

      <footer className="bg-slate-900 text-white py-20 mt-20">
         <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-3xl font-black tracking-tight">Ready to stand out?</h2>
            <p className="text-slate-400 text-lg">Use our professional tools to build your presence today.</p>
            <div className="flex justify-center gap-4 pt-4">
               <Link href="/dashboard/resume-builder">
                 <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 font-bold">Build Resume</Button>
               </Link>
               <Link href="/dashboard/portfolio">
                 <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 font-bold">Create Portfolio</Button>
               </Link>
            </div>
         </div>
      </footer>
    </div>
  );
}
