


import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Direction, Translations, Project, Service, TeamMember, Partner, Testimonial, BlogPost } from '../types';
import { TRANSLATIONS, PROJECTS, SERVICES, PREMIUM_SERVICES, TEAM, PARTNERS, INTERIOR_PROJECTS, TESTIMONIALS, INTERNAL_BLOG_POSTS } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  direction: Direction;
  t: Translations;
  toggleLanguage: () => void;
  // Dynamic Data
  projects: Project[];
  interiorProjects: Project[];
  services: Service[];
  premiumServices: Service[];
  team: TeamMember[];
  partners: Partner[];
  testimonials: Testimonial[];
  internalBlogPosts: BlogPost[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Data State with Static Fallback
  const [data, setData] = useState({
    TRANSLATIONS,
    PROJECTS,
    INTERIOR_PROJECTS,
    SERVICES,
    PREMIUM_SERVICES,
    TEAM,
    PARTNERS,
    TESTIMONIALS,
    INTERNAL_BLOG_POSTS
  });

  // Hydrate from JSON (CMS compatibility)
  useEffect(() => {
    // Robust path finding: try relative path first
    const contentPath = './data/content.json';
    
    fetch(contentPath)
      .then(res => {
        if (!res.ok) {
           // Fallback for different routing scenarios
           return fetch('data/content.json'); 
        }
        return res;
      })
      .then(res => {
        if (!res.ok) throw new Error("Failed to load dynamic content");
        return res.json();
      })
      .then(jsonData => {
        // Normalization Helper: Netlify CMS often saves lists as objects [{image: 'url'}]
        // We need to flatten them to strings ['url'] if they are not already.
        const normalizeGallery = (items: any[]) => {
          if (!items) return [];
          return items.map(item => {
            if (item.gallery && Array.isArray(item.gallery)) {
              const newGallery = item.gallery.map((g: any) => {
                if (typeof g === 'string') return g;
                // If it's an object from CMS, return the 'image' or 'url' property
                return g.image || g.url || g; 
              });
              return { ...item, gallery: newGallery };
            }
            return item;
          });
        };

        // Normalize Projects
        if (jsonData.PROJECTS) {
          jsonData.PROJECTS.en = normalizeGallery(jsonData.PROJECTS.en);
          jsonData.PROJECTS.ar = normalizeGallery(jsonData.PROJECTS.ar);
        }
        if (jsonData.INTERIOR_PROJECTS) {
           jsonData.INTERIOR_PROJECTS.en = normalizeGallery(jsonData.INTERIOR_PROJECTS.en);
           jsonData.INTERIOR_PROJECTS.ar = normalizeGallery(jsonData.INTERIOR_PROJECTS.ar);
        }
        // Normalize Partners
        if (jsonData.PARTNERS) {
           jsonData.PARTNERS.en = normalizeGallery(jsonData.PARTNERS.en);
           jsonData.PARTNERS.ar = normalizeGallery(jsonData.PARTNERS.ar);
        }

        // Safe Merge: Only update keys that exist in the fetched JSON
        setData(prev => ({
          ...prev,
          ...jsonData
        }));
        console.log("CMS Content Loaded Successfully");
      })
      .catch(err => {
        console.warn("Using static content fallback due to load error:", err);
      });
  }, []);

  useEffect(() => {
    // Sync with HTML attribute
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const value = {
    language,
    setLanguage,
    direction: (language === 'ar' ? 'rtl' : 'ltr') as Direction,
    // Safely access translations with fallback to EN if specific key is missing
    t: data.TRANSLATIONS[language] || data.TRANSLATIONS['en'],
    toggleLanguage,
    projects: data.PROJECTS[language] || [],
    interiorProjects: data.INTERIOR_PROJECTS[language] || [],
    services: data.SERVICES[language] || [],
    premiumServices: data.PREMIUM_SERVICES[language] || [],
    team: data.TEAM[language] || [],
    partners: data.PARTNERS[language] || [],
    testimonials: data.TESTIMONIALS[language] || [],
    internalBlogPosts: data.INTERNAL_BLOG_POSTS[language] || []
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
