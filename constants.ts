

import { Project, Service, TeamMember, Translations, Partner, Testimonial, BlogPost } from './types';

export const TRANSLATIONS: Record<'en' | 'ar', Translations> = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      services: 'Services',
      partners: 'Partners',
      about: 'Company',
      blog: 'Insights',
      contact: 'Contact',
      contactNow: 'Contact Us Now',
      brandName: 'AL NEBRAS',
      brandSubtitle: 'Engineering Office',
    },
    hero: {
      est: 'EST. 2000 | PALESTINIAN ENGINEERING LEGACY',
      typewriter: 'AL NEBRAS.. ENGINEERING THAT INSPIRES',
      subtitle: 'Over two decades of excellence in the heart of Palestine. Your trusted partner for building your home, project, and future.',
      cta: 'Explore Our History',
      scroll: 'Scroll to Explore',
      exploreProjects: 'Explore Projects',
      stats: {
        years: 'Years',
        projects: 'Projects',
        awards: 'Awards',
      }
    },
    common: {
      viewProject: 'View Case Study',
      specs: 'Technical Specs',
      features: 'Key Capabilities',
      getInTouch: 'Initiate Collaboration',
      explore: 'Explore',
      viewAllServices: 'View Full Capabilities',
      filterAll: 'All Projects',
      close: 'Close',
      backToProjects: 'Back to Projects',
      backToPartners: 'Back to Partners',
      visitWebsite: 'Visit Website',
      partnerSince: 'Partner Since',
      servicesProvided: 'Collaborative Services',
      comingSoon: 'Coming Soon',
      notifyMe: 'Notify Me',
      gallery: 'Gallery',
      contactLabel: 'Contact',
      director: 'Director',
      location: 'Location',
      phone: 'Phone',
      partnerNotFound: 'Partner Not Found',
      testimonials: 'Client Testimonials',
      notFoundTitle: '404 - STRUCTURAL ERROR',
      notFoundDesc: 'The blueprint you are looking for does not exist or has been moved.',
      returnHome: 'Return to Base',
      readMore: 'Read Full Article',
      latestNews: 'Global Architecture Feed',
      companyInsights: 'Nebras Insights'
    },
    footer: {
      description: 'Pioneering the future of built environments through precise engineering and sustainable innovation.',
      brandNameFull: 'AL NEBRAS ENGINEERING',
      officeHeading: 'Office',
      socialHeading: 'Social',
      address: {
        line1: 'Main Street',
        line2: 'Tubas',
        line3: 'Palestine',
      },
      rights: '© 2024 AL NEBRAS ENGINEERING.',
      privacy: 'PRIVACY POLICY',
      terms: 'TERMS OF SERVICE',
    },
    services: {
      heroDescription: 'Delivering multidisciplinary excellence across every phase of the construction lifecycle.',
      sectionCore: 'The Engineering Core',
      sectionAtelier: 'The Innovation Atelier',
      atelierSubtitle: 'Premium Visualization & Bespoke Fabrication',
      worldClassBadge: 'World-Class Engineering',
      coreSubtitle: 'Essentials for Modern Infrastructure',
      premiumLabel: 'Premium Offerings',
      premiumDescription: 'Explore our high-end customization services.'
    },
    about: {
      heroText1: 'Founded in 2000, Al Nebras Engineering Office has established itself as a beacon of reliability and technical expertise in the Palestinian construction sector.',
      heroText2: 'We combine over two decades of local experience with modern engineering standards to deliver projects that stand the test of time.',
      leadership: 'Leadership',
      history: {
        title: 'Our History',
        content: 'Established in 2000 in Tubas, Palestine, Al Nebras has grown from a specialized design studio into a leading engineering consultancy. With a strong reputation for rigorous project supervision and architectural integrity, we have successfully delivered hundreds of residential, commercial, and public infrastructure projects. Our legacy is built on strict adherence to Palestinian building codes and an unyielding commitment to client satisfaction.',
      },
      digitalPioneer: 'We are proud to be the first engineering office in Tubas Governorate to officially implement and process transactions through the electronic engineering licensing system, marking a milestone in our leadership towards digital transformation.',
      mission: {
        title: 'Our Mission',
        content: 'To elevate the standard of engineering in Palestine by integrating digital efficiency with structural precision, creating safe, sustainable, and aesthetically enduring environments.',
      },
      values: {
        title: 'Core Values',
        items: [
          { title: 'Credibility', desc: 'Trust built over 24 years of service.', icon: 'Shield' },
          { title: 'Precision', desc: 'Strict adherence to engineering codes.', icon: 'Target' },
          { title: 'Leadership', desc: 'Pioneering digital engineering solutions.', icon: 'Zap' },
          { title: 'Commitment', desc: 'Dedicated project supervision.', icon: 'Leaf' },
        ],
      },
    },
    partners: {
      title: 'Our Strategic Partners',
      description: 'Collaborating with industry leaders to deliver integrated solutions and certified excellence.',
      accreditationHeading: 'Accreditation & Quality',
    },
    contact: {
      title: 'Contact',
      intro: 'Ready to engineer the future? Let’s discuss your vision.',
      locationHeading: 'Our Location',
      mapOverlay: 'Interact to explore',
      info: {
        email: 'Email',
        phone: 'Phone',
        hq: 'HQ',
        addressValue: 'Main St, Tubas, Palestine',
      },
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message',
        namePlaceholder: 'John Doe',
        emailPlaceholder: 'name@company.com',
        messagePlaceholder: 'Tell us about your project...',
        budget: 'Estimated Budget',
        portfolio: 'Portfolio / LinkedIn URL',
        organization: 'Company / Organization',
        position: 'Position of Interest'
      },
      subjects: {
        inquiry: 'New Project Inquiry',
        careers: 'Careers',
        partnership: 'Partnership',
      },
      quick: {
        title: 'Quick Inquiry',
        subtitle: 'Chat via WhatsApp',
        name: 'Your Name',
        message: 'Your Message...',
        send: 'Send Now',
      }
    },
    projects: {
      heading: 'Our Portfolio',
      exterior: {
        title: 'Exterior Visualization',
        subtitle: 'Architecture & Landscape',
      },
      interior: {
        title: 'Interior Design',
        subtitle: 'Spaces & Ambiance',
      }
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      projects: 'المشاريع',
      services: 'خدماتنا',
      partners: 'شركاؤنا',
      about: 'الشركة',
      blog: 'المدونة',
      contact: 'تواصل معنا',
      contactNow: 'تواصل معنا الآن',
      brandName: 'النبراس',
      brandSubtitle: 'للاستشارات الهندسية',
    },
    hero: {
      est: 'تأسس عام 2000 | عراقة هندسية فلسطينية',
      typewriter: 'النبراس.. هندسةٌ تُلهم',
      subtitle: 'أكثر من عقدين من التميز في قلب فلسطين. شريكك الموثوق لبناء منزلك، مشروعك، ومستقبلك.',
      cta: 'تصفح تاريخنا',
      scroll: 'مرر للاستكشاف',
      exploreProjects: 'استكشف المشاريع',
      stats: {
        years: 'سنوات',
        projects: 'مشاريع',
        awards: 'جوائز',
      }
    },
    common: {
      viewProject: 'عرض دراسة الحالة',
      specs: 'المواصفات الفنية',
      features: 'القدرات الأساسية',
      getInTouch: 'ابدأ التعاون',
      explore: 'استكشاف',
      viewAllServices: 'عرض كامل الخدمات',
      filterAll: 'كل المشاريع',
      close: 'إغلاق',
      backToProjects: 'العودة للمشاريع',
      backToPartners: 'العودة للشركاء',
      visitWebsite: 'زيارة الموقع',
      partnerSince: 'شريك منذ',
      servicesProvided: 'مجالات التعاون',
      comingSoon: 'قريباً',
      notifyMe: 'أعلمني',
      gallery: 'معرض الصور',
      contactLabel: 'معلومات التواصل',
      director: 'المدير العام',
      location: 'الموقع',
      phone: 'الهاتف',
      partnerNotFound: 'الشريك غير موجود',
      testimonials: 'آراء عملائنا',
      notFoundTitle: '404 - خطأ هيكلي',
      notFoundDesc: 'المخطط الذي تبحث عنه غير موجود أو تم نقله.',
      returnHome: 'العودة للقاعدة',
      readMore: 'اقرأ المقال كاملاً',
      latestNews: 'أخبار الهندسة العالمية',
      companyInsights: 'رؤى النبراس'
    },
    footer: {
      description: 'ريادة مستقبل البيئات المبنية من خلال الهندسة الدقيقة والابتكار المستدام.',
      brandNameFull: 'مكتب النبراس الهندسي',
      officeHeading: 'المكتب',
      socialHeading: 'تواصل اجتماعي',
      address: {
        line1: 'الشارع الرئيسي',
        line2: 'طوباس',
        line3: 'فلسطين',
      },
      rights: '© 2024 مكتب النبراس الهندسي.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
    },
    services: {
      heroDescription: 'تقديم التميز متعدد التخصصات عبر كل مرحلة من مراحل دورة حياة البناء.',
      sectionCore: 'الجوهر الهندسي',
      sectionAtelier: 'أستوديو الابتكار',
      atelierSubtitle: 'تصورات بصرية متميزة وتصنيع مخصص',
      worldClassBadge: 'هندسة عالمية المستوى',
      coreSubtitle: 'أساسيات البنية التحتية الحديثة',
      premiumLabel: 'عروض متميزة',
      premiumDescription: 'استكشف خدماتنا المخصصة عالية المستوى.',
    },
    about: {
      heroText1: 'تأسس مكتب النبراس الهندسي عام 2000، ورسخ مكانته كمنارة للموثوقية والخبرة الفنية في قطاع البناء الفلسطيني.',
      heroText2: 'نجمع بين أكثر من عقدين من الخبرة المحلية والمعايير الهندسية الحديثة لتقديم مشاريع تصمد أمام اختبار الزمن.',
      leadership: 'القيادة',
      history: {
        title: 'تاريخنا العريق',
        content: 'تأسس مكتب النبراس عام 2000 في محافظة طوباس، فلسطين. على مدار 24 عاماً، تطورنا لنصبح إسماً مرادفاً للثقة والتميز في التصميم المعماري والإنشائي والإشراف الهندسي. سجلنا حافل بتسليم مئات المشاريع السكنية والتجارية والبنية التحتية بنجاح، مستندين في ذلك إلى التزام صارم بكود البناء الفلسطيني وتفانٍ مطلق في تحقيق رؤية العميل.',
      },
      digitalPioneer: 'نفتخر بكوننا أول مكتب هندسي في محافظة طوباس يعتمد النظام الإلكتروني الرسمي لإصدار التراخيص وإتمام المعاملات الهندسية، مما يعكس ريادتنا في التحول الرقمي وكفاءة الإجراءات.',
      mission: {
        title: 'مهمتنا',
        content: 'الارتقاء بمستوى العمل الهندسي في فلسطين من خلال دمج الكفاءة الرقمية مع الدقة الإنشائية، لخلق بيئات آمنة، مستدامة، وجمالية تدوم للأجيال القادمة.',
      },
      values: {
        title: 'قيمنا الجوهرية',
        items: [
          { title: 'المصداقية', desc: 'ثقة بنيت عبر 24 عاماً من الخدمة.', icon: 'Shield' },
          { title: 'الدقة', desc: 'التزام صارم بالمعايير الهندسية.', icon: 'Target' },
          { title: 'الريادة', desc: 'سباقون في الحلول الهندسية الرقمية.', icon: 'Zap' },
          { title: 'الالتزام', desc: 'إشراف هندسي ومتابعة حثيثة.', icon: 'Leaf' },
        ],
      },
    },
    partners: {
      title: 'شركاؤنا الاستراتيجيين',
      description: 'نتعاون مع رواد الصناعة لتقديم حلول متكاملة وتميز معتمد.',
      accreditationHeading: 'الاعتمادات والجودة',
    },
    contact: {
      title: 'تواصل معنا',
      intro: 'هل أنت مستعد لهندسة المستقبل؟ دعنا نناقش رؤيتك.',
      locationHeading: 'موقعنا',
      mapOverlay: 'تفاعل مع الخريطة لاستكشاف الموقع',
      info: {
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        hq: 'المقر الرئيسي',
        addressValue: 'Main St, Tubas, Palestine',
      },
      form: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        subject: 'الموضوع',
        message: 'الرسالة',
        submit: 'إرسال الرسالة',
        namePlaceholder: 'الاسم الكامل',
        emailPlaceholder: 'name@company.com',
        messagePlaceholder: 'أخبرنا عن تفاصيل مشروعك...',
        budget: 'الميزانية المتوقعة',
        portfolio: 'رابط المعرض / لينكدإن',
        organization: 'الشركة / المؤسسة',
        position: 'المسمى الوظيفي المطلوب'
      },
      subjects: {
        inquiry: 'استفسار عن مشروع جديد',
        careers: 'وظائف',
        partnership: 'شراكة',
      },
      quick: {
        title: 'تواصل سريع',
        subtitle: 'دردشة عبر واتساب',
        name: 'الاسم',
        message: 'رسالتك...',
        send: 'إرسال الآن',
      }
    },
    projects: {
      heading: 'أعمالنا',
      exterior: {
        title: 'التصاميم الخارجية',
        subtitle: 'العمارة وتنسيق المواقع',
      },
      interior: {
        title: 'التصميم الداخلي',
        subtitle: 'المساحات والديكور',
      }
    }
  },
};

