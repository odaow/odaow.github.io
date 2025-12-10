
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const myForm = e.currentTarget;
    const formData = new FormData(myForm);
    
    // Explicitly append the subject since it is controlled state
    formData.set('subject', selectedSubject);

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString()
    })
    .then(() => {
        setFormState('success');
        myForm.reset();
        setTimeout(() => setFormState('idle'), 3000);
    })
    .catch((error) => {
        console.error(error);
        alert("Error submitting form. Please try again.");
        setFormState('idle');
    });
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

  // Dynamic Message Placeholder
  const getMessagePlaceholder = () => {
    if (selectedSubject === 'careers') {
        return language === 'ar' 
            ? 'حدثنا عن خبراتك، مهاراتك، ولماذا ترغب بالانضمام لفريق النبراس...' 
            : 'Tell us about your experience, skills, and why you want to join Al Nebras...';
    }
    if (selectedSubject === 'partnership') {
        return language === 'ar' 
            ? 'أخبرنا عن طبيعة الشراكة المقترحة وكيف يمكننا التعاون سوياً...' 
            : 'Tell us about the proposed partnership and how we can collaborate...';
    }
    return t.contact.form.messagePlaceholder;
  };

  // Render dynamic fields based on selected subject
  const renderDynamicFields = () => {
      switch(selectedSubject) {
          case 'inquiry':
              return (
                 <div className="group relative">
                    <label className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-accent mb-2 block font-bold flex items-center gap-2">
                        <span className="w-1 h-1 bg-accent rounded-full"></span>
                        03 // {t.contact.form.budget}
                    </label>
                    <div className="relative">
                        <select name="budget" className="w-full bg-secondary/30 border border-neutral-light/10 rounded-sm px-4 py-3 text-sm text-neutral-light focus:outline-none focus:border-accent focus:bg-secondary/50 transition-all font-light appearance-none cursor-pointer">
                            <option value="< 50k" className="bg-secondary text-neutral-light"> &lt; $50k</option>
                            <option value="50k-200k" className="bg-secondary text-neutral-light">$50k - $200k</option>
                            <option value="200k-1M" className="bg-secondary text-neutral-light">$200k - $1M</option>
                            <option value="> 1M" className="bg-secondary text-neutral-light"> &gt; $1M</option>
                        </select>
                        <div className="absolute top-1/2 end-4 -translate-y-1/2 pointer-events-none text-neutral-dim">
                             <ArrowRight size={14} className="rotate-90" />
                        </div>
                    </div>
                </div>
              );
          case 'careers':
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div className="group relative">
                        <label className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-accent mb-2 block font-bold flex items-center gap-2">
                            <span className="w-1 h-1 bg-accent rounded-full"></span>
                            03 // {t.contact.form.position}
                        </label>
                        <input 
                            type="text" 
                            name="position"
                            className="w-full bg-secondary/30 border border-neutral-light/10 rounded-sm px-4 py-3 text-sm text-neutral-light placeholder-neutral-dim/40 focus:outline-none focus:border-accent focus:bg-secondary/50 transition-all font-light"
                            placeholder={language === 'ar' ? 'مهندس معماري / إنشائي' : 'Architect / Engineer'}
                        />
                    </div>
                    <div className="group relative">
                        <label className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-accent mb-2 block font-bold flex items-center gap-2">
                            <span className="w-1 h-1 bg-accent rounded-full"></span>
                            04 // {t.contact.form.portfolio}
                        </label>
                        <input 
                            type="url" 
                            name="portfolio"
                            className="w-full bg-secondary/30 border border-neutral-light/10 rounded-sm px-4 py-3 text-sm text-neutral-light placeholder-neutral-dim/40 focus:outline-none focus:border-accent focus:bg-secondary/50 transition-all font-light"
                            placeholder="https://"
                        />
                    </div>
                </div>
              );
          case 'partnership':
              return (
                <div className="group relative">
                    <label className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-accent mb-2 block font-bold flex items-center gap-2">
                        <span className="w-1 h-1 bg-accent rounded-full"></span>
                        03 // {t.contact.form.organization}
                    </label>
                    <input 
                        type="text" 
                        name="organization"
                        className="w-full bg-secondary/30 border border-neutral-light/10 rounded-sm px-4 py-3 text-sm text-neutral-light placeholder-neutral-dim/40 focus:outline-none focus:border-accent focus:bg-secondary/50 transition-all font-light"
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
        <div className="max-w-4xl mb-12 md:mb-16">
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
                className="h-1.5 bg-accent mb-6"
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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT COLUMN: BENTO GRID DASHBOARD */}
            <MotionDiv 
                className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min h-fit sticky top-28"
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

                {/* 4. Map Embed Card */}
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
                    
                    <div className="absolute inset-0 bg-primary/20 pointer-events-none group-hover:bg-transparent transition-colors flex items-center justify-center">
                        <div className="bg-primary/80 backdrop-blur px-4 py-2 rounded-full border border-neutral-light/10 flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-300">
                             <Globe size={14} className="text-accent" />
                             <span className="text-xs font-mono uppercase tracking-widest text-neutral-light">{t.contact.mapOverlay}</span>
                        </div>
                    </div>
                </MotionDiv>
            </MotionDiv>

            {/* RIGHT COLUMN: ENGINEERING FORM (REDESIGNED) */}
            <div className="lg:col-span-7">
                <MotionForm
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-primary/95 backdrop-blur-xl border border-white/5 rounded-lg p-6 md:p-8 shadow-2xl"
                    onSubmit={handleSubmit}
                    name="contact"
                    method="POST"
                    data-netlify="true"
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <input type="hidden" name="subject" value={selectedSubject} />

                    {/* Header: Dynamic Title */}
                    <div className="flex items-center justify-between mb-8 border-b border-neutral-light/5 pb-4">
                        <div className="flex flex-col gap-1">
                            <AnimatePresence mode="wait">
                                <motion.span 
                                    key={selectedSubject}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="font-mono text-xs uppercase tracking-widest text-accent font-bold"
                                >
                                    {getHeaderTitle()}
                                </motion.span>
                            </AnimatePresence>
                            <span className="text-[10px] text-neutral-dim font-mono uppercase tracking-wider opacity-60">Confidential Submission</span>
                        </div>
                        <div className="flex gap-2 opacity-50">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                            <div className="w-1.5 h-1.5 bg-neutral-light/20 rounded-full" />
                            <div className="w-1.5 h-1.5 bg-neutral-light/20 rounded-full" />
                        </div>
                     </div>

                    <div className="space-y-5">
                         {/* SUBJECT SELECTION - Modern Grid */}
                         <div className="group relative">
                             <label className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-accent mb-3 block font-bold flex items-center gap-2">
                                <span className="w-1 h-1 bg-accent rounded-full"></span>
                                00 // {t.contact.form.subject}
                             </label>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                                {(['inquiry', 'careers', 'partnership'] as SubjectType[]).map((subj) => (
                                    <button
                                        key={subj}
                                        type="button"
                                        onClick={() => setSelectedSubject(subj)}
                                        className={`
                                            relative overflow-hidden py-3 px-2 rounded-sm border transition-all duration-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 h-12
                                            ${selectedSubject === subj 
                                                ? 'bg-accent border-accent text-primary shadow-[0_0_20px_rgba(var(--color-accent),0.3)]' 
                                                : 'bg-secondary/30 border-neutral-light/10 text-neutral-dim hover:border-accent/50 hover:text-neutral-light'
                                            }
                                        `}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {selectedSubject === subj && <CheckCircle2 size={14} />}
                                            {t.contact.subjects[subj]}
                                        </span>
                                    </button>
                                ))}
                             </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Name */}
                            <div className="group relative">
                                <label className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-accent mb-2 block font-bold flex items-center gap-2">
                                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                                    01 // {t.contact.form.name}
                                </label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    className="w-full bg-secondary/30 border border-neutral-light/10 rounded-sm px-4 py-3 text-sm text-neutral-light placeholder-neutral-dim/40 focus:outline-none focus:border-accent focus:bg-secondary/50 transition-all font-light"
                                    placeholder={t.contact.form.namePlaceholder}
                                />
                            </div>

                             {/* Email */}
                             <div className="group relative">
                                <label className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-accent mb-2 block font-bold flex items-center gap-2">
                                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                                    02 // {t.contact.form.email}
                                </label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    className="w-full bg-secondary/30 border border-neutral-light/10 rounded-sm px-4 py-3 text-sm text-neutral-light placeholder-neutral-dim/40 focus:outline-none focus:border-accent focus:bg-secondary/50 transition-all font-light"
                                    placeholder={t.contact.form.emailPlaceholder}
                                />
                            </div>
                         </div>

                         {/* DYNAMIC FIELDS */}
                         <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedSubject}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                {renderDynamicFields()}
                            </motion.div>
                         </AnimatePresence>

                         {/* Message */}
                         <div className="group relative">
                            <label className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-accent mb-2 block font-bold flex items-center gap-2">
                                <span className="w-1 h-1 bg-accent rounded-full"></span>
                                {getMessageIndex()} // {t.contact.form.message}
                            </label>
                            <textarea 
                                name="message"
                                rows={4}
                                required
                                className="w-full bg-secondary/30 border border-neutral-light/10 rounded-sm px-4 py-3 text-sm text-neutral-light placeholder-neutral-dim/40 focus:outline-none focus:border-accent focus:bg-secondary/50 transition-all font-light resize-none leading-relaxed"
                                placeholder={getMessagePlaceholder()}
                            />
                         </div>

                         {/* Submit Button Area */}
                         <div className="pt-6 border-t border-neutral-light/10 mt-2 flex flex-col md:flex-row items-center justify-between gap-6">
                            
                            {/* Status or Extra Info */}
                            <span className="hidden md:block text-[10px] font-mono text-neutral-dim uppercase tracking-wider opacity-70">
                                {language === 'ar' ? 'عادةً ما نرد خلال 24 ساعة' : 'Usually responds within 24h'}
                            </span>

                            <button 
                                type="submit" 
                                disabled={formState !== 'idle'}
                                className={`
                                    relative w-full md:w-auto px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-3 transition-all duration-300 md:ml-auto rtl:md:mr-auto rtl:md:ml-0
                                    ${formState === 'idle' ? 'bg-accent text-primary hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]' : ''}
                                    ${formState === 'submitting' ? 'bg-secondary border border-neutral-light/10 text-neutral-dim cursor-not-allowed' : ''}
                                    ${formState === 'success' ? 'bg-green-500 text-white shadow-lg' : ''}
                                `}
                            >
                                {formState === 'idle' && (
                                    <>
                                        <span>{t.contact.form.submit}</span>
                                        <Send size={16} className="rtl-flip" />
                                    </>
                                )}
                                {formState === 'submitting' && (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                )}
                                {formState === 'success' && (
                                    <>
                                        <CheckCircle2 size={16} />
                                        <span>Message Sent</span>
                                    </>
                                )}
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
