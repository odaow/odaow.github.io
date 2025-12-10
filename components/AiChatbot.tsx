
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, ChevronDown, Minimize2, 
  Bot, User, Sparkles, 
  MapPin, Briefcase, DollarSign, Calendar, 
  Mail, Phone, ExternalLink, Trash2, X, ScanLine, Send, Settings, MessageCircle, HelpCircle, ChevronUp
} from 'lucide-react';

interface ChatAction {
  label: string;
  value: string;
  type: 'email' | 'phone' | 'link';
  icon?: React.ReactNode;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actions?: ChatAction[];
}

// WhatsApp Configuration
const WHATSAPP_NUMBER = "970569628237"; 
const QR_CODE_IMAGE = "https://res.cloudinary.com/dmdp1hnwx/image/upload/v1765193415/qrcode_285895430_bfba7068a7e84cdacb71c258cbb6beec_cgcuha.png";

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382C17.112 14.382 14.655 13.342 14.321 13.214C14.103 13.13 13.882 13.13 13.682 13.435C13.518 13.669 12.984 14.382 12.83 14.545C12.695 14.717 12.518 14.729 12.193 14.615C11.365 14.249 10.326 13.692 9.479 12.937C8.78401 12.318 8.31501 11.554 8.13601 11.246C7.97801 10.973 8.16901 10.835 8.31001 10.669C8.42801 10.531 8.56701 10.353 8.70801 10.158C8.78301 10.054 8.82601 9.957 8.88701 9.835C8.94801 9.713 8.89901 9.58 8.85301 9.488C8.80501 9.395 8.08201 7.618 7.77901 6.903C7.49101 6.223 7.18901 6.305 6.96801 6.305C6.76401 6.305 6.54101 6.294 6.31901 6.294C5.97501 6.294 5.56101 6.422 5.25301 6.758C4.85201 7.195 3.84101 8.143 3.84101 10.081C3.84101 12.019 5.25101 13.894 5.46001 14.172C5.66901 14.45 8.13901 18.257 11.921 19.892C14.722 21.102 15.65 20.899 16.536 20.655C17.518 20.384 19.231 19.468 19.643 18.307C20.055 17.146 20.055 16.142 19.933 15.932C19.811 15.722 19.503 15.617 19.043 15.385C18.583 15.153 17.657 14.382 17.472 14.382Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M12.007 2C6.48501 2 1.99201 6.493 1.99201 12.015C1.99201 13.97 2.56201 15.776 3.55101 17.311L2.06201 22.185L7.15301 20.985C8.61801 21.874 10.283 22.348 11.998 22.348H12.007C17.528 22.348 22.021 17.855 22.021 12.333C22.021 6.811 17.528 2 12.007 2ZM12.006 20.662H12.001C10.518 20.662 9.07601 20.264 7.82801 19.523L7.53101 19.347L4.41801 20.081L5.20401 17.262L4.91801 16.807C4.09501 15.498 3.66201 13.976 3.66201 12.334C3.66201 7.734 7.40401 3.992 12.011 3.992C16.618 3.992 20.36 7.734 20.36 12.334C20.36 16.934 16.613 20.662 12.006 20.662Z" />
  </svg>
);

