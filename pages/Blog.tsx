import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '../types';
import { ArrowRight, Calendar, User, Tag, ExternalLink, Globe, Loader2, BookOpen } from 'lucide-react';

const Blog: React.FC = () => {
  const { t, internalBlogPosts } = useLanguage();
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal');
  const [externalNews, setExternalNews] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch Logic for "Automatic News"
  // Using rss2json service to bypass CORS and fetch ArchDaily RSS
  useEffect(() => {
    if (activeTab === 'external' && externalNews.length === 0) {
      setLoading(true);
      setError(false);
      
      const RSS_URL = 'https://www.archdaily.com/feed/rss/';
      const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'ok') {
                const newsItems: BlogPost[] = data.items.map((item: any, index: number) => ({
                    id: `ext-${index}`,
                    title: item.title,
                    excerpt: item.description.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...', // Strip HTML
                    date: new Date(item.pubDate).toLocaleDateString(),
                    // Try to find image in thumbnail or enclosure, fallback to placeholder
                    image: item.thumbnail || item.enclosure?.link || 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop',
                    author: item.author,
                    category: 'Global Architecture',
                    link: item.link,
                    isExternal: true
                }));
                setExternalNews(newsItems);
            } else {
                setError(true);
            }
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  const MotionDiv = motion.div as any;
  const MotionButton = motion.button as any;

  return (
    <Section className="pt-32 min-h-screen">
       <div className="mb-12 md:mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight text-neutral-light">
                {t.nav.blog}
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-8" />
            
            {/* Tabs */}
            <div className="flex justify-center gap-4">
                <MotionButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('internal')}
                    className={`px-6 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 ${activeTab === 'internal' ? 'bg-accent text-primary border-accent font-bold' : 'bg-transparent text-neutral-dim border-neutral-light/20 hover:border-accent'}`}
                >
                    <BookOpen size={16} />
                    {t.common.companyInsights}
                </MotionButton>
                
                <MotionButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('external')}
                    className={`px-6 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 ${activeTab === 'external' ? 'bg-accent text-primary border-accent font-bold' : 'bg-transparent text-neutral-dim border-neutral-light/20 hover:border-accent'}`}
                >
                    <Globe size={16} />
                    {t.common.latestNews}
                </MotionButton>
            </div>
       </div>

       <AnimatePresence mode="wait">
         {activeTab === 'internal' ? (
            <MotionDiv 
                key="internal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {internalBlogPosts.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} t={t} />
                ))}
            </MotionDiv>
         ) : (
            <MotionDiv 
                key="external"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-accent">
                        <Loader2 size={48} className="animate-spin mb-4" />
                        <span className="font-mono text-sm tracking-widest uppercase">Fetching Global Feed...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-neutral-dim">
                        <p>Unable to load live news feed. Please try again later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {externalNews.map((post, i) => (
                            <BlogCard key={post.id} post={post} index={i} t={t} />
                        ))}
                    </div>
                )}
            </MotionDiv>
         )}
       </AnimatePresence>

    </Section>
  );
};

const BlogCard: React.FC<{ post: BlogPost, index: number, t: any }> = ({ post, index, t }) => {
    const MotionDiv = motion.div as any;
    
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-secondary border border-neutral-light/10 overflow-hidden flex flex-col h-full hover:border-accent/50 transition-colors duration-300"
        >
            {/* Image */}
            <div className="aspect-video overflow-hidden relative">
                <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';
                    }}
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
                
                {post.category && (
                    <div className="absolute top-4 left-4 bg-accent/90 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 flex items-center gap-1 backdrop-blur-sm">
                        <Tag size={10} />
                        {post.category}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-neutral-dim mb-4 font-mono">
                    <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-accent" />
                        {post.date}
                    </span>
                    {post.author && (
                        <span className="flex items-center gap-1">
                            <User size={12} className="text-accent" />
                            {post.author}
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold text-neutral-light mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title}
                </h3>
                
                <p className="text-neutral-dim text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                </p>

                <div className="pt-4 border-t border-neutral-light/5 mt-auto">
                    {post.isExternal ? (
                        <a 
                            href={post.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-between text-xs font-mono font-bold text-neutral-dim hover:text-accent transition-colors uppercase tracking-widest"
                        >
                            <span>Read Source</span>
                            <ExternalLink size={14} />
                        </a>
                    ) : (
                        <Link 
                            to={`/blog/${post.id}`}
                            className="flex items-center justify-between w-full text-xs font-mono font-bold text-neutral-dim hover:text-accent transition-colors uppercase tracking-widest"
                        >
                            <span>{t.common.readMore}</span>
                            <ArrowRight size={14} className="rtl-flip" />
                        </Link>
                    )}
                </div>
            </div>
        </MotionDiv>
    );
}

export default Blog;