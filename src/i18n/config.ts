import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

type LanguageOption = {
  code: "en" | "ar";
  label: string;
  dir: "ltr" | "rtl";
};

export const languageOptions: LanguageOption[] = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
];

const resources = {
  en: {
    translation: {
      meta: {
        title: "Nebras Office | Architecture & Engineering",
        description:
          "Nebras Office is a multidisciplinary architectural and engineering studio delivering iconic, resilient, and human-centered environments across the Middle East.",
      },
      brand: "Nebras Office",
      cta: {
        discover: "Discover Our Work",
        contact: "Start Your Project",
        exploreServices: "Explore Services",
        viewProjects: "View All Projects",
        downloadProfile: "Download Profile",
        consult: "Book a Consultation",
        talkToUs: "Talk to Our Team",
      },
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        bim: "BIM Services",
        projects: "Projects",
        contact: "Contact",
      },
      hero: {
        title: "Designing Intelligent Spaces for Flourishing Communities.",
        subtitle:
          "Nebras Office blends visionary design with engineering rigor to deliver human-centered environments across the region.",
        badge: "Architecture & Engineering Studio",
        ctaPrimary: "Discuss Your Vision",
        ctaSecondary: "Explore Projects",
        stats: [
          { value: "18+", label: "Years of Experience" },
          { value: "120+", label: "Delivered Projects" },
          { value: "9", label: "Regional Markets" },
        ],
      },
      home: {
        aboutTitle: "Who We Are",
        aboutBody:
          "Founded in Riyadh, Nebras Office creates high-performance environments that honor context, culture, and climate. Our multidisciplinary team collaborates seamlessly from concept to delivery, ensuring every project is resilient, timeless, and people-centered.",
        featuredTitle: "Featured Projects",
        featuredSubtitle:
          "A glimpse into our portfolio spanning civic, commercial, hospitality, and cultural typologies.",
        featuredProjects: [
          {
            title: "Kingdom Cultural Courtyard",
            location: "Riyadh, KSA",
            typology: "Cultural",
          },
          {
            title: "Azure Business Hub",
            location: "Doha, Qatar",
            typology: "Commercial",
          },
          {
            title: "Palm Horizon Resort",
            location: "Jeddah, KSA",
            typology: "Hospitality",
          },
        ],
        testimonialsTitle: "Trusted By Visionary Partners",
      },
      about: {
        heroTitle: "Designing Environments that Illuminate Possibility.",
        intro:
          "Nebras Office is a collective of architects, engineers, planners, and digital specialists committed to humanizing the built environment. We merge advanced methodologies with regional insight to deliver enduring value.",
        missionTitle: "Mission",
        missionBody:
          "To craft adaptive, data-informed spaces that elevate human experience while advancing our clients' strategic objectives.",
        visionTitle: "Vision",
        visionBody:
          "To be the leading regional studio recognized for resilient, future-ready environments rooted in cultural authenticity.",
        approachTitle: "Our Approach",
        approachPoints: [
          "Immersive research and co-creation with stakeholders.",
          "Evidence-based design with integrated engineering analysis.",
          "Digital delivery with BIM-led coordination and lifecycle insight.",
          "Sustainable strategies aligned with global benchmarks.",
        ],
        teamTitle: "Core Team",
        teamIntro:
          "A multidisciplinary leadership united by curiosity, technical excellence, and a passion for meaningful places.",
        teamMembers: [
          {
            name: "Eng. Fahad Al-Mutairi",
            role: "Managing Director",
          },
          {
            name: "Arch. Lina Al-Harthi",
            role: "Design Principal",
          },
          {
            name: "Eng. Omar Al-Qahtani",
            role: "Structural Lead",
          },
          {
            name: "Dr. Sara Al-Qassem",
            role: "BIM & Digital Delivery Lead",
          },
        ],
      },
      services: {
        heroTitle: "Integrated Services. Singular Accountability.",
        heroSubtitle:
          "We orchestrate every discipline under one collaborative studio to streamline delivery and elevate design outcomes.",
        cards: [
          {
            title: "Architectural Design",
            description:
              "Context-sensitive concepts, schematic design, and detailed documentation that articulate signature environments.",
          },
          {
            title: "Structural Engineering",
            description:
              "High-performance structural systems optimized for resilience, efficiency, and constructability across scales.",
          },
          {
            title: "Interior Design",
            description:
              "Immersive interiors curated through material craft, lighting, furniture, and human-centered storytelling.",
          },
          {
            title: "Supervision",
            description:
              "On-site leadership and technical oversight that safeguard design intent, quality, and timelines.",
          },
          {
            title: "BIM Services",
            description:
              "Intelligent models, coordination, and digital twins that empower data-rich decisions across the asset lifecycle.",
          },
        ],
        bimCta: "Learn More About BIM",
        processTitle: "Delivery Framework",
        processSteps: [
          {
            title: "Discovery & Strategy",
            body: "Stakeholder alignment, project visioning, and performance benchmarks.",
          },
          {
            title: "Design Development",
            body: "Iterative design with multidiscipline integration and immersive visualization.",
          },
          {
            title: "Delivery & Commissioning",
            body: "Coordinated documentation, construction support, and operational readiness.",
          },
        ],
      },
      bim: {
        heroTitle: "BIM-Driven Intelligence for the Built Environment.",
        heroSubtitle:
          "We harness Building Information Modeling to connect data, teams, and decisions across design, construction, and operation.",
        intro:
          "Nebras Office delivers BIM services that transform projects into intelligent ecosystems. Our team supports owners, consultants, and contractors with end-to-end digital delivery.",
        pillars: [
          {
            title: "Modeling & Coordination",
            body: "Authoring detail-rich architectural, structural, and MEP models with clash-aware collaboration.",
          },
          {
            title: "Clash Detection & Resolution",
            body: "Proactive analysis using advanced rule-sets and rapid issue tracking to eliminate rework.",
          },
          {
            title: "4D | 5D Integration",
            body: "Linking models to schedule and cost data for actionable construction intelligence.",
          },
          {
            title: "Facility Handover",
            body: "Delivering digital twins, COBie datasets, and asset tagging to empower operations teams.",
          },
        ],
        ctaTitle: "Ready to Digitize Your Asset?",
        ctaBody:
          "Leverage our BIM specialists to elevate coordination, reduce risk, and unlock lifecycle value.",
        ctaButton: "Book a BIM Consultation",
      },
      projects: {
        heroTitle: "Signature Projects",
        heroSubtitle:
          "Diverse typologies united by deliberate design, technical excellence, and human-scale experiences.",
        filterAll: "All",
        categories: {
          civic: "Civic & Cultural",
          commercial: "Commercial",
          hospitality: "Hospitality",
          residential: "Residential",
          mixedUse: "Mixed-Use",
        },
        detailsLabel: "View Details",
        cards: [
          {
            title: "Riyadh Innovation District",
            location: "Riyadh, KSA",
            category: "mixedUse",
            description:
              "A knowledge-driven campus with smart mobility, adaptive workspaces, and activated public realms.",
          },
          {
            title: "Al Noor Performing Arts Center",
            location: "Abu Dhabi, UAE",
            category: "civic",
            description:
              "A cultural landmark expressing regional artistry through fluid architectural forms.",
          },
          {
            title: "Skyline Gateway Tower",
            location: "Manama, Bahrain",
            category: "commercial",
            description:
              "An iconic workplace integrating biophilic atria and high efficiency façades.",
          },
          {
            title: "Palm Horizon Resort",
            location: "Jeddah, KSA",
            category: "hospitality",
            description:
              "Coastal hospitality shaped by vernacular geometry, ambient lighting, and immersive amenities.",
          },
          {
            title: "Wadi Serene Residences",
            location: "AlUla, KSA",
            category: "residential",
            description:
              "Luxury villas carved into the landscape with passive cooling and sustainable materials.",
          },
          {
            title: "Eastern Civic Forum",
            location: "Dammam, KSA",
            category: "civic",
            description:
              "A civic anchor that blends community services with flexible public gathering spaces.",
          },
        ],
      },
      contact: {
        heroTitle: "Let’s shape your next landmark.",
        heroSubtitle:
          "Share your objectives and our team will curate a tailored roadmap for your project.",
        form: {
          name: "Name",
          email: "Email",
          phone: "Phone (optional)",
          message: "Tell us about your project",
          submit: "Send Message",
          success: "Thank you. Our team will connect with you shortly.",
        },
        officeInfoTitle: "Office",
        officeLines: ["Nebras Engineering Office", "Tubas, Palestine"],
        contactTitle: "Connect",
        contactItems: [
          { type: "phone", value: "+970 59 000 0000" },
          { type: "email", value: "info@nebras-bim.com" },
        ],
        mapTitle: "Visit Us",
      },
      footer: {
        tagLine: "Designing environments that illuminate the future.",
        quickLinks: "Quick Links",
        newsletter: {
          title: "Stay Updated",
          placeholder: "Enter your email",
          button: "Subscribe",
          disclaimer: "We respect your inbox. Unsubscribe anytime.",
        },
        rights: "© {{year}} Nebras Office. All rights reserved.",
        location: "Riyadh | Dubai | Doha",
      },
    },
  },
  ar: {
    translation: {
      meta: {
        title: "مكتب نبراس | عمارة وهندسة",
        description:
          "مكتب نبراس هو استوديو متعدد التخصصات في العمارة والهندسة يقدم بيئات أيقونية ومرنة متمحورة حول الإنسان في مختلف أنحاء الشرق الأوسط.",
      },
      brand: "مكتب النبراس الهندسي",
      cta: {
        discover: "تعرّف على أعمالنا",
        contact: "ابدأ مشروعك",
        exploreServices: "استكشف الخدمات",
        viewProjects: "عرض جميع المشاريع",
        downloadProfile: "تحميل البروفايل",
        consult: "حجز استشارة",
        talkToUs: "تواصل مع فريقنا",
      },
      nav: {
        home: "الرئيسية",
        about: "من نحن",
        services: "الخدمات",
        bim: "خدمات BIM",
        projects: "المشاريع",
        contact: "تواصل",
      },
      hero: {
        title: "نصمم مساحات ذكية تزدهر بها المجتمعات.",
        subtitle:
          "يمزج مكتب النبراس الهندسي بين الإبداع المعماري والدقة الهندسية لصناعة بيئات إنسانية ملهمة في المنطقة.",
        badge: "استوديو عمارة وهندسة",
        ctaPrimary: "ناقش رؤيتك",
        ctaSecondary: "استكشاف المشاريع",
        stats: [
          { value: "18+", label: "سنوات من الخبرة" },
          { value: "120+", label: "مشروع منجز" },
          { value: "9", label: "أسواق إقليمية" },
        ],
      },
      home: {
        aboutTitle: "من نحن",
        aboutBody:
          "تأسس مكتب نبراس في الرياض لصناعة بيئات عالية الأداء تقدّر السياق والثقافة والمناخ. يعمل فريقنا متعدد التخصصات بتكامل من الفكرة إلى التسليم لضمان أن كل مشروع مرن وخالد ومتمحور حول الإنسان.",
        featuredTitle: "مشاريع مختارة",
        featuredSubtitle:
          "نظرة على محفظتنا التي تغطي المباني المدنية والتجارية والضيافة والثقافية.",
        featuredProjects: [
          {
            title: "ساحة المملكة الثقافية",
            location: "الرياض، السعودية",
            typology: "ثقافي",
          },
          {
            title: "مركز أزرق للأعمال",
            location: "الدوحة، قطر",
            typology: "تجاري",
          },
          {
            title: "منتجع أفق النخيل",
            location: "جدة، السعودية",
            typology: "ضيافة",
          },
        ],
        testimonialsTitle: "نثق برؤى شركائنا",
      },
      about: {
        heroTitle: "نصمم بيئات تضيء آفاق الإمكان.",
        intro:
          "مكتب نبراس فريق من المعماريين والمهندسين والمخططين والمتخصصين الرقميين يجمعهم الالتزام بإنسانية البيئة المبنية. نمزج بين المنهجيات المتقدمة والفهم المحلي لنقدم قيمة دائمة.",
        missionTitle: "رسالتنا",
        missionBody:
          "ابتكار مساحات تكيفية قائمة على البيانات تعزز تجربة الإنسان وتخدم أهداف عملائنا الاستراتيجية.",
        visionTitle: "رؤيتنا",
        visionBody:
          "أن نكون الاستوديو الإقليمي الرائد المعروف بالبيئات المرنة الجاهزة للمستقبل والمتجذرة في الأصالة الثقافية.",
        approachTitle: "منهجيتنا",
        approachPoints: [
          "بحث معمق وتشارك مع أصحاب المصلحة.",
          "تصميم مبني على الأدلة مع تكامل هندسي متعدد التخصصات.",
          "تسليم رقمي يعتمد على BIM للتنسيق والرؤى خلال دورة الحياة.",
          "استراتيجيات استدامة متوافقة مع المعايير العالمية.",
        ],
        teamTitle: "الفريق القيادي",
        teamIntro:
          "قيادة متعددة التخصصات يجمعها الشغف والتميّز التقني وخلق أماكن ذات معنى.",
        teamMembers: [
          {
            name: "م. فهد المطيري",
            role: "المدير العام",
          },
          {
            name: "م. لينا الحارثي",
            role: "مديرة التصميم",
          },
          {
            name: "م. عمر القحطاني",
            role: "رئيس الهندسة الإنشائية",
          },
          {
            name: "د. سارة القاسم",
            role: "قائدة BIM والتسليم الرقمي",
          },
        ],
      },
      services: {
        heroTitle: "خدمات متكاملة وقيادة واحدة.",
        heroSubtitle:
          "ننسّق جميع التخصصات ضمن استوديو واحد لضمان كفاءة التنفيذ وتعزيز جودة التصميم.",
        cards: [
          {
            title: "التصميم المعماري",
            description:
              "مفاهيم حساسة للسياق، تصميم مبدئي، ووثائق تفصيلية تجسد بيئات مميزة.",
          },
          {
            title: "الهندسة الإنشائية",
            description:
              "أنظمة إنشائية عالية الأداء محسّنة للمرونة والكفاءة وقابلية التنفيذ.",
          },
          {
            title: "التصميم الداخلي",
            description:
              "تصاميم داخلية غامرة من خلال المواد والإضاءة والأثاث وسرد متمحور حول الإنسان.",
          },
          {
            title: "الإشراف",
            description:
              "قيادة ميدانية وإشراف تقني يحمي جودة التصميم والجداول الزمنية.",
          },
          {
            title: "خدمات BIM",
            description:
              "نماذج ذكية وتنسيق ورقمنة شاملة تمكّن من اتخاذ قرارات مدعومة بالبيانات.",
          },
        ],
        bimCta: "اكتشف خدمات BIM",
        processTitle: "إطار العمل",
        processSteps: [
          {
            title: "الاكتشاف والاستراتيجية",
            body: "مواءمة أصحاب المصلحة وصياغة الرؤية وتحديد مؤشرات الأداء.",
          },
          {
            title: "تطوير التصميم",
            body: "تصميم تكراري مع دمج التخصصات المتعددة وإظهار بصري غامر.",
          },
          {
            title: "التسليم والتشغيل",
            body: "وثائق منسّقة، دعم أثناء الإنشاء، وتحضير للتشغيل.",
          },
        ],
      },
      bim: {
        heroTitle: "ذكاء مدفوع بـ BIM للبيئة المبنية.",
        heroSubtitle:
          "نستخدم نمذجة معلومات البناء لربط البيانات والفرق والقرارات عبر التصميم والإنشاء والتشغيل.",
        intro:
          "يقدم مكتب نبراس خدمات BIM تحول المشاريع إلى منظومات ذكية. يدعم فريقنا المالكين والمستشارين والمقاولين بتسليم رقمي متكامل.",
        pillars: [
          {
            title: "النمذجة والتنسيق",
            body: "إنتاج نماذج تفصيلية للعمارة والإنشاء وميكانيكا المباني مع تنسيق واعٍ للتعارضات.",
          },
          {
            title: "كشف التعارضات وحلها",
            body: "تحليل استباقي باستخدام قواعد متقدمة وتتبع سريع للملاحظات لتقليل إعادة العمل.",
          },
          {
            title: "تكامل الجداول والتكلفة",
            body: "ربط النماذج بالجداول الزمنية والبيانات المالية لإدارة بناء فعّالة.",
          },
          {
            title: "تسليم معلومات التشغيل",
            body: "تقديم توائم رقمية وبيانات COBie وترميز الأصول لدعم فرق التشغيل.",
          },
        ],
        ctaTitle: "جاهز لرقمنة أصولك؟",
        ctaBody:
          "استفد من خبراء BIM لدينا للارتقاء بالتنسيق وتقليل المخاطر وتحقيق قيمة خلال دورة الحياة.",
        ctaButton: "حجز استشارة BIM",
      },
      projects: {
        heroTitle: "مشاريعنا المميزة",
        heroSubtitle:
          "أنماط متنوعة يجمعها التصميم المتقن والتميّز التقني والتجربة الإنسانية.",
        filterAll: "الكل",
        categories: {
          civic: "مدني وثقافي",
          commercial: "تجاري",
          hospitality: "ضيافة",
          residential: "سكني",
          mixedUse: "متعدد الاستخدامات",
        },
        detailsLabel: "عرض التفاصيل",
        cards: [
          {
            title: "حي الابتكار في الرياض",
            location: "الرياض، السعودية",
            category: "mixedUse",
            description:
              "حرم معرفي مع تنقل ذكي ومساحات عمل تكيفية ومناطق عامة نابضة.",
          },
          {
            title: "مركز النور للفنون الأدائية",
            location: "أبوظبي، الإمارات",
            category: "civic",
            description:
              "معلم ثقافي يجسّد الفن الإقليمي عبر أشكال معمارية انسيابية.",
          },
          {
            title: "برج البوابة سكاي لاين",
            location: "المنامة، البحرين",
            category: "commercial",
            description:
              "مقر أعمال أيقوني يدمج الأفنية الخضراء والواجهات عالية الكفاءة.",
          },
          {
            title: "منتجع أفق النخيل",
            location: "جدة، السعودية",
            category: "hospitality",
            description:
              "ضيافة ساحلية مستوحاة من العمارة المحلية والإنارة المحيطية وتجربة مريحة.",
          },
          {
            title: "فلل وادي سيرين",
            location: "العلا، السعودية",
            category: "residential",
            description:
              "فلل فاخرة منسجمة مع المشهد الطبيعي بتبريد سلبي ومواد مستدامة.",
          },
          {
            title: "منتدى الشرقية المدني",
            location: "الدمام، السعودية",
            category: "civic",
            description:
              "وجهة مجتمعية تجمع الخدمات العامة مع مساحات تجمع مرنة.",
          },
        ],
      },
      contact: {
        heroTitle: "لنصنع معاً بصمة معمارية جديدة.",
        heroSubtitle:
          "شاركنا تطلعاتك، وسيقوم فريقنا بإعداد خارطة طريق مخصصة لمشروعك.",
        form: {
          name: "الاسم",
          email: "البريد الإلكتروني",
          phone: "الهاتف (اختياري)",
          message: "حدثنا عن مشروعك",
          submit: "إرسال الرسالة",
          success: "شكرًا لك. سيتواصل معك فريقنا قريبًا.",
        },
        officeInfoTitle: "المكتب",
        officeLines: ["مكتب النبراس الهندسي", "فلسطين - طوباس"],
        contactTitle: "تواصل",
        contactItems: [
          { type: "phone", value: "+970 59 000 0000" },
          { type: "email", value: "info@nebras-bim.com" },
        ],
        mapTitle: "زرنا",
      },
      footer: {
        tagLine: "نصمم بيئات تضيء المستقبل.",
        quickLinks: "روابط سريعة",
        newsletter: {
          title: "تابع المستجدات",
          placeholder: "أدخل بريدك الإلكتروني",
          button: "اشتراك",
          disclaimer: "نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.",
        },
        rights: "© {{year}} مكتب نبراس. جميع الحقوق محفوظة.",
        location: "الرياض | دبي | الدوحة",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", (lng) => {
  const language = languageOptions.find((item) => item.code === lng);
  const dir = language?.dir ?? "ltr";
  document.documentElement.lang = lng;
  document.documentElement.dir = dir;
  document.body.setAttribute("dir", dir);
});

export default i18n;