export const TEAM: Record<'en' | 'ar', TeamMember[]> = {
  en: [
    { 
      id: 't1', 
      name: 'Eng. Saed Salahat', 
      role: 'Founder & Head of Structural Dept.', 
      bio: 'With over 25 years of experience, Eng. Saed established Al Nebras as a pillar of structural integrity and engineering excellence in Palestine.', 
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop' 
    },
    { 
      id: 't2', 
      name: 'Eng. Mohammed Salahat', 
      role: 'Head of Architecture', 
      bio: 'A visionary architect dedicated to creating timeless designs that seamlessly merge modern aesthetics with functional living spaces.', 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' 
    },
    { 
      id: 't3', 
      name: 'Eng. Oday Salahat', 
      role: 'BIM Director', 
      bio: 'Leading the digital transformation of the office through advanced Building Information Modeling (BIM) workflows and smart construction technologies.', 
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' 
    },
    { 
      id: 't4', 
      name: 'Eng. Ribhi Sawafta', 
      role: 'Head of Road Design', 
      bio: 'Expert in infrastructure planning and transportation engineering, ensuring efficient and safe road networks for sustainable urban development.', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' 
    },
  ],
  ar: [
    { 
      id: 't1', 
      name: 'م. سائد صلاحات', 
      role: 'المؤسس ومدير قسم الانشائيين', 
      bio: 'بخبرة تزيد عن 25 عاماً، أسس المهندس سائد مكتب النبراس ليكون منارة للنزاهة الإنشائية والتميز الهندسي في فلسطين.', 
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop' 
    },
    { 
      id: 't2', 
      name: 'م. محمد صلاحات', 
      role: 'مدير العمارة', 
      bio: 'معماري صاحب رؤية يكرس جهوده لابتكار تصاميم خالدة تدمج بين الجماليات الحديثة والمساحات الوظيفية ببراعة.', 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' 
    },
    { 
      id: 't3', 
      name: 'م. عدي صلاحات', 
      role: 'مدير نمذجة البناء', 
      bio: 'يقود التحول الرقمي للمكتب من خلال تقنيات نمذجة معلومات البناء (BIM) المتقدمة وتكنولوجيا البناء الذكي.', 
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' 
    },
    { 
      id: 't4', 
      name: 'م. ربحي صوافطة', 
      role: 'مدير تصميم الطرق', 
      bio: 'خبير في تخطيط البنية التحتية وهندسة المواصلات، يضمن تصميم شبكات طرق فعالة وآمنة للتطوير الحضري المستدام.', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' 
    },
  ]
};

