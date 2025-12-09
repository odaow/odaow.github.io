

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  gallery?: string[]; // Added gallery support
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon name
  image?: string; // New field for Bento Grid background images
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Partner {
  id: string;
  slug: string;
  name: string;
  logo: string; // URL to logo
  description: string;
  accreditation?: string; // New field for quality standards
  website?: string;
  since: string;
  services: string[];
  contactEmail?: string;
  // New Fields for Enhanced Profile
  director?: string;
  location?: string;
  phone?: string;
  gallery?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  company?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string; // Added full content field
  date: string;
  image: string;
  author?: string;
  category: string;
  link?: string; // For external automatic news
  isExternal?: boolean;
}

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface Translations {
  nav: {
    home: string;
    projects: string;
    services: string;
    partners: string;
    about: string;
    blog: string; // New
    contact: string;
    contactNow: string;
    brandName: string;
    brandSubtitle: string;
  };
  hero: {
    est: string;
    typewriter: string;
    subtitle: string;
    cta: string;
    scroll: string;
    exploreProjects: string; // Added for Mobile CTA
    stats: {
      years: string;
      projects: string;
      awards: string;
    };
  };
  common: {
    viewProject: string;
    specs: string;
    features: string;
    getInTouch: string;
    explore: string;
    viewAllServices: string;
    filterAll: string;
    close: string;
    backToProjects: string;
    backToPartners: string;
    visitWebsite: string;
    partnerSince: string;
    servicesProvided: string;
    comingSoon: string;
    notifyMe: string;
    gallery: string;
    contactLabel: string;
    director: string;
    location: string;
    phone: string;
    partnerNotFound: string;
    testimonials: string; // New
    notFoundTitle: string; // New
    notFoundDesc: string; // New
    returnHome: string; // New
    readMore: string; // New
    latestNews: string; // New
    companyInsights: string; // New
  };
  footer: {
    description: string;
    brandNameFull: string;
    officeHeading: string;
    socialHeading: string;
    address: {
      line1: string;
      line2: string;
      line3: string;
    };
    rights: string;
    privacy: string;
    terms: string;
  };
  services: {
    heroDescription: string;
    sectionCore: string;
    sectionAtelier: string;
    atelierSubtitle: string;
    worldClassBadge: string;
    coreSubtitle: string;
    premiumLabel: string;
    premiumDescription: string; // Added for better description of the premium section
  };
  about: {
    heroText1: string;
    heroText2: string;
    leadership: string;
    history: {
      title: string;
      content: string;
    };
    digitalPioneer: string; // New field for the "First in Tubas" highlight
    mission: {
      title: string;
      content: string;
    };
    values: {
      title: string;
      items: { title: string; desc: string; icon: string }[];
    };
  };
  partners: {
    title: string;
    description: string;
    accreditationHeading: string;
  };
  contact: {
    title: string;
    intro: string;
    locationHeading: string;
    mapOverlay: string;
    info: {
      email: string;
      phone: string;
      hq: string;
      addressValue: string;
    };
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      // New dynamic fields
      budget: string;
      portfolio: string;
      organization: string;
      position: string;
    };
    subjects: {
      inquiry: string;
      careers: string;
      partnership: string;
    };
    // WhatsApp Widget Translations
    quick: {
      title: string;
      subtitle: string;
      name: string;
      message: string;
      send: string;
    };
  };
  // New section for Project Category Selector
  projects: {
    heading: string;
    exterior: {
      title: string;
      subtitle: string;
    };
    interior: {
      title: string;
      subtitle: string;
    };
  };
}