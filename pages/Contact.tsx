
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Section from '../components/Section';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, Clock, Globe } from 'lucide-react';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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

  const MotionH1 = motion.h1 as any;
  const MotionP = motion.p as any;
  const MotionDiv = motion.div as any;

  return (
    <Section className="pt-32 min-h-screen">
        {/* Header Section */}
        <div className="max-w-4xl mb-12 md:mb-16">
            <MotionH1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight text-neutral-light"
            >
                {t.contact.title}
            </MotionH1>
            <MotionDiv 
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-1 bg-accent mb-6"
            />
            <MotionP 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-neutral-dim font-light"
            >
                {t.contact.intro}
            </MotionP>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16 md:mb-24">
            {/* Left Column: Contact Information */}
            <MotionDiv 
                className="lg:col-span-5 space-y-8 md:space-y-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
            >
                {/* Contact Card 1: Digital */}
                <MotionDiv variants={itemVariants} className="bg-secondary/50 border border-neutral-light/10 p-6 md:p-8 rounded-sm hover:border-accent/30 transition-colors group">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <div className="p-3 bg-accent/10 rounded-full text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                            <Mail className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-dim">{t.contact.info.email}</h3>
                    </div>
                    <a href="mailto:info@nebras-bim.com" className="text-lg md:text-2xl font-bold text-neutral-light hover:text-accent transition-colors block break-all">
                        info@nebras-bim.com
                    </a>
                </MotionDiv>

                {/* Contact Card 2: Phone */}
                <MotionDiv variants={itemVariants} className="bg-secondary/50 border border-neutral-light/10 p-6 md:p-8 rounded-sm hover:border-accent/30 transition-colors group">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                         <div className="p-3 bg-accent/10 rounded-full text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                            <Phone className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-dim">{t.contact.info.phone}</h3>
                    </div>
                    <p 
                        className="text-lg md:text-2xl font-bold font-mono tracking-tight text-neutral-light hover:text-accent transition-colors cursor-pointer" 
                        style={{ direction: 'ltr', textAlign: language === 'ar' ? 'right' : 'left' }}
                    >
                        +970 599 250 094
                    </p>
                </MotionDiv>

                {/* Contact Card 3: HQ */}
                <MotionDiv variants={itemVariants} className="bg-secondary/50 border border-neutral-light/10 p-6 md:p-8 rounded-sm hover:border-accent/30 transition-colors group">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <div className="p-3 bg-accent/10 rounded-full text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                            <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-dim">{t.contact.info.hq}</h3>
                    </div>
                    <p className="text-lg md:text-xl font-medium leading-relaxed text-neutral-light">
                        {t.contact.info.addressValue}
                    </p>
                </MotionDiv>

                 {/* Hours (Visual Add-on) */}
                 <MotionDiv variants={itemVariants} className="flex items-center gap-4 text-sm text-neutral-dim px-2">
                    <Clock size={16} className="text-accent" />
                    <span>Sun - Thu: 08:00 AM - 04:00 PM</span>
                 </MotionDiv>
            </MotionDiv>

            {/* Right Column: Form */}
            <MotionDiv 
                className="lg:col-span-7"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <form className="space-y-6 bg-secondary border border-neutral-light/5 rounded-sm backdrop-blur-sm p-6 md:p-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                            <label className="text-xs font-mono uppercase text-accent/80 ml-1 group-focus-within:text-accent transition-colors">{t.contact.form.name}</label>
                            <input 
                                type="text" 
                                className="w-full bg-primary/30 border border-neutral-light/10 rounded-sm p-3 md:p-4 text-neutral-light placeholder-neutral-dim/30 focus:border-accent focus:bg-primary/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all duration-300" 
                                placeholder={t.contact.form.namePlaceholder}
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-xs font-mono uppercase text-accent/80 ml-1 group-focus-within:text-accent transition-colors">{t.contact.form.email}</label>
                            <input 
                                type="email" 
                                className="w-full bg-primary/30 border border-neutral-light/10 rounded-sm p-3 md:p-4 text-neutral-light placeholder-neutral-dim/30 focus:border-accent focus:bg-primary/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all duration-300"
                                placeholder={t.contact.form.emailPlaceholder}
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2 group">
                        <label className="text-xs font-mono uppercase text-accent/80 ml-1 group-focus-within:text-accent transition-colors">{t.contact.form.subject}</label>
                        <div className="relative">
                            <select className="w-full bg-primary/30 border border-neutral-light/10 rounded-sm p-3 md:p-4 text-neutral-light focus:border-accent focus:bg-primary/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all duration-300 appearance-none cursor-pointer">
                                <option>{t.contact.subjects.inquiry}</option>
                                <option>{t.contact.subjects.careers}</option>
                                <option>{t.contact.subjects.media}</option>
                            </select>
                            <div className="absolute top-1/2 end-4 -translate-y-1/2 pointer-events-none text-neutral-dim">
                                <ArrowRight size={16} className="rotate-90" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 group">
                        <label className="text-xs font-mono uppercase text-accent/80 ml-1 group-focus-within:text-accent transition-colors">{t.contact.form.message}</label>
                        <textarea 
                            rows={6} 
                            className="w-full bg-primary/30 border border-neutral-light/10 rounded-sm p-3 md:p-4 text-neutral-light placeholder-neutral-dim/30 focus:border-accent focus:bg-primary/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all duration-300 resize-none"
                            placeholder={t.contact.form.messagePlaceholder}
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full md:w-auto px-10 py-4 bg-accent text-primary font-bold uppercase tracking-widest hover:brightness-110 transition-all duration-300 rounded-sm flex items-center justify-center gap-4 group"
                        >
                            <span>{t.contact.form.submit}</span>
                            <Send size={18} className="rtl-flip group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </form>
            </MotionDiv>
        </div>

        {/* Embedded Map Section */}
        <MotionDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
        >
            <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] bg-neutral-light/10 flex-1" />
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3 border border-neutral-light/10 px-4 md:px-6 py-2 rounded-full bg-secondary text-neutral-light">
                    <Globe size={20} className="text-accent" />
                    {t.contact.locationHeading}
                </h2>
                <div className="h-[1px] bg-neutral-light/10 flex-1" />
            </div>

            <div className="w-full h-[300px] md:h-[600px] border border-neutral-light/10 bg-secondary relative overflow-hidden group rounded-sm shadow-2xl">
                {/* Technical Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent z-20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent z-20" />

                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27039.46764560754!2d35.35205565!3d32.3218684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ce10196614459%3A0xc304918451846062!2sTubas!5e0!3m2!1sen!2sps!4v1709400000000!5m2!1sen!2sps" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(85%)' }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="transition-all duration-700 ease-out group-hover:filter-none opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-[1.02]"
                    title="Al Nebras Office Location"
                ></iframe>
                
                {/* Overlay helper text */}
                <div className="absolute top-6 left-6 pointer-events-none bg-primary/90 backdrop-blur-md px-6 py-3 border-l-4 border-accent text-xs font-mono text-neutral-light opacity-100 group-hover:opacity-0 transition-opacity duration-300 shadow-lg z-10 hidden md:block">
                    {t.contact.mapOverlay}
                </div>
            </div>
        </MotionDiv>
    </Section>
  );
};

export default Contact;
