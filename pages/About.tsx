import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Section from '../components/Section';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import { motion } from 'framer-motion';
import { Target, Zap, Shield, Leaf, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const { t, team, language } = useLanguage();

  // Helper to get value icons
  const getIcon = (name: string) => {
    switch (name) {
      case 'Target': return <Target size={32} />;
      case 'Zap': return <Zap size={32} />;
      case 'Shield': return <Shield size={32} />;
      case 'Leaf': return <Leaf size={32} />;
      default: return <Target size={32} />;
    }
  };

  const MotionDiv = motion.div as any;

  // Dynamic Team Logic:
  // 1. First person in the list is treated as the Founder/Leader.
  // 2. Everyone else is displayed in the general team grid.
  const founder = team.length > 0 ? team[0] : null;
  const restOfTeam = team.length > 1 ? team.slice(1) : [];

  return (
    <>
        <SEO title={t.nav.about} path="/about" />
        <Section className="pt-32">
            <h1 className="text-4xl md:text-5xl font-black mb-8 md:mb-12 uppercase tracking-tight text-neutral-light">{t.nav.about}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="font-light text-lg md:text-xl text-neutral-dim space-y-6">
                    <p>{t.about.heroText1}</p>
                    <p>{t.about.heroText2}</p>
                </div>
                <div className="relative h-[250px] md:h-[400px] bg-secondary border border-neutral-light/10 p-2">
                     <OptimizedImage
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
                        alt="Office Interior" 
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover opacity-80" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent pointer-events-none" />
                </div>
            </div>
        </Section>

        {/* History & Mission */}
        <Section className="bg-secondary/30">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                <MotionDiv 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ delay: 0.1 }}
                >
                    <h3 className="font-mono text-accent text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-accent" />
                        {t.about.history.title}
                    </h3>
                    <p className="text-lg text-neutral-light leading-relaxed mb-8">
                        {t.about.history.content}
                    </p>

                    {/* Digital Pioneer Highlight Box */}
                    <div className="bg-accent/10 border border-accent/30 p-6 rounded-sm relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-accent/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 flex gap-4">
                            <div className="p-2 bg-accent/20 rounded-full h-fit text-accent">
                                <CheckCircle size={24} />
                            </div>
                            <p className="text-neutral-light font-medium text-sm leading-relaxed">
                                {t.about.digitalPioneer}
                            </p>
                        </div>
                    </div>
                </MotionDiv>

                <MotionDiv 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="font-mono text-accent text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
                         <span className="w-8 h-[1px] bg-accent" />
                         {t.about.mission.title}
                    </h3>
                    <p className="text-lg text-neutral-light leading-relaxed">
                        {t.about.mission.content}
                    </p>
                </MotionDiv>
             </div>
        </Section>

        {/* Core Values */}
        <Section>
            <div className="mb-12 md:mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-light">{t.about.values.title}</h2>
                <div className="w-20 h-1 bg-accent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.about.values.items.map((value, i) => (
                    <MotionDiv
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-20%" }}
                        transition={{ delay: i * 0.05 }}
                        className="p-6 md:p-8 border border-neutral-light/10 bg-secondary hover:border-accent/50 hover:bg-neutral-light/5 transition-all group"
                    >
                        <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                            {getIcon(value.icon)}
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-neutral-light">{value.title}</h3>
                        <p className="text-sm text-neutral-dim">{value.desc}</p>
                    </MotionDiv>
                ))}
            </div>
        </Section>

        {/* Leadership & Team */}
        {team.length > 0 && (
            <Section>
                <h2 className="text-2xl md:text-3xl font-bold mb-12 md:mb-16 flex items-center gap-4 text-neutral-light">
                    <span className="w-12 h-[1px] bg-accent" />
                    {t.about.leadership}
                </h2>

                {/* LEVEL 1: Founder (First item in CMS list) */}
                {founder && (
                    <MotionDiv 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <div className="bg-secondary/50 border border-neutral-light/5 p-6 md:p-12 rounded-sm flex flex-col md:flex-row gap-8 md:gap-16 items-center group relative overflow-hidden">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
                            
                            <div className="w-full md:w-1/3 aspect-[3/4] relative overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl">
                                <OptimizedImage
                                    src={founder.image}
                                    alt={founder.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="w-full md:w-2/3 text-center md:text-start relative z-10">
                                <div className="mb-8">
                                    <span className="font-mono text-accent text-xs md:text-sm uppercase tracking-[0.25em] mb-4 block">
                                        {language === 'ar' ? 'القيادة' : 'Leadership'}
                                    </span>
                                    <h3 className="text-3xl md:text-5xl font-black text-neutral-light mb-2">{founder.name}</h3>
                                    <p className="text-lg md:text-xl text-neutral-dim font-serif italic opacity-80">{founder.role}</p>
                                </div>
                                <div className="w-12 h-1 bg-accent/30 mx-auto md:mx-0 mb-8" />
                                <p className="text-neutral-light leading-loose text-base md:text-lg">
                                    {founder.bio}
                                </p>
                            </div>
                        </div>
                    </MotionDiv>
                )}

                {/* LEVEL 2: The Rest of the Team */}
                {restOfTeam.length > 0 && (
                    <div>
                        <div className="flex items-center gap-4 mb-8 border-b border-neutral-light/10 pb-4">
                            <div className="w-2 h-2 bg-accent rotate-45" />
                            <h3 className="font-mono text-neutral-light text-sm md:text-base uppercase tracking-widest font-bold">
                                {language === 'ar' ? 'فريق العمل' : 'Our Experts'}
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {restOfTeam.map((member, i) => (
                                <MotionDiv 
                                    key={member.id} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group"
                                >
                                    <div className="aspect-[4/5] overflow-hidden mb-5 relative rounded-sm grayscale hover:grayscale-0 transition-all duration-500 border border-neutral-light/5 hover:border-accent/30">
                                        <OptimizedImage
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <h4 className="text-lg font-bold text-neutral-light group-hover:text-accent transition-colors">{member.name}</h4>
                                    <p className="text-xs font-mono text-neutral-dim uppercase mt-1">{member.role}</p>
                                </MotionDiv>
                            ))}
                        </div>
                    </div>
                )}
            </Section>
        )}
    </>
  );
};

export default About;