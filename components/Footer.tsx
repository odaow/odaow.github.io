
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import AnoLogo from './AnoLogo';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-primary py-12 md:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-start">
        <div className="col-span-1 md:col-span-2">
          <div className="mb-6">
              <AnoLogo size="sm" />
          </div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              {t.footer.brandNameFull}
          </h3>
          <p className="text-neutral-dim max-w-md text-sm leading-relaxed">
            {t.footer.description}
          </p>
        </div>
        <div>
          <h4 className="font-mono text-accent mb-4 md:mb-6 uppercase text-sm tracking-wider">{t.footer.officeHeading}</h4>
          <ul className="space-y-2 text-neutral-dim text-sm">
            <li>{t.footer.address.line1}</li>
            <li>{t.footer.address.line2}</li>
            <li>{t.footer.address.line3}</li>
            <li className="mt-4" style={{ direction: 'ltr', textAlign: language === 'ar' ? 'right' : 'left' }}>+970 599250094</li>
            <li>info@nebras-bim.com</li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-accent mb-4 md:mb-6 uppercase text-sm tracking-wider">{t.footer.socialHeading}</h4>
          <ul className="space-y-2 text-neutral-dim text-sm">
            <li><a href="https://www.linkedin.com/in/odai-salahat-143748399" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/nebrasbim/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@nebrasbim" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12 md:mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs font-mono text-neutral-dim opacity-50 gap-4 md:gap-0">
        <p>{t.footer.rights}</p>
        <div className="flex gap-4">
          <span>{t.footer.privacy}</span>
          <span>{t.footer.terms}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