export const INTERNAL_BLOG_POSTS: Record<'en' | 'ar', BlogPost[]> = {
  en: [
    {
      id: 'seismic-safety-tubas',
      title: 'Building Safely in the Jordan Rift Valley: Seismic Engineering in Tubas',
      excerpt: 'Tubas is located near the Jordan Rift Valley fault line. Learn how Al Nebras implements rigorous seismic design standards to ensure safety.',
      content: `The Jordan Rift Valley is a seismically active region, and Tubas Governorate lies in proximity to this fault line. This geographical reality makes structural integrity not just a regulatory requirement, but a moral imperative.

At Al Nebras Engineering, we go beyond basic code compliance. Our structural designs incorporate:

1. **Advanced Soil Analysis:** Before a single stone is laid, we conduct deep soil testing to understand liquefaction potential.
2. **Shear Wall Distribution:** Strategic placement of reinforced concrete walls to resist lateral forces during an earthquake.
3. **Ductile Detailing:** Using steel reinforcement techniques that allow the building to absorb energy without catastrophic failure.

We believe that a safe home is the foundation of a thriving community. Our commitment to seismic safety ensures that your investment stands strong for generations.`,
      date: 'Oct 28, 2024',
      category: 'Structural Safety',
      author: 'Eng. Abdel Rahim Wahdan',
      // UPDATED IMAGE: Construction/Rebar
      image: 'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1765189510/17235151720_k33ney.jpg',
      isExternal: false
    },
    {
      id: 'palestinian-stone-insulation',
      title: 'The Art of Palestinian Stone: Balancing Tradition with Modern Insulation',
      excerpt: 'How to use the iconic Jerusalem Stone cladding while maintaining energy efficiency in the hot summers of the Jordan Valley.',
      content: `Palestinian stone (Hajar) is world-renowned for its beauty and durability. However, stone acts as a thermal bridge, conducting heat into the building during our hot summers in Tubas and the Jordan Valley.

The Challenge: How do we keep the traditional aesthetic without sacrificing modern comfort and energy bills?

The Solution: The "Sandwich Wall" System.
Al Nebras advocates for a multi-layer wall system:
1. **Outer Layer:** 5-7cm of dressed Palestinian stone (Matabeh, Taltish, or Mufajar).
2. **Concrete Backing:** Reinforced concrete for structural bond.
3. **Thermal Break:** High-density Polystyrene or Rockwool insulation.
4. **Inner Block:** Hollow concrete blocks for thermal mass.

This method reduces cooling costs by up to 40% while preserving the cultural identity of our architecture.`,
      date: 'Oct 15, 2024',
      category: 'Architecture',
      author: 'Al Nebras Team',
      // UPDATED IMAGE: Stone Texture
      image: 'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1765189510/495560004_8938073112961936_2255423408875223236_n_f3i9ek.jpg',
      isExternal: false
    },
    {
      id: 'e-licensing-tubas',
      title: 'Digital Transformation: The E-Licensing Revolution in Tubas',
      excerpt: 'Al Nebras was the first office in Tubas to adopt the new electronic system. Here is how this benefits property owners.',
      content: `Gone are the days of carrying rolls of blueprints between municipal offices. The Engineers Association and local municipalities in Palestine have shifted to an E-Licensing system, and Al Nebras is proud to be a pioneer in this transition within Tubas.

**Benefits for Property Owners:**
*   **Speed:** Permit processing time has been reduced by weeks.
*   **Transparency:** You can track the status of your file online.
*   **Accuracy:** Digital submissions reduce human error in area calculations and fees.

We handle the entire process for you—from the initial land survey upload to the final digital stamp—ensuring a hassle-free experience.`,
      date: 'Sep 22, 2024',
      category: 'Regulations',
      author: 'Al Nebras Team',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
      isExternal: false
    }
  ],
  ar: [
    {
      id: 'seismic-safety-tubas',
      title: 'البناء الآمن في حفرة الانهدام: الهندسة الزلزالية في طوباس',
      excerpt: 'تقع طوباس بالقرب من خط صدع الأردن. تعرف على كيفية تطبيق مكتب النبراس لمعايير تصميم زلزالي صارمة لضمان السلامة.',
      content: `تعتبر منطقة حفرة الانهدام (الأغوار) منطقة نشطة زلزالياً، وتقع محافظة طوباس على مقربة من خط الصدع هذا. هذه الحقيقة الجغرافية تجعل السلامة الإنشائية ليست مجرد متطلب قانوني، بل واجب أخلاقي.

في مكتب النبراس الهندسي، نتجاوز مجرد الامتثال للكود الأساسي. تتضمن تصاميمنا الإنشائية:

1. **تحليل متقدم للتربة:** قبل وضع حجر واحد، نجري فحوصات تربة عميقة لفهم طبيعة الأرض واحتمالية التميع.
2. **توزيع جدران القص (Shear Walls):** التوزيع الاستراتيجي للجدران الخرسانية المسلحة لمقاومة القوى الجانبية أثناء الزلازل.
3. **التفاصيل المرنة (Ductility):** استخدام تقنيات تسليح تسمح للمبنى بامتصاص الطاقة دون انهيار مفاجئ.

نؤمن بأن البيت الآمن هو أساس المجتمع المزدهر. التزامنا بالسلامة الزلزالية يضمن أن استثمارك سيظل قائماً وقوياً للأجيال القادمة.`,
      date: '28 أكتوبر 2024',
      category: 'السلامة الإنشائية',
      author: 'م. عبد الرحيم وهدان',
      // UPDATED IMAGE: Construction/Rebar
      image: 'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1765189510/17235151720_k33ney.jpg',
      isExternal: false
    },
    {
      id: 'palestinian-stone-insulation',
      title: 'فن الحجر الفلسطيني: الموازنة بين العراقة والعزل الحديث',
      excerpt: 'كيفية استخدام حجر القدس التقليدي مع الحفاظ على كفاءة الطاقة في صيف الأغوار الحار.',
      content: `يشتهر الحجر الفلسطيني بجماله ومتانته عالمياً. ومع ذلك، يعمل الحجر كجسر حراري ينقل الحرارة إلى داخل المبنى، خاصة في صيف طوباس والأغوار الحار.

**التحدي:** كيف نحافظ على الطابع الجمالي التقليدي دون التضحية بالراحة الحديثة وفواتير الطاقة؟

**الحل:** نظام "الجدار المزدوج" (Sandwich Wall).
يعتمد مكتب النبراس نظام جدران متعدد الطبقات:
1. **الطبقة الخارجية:** 5-7 سم من الحجر الفلسطيني (طبزة، ملطش، أو مفجر).
2. **الخلفية الخرسانية:** خرسانة مسلحة للترابط الهيكلي.
3. **العزل الحراري:** بوليسترين عالي الكثافة أو صوف صخري لكسر الجسر الحراري.
4. **البلوك الداخلي:** طوب إسمنتي مفرغ للكتلة الحرارية.

هذه الطريقة تقلل تكاليف التبريد بنسبة تصل إلى 40% مع الحفاظ على الهوية الثقافية لعمارتنا.`,
      date: '15 أكتوبر 2024',
      category: 'العمارة',
      author: 'فريق النبراس',
      // UPDATED IMAGE: Stone Texture
      image: 'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1765189510/495560004_8938073112961936_2255423408875223236_n_f3i9ek.jpg',
      isExternal: false
    },
    {
      id: 'e-licensing-tubas',
      title: 'التحول الرقمي: ثورة التراخيص الإلكترونية في طوباس',
      excerpt: 'كان النبراس أول مكتب في طوباس يعتمد النظام الإلكتروني الجديد. إليك كيف يستفيد أصحاب العقارات من ذلك.',
      content: `ولى زمن حمل لفائف المخططات الورقية بين المكاتب البلدية. انتقلت نقابة المهندسين والبلديات المحلية في فلسطين إلى نظام التراخيص الإلكتروني، ويفخر مكتب النبراس بكونه رائداً في هذا التحول داخل محافظة طوباس.

**فوائد النظام لأصحاب العقارات:**
*   **السرعة:** تم تقليص وقت معالجة التصاريح بأسابيع.
*   **الشفافية:** يمكنك تتبع حالة ملفك عبر الإنترنت في أي وقت.
*   **الدقة:** التقديم الرقمي يقلل من الأخطاء البشرية في حساب المساحات والرسوم.

نحن نتولى العملية بأكملها نيابةً عنك — من رفع المساحة الأولي وحتى الختم الرقمي النهائي — لضمان تجربة خالية من المتاعب.`,
      date: '22 سبتمبر 2024',
      category: 'القوانين',
      author: 'فريق النبراس',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
      isExternal: false
    }
  ]
};

export const PARTNERS: Record<'en' | 'ar', Partner[]> = {
  en: [
    {
      id: 'p1',
      slug: 'al-shamal-labs',
      name: 'Al Shamal Construction Laboratories',
      logo: 'https://i.postimg.cc/90LsVbqN/481053813-1237649231695449-277693057688011472-n.jpg', 
      description: 'Al Shamal Construction Laboratories is a certified engineering testing facility providing structural materials analysis, field inspections, and quality assurance services for construction projects across Palestine.',
      accreditation: 'Al Shamal Construction Laboratories operates in full compliance with Palestinian national standards and strictly adheres to international quality requirements for construction materials testing and structural assessment. The laboratory maintains a rigorous commitment to accuracy and reliability, following certified procedures and globally recognized frameworks such as ASTM, AASHTO, and ISO standards.',
      website: '',
      since: '2015',
      director: 'Eng. Abdel Rahim Wahdan',
      location: 'Tubas – State of Palestine',
      phone: '+970 562 227 750',
      contactEmail: 'info@alshamal-labs.com',
      services: [
        'Structural Materials Testing', 
        'Concrete and Steel Analysis', 
        'Soil and Foundation Investigation', 
        'Quality Control and Field Sampling',
        'Certification and Engineering Reports'
      ],
      gallery: [
          'https://i.postimg.cc/fRNRJT30/502377288-3043341495843434-1386704520853724408-n.jpg',
          'https://i.postimg.cc/02mNkJNp/557651481-3613668265430861-3396176642752143056-n.jpg',
          'https://i.postimg.cc/wTJBqsBX/558090084-3613668568764164-470688488558255220-n.jpg'
      ]
    }
  ],
  ar: [
    {
      id: 'p1',
      slug: 'al-shamal-labs',
      name: 'مختبرات الشمال الإنشائية',
      logo: 'https://i.postimg.cc/90LsVbqN/481053813-1237649231695449-277693057688011472-n.jpg',
      description: 'مختبر هندسي متخصص في فحوصات المواد الإنشائية، الفحوصات الحقلية، وضبط الجودة في مشاريع البناء.',
      accreditation: 'تعمل مختبرات الشمال الإنشائية بامتثال كامل للمواصفات الوطنية الفلسطينية وتلتزم بدقة بمتطلبات الجودة العالمية لفحوصات مواد البناء والتقييم الإنشائي. يحافظ المختبر على التزام صارم بالدقة والموثوقية، متبعاً إجراءات معتمدة وأطر عمل معترف بها عالمياً مثل ASTM و AASHTO و ISO لضمان أعلى مستويات السلامة الهيكلية.',
      website: '',
      since: '2015',
      director: 'م. عبد الرحيم وهدان',
      location: 'طوباس – دولة فلسطين',
      phone: '+970 562 227 750',
      contactEmail: 'info@alshamal-labs.com',
      services: [
        'فحوصات المواد الإنشائية', 
        'تحليل الخرسانة والفولاذ', 
        'تحريات التربة والأساسات', 
        'ضبط الجودة والعينات الحقلية',
        'شهادات وتقارير هندسية'
      ],
      gallery: [
          'https://i.postimg.cc/fRNRJT30/502377288-3043341495843434-1386704520853724408-n.jpg',
          'https://i.postimg.cc/02mNkJNp/557651481-3613668265430861-3396176642752143056-n.jpg',
          'https://i.postimg.cc/wTJBqsBX/558090084-3613668568764164-470688488558255220-n.jpg'
      ]
    }
  ]
};

export const PROJECTS: Record<'en' | 'ar', Project[]> = {
  en: [
    {
      id: '1',
      slug: 'al-aqrabaniya-park',
      title: 'Public Park in Al-Aqrabaniya',
      category: 'Landscape & Public Spaces',
      location: 'Al-Aqrabaniya, Palestine',
      year: '2025',
      area: '2,500 m²',
      image: 'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847564/10_kzxtg3.webp', 
      gallery: [
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847564/2_dg1zsl.webp',
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847564/3_mbncdt.webp',
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847564/5_zijkds.webp',
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847563/9_buxhgp.webp',
      ],
      description: 'A thoughtfully designed public park serving as a green lung for Al-Aqrabaniya. The project features lush green spaces, organized pedestrian pathways, and essential public facilities. It focuses on environmental sustainability and community well-being, providing a safe and serene recreational area for families.',
      specs: [
        { label: 'Green Area', value: '70%' },
        { label: 'Pathways', "value": 'Paved' },
        { label: 'Facilities', "value": 'Complete' },
      ],
    },
    {
      id: '2',
      slug: 'tubas-boys-school',
      title: 'Tubas Secondary School for Boys',
      category: 'Education',
      location: 'Tubas, Palestine',
      year: '2018',
      area: '2,388 m² (Built)',
      image: 'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847833/myarchitectai_wjq63e0va_sd_g1nhoa.jpg',
      gallery: [
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847831/myarchitectai_65021vyr7_sd_rpl6pn.jpg',
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847829/myarchitectai_1c7lao2ky_sd_irwbo4.jpg',
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847832/myarchitectai_a5d57imsq_sd_lamhil.jpg',
      ],
      description: 'A modern educational facility designed to foster learning and community. The project includes multiple floors of classrooms, administration offices, and extensive outdoor recreational areas including courts and playgrounds.',
      specs: [
        { label: 'Ground Floor', value: '944 m²' },
        { label: 'First Floor', value: '822 m²' },
        { label: 'Second Floor', value: '474 m²' },
        { label: 'Outdoor Area', value: '3,000 m²' },
      ],
    },
    {
      id: '3',
      slug: 'azure-bridge',
      title: 'Modern Villa in Tubas',
      category: 'Residential',
      location: 'Tubas, Palestine',
      year: '2024',
      area: '270 m²',
      image: 'https://i.postimg.cc/3R3GPDvY/myarchitectai-ocdbdv7wq-sd.jpg',
      gallery: [
        'https://i.postimg.cc/JhNJ6QGy/myarchitectai-cn6fwfzme-sd.jpg',
        'https://i.postimg.cc/85Tvqr6T/myarchitectai-in3cjdk31-sd.jpg',
      ],
      description: 'A private residence featuring a modern architectural design, focusing on clean lines and functional spaces.',
      specs: [
        { label: 'Area', value: '270 m²' },
        { label: 'Style', value: 'Modern' },
      ],
    },
    {
      id: '4',
      slug: 'helix-residence',
      title: 'Tubas Directorate of Local Government',
      category: 'Public & Administrative',
      location: 'Tubas, Palestine',
      year: '2023',
      area: '800 m²',
      image: 'https://i.postimg.cc/QxzYJ6Zw/1.jpg',
      gallery: [
          'https://i.postimg.cc/dtfNjWcW/2.jpg',
          'https://i.postimg.cc/Pr7VQ6kn/3.jpg',
          'https://i.postimg.cc/4xhLLzJt/5.png'
      ],
      description: 'Headquarters for the Directorate of Local Government in Tubas. The project consists of a ground floor, first floor, and staircase extension totaling 800 m², along with 1,200 m² of external yards and parking facilities.',
      specs: [
        { label: 'Total Built', value: '800 m²' },
        { label: 'External Area', value: '1,200 m²' },
        { label: 'Floors', value: 'G + 1' },
      ],
    },
    {
      id: '5',
      slug: 'metro-hub',
      title: 'Mr. Ghassan Salahat Villa',
      category: 'Residential',
      location: 'Al-Fara\'a, Palestine',
      year: '2024',
      area: '480 m²',
      image: 'https://i.postimg.cc/s2Y5XRdP/myarchitectai-07pq1blnc-sd.jpg',
      gallery: [
        'https://i.postimg.cc/jjHy5r0H/myarchitectai-wngfexfc8-sd.jpg',
        'https://i.postimg.cc/YS6Q9wKf/myarchitectai-u4eeqnory-sd.jpg',
        'https://i.postimg.cc/yNm0dz4P/myarchitectai-7ca3xzz0rl-sd.jpg',
      ],
      description: 'A sophisticated private residence spanning two floors and a roof terrace. The design features a 205 m² ground floor, a 205 m² first floor, and is surrounded by a vast 1,200 m² landscape area.',
      specs: [
        { label: 'Ground Floor', value: '205 m²' },
        { label: 'Landscape', value: '1,200 m²' },
        { label: 'Total Built', value: '480 m²' },
      ],
    },
  ],
  ar: [
    {
      id: '1',
      slug: 'al-aqrabaniya-park',
      title: 'حديقة عامة في بلدة العقربانية',
      category: 'تنسيق حدائق ومرافق عامة',
      location: 'العقربانية، فلسطين',
      year: '2025',
      area: '2,500 م²',
      image: 'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847564/10_kzxtg3.webp',
      gallery: [
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847564/2_dg1zsl.webp',
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847564/3_mbncdt.webp',
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847564/5_zijkds.webp',
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847563/9_buxhgp.webp',
      ],
      description: 'مشروع حديقة عامة متميز يجمع بين الجمال الطبيعي والوظيفة المجتمعية. تحتوي الحديقة على مساحات خضراء ممتدة، وممرات مشاة منظمة، ومرافق عامة متكاملة. تم تصميم الموقع ليكون متنفساً حيوياً للأهالي، مع التركيز على الاستدامة وتوفير بيئة آمنة وجذابة للأنشطة الترفيهية والاجتماعية.',
      specs: [
        { label: 'المساحة الخضراء', value: '70%' },
        { label: 'الممرات', value: 'مرصوفة' },
        { label: 'المرافق', value: 'شاملة' },
      ],
    },
    {
      id: '2',
      slug: 'tubas-boys-school',
      title: 'مدرسة طوباس الثانوية للبنين',
      category: 'تعليمي',
      location: 'طوباس، فلسطين',
      year: '2018',
      area: '2,388 م² (بناء)',
      image: 'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847833/myarchitectai_wjq63e0va_sd_g1nhoa.jpg',
      gallery: [
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847831/myarchitectai_65021vyr7_sd_rpl6pn.jpg',
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847829/myarchitectai_1c7lao2ky_sd_irwbo4.jpg',
        'https://res.cloudinary.com/dmdp1hnwx/image/upload/v1764847832/myarchitectai_a5d57imsq_sd_lamhil.jpg',
      ],
      description: 'صرح تعليمي متميز يهدف إلى توفير بيئة تعليمية محفزة. يتكون المشروع من طوابق متعددة للفصول الدراسية والمكاتب الإدارية، بالإضافة إلى ساحات خارجية واسعة وملاعب ومرافق ترفيهية تخدم الطلبة والمجتمع.',
      specs: [
        { label: 'طابق أرضي', value: '944 م²' },
        { label: 'طابق أول', value: '822 م²' },
        { label: 'طابق ثاني', value: '474 م²' },
        { label: 'الساحات والملاعب', value: '3000 م²' },
      ],
    },
    {
      id: '3',
      slug: 'azure-bridge',
      title: 'فيلا في طوباس',
      category: 'سكني',
      location: 'طوباس، فلسطين',
      year: '2024',
      area: '270 م²',
      image: 'https://i.postimg.cc/3R3GPDvY/myarchitectai-ocdbdv7wq-sd.jpg',
      gallery: [
        'https://i.postimg.cc/JhNJ6QGy/myarchitectai-cn6fwfzme-sd.jpg',
        'https://i.postimg.cc/85Tvqr6T/myarchitectai-in3cjdk31-sd.jpg',
      ],
      description: 'فيلا سكنية خاصة تتميز بتصميم مودرن (حديث)، تجمع بين البساطة والأناقة في توزيع المساحات.',
      specs: [
        { label: 'المساحة', value: '270 م²' },
        { label: 'التصميم', value: 'مودرن' },
      ],
    },
    {
      id: '4',
      slug: 'helix-residence',
      title: 'مقر مديرية الحكم المحلي - طوباس',
      category: 'مباني عامة وإدارية',
      location: 'طوباس، فلسطين',
      year: '2023',
      area: '800 م²',
      image: 'https://i.postimg.cc/QxzYJ6Zw/1.jpg',
      gallery: [
          'https://i.postimg.cc/dtfNjWcW/2.jpg',
          'https://i.postimg.cc/Pr7VQ6kn/3.jpg',
          'https://i.postimg.cc/4xhLLzJt/5.png'
      ],
      description: 'مشروع مقر مديرية الحكم المحلي في محافظة طوباس. يتكون المبنى من طابق أرضي وأول ومكرر درج بمساحة إجمالية 800 متر مربع، بالإضافة إلى ساحات خارجية ومواقف سيارات بمساحة 1200 متر مربع.',
      specs: [
        { label: 'مساحة البناء', value: '800 م²' },
        { label: 'الساحات الخارجية', value: '1200 م²' },
        { label: 'الطوابق', value: 'أرضي + أول' },
      ],
    },
    {
      id: '5',
      slug: 'metro-hub',
      title: 'فيلا السيد غسان صلاحات المحترم',
      category: 'سكني',
      location: 'الفارعة، فلسطين',
      year: '2024',
      area: '480 م²',
      image: 'https://i.postimg.cc/s2Y5XRdP/myarchitectai-07pq1blnc-sd.jpg',
      gallery: [
        'https://i.postimg.cc/jjHy5r0H/myarchitectai-wngfexfc8-sd.jpg',
        'https://i.postimg.cc/YS6Q9wKf/myarchitectai-u4eeqnory-sd.jpg',
        'https://i.postimg.cc/yNm0dz4P/myarchitectai-7ca3xzz0rl-sd.jpg',
      ],
      description: 'مشروع سكني مميز مكون من طابقين وروف. تبلغ مساحة الطابق الأول 205 م² والطابق الثاني 205 م²، مع استغلال المساحة المتبقية للروف. يتميز المشروع بتصميم لاندسكيب خارجي محيط بمساحة 1200 م².',
      specs: [
        { label: 'مساحة الطابق', "value": '205 م²' },
        { label: 'اللاندسكيب', "value": '1200 م²' },
        { label: 'المساحة الكلية', "value": '480 م²' },
      ],
    },
  ],
};

