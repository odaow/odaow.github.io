
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Section from '../components/Section';
import SEO from '../components/SEO';
import Schema from '../components/Schema';
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, internalBlogPosts } = useLanguage();
  
  const post = internalBlogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <Section className="pt-32 min-h-[60vh] flex flex-col items-center justify-center text-center">
         <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dim">{t.common.notFoundTitle}</h1>
         <p className="text-neutral-dim mb-8">The article you are looking for does not exist.</p>
         <Link to="/blog" className="text-accent hover:underline flex items-center gap-2">
            <ArrowLeft className="rtl-flip" /> {t.common.companyInsights}
         </Link>
      </Section>
    );
  }

  const MotionDiv = motion.div as any;
  const MotionH1 = motion.h1 as any;

  return (
    <div className="bg-primary min-h-screen">
       <SEO 
         title={post.title} 
         description={post.excerpt} 
         image={post.image} 
         type="article" 
         path={`/blog/${post.id}`}
       />
       <Schema type="article" data={post} />
       
       {/* Hero Image */}
       <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
           <div className="absolute inset-0 bg-primary/40 z-10" />
           <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10" />
           <img 
             src={post.image} 
             alt={post.title} 
             className="w-full h-full object-cover"
           />
           
           <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 md:pb-20 max-w-4xl mx-auto px-6">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-4 mb-4 text-xs font-mono font-bold uppercase tracking-widest text-accent"
                >
                    <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-sm flex items-center gap-2 border border-white/10">
                        <Tag size={12} /> {post.category}
                    </span>
                    <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-sm flex items-center gap-2 border border-white/10">
                        <Calendar size={12} /> {post.date}
                    </span>
                    <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-sm flex items-center gap-2 border border-white/10">
                         <Clock size={12} /> 5 min read
                    </span>
                </MotionDiv>

                <MotionH1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 drop-shadow-lg"
                >
                    {post.title}
                </MotionH1>

                {post.author && (
                    <MotionDiv 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.2 }}
                         className="flex items-center gap-3"
                    >
                         <div className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold">
                             {post.author.charAt(0)}
                         </div>
                         <div className="text-white">
                             <div className="text-xs text-white/60 uppercase tracking-widest">Written By</div>
                             <div className="font-bold">{post.author}</div>
                         </div>
                    </MotionDiv>
                )}
           </div>
       </div>

       <Section className="py-12 md:py-20 max-w-4xl mx-auto">
            <Link 
                to="/blog"
                className="inline-flex items-center gap-2 text-neutral-dim hover:text-accent mb-8 transition-colors text-sm font-mono uppercase tracking-widest"
            >
                <ArrowLeft size={16} className="rtl-flip" /> Back to Insights
            </Link>

            <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="prose prose-invert prose-lg md:prose-xl max-w-none text-neutral-light leading-relaxed whitespace-pre-line"
            >
                {post.content ? post.content : post.excerpt}
            </MotionDiv>
            
            {/* Share / Footer of Article */}
            <div className="mt-16 pt-8 border-t border-neutral-light/10 flex justify-between items-center">
                 <span className="font-mono text-xs text-neutral-dim uppercase tracking-widest">Share this article</span>
                 <div className="flex gap-4">
                     <button className="w-10 h-10 rounded-full border border-neutral-light/10 flex items-center justify-center hover:bg-accent hover:text-primary hover:border-accent transition-all">
                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                     </button>
                     <button className="w-10 h-10 rounded-full border border-neutral-light/10 flex items-center justify-center hover:bg-accent hover:text-primary hover:border-accent transition-all">
                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                     </button>
                     <button className="w-10 h-10 rounded-full border border-neutral-light/10 flex items-center justify-center hover:bg-accent hover:text-primary hover:border-accent transition-all">
                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>
                     </button>
                 </div>
            </div>
       </Section>
    </div>
  );
};

export default BlogPostDetail;
