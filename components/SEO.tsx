
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: string;
  path?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, type = 'website', path = '' }) => {
  const { language } = useLanguage();
  
  const siteName = language === 'ar' ? 'مكتب النبراس الهندسي' : 'Al Nebras Engineering Office';
  const siteTitle = language === 'ar' ? 'مكتب النبراس الهندسي | عمارة، إنشاءات، و BIM' : 'Al Nebras Engineering Office | Architecture, Structure & BIM';
  
  const defaultDescription = language === 'ar' 
    ? 'مكتب هندسي رائد في فلسطين (طوباس) يقدم خدمات التصميم المعماري، التحليل الإنشائي، وخدمات نمذجة معلومات البناء BIM منذ عام 2000.' 
    : 'Premier engineering consultancy in Palestine (Tubas) offering architectural design, structural analysis, and BIM services since 2000.';
  
  const metaDescription = description || defaultDescription;
  const metaImage = image || 'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1765189303/05-min_nxowmo.jpg';
  const url = `https://nebras-bim.com${path}`;
  
  // If title is explicitly siteTitle (Home page), don't append siteName
  const fullTitle = title === siteTitle ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={language === 'ar' ? 'ar_AR' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
};

export default SEO;