export const INTERIOR_PROJECTS: Record<'en' | 'ar', Project[]> = {
  en: [
    {
      id: 'i1',
      slug: 'minimalist-loft',
      title: 'Urban Minimalist Loft',
      category: 'Residential',
      location: 'Ramallah, Palestine',
      year: '2024',
      area: '180 m²',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000',
        'https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?q=80&w=2000'
      ],
      description: 'A contemporary loft design focusing on open spaces, natural light, and monochromatic textures. This project exemplifies modern Palestinian living with a touch of industrial elegance.',
      specs: [
        { label: 'Style', value: 'Minimalist' },
        { label: 'Materials', value: 'Concrete & Wood' },
      ],
    },
    {
      id: 'i2',
      slug: 'luxury-office',
      title: 'Executive Corporate Hub',
      category: 'Commercial',
      location: 'Dubai, UAE',
      year: '2023',
      area: '450 m²',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000'
      ],
      description: 'High-end corporate office design integrating ergonomic workspaces with luxury meeting areas. Features smart glass partitions and custom acoustic solutions.',
      specs: [
        { label: 'Capacity', value: '50 Workstations' },
        { label: 'Tech', value: 'Smart Integrated' },
      ],
    },
    {
      id: 'i3',
      slug: 'cozy-retreat',
      title: 'Nordic Bedroom Retreat',
      category: 'Residential',
      location: 'Jericho, Palestine',
      year: '2023',
      area: '45 m²',
      image: 'https://images.unsplash.com/photo-1616594039964-408359566320?q=80&w=2000&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2000'
      ],
      description: 'A serene bedroom sanctuary designed with soft earthy tones and organic fabrics to create a calming atmosphere away from the city noise.',
      specs: [
        { label: 'Mood', value: 'Serene' },
        { label: 'Palette', value: 'Earth Tones' },
      ],
    },
    {
      id: 'i4',
      slug: 'industrial-kitchen',
      title: 'Industrial Fusion Kitchen',
      category: 'Residential',
      location: 'Nablus, Palestine',
      year: '2024',
      area: '60 m²',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2000'
      ],
      description: 'A bold kitchen design merging exposed brick textures with sleek matte black cabinetry and copper accents, perfect for culinary enthusiasts.',
      specs: [
        { label: 'Finish', value: 'Matte Black' },
        { label: 'Layout', value: 'Open Island' },
      ],
    }
  ],
  ar: [
    {
      id: 'i1',
      slug: 'minimalist-loft',
      title: 'لوفت حضري بسيط',
      category: 'سكني',
      location: 'رام الله، فلسطين',
      year: '2024',
      area: '180 م²',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000',
        'https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?q=80&w=2000'
      ],
      description: 'تصميم لوفت معاصر يركز على المساحات المفتوحة، الإضاءة الطبيعية، والأنسجة أحادية اللون. يجسد هذا المشروع نمط الحياة الفلسطيني الحديث بلمسة من الأناقة الصناعية.',
      specs: [
        { label: 'النمط', value: 'تبسيطي' },
        { label: 'المواد', value: 'خرسانة وخشب' },
      ],
    },
    {
      id: 'i2',
      slug: 'luxury-office',
      title: 'المركز المؤسسي التنفيذي',
      category: 'تجاري',
      location: 'دبي، الإمارات',
      year: '2023',
      area: '450 م²',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000'
      ],
      description: 'تصميم مكتبي راقٍ يدمج مساحات العمل المريحة مع مناطق اجتماعات فاخرة. يتميز بفواصل زجاجية ذكية وحلول صوتية مخصصة.',
      specs: [
        { label: 'السعة', value: '50 محطة عمل' },
        { label: 'التقنية', value: 'مدمجة ذكية' },
      ],
    },
    {
      id: 'i3',
      slug: 'cozy-retreat',
      title: 'ملاذ غرفة النوم الشمالي',
      category: 'سكني',
      location: 'أريحا، فلسطين',
      year: '2023',
      area: '45 م²',
      image: 'https://images.unsplash.com/photo-1616594039964-408359566320?q=80&w=2000&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2000'
      ],
      description: 'ملاذ هادئ لغرفة النوم مصمم بألوان ترابية ناعمة وأقمشة عضوية لخلق جو مريح بعيداً عن صخب المدينة.',
      specs: [
        { label: 'الأجواء', value: 'هادئة' },
        { label: 'الألوان', value: 'ألوان ترابية' },
      ],
    },
    {
      id: 'i4',
      slug: 'industrial-kitchen',
      title: 'مطبخ فيوجن صناعي',
      category: 'سكني',
      location: 'نابلس، فلسطين',
      year: '2024',
      area: '60 م²',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2000'
      ],
      description: 'تصميم جريء للمطبخ يدمج ملمس الطوب المكشوف مع خزائن سوداء غير لامعة ولمسات نحاسية، مثالي لعشاق الطهي.',
      specs: [
        { label: 'التشطيب', value: 'أسود غير لامع' },
        { label: 'التخطيط', value: 'جزيرة مفتوحة' },
      ],
    }
  ]
};

