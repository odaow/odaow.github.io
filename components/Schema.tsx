
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

interface SchemaProps {
  type: 'organization' | 'article' | 'project' | 'partner' | 'website';
  data?: any;
}

const Schema: React.FC<SchemaProps> = ({ type, data }) => {
  const { language } = useLanguage();
  const baseUrl = 'https://nebras-bim.com';
  
  let schemaData: any = {};

  // 1. Organization / Local Business Schema (Global Identity)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EngineeringService",
    "name": language === 'ar' ? "مكتب النبراس الهندسي" : "Al Nebras Engineering Office",
    "alternateName": "Al Nebras BIM",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`, // Assuming a logo exists or using a cloud link
    "image": "https://res.cloudinary.com/dmdp1hnwx/image/upload/v1765189303/05-min_nxowmo.jpg",
    "description": language === 'ar' 
      ? "مكتب هندسي رائد في فلسطين يقدم خدمات التصميم المعماري، التحليل الإنشائي، وخدمات نمذجة معلومات البناء BIM." 
      : "Premier engineering consultancy in Palestine offering architectural design, structural analysis, and BIM services.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Street",
      "addressLocality": "Tubas",
      "addressRegion": "West Bank",
      "addressCountry": "PS"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "32.3213", 
      "longitude": "35.3706" 
    },
    "telephone": "+970599250094",
    "email": "info@nebras-bim.com",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "08:00",
        "closes": "16:00"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/in/odai-salahat-143748399",
      "https://www.instagram.com/nebrasbim/",
      "https://www.tiktok.com/@nebrasbim"
    ]
  };

  switch (type) {
    case 'organization':
    case 'website':
      schemaData = organizationSchema;
      break;

    case 'article':
      if (data) {
        schemaData = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${baseUrl}/blog/${data.id}`
          },
          "headline": data.title,
          "description": data.excerpt,
          "image": data.image,
          "author": {
            "@type": "Person",
            "name": data.author || "Al Nebras Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Al Nebras Engineering",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/favicon.png`
            }
          },
          "datePublished": data.date, // Note: Should ideally be ISO format
          "inLanguage": language
        };
      }
      break;

    case 'project':
      if (data) {
        schemaData = {
          "@context": "https://schema.org",
          "@type": "CreativeWork", // Or 'Residence' / 'Structure' depending on specificity
          "additionalType": "ArchitectureProject", 
          "name": data.title,
          "description": data.description,
          "image": data.image,
          "locationCreated": {
            "@type": "Place",
            "name": data.location
          },
          "creator": {
            "@type": "Organization",
            "name": "Al Nebras Engineering Office"
          },
          "dateCreated": data.year,
          "material": data.specs?.map((s: any) => s.value).join(', ')
        };
      }
      break;

    case 'partner':
      if (data) {
        schemaData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": data.name,
          "url": data.website,
          "logo": data.logo,
          "description": data.description,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": data.location
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": data.phone,
            "email": data.contactEmail
          }
        };
      }
      break;
      
    default:
      schemaData = organizationSchema;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default Schema;