const AiChatbot: React.FC = () => {
  const { t, language, direction, services } = useLanguage();
  
  // Chatbot State
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // WhatsApp Modal State
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // Unified FAB State
  const [isFabOpen, setIsFabOpen] = useState(false);

  // Initialize Greeting
  useEffect(() => {
    if (messages.length === 0) {
      resetChat();
    }
  }, [language]);

  // Reset Chat Function
  const resetChat = () => {
    const greeting = language === 'ar' ? 'السلام عليكم' : 'Hello';
    const intro = language === 'ar'
      ? 'أنا المساعد الآلي لمكتب النبراس. كيف يمكنني مساعدتك؟ اختر من القائمة أدناه.'
      : 'I am the Al Nebras virtual assistant. How can I help you? Please select an option below.';
    
    setMessages([
      {
        id: 'init-1-' + Date.now(),
        text: greeting,
        sender: 'bot',
        timestamp: new Date()
      },
      {
        id: 'init-2-' + Date.now(),
        text: intro,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [messages, isOpen, isTyping]);

  const handleOptionClick = (optionKey: string, label: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text: label,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(optionKey);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        actions: response.actions
      }]);
      setIsTyping(false);
    }, 600);
  };

  const generateResponse = (key: string): { text: string; actions?: ChatAction[] } => {
    const isAr = language === 'ar';
    switch (key) {
      case 'location':
        return {
          text: isAr ? 'فلسطين - طوباس' : 'Palestine - Tubas',
          actions: [
             { 
               label: isAr ? 'عرض على الخريطة' : 'View on Map', 
               value: 'https://maps.google.com/?q=Tubas,Palestine', 
               type: 'link',
               icon: <MapPin size={14} />
             }
          ]
        };
      case 'services':
        const serviceList = services.slice(0, 5).map(s => s.title).join(isAr ? '،\n• ' : ',\n• ');
        return {
          text: isAr 
            ? `نقدم مجموعة شاملة من الخدمات الهندسية:\n• ${serviceList}`
            : `We offer a comprehensive range of engineering services:\n• ${serviceList}`
        };
      case 'pricing':
        return {
          text: isAr 
            ? "للاستفسار عن الأسعار، يرجى التواصل مع فريقنا عبر البريد أو الهاتف."
            : "For pricing inquiries, please contact our team via email or phone.",
          actions: [
            { 
              label: isAr ? 'البريد الإلكتروني' : 'Send Email', 
              value: 'info@nebras-bim.com', 
              type: 'email',
              icon: <Mail size={14} />
            },
            { 
              label: isAr ? 'الاتصال هاتفياً' : 'Call Phone', 
              value: '+970599250094', 
              type: 'phone',
              icon: <Phone size={14} />
            }
          ]
        };
      case 'appointment':
        return {
          text: isAr 
            ? "لحجز موعد، يرجى التواصل مع فريقنا عبر البريد أو الهاتف."
            : "To schedule an appointment, please contact our team via email or phone.",
          actions: [
            { 
              label: isAr ? 'البريد الإلكتروني' : 'Send Email', 
              value: 'info@nebras-bim.com', 
              type: 'email',
              icon: <Mail size={14} />
            },
            { 
              label: isAr ? 'الاتصال هاتفياً' : 'Call Phone', 
              value: '+970599250094', 
              type: 'phone',
              icon: <Phone size={14} />
            }
          ]
        };
      default:
        return {
          text: isAr ? 'كيف يمكنني مساعدتك؟' : 'How can I help you?'
        };
    }
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.type === 'email') window.location.href = `mailto:${action.value}`;
    if (action.type === 'phone') window.location.href = `tel:${action.value}`;
    if (action.type === 'link') window.open(action.value, '_blank');
  };

  const menuOptions = [
    { 
      id: 'location', 
      label: language === 'ar' ? 'موقع المكتب' : 'Office Location', 
      icon: <MapPin size={16} /> 
    },
    { 
      id: 'services', 
      label: language === 'ar' ? 'الخدمات' : 'Services', 
      icon: <Briefcase size={16} /> 
    },
    { 
      id: 'pricing', 
      label: language === 'ar' ? 'الأسعار' : 'Pricing', 
      icon: <DollarSign size={16} /> 
    },
    { 
      id: 'appointment', 
      label: language === 'ar' ? 'مواعيد حجز' : 'Schedule Appointment', 
      icon: <Calendar size={16} /> 
    },
  ];

  const MotionDiv = motion.div as any;

  return (
    <>
      {/* 
        ------------------------------------------------------------
        WHATSAPP MODAL OVERLAY
        ------------------------------------------------------------
      */}
      <AnimatePresence>
        {isWhatsAppOpen && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 cursor-default"
            onClick={() => setIsWhatsAppOpen(false)}
          >
             <MotionDiv
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className="bg-primary/95 border border-accent/20 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-sm w-full overflow-hidden relative cursor-auto"
             >
                {/* Decorative Tech Lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
                
                {/* Close Button */}
                <button 
                  onClick={() => setIsWhatsAppOpen(false)}
                  className="absolute top-4 right-4 p-2 text-neutral-dim hover:text-accent transition-colors z-20 hover:rotate-90 duration-300 cursor-pointer"
                >
                  <X size={20} />
                </button>

                {/* Modal Header */}
                <div className="bg-secondary/50 p-6 text-center border-b border-white/5">
                    <div className="w-12 h-12 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4 border border-accent/20">
                         <WhatsAppIcon size={24} className="text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-light mb-1">
                      {language === 'ar' ? 'تواصل عبر واتساب' : 'Chat via WhatsApp'}
                    </h3>
                    <p className="text-xs font-mono text-accent uppercase tracking-widest">
                       {language === 'ar' ? 'امسح الرمز أدناه' : 'Scan Code Below'}
                    </p>
                </div>

                {/* QR Code Section */}
                <div className="p-8 flex flex-col items-center justify-center bg-white relative">
                    <div className="relative w-48 h-48 group">
                        {/* The QR Image */}
                        <img 
                          src={QR_CODE_IMAGE} 
                          alt="WhatsApp QR Code" 
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                        
                        {/* Scanning Animation */}
                        <motion.div 
                          className="absolute left-0 right-0 h-[2px] bg-accent shadow-[0_0_15px_rgba(var(--color-accent),1)] z-10"
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ 
                            duration: 3, 
                            ease: "easeInOut", 
                            repeat: Infinity 
                          }}
                        />
                        
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary z-10" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary z-10" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary z-10" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary z-10" />
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 bg-secondary/80 border-t border-white/5">
                   <a 
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full py-4 bg-accent hover:bg-white text-primary font-bold font-mono uppercase tracking-wider rounded-sm flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-accent/10 cursor-pointer"
                   >
                      <WhatsAppIcon size={20} className="group-hover:text-primary transition-colors" />
                      <span>
                        {language === 'ar' ? 'فتح الرابط المباشر' : 'Open Direct Link'}
                      </span>
                      <ExternalLink size={16} className="rtl-flip" />
                   </a>
                </div>
             </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* 
        ------------------------------------------------------------
        CHATBOT WINDOW (Top Right Fixed)
        ------------------------------------------------------------
      */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: 20, scale: 0.9, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            className={`fixed bottom-24 z-[8000] w-[90vw] md:w-96 h-[500px] bg-secondary/95 backdrop-blur-xl border border-neutral-light/10 rounded-sm shadow-2xl flex flex-col overflow-hidden ${direction === 'rtl' ? 'left-4 md:left-8' : 'right-4 md:right-8'}`}
          >
            {/* Chat Header */}
            <div className="bg-primary/95 p-4 border-b border-white/5 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                  <div className="relative">
                      <div className="w-2 h-2 bg-green-500 rounded-full absolute bottom-0 right-0 z-10 border border-primary animate-pulse" />
                      <Bot size={20} className="text-accent" />
                  </div>
                  <div>
                      <h3 className="text-sm font-bold text-neutral-light uppercase tracking-wide">
                          {language === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
                      </h3>
                      <span className="text-[10px] text-neutral-dim font-mono">
                          {language === 'ar' ? 'متصل' : 'Online'}
                      </span>
                  </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:text-accent transition-colors cursor-pointer"
              >
                  <Minimize2 size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col gap-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.sender === 'bot' && (
                        <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-1">
                            <Bot size={12} className="text-accent" />
                        </div>
                    )}
                    
                    <div className={`p-3 text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user' 
                        ? 'bg-neutral-light text-primary rounded-sm rounded-tr-none' 
                        : 'bg-primary/50 border border-white/5 text-neutral-light rounded-sm rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                  
                  {/* Actions rendered outside bubble for clearer UI */}
                  {msg.sender === 'bot' && msg.actions && (
                      <div className="pl-9 flex flex-wrap gap-2 mt-1">
                        {msg.actions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleActionClick(action)}
                            className="text-[10px] uppercase font-bold tracking-wider bg-accent/10 hover:bg-accent hover:text-primary border border-accent/30 text-accent px-3 py-1.5 rounded-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
                          >
                            {action.icon}
                            {action.label}
                          </button>
                        ))}
                      </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2 pl-9">
                    <span className="w-1 h-1 bg-accent/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1 h-1 bg-accent/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1 h-1 bg-accent/50 rounded-full animate-bounce"></span>
                </div>
              )}
            </div>

            {/* Quick Actions Footer */}
            <div className="p-3 bg-primary/80 border-t border-white/5 grid grid-cols-2 gap-2">
                {menuOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt.id, opt.label)}
                    disabled={isTyping}
                    className="text-[10px] font-mono uppercase p-2 border border-white/10 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all text-neutral-dim truncate cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* 
        ------------------------------------------------------------
        UNIFIED SPEED DIAL BUTTON (Bottom Corner)
        ------------------------------------------------------------
      */}
      <div 
        className={`fixed bottom-8 z-[9000] flex flex-col items-end gap-3 ${direction === 'rtl' ? 'left-8 items-start' : 'right-8 items-end'}`}
        onMouseEnter={() => setIsFabOpen(true)}
        onMouseLeave={() => setIsFabOpen(false)}
      >
        
        {/* Expanded Options */}
        <AnimatePresence>
            {isFabOpen && (
                <MotionDiv
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-3 mb-2"
                >
                    {/* Option 1: WhatsApp (Primary) */}
                    <div className={`flex items-center gap-3 ${direction === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                        <button
                            onClick={() => { setIsWhatsAppOpen(true); setIsFabOpen(false); }}
                            className="w-12 h-12 rounded-full bg-secondary border border-neutral-light/10 text-neutral-light hover:text-green-400 hover:border-green-400/50 shadow-lg flex items-center justify-center transition-all duration-300 group"
                        >
                            <WhatsAppIcon size={24} />
                        </button>
                        <span className="bg-secondary/90 text-neutral-light text-xs font-bold px-3 py-1.5 rounded-sm border border-white/10 backdrop-blur whitespace-nowrap shadow-md">
                            {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                        </span>
                    </div>

                    {/* Option 2: AI Bot (Secondary) */}
                    {!isOpen && (
                        <div className={`flex items-center gap-3 ${direction === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                            <button
                                onClick={() => { setIsOpen(true); setIsFabOpen(false); }}
                                className="w-12 h-12 rounded-full bg-secondary border border-neutral-light/10 text-neutral-light hover:text-accent hover:border-accent/50 shadow-lg flex items-center justify-center transition-all duration-300 group"
                            >
                                <Bot size={24} />
                            </button>
                            <span className="bg-secondary/90 text-neutral-light text-xs font-bold px-3 py-1.5 rounded-sm border border-white/10 backdrop-blur whitespace-nowrap shadow-md">
                                {language === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
                            </span>
                        </div>
                    )}
                </MotionDiv>
            )}
        </AnimatePresence>

        {/* Main Trigger Button */}
        <button
            onClick={() => setIsFabOpen(!isFabOpen)}
            className={`
                w-16 h-16 rounded-full bg-accent text-primary shadow-[0_0_20px_rgba(var(--color-accent),0.4)] 
                flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 z-20 relative
            `}
        >
             <AnimatePresence mode="wait">
                {isFabOpen ? (
                     <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                     >
                         <ChevronDown size={32} />
                     </motion.div>
                ) : (
                    <motion.div
                        key="open"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                         <MessageCircle size={32} className="animate-pulse" />
                    </motion.div>
                )}
             </AnimatePresence>

             {/* Ping Effect when closed */}
             {!isFabOpen && (
                 <span className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20" />
             )}
        </button>

      </div>
    </>
  );
};

export default AiChatbot;
