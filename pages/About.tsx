
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Section from '../components/Section';
import { motion } from 'framer-motion';
import { Target, Zap, Shield, Leaf, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const { t, team } = useLanguage();

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

  return (
    <>
        <Section className="pt-32">
            <h1 className="text-4xl md:text-5xl font-black mb-8 md:mb-12 uppercase tracking-tight text-neutral-light">{t.nav.about}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="font-light text-lg md:text-xl text-neutral-dim space-y-6">
                    <p>{t.about.heroText1}</p>
                    <p>{t.about.heroText2}</p>
                </div>
                <div className="relative h-[250px] md:h-[400px] bg-secondary border border-neutral-light/10 p-2">
                     <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
                        alt="Office Interior" 
                        loading="lazy"
                        className="w-full h-full object-cover opacity-80" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
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

        {/* Leadership */}
        <Section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 flex items-center gap-4 text-neutral-light">
                <span className="w-12 h-[1px] bg-accent" />
                {t.about.leadership}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member) => (
                    <div key={member.id} className="group">
                        <div className="aspect-[3/4] overflow-hidden mb-6 relative grayscale hover:grayscale-0 transition-all duration-500 rounded-sm">
                            <img src={member.image} alt={member.name} loading="lazy" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-multiply" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-light">{member.name}</h3>
                        <p className="font-mono text-accent text-xs uppercase tracking-wider mb-2">{member.role}</p>
                        <p className="text-neutral-dim text-sm">{member.bio}</p>
                    </div>
                ))}
            </div>
        </Section>
    </>
  );
};

export default About;
