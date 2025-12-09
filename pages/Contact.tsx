
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Section from '../components/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Globe, Copy, Check, Send, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

type SubjectType = 'inquiry' | 'careers' | 'partnership';

const Contact: React.FC = () => {
  const { t, language, direction } = useLanguage();
  const [time, setTime] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Form States
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('inquiry');

  // Initialize Clock & Office Status (Jerusalem Time)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Use Jerusalem time zone
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Jerusalem', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      };
      const timeString = now.toLocaleTimeString('en-US', options);
      setTime(timeString);

      // Logic for Open/Close (Sat-Thu, 8am-4pm Jerusalem time)
      // Friday (Day 5) is closed.
      const JerusalemDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }));
      const day = JerusalemDate.getDay(); // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
      const hour = JerusalemDate.getHours();
      
      const isFriday = day === 5; 
      const isWorkHour = hour >= 8 && hour < 16;
      setIsOpen(!isFriday && isWorkHour);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate network request
    setTimeout(() => {
        setFormState('success');
        // Reset after showing success for a while
        setTimeout(() => setFormState('idle'), 3000);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const MotionDiv = motion.div as any;
  const MotionH1 = motion.h1 as any;
  const MotionForm = motion.form as any;

  // Header Title Logic
  const getHeaderTitle = () => {
    if (selectedSubject === 'inquiry') return language === 'ar' ? 'استمارة المشروع 01' : 'PROJECT INQUIRY 01';
    if (selectedSubject === 'careers') return language === 'ar' ? 'طلب توظيف 01' : 'JOB APPLICATION 01';
    return language === 'ar' ? 'طلب شراكة 01' : 'PARTNERSHIP FORM 01';
  };

  // Message Index Logic
  const getMessageIndex = () => {
      if (selectedSubject === 'careers') return '05';
      return '04';
  };

  // Render dynamic fields based on selected subject
  const renderDynamicFields = () => {
      switch(selectedSubject) {
          case 'inquiry':
              return (
                 <div className="group relative">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2 block group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors font-bold">
                        03 // {t.contact.form.budget}
                    </label>
                    <select className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-light/20 py-3 text-lg text-neutral-900 dark:text-neutral-light focus:outline-none focus:border-accent transition-colors font-light appearance-none cursor-pointer">
                        <option className="bg-primary text-neutral-light"> &lt; $50k</option>
                        <option className="bg-primary text-neutral-light">$50k - $200k</option>
                        <option className="bg-primary text-neutral-light">$200k - $1M</option>
                        <option className="bg-primary text-neutral-light"> &gt; $1M</option>
                    </select>
                </div>
              );
          case 'careers':
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="group relative">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2 block group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors font-bold">
                            03 // {t.contact.form.position}
                        </label>
                        <input 
                            type="text" 
                            className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-light/20 py-3 text-lg text-neutral-900 dark:text-neutral-light placeholder-neutral-400 dark:placeholder-neutral-dim/20 focus:outline-none focus:border-accent transition-colors font-light"
                            placeholder={language === 'ar' ? 'مهندس معماري / إنشائي' : 'Architect / Engineer'}
                        />
                    </div>
                    <div className="group relative">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2 block group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors font-bold">
                            04 // {t.contact.form.portfolio}
                        </label>
                        <input 
                            type="url" 
                            className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-light/20 py-3 text-lg text-neutral-900 dark:text-neutral-light placeholder-neutral-400 dark:placeholder-neutral-dim/20 focus:outline-none focus:border-accent transition-colors font-light"
                            placeholder="https://"
                        />
                    </div>
                </div>
              );
          case 'partnership':
              return (
                <div className="group relative">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2 block group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors font-bold">
                        03 // {t.contact.form.organization}
                    </label>
                    <input 
                        type="text" 
                        className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-light/20 py-3 text-lg text-neutral-900 dark:text-neutral-light placeholder-neutral-400 dark:placeholder-neutral-dim/20 focus:outline-none focus:border-accent transition-colors font-light"
                        placeholder={language === 'ar' ? 'اسم الشركة / المؤسسة' : 'Company Name'}
                    />
                </div>
              );
          default:
              return null;
      }
  };

  return (
    <Section className="pt-32 min-h-screen">
        {/* HEADER */}
        <div className="max-w-4xl mb-12 md:mb-20">
            <MotionH1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-neutral-light"
            >
                {t.contact.title}
            </MotionH1>
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-2 bg-accent mb-8"
            />
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-neutral-dim font-light max-w-2xl leading-relaxed"
            >
                {t.contact.intro}
            </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* LEFT COLUMN: BENTO GRID DASHBOARD */}
            <MotionDiv 
                className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min h-fit"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {/* 1. Email Card */}
                <MotionDiv variants={itemVariants} className="md:col-span-2 bg-secondary border border-neutral-light/10 p-6 rounded-sm hover:border-accent/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Mail size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{t.contact.info.email}</span>
                            <button 
                                onClick={() => handleCopy('info@nebras-bim.com', 'email')}
                                className="text-neutral-dim hover:text-accent transition-colors"
                            >
                                {copiedField === 'email' ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </div>
                        <a href="mailto:info@nebras-bim.com" className="text-xl md:text-2xl font-bold text-neutral-light block break-all hover:text-accent transition-colors">
                            info@nebras-bim.com
                        </a>
                    </div>
                </MotionDiv>

                {/* 2. Phone Card */}
                <MotionDiv variants={itemVariants} className="bg-secondary border border-neutral-light/10 p-6 rounded-sm hover:border-accent/50 transition-all group relative overflow-hidden">
                     <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Phone size={80} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                             <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{t.contact.info.phone}</span>
                             <button 
                                onClick={() => handleCopy('+970 599 250 094', 'phone')}
                                className="text-neutral-dim hover:text-accent transition-colors"
                            >
                                {copiedField === 'phone' ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </div>
                        <a href="tel:+970599250094" className="text-lg font-bold text-neutral-light hover:text-accent transition-colors" style={{ direction: 'ltr' }}>
                            +970 599 250 094
                        </a>
                    </div>
                </MotionDiv>

                {/* 3. Live Status Card */}
                <MotionDiv variants={itemVariants} className="bg-secondary border border-neutral-light/10 p-6 rounded-sm hover:border-accent/50 transition-all group relative">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent block mb-8">Tubas Time</span>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-mono text-neutral-light font-bold">
                            {time || '--:--'}
                        </span>
                        <div className="flex items-center gap-2">
                             <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                             <span className="text-[10px] uppercase font-bold text-neutral-dim">
                                {isOpen ? (language === 'ar' ? 'مفتوح' : 'Open') : (language === 'ar' ? 'مغلق' : 'Closed')}
                             </span>
                        </div>
                    </div>
                </MotionDiv>

                {/* 4. Map Embed Card - Corrected Location */}
                <MotionDiv variants={itemVariants} className="md:col-span-2 aspect-[2/1] bg-secondary border border-neutral-light/10 rounded-sm overflow-hidden relative group">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d35.366306!3d32.325917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDE5JzMzLjMiTiAzNcKwMjEnNTguNyJF!5e1!3m2!1sen!2sps!4v1700000000000!5m2!1sen!2sps" 
                        width="100%" 
                        height="100%" 
                        style={{border:0, filter: 'grayscale(100%) invert(90%) contrast(85%)'}} 
                        allowFullScreen 
                        loading="lazy" 
                        className="opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    ></iframe>
                    
                    {/* Interactive Overlay */}
                    <div className="absolute inset-0 bg-primary/20 pointer-events-none group-hover:bg-transparent transition-colors flex items-center justify-center">
                        <div className="bg-primary/80 backdrop-blur px-4 py-2 rounded-full border border-neutral-light/10 flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-300">
                             <Globe size={14} className="text-accent" />
                             <span className="text-xs font-mono uppercase tracking-widest text-neutral-light">{t.contact.mapOverlay}</span>
                        </div>
                    </div>
                </MotionDiv>
            </MotionDiv>

            {/* RIGHT COLUMN: ENGINEERING FORM */}
            <div className="lg:col-span-7">
                <MotionForm
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                    onSubmit={handleSubmit}
                >
                    {/* Decoration Lines */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-neutral-light/10" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-light/10" />

                    <div className="py-8 md:py-12 space-y-12">
                         <div className="flex items-center justify-between mb-8">
                            <AnimatePresence mode="wait">
                                <motion.span 
                                    key={selectedSubject}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="font-mono text-xs uppercase tracking-widest text-neutral-dim bg-neutral-light/5 px-2 py-1 rounded"
                                >
                                    {getHeaderTitle()}
                                </motion.span>
                            </AnimatePresence>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-accent rounded-full" />
                                <div className="w-2 h-2 bg-neutral-light/20 rounded-full" />
                                <div className="w-2 h-2 bg-neutral-light/20 rounded-full" />
                            </div>
                         </div>

                         {/* SUBJECT SELECTION */}
                         <div className="group relative">
                             <label className="text-[10px] font-mono uppercase tracking-widest text-accent mb-4 block font-bold">
                                00 // {t.contact.form.subject}
                             </label>
                             <div className="flex flex-wrap gap-4">
                                {(['inquiry', 'careers', 'partnership'] as SubjectType[]).map((subj) => (
                                    <button
                                        key={subj}
                                        type="button"
                                        onClick={() => setSelectedSubject(subj)}
                                        className={`px-6 py-3 rounded-sm border transition-all duration-300 text-sm font-bold uppercase tracking-wide flex items-center gap-2 ${
                                            selectedSubject === subj 
                                            ? 'bg-accent text-primary border-accent shadow-lg shadow-accent/20' 
                                            : 'bg-transparent text-neutral-dim border-neutral-300 dark:border-neutral-light/10 hover:border-accent hover:text-accent'
                                        }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${selectedSubject === subj ? 'bg-primary' : 'bg-neutral-dim'}`} />
                                        {t.contact.subjects[subj]}
                                    </button>
                                ))}
                             </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div className="group relative">
                                <label className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2 block group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors font-bold">
                                    01 // {t.contact.form.name}
                                </label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-light/20 py-3 text-lg text-neutral-900 dark:text-neutral-light placeholder-neutral-400 dark:placeholder-neutral-dim/20 focus:outline-none focus:border-accent transition-colors font-light"
                                    placeholder={t.contact.form.namePlaceholder}
                                />
                            </div>

                             {/* Email */}
                             <div className="group relative">
                                <label className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2 block group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors font-bold">
                                    02 // {t.contact.form.email}
                                </label>
                                <input 
                                    type="email" 
                                    required
                                    className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-light/20 py-3 text-lg text-neutral-900 dark:text-neutral-light placeholder-neutral-400 dark:placeholder-neutral-dim/20 focus:outline-none focus:border-accent transition-colors font-light"
                                    placeholder={t.contact.form.emailPlaceholder}
                                />
                            </div>
                         </div>

                         {/* DYNAMIC FIELDS INSERTION */}
                         <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedSubject}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderDynamicFields()}
                            </motion.div>
                         </AnimatePresence>

                         {/* Message */}
                         <div className="group relative">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2 block group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors font-bold">
                                {getMessageIndex()} // {t.contact.form.message}
                            </label>
                            <textarea 
                                rows={4}
                                required
                                className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-light/20 py-3 text-lg text-neutral-900 dark:text-neutral-light placeholder-neutral-400 dark:placeholder-neutral-dim/20 focus:outline-none focus:border-accent transition-colors font-light resize-none"
                                placeholder={t.contact.form.messagePlaceholder}
                            />
                         </div>

                         {/* Submit Button */}
                         <div className="flex justify-end pt-4">
                            <button 
                                type="submit" 
                                disabled={formState !== 'idle'}
                                className={`
                                    relative overflow-hidden group px-10 py-4 bg-transparent border border-accent/30 hover:border-accent transition-all duration-300
                                    ${formState === 'success' ? 'border-green-500' : ''}
                                `}
                            >
                                <div className={`
                                    absolute inset-0 bg-accent transition-transform duration-500 origin-left
                                    ${formState === 'idle' ? 'scale-x-0 group-hover:scale-x-100' : ''}
                                    ${formState === 'submitting' ? 'scale-x-100 opacity-50' : ''}
                                    ${formState === 'success' ? 'bg-green-500 scale-x-100' : ''}
                                `} />
                                
                                <div className="relative z-10 flex items-center gap-3">
                                    {formState === 'idle' && (
                                        <>
                                            <span className="font-mono text-sm uppercase tracking-widest font-bold text-accent group-hover:text-primary transition-colors">
                                                {t.contact.form.submit}
                                            </span>
                                            <ArrowRight size={18} className="text-accent group-hover:text-primary transition-colors rtl-flip group-hover:translate-x-1 duration-300" />
                                        </>
                                    )}
                                    {formState === 'submitting' && (
                                        <>
                                            <Loader2 size={18} className="animate-spin text-primary" />
                                            <span className="font-mono text-sm uppercase tracking-widest font-bold text-primary">
                                                Processing...
                                            </span>
                                        </>
                                    )}
                                    {formState === 'success' && (
                                        <>
                                            <CheckCircle2 size={18} className="text-white" />
                                            <span className="font-mono text-sm uppercase tracking-widest font-bold text-white">
                                                Message Sent
                                            </span>
                                        </>
                                    )}
                                </div>
                            </button>
                         </div>
                    </div>
                </MotionForm>
            </div>
        </div>
    </Section>
  );
};

export default Contact;