export const SERVICES: Record<'en' | 'ar', Service[]> = {
  // ... (content remains same as before)
  en: [
    {
      id: 's1',
      title: 'Architectural Design',
      description: 'Creating timeless, functional spaces through innovative conceptualization and detailed planning.',
      icon: 'LayoutTemplate',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop',
      features: ['Concept Design', 'Urban Planning', 'Interior Architecture'],
    },
    {
      id: 's2',
      title: 'Structural Engineering',
      description: 'Ensuring stability and safety with advanced analysis for high-rise and complex geometries.',
      icon: 'Layers',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
      features: ['Seismic Analysis', 'Steel & Concrete', 'High-Rise Systems'],
    },
    {
      id: 's3',
      title: 'BIM Services',
      description: 'Building Information Modeling for digital twins, collision detection, and lifecycle management.',
      icon: 'Box',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089&auto=format&fit=crop',
      features: ['LOD 500 Modeling', 'Clash Detection', 'Digital Twins'],
    },
    {
      id: 's4',
      title: 'Engineering Consultancy',
      description: 'Strategic technical advice, feasibility studies, and value engineering for optimized results.',
      icon: 'Compass',
      image: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=2069&auto=format&fit=crop',
      features: ['Feasibility Studies', 'Value Engineering', 'Technical Audits'],
    },
    {
      id: 's5',
      title: 'Landscape Architecture',
      description: 'Harmonizing built environments with nature through sustainable and aesthetic outdoor design.',
      icon: 'Trees',
      image: 'https://i.postimg.cc/prFTVnc9/maxresdefault.jpg',
      features: ['Hardscape', 'Softscape', 'Sustainable Irrigation'],
    },
    {
      id: 's6',
      title: 'Project Management',
      description: 'End-to-end oversight ensuring projects are delivered on time, within budget, and to quality standards.',
      icon: 'HardHat',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop',
      features: ['Cost Control', 'Scheduling', 'Site Supervision'],
    },
    {
      id: 's7',
      title: 'Lighting Design',
      description: 'Enhancing architectural features and ambiance through strategic photometric planning.',
      icon: 'Lightbulb',
      image: 'https://i.postimg.cc/50bx8R09/lightingdesignserviceproductimage.webp',
      features: ['Facade Lighting', 'Indoor Ambiance', 'Energy Efficiency'],
    },
    {
      id: 's8',
      title: 'Road Design',
      description: 'Planning efficient transportation networks and civil infrastructure for modern cities.',
      icon: 'Route',
      image: 'https://i.postimg.cc/qvnYTcc2/Highway-121772761-scaled.jpg',
      features: ['Traffic Analysis', 'Pavement Design', 'Infrastructure Planning'],
    },
  ],
  ar: [
    {
      id: 's1',
      title: 'التصميم المعماري',
      description: 'ابتكار مساحات وظيفية خالدة من خلال المفاهيم المبتكرة والتخطيط التفصيلي.',
      icon: 'LayoutTemplate',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop',
      features: ['تصميم المفاهيم', 'التخطيط الحضري', 'العمارة الداخلية'],
    },
    {
      id: 's2',
      title: 'التصميم الإنشائي',
      description: 'ضمان الاستقرار والسلامة مع التحليل المتقدم للأبراج والأشكال الهندسية المعقدة.',
      icon: 'Layers',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
      features: ['التحليل الزلزالي', 'الفولاذ والخرسانة', 'أنظمة الأبراج'],
    },
    {
      id: 's3',
      title: 'نمذجة معلومات البناء (BIM)',
      description: 'نمذجة معلومات البناء للتوائم الرقمية، وكشف التعارضات، وإدارة دورة حياة المشروع.',
      icon: 'Box',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089&auto=format&fit=crop',
      features: ['نمذجة LOD 500', 'كشف التعارضات', 'التوائم الرقمية'],
    },
    {
      id: 's4',
      title: 'الاستشارات الهندسية',
      description: 'مشورة فنية استراتيجية، ودراسات جدوى، وهندسة قيمية لنتائج محسنة.',
      icon: 'Compass',
      image: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=2069&auto=format&fit=crop',
      features: ['دراسات الجدوى', 'الهندسة القيمية', 'التدقيق الفني'],
    },
    {
      id: 's5',
      title: 'هندسة المشهد وتنسيق المواقع',
      description: 'المواءمة بين البيئات المبنية والطبيعة من خلال تصميم خارجي مستدام وجمالي.',
      icon: 'Trees',
      image: 'https://i.postimg.cc/prFTVnc9/maxresdefault.jpg',
      features: ['تنسيق صلب', 'تنسيق نباتي', 'ري مستدام'],
    },
    {
      id: 's6',
      title: 'إدارة المشاريع',
      description: 'إشراف شامل لضمان تسليم المشاريع في الوقت المحدد، وضمن الميزانية، ووفق معايير الجودة.',
      icon: 'HardHat',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop',
      features: ['مراقبة التكاليف', 'الجدولة الزمنية', 'الإشراف الموقعي'],
    },
    {
      id: 's7',
      title: 'تصميم الإنارة',
      description: 'تعزيز الميزات المعمارية والأجواء العامة من خلال التخطيط الضوئي الاستراتيجي.',
      icon: 'Lightbulb',
      image: 'https://i.postimg.cc/50bx8R09/lightingdesignserviceproductimage.webp',
      features: ['إنارة الواجهات', 'الأجواء الداخلية', 'كفاءة الطاقة'],
    },
    {
      id: 's8',
      title: 'تصميم الطرق',
      description: 'تخطيط شبكات نقل وبنية تحتية مدنية فعالة للمدن الحديثة.',
      icon: 'Route',
      image: 'https://i.postimg.cc/qvnYTcc2/Highway-121772761-scaled.jpg',
      features: ['تحليل المرور', 'تصميم الرصف', 'تخطيط البنية التحتية'],
    },
  ],
};

