export type LocalizedString = {
  en: string;
  ar: string;
};

export type ProjectCategory = "civic" | "commercial" | "hospitality" | "residential" | "mixedUse";

export type Project = {
  id: string;
  category: ProjectCategory;
  title: LocalizedString;
  location: LocalizedString;
  description: LocalizedString;
  imageUrl: string;
  featured?: boolean;
};

export type TeamMember = {
  id: string;
  imageUrl: string;
  name: LocalizedString;
  role: LocalizedString;
};

export type SiteContent = {
  projects: Project[];
  team: TeamMember[];
};

export const defaultContent: SiteContent = {
  team: [
    {
      id: "team-1",
      imageUrl:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=600&q=80",
      name: {
        en: "Eng. Saed Salahat",
        ar: "م. سائد صلاحات",
      },
      role: {
        en: "Managing Director",
        ar: "المدير العام",
      },
    },
    {
      id: "team-2",
      imageUrl:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
      name: {
        en: "Eng. Odai Salahat",
        ar: "م. عدي صلاحات",
      },
      role: {
        en: "Design Director",
        ar: "مدير التصميم",
      },
    },
    {
      id: "team-3",
      imageUrl:
        "https://images.unsplash.com/photo-1544723795-3fb0b92c70b7?auto=format&fit=crop&w=600&q=80",
      name: {
        en: "Eng. Mohammad Salahat",
        ar: "م. محمد صلاحات",
      },
      role: {
        en: "Structural Lead",
        ar: "رئيس الهندسة الإنشائية",
      },
    },
    {
      id: "team-4",
      imageUrl:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
      name: {
        en: "Eng. Rubhi Sawafteh",
        ar: "م. ربحي صوافطة",
      },
      role: {
        en: "BIM & Digital Delivery Lead",
        ar: "قائد خدمات BIM والتسليم الرقمي",
      },
    },
  ],
  projects: [
    {
      id: "proj-1",
      category: "civic",
      featured: true,
      imageUrl:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      title: {
        en: "King Fahd Cultural Forum",
        ar: "منتدى الملك فهد الثقافي",
      },
      location: {
        en: "Riyadh, Saudi Arabia",
        ar: "الرياض، المملكة العربية السعودية",
      },
      description: {
        en: "A civic anchor blending galleries, performance venues, and public courtyards inspired by desert geometry.",
        ar: "وجهة مدنية تجمع بين المعارض والمسارح والساحات العامة مستوحاة من هندسة الصحراء.",
      },
    },
    {
      id: "proj-2",
      category: "commercial",
      featured: true,
      imageUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      title: {
        en: "Nebras Business Tower",
        ar: "برج نبراس للأعمال",
      },
      location: {
        en: "Doha, Qatar",
        ar: "الدوحة، قطر",
      },
      description: {
        en: "A high-performance tower integrating smart façades, biophilic atria, and flexible work floors.",
        ar: "برج عالي الأداء يدمج واجهات ذكية وأتريوم حيوي ومساحات عمل مرنة.",
      },
    },
    {
      id: "proj-3",
      category: "hospitality",
      featured: true,
      imageUrl:
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
      title: {
        en: "Al Bahar Coastal Resort",
        ar: "منتجع البحر الساحلي",
      },
      location: {
        en: "Jeddah, Saudi Arabia",
        ar: "جدة، المملكة العربية السعودية",
      },
      description: {
        en: "A hospitality destination celebrating Red Sea vistas with passive cooling courtyards and immersive amenities.",
        ar: "وجهة ضيافة تحتفي بإطلالات البحر الأحمر مع أفنية تبريد سلبية ومرافق غامرة.",
      },
    },
    {
      id: "proj-4",
      category: "residential",
      imageUrl:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      title: {
        en: "Wadi Serenity Residences",
        ar: "فلل وادي السكينة",
      },
      location: {
        en: "AlUla, Saudi Arabia",
        ar: "العلا، المملكة العربية السعودية",
      },
      description: {
        en: "Luxury villas embedded in sandstone cliffs with adaptive shading and bespoke interiors.",
        ar: "فلل فاخرة مدمجة في صخور الحجر الرملي مع تظليل تكيفي وتصاميم داخلية فريدة.",
      },
    },
    {
      id: "proj-5",
      category: "mixedUse",
      imageUrl:
        "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=1200&q=80",
      title: {
        en: "Gateway Innovation District",
        ar: "حي البوابة الابتكاري",
      },
      location: {
        en: "Dammam, Saudi Arabia",
        ar: "الدمام، المملكة العربية السعودية",
      },
      description: {
        en: "A smart district combining research labs, cultural venues, and shaded mobility corridors.",
        ar: "حي ذكي يجمع المختبرات البحثية والمراكز الثقافية وممرات التنقل المظللة.",
      },
    },
  ],
};