export const PREMIUM_SERVICES: Record<'en' | 'ar', Service[]> = {
  // ... (content remains same as before)
  en: [
    {
      id: 'vip1',
      title: '3D Printing Service',
      description: 'Manifesting digital designs into tangible, high-fidelity physical models for rapid prototyping and client presentations.',
      icon: 'Printer',
      image: 'https://i.postimg.cc/dQhYLxGx/3d-printed-architectural-model-min.jpg',
      features: ['Scale Models', 'Rapid Prototyping', 'High-Detail Resin'],
    },
    {
      id: 'vip2',
      title: 'Architectural VR & Simulation',
      description: 'Immersive virtual reality walkthroughs that allow stakeholders to experience spaces before they are built.',
      icon: 'Glasses',
      image: 'https://i.postimg.cc/NjmGLzvf/maxresdefault-(1).jpg',
      features: ['VR Walkthroughs', 'Panoramic Renders', 'Interactive Tours'],
    },
    {
      id: 'vip3',
      title: 'Premium Design Booklet',
      description: 'Bespoke, branded project documentation and marketing materials crafted to elevate the project narrative.',
      icon: 'BookOpen',
      image: 'https://i.postimg.cc/XvrbdB9n/best-architecture-portfolio.webp',
      features: ['Brand Identity', 'Marketing Collateral', 'Technical Folios'],
    },
  ],
  ar: [
    {
      id: 'vip1',
      title: 'خدمة الطباعة ثلاثية الأبعاد',
      description: 'تحويل التصاميم الرقمية إلى نماذج مادية عالية الدقة للنماذج الأولية السريعة وعروض العملاء.',
      icon: 'Printer',
      image: 'https://i.postimg.cc/dQhYLxGx/3d-printed-architectural-model-min.jpg',
      features: ['نماذج مصغرة', 'نماذج أولية سريعة', 'راتينج عالي التفاصيل'],
    },
    {
      id: 'vip2',
      title: 'المحاكاة المعمارية والواقع الافتراضي',
      description: 'جولات واقع افتراضي غامرة تسمح لأصحاب المصلحة بتجربة المساحات قبل بنائها.',
      icon: 'Glasses',
      image: 'https://i.postimg.cc/NjmGLzvf/maxresdefault-(1).jpg',
      features: ['جولات الواقع الافتراضي', 'رندرات بانورامية', 'جولات تفاعلية'],
    },
    {
      id: 'vip3',
      title: 'كتيب التصميم المتميز',
      description: 'توثيق المشروع ومواد التسويق المصممة خصيصاً للارتقاء بسردية المشروع وهويته.',
      icon: 'BookOpen',
      image: 'https://i.postimg.cc/XvrbdB9n/best-architecture-portfolio.webp',
      features: ['الهوية البصرية', 'مواد التسويق', 'ملفات فنية'],
    },
  ]
};

export const TESTIMONIALS: Record<'en' | 'ar', Testimonial[]> = {
    // ... (content remains same as before)
    en: [
        {
            id: 'tm1',
            name: 'Mr. Tariq Al-Ahmad',
            role: 'Villa Owner',
            company: 'Nablus, Palestine',
            content: 'The attention to detail in our private villa was extraordinary. They perfectly captured the modern aesthetic we wanted while respecting local stone traditions.'
        },
        {
            id: 'tm2',
            name: 'Eng. Hisham Abu Samra',
            role: 'Villa Owner',
            company: 'Moscow, Russia',
            content: 'Building a luxury home in Moscow required a team that understands complex engineering for harsh climates. Al Nebras delivered a masterpiece that stands out.'
        },
        {
            id: 'tm3',
            name: 'Mrs. Rima Haddad',
            role: 'Villa Owner',
            company: 'Mount Lebanon',
            content: 'Our mountain home needed to blend with nature. The design provided by Al Nebras is breathtaking, and the remote supervision was flawless.'
        }
    ],
    ar: [
        {
            id: 'tm1',
            name: 'السيد طارق الأحمد',
            role: 'مالك فيلا',
            company: 'نابلس، فلسطين',
            content: 'الاهتمام بالتفاصيل في فيلتنا الخاصة كان استثنائياً. لقد نجحوا في تجسيد الطابع العصري الذي أردناه مع الحفاظ على عراقة الحجر الفلسطيني التقليدي.'
        },
        {
            id: 'tm2',
            name: 'المهندس هشام أبو سمرة',
            role: 'مالك فيلا',
            company: 'موسكو، روسيا',
            content: 'بناء منزل فاخر في موسكو تطلب فريقاً يفهم الهندسة المعقدة للتعامل مع المناخ القاسي. قدم لنا مكتب النبراس تحفة فنية تتحدى الزمن.'
        },
        {
            id: 'tm3',
            name: 'السيدة ريما حداد',
            role: 'مالكة فيلا',
            company: 'جبل لبنان',
            content: 'منزلنا الجبلي كان بحاجة لينسجم مع الطبيعة المحيطة. التصميم الذي قدمه النبراس كان خلاباً، وعملية الإشراف عن بعد كانت دقيقة واحترافية.'
        }
    ]
};
