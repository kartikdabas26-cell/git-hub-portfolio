import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  ArrowUpRight, 
  CheckCircle2, 
  X, 
  PhoneCall
} from 'lucide-react';

// Custom Brand Icons
const Github: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const Linkedin: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

// ==========================================
// MAGNET COMPONENT (Mouse-following effect)
// ==========================================
interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  disabled?: boolean;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  disabled = false,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !magnetRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    if (
      Math.abs(distanceX) < width / 2 + padding &&
      Math.abs(distanceY) < height / 2 + padding
    ) {
      setPosition({ x: distanceX / strength, y: distanceY / strength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={magnetRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0 ? inactiveTransition : activeTransition,
      }}
    >
      {children}
    </div>
  );
};

// ==========================================
// FADE IN COMPONENT
// ==========================================
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  y = 30,
  x = 0,
  duration = 0.8,
  className = "",
  once = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// REUSABLE BUTTONS
// ==========================================
interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

export const ContactButton: React.FC<ButtonProps> = ({ onClick, className = "", children = "Contact Me" }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full text-white font-medium uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg cursor-pointer ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
        padding: 'clamp(0.7rem, 1.2vw, 1rem) clamp(1.8rem, 2.5vw, 3rem)',
        fontSize: 'clamp(0.75rem, 1vw, 1rem)'
      }}
    >
      {children}
    </button>
  );
};

export const LiveProjectButton: React.FC<{ href: string; label?: string }> = ({ href, label = "Live Project" }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm transition-all duration-300 hover:bg-[#D7E2EA]/10 hover:scale-105 active:scale-95"
    >
      <span>{label}</span>
      <ArrowUpRight className="w-4 h-4" />
    </a>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const marqueeSectionRef = useRef<HTMLDivElement>(null);
  const [marqueeOffset, setMarqueeOffset] = useState(0);

  // Global scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (marqueeSectionRef.current) {
        const rect = marqueeSectionRef.current.getBoundingClientRect();
        const offset = (window.scrollY - (rect.top + window.scrollY) + window.innerHeight) * 0.3;
        setMarqueeOffset(offset);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactModalOpen(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Engineering Showcase Image Cards for Marquee (420x270 Picture Format)
  const marqueeImagesRow1 = [
    "/marquee/card-medicycle.png",
    "/marquee/card-datascience.png",
    "/marquee/card-fastapi.png",
    "/marquee/card-react-ts.png",
  ];

  const marqueeImagesRow2 = [
    "/marquee/card-saferoute.png",
    "/marquee/card-spatial.png",
    "/marquee/card-docker.png",
    "/marquee/card-usict.png",
  ];

  const row1Images = [...marqueeImagesRow1, ...marqueeImagesRow1, ...marqueeImagesRow1, ...marqueeImagesRow1];
  const row2Images = [...marqueeImagesRow2, ...marqueeImagesRow2, ...marqueeImagesRow2, ...marqueeImagesRow2];

  return (
    <div className="bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] min-h-screen selection:bg-[#BBCCD7] selection:text-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      
      {/* Google Fonts & Custom CSS Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&display=swap');
        
        html, body, #root {
          background-color: #0C0C0C;
          color: #D7E2EA;
          font-family: 'Kanit', sans-serif;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .hero-heading {
          background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 32s linear infinite;
        }

        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 32s linear infinite;
        }

        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ==========================================
          1. HERO SECTION
          ========================================== */}
      <section className="relative h-screen flex flex-col justify-between overflow-x-clip">
        
        {/* Navbar */}
        <FadeIn delay={0} y={-20} className="w-full">
          <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
            <div className="text-sm md:text-lg lg:text-[1.4rem] font-bold tracking-wider uppercase text-[#D7E2EA]">
              Kartik Dabas
            </div>
            <div className="flex gap-6 sm:gap-10 md:gap-14">
              {['About', 'Services', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === 'Contact') setContactModalOpen(true);
                    else scrollToSection(item.toLowerCase());
                  }}
                  className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[#D7E2EA] hover:opacity-70 transition-opacity duration-200 cursor-pointer bg-transparent border-none"
                >
                  {item}
                </button>
              ))}
            </div>
          </nav>
        </FadeIn>

        {/* Hero Portrait (Centered Absolutely with Magnet Effect) */}
        <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none">
          <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
            <div className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] pointer-events-auto">
              <img
                src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                alt="Kartik Dabas Portrait"
                className="w-full h-auto object-cover select-none drop-shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </Magnet>
        </FadeIn>

        {/* Hero Heading Container */}
        <div className="w-full overflow-hidden mt-6 sm:mt-4 md:-mt-5 z-20">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[12vw] sm:text-[13vw] md:text-[14vw] lg:text-[15vw]">
              Hi, i&apos;m kartik
            </h1>
          </FadeIn>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
          <FadeIn delay={0.35} y={20}>
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
              a frontend engineer & ui architect driven by crafting striking, fluid and unforgettable web experiences
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton onClick={() => setContactModalOpen(true)} />
          </FadeIn>
        </div>

      </section>


      {/* ==========================================
          2. MARQUEE SECTION (Engineering Picture Cards Format)
          ========================================== */}
      <section ref={marqueeSectionRef} className="pt-24 sm:pt-32 md:pt-36 pb-12 bg-[#0C0C0C] overflow-hidden relative">
        
        {/* Subtle Section Label */}
        <div className="flex items-center justify-center gap-3 mb-8 px-6">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#D7E2EA]/30"></div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#BBCCD7]/60">
            Tech Arsenal & Project Capabilities
          </span>
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#D7E2EA]/30"></div>
        </div>

        {/* Dual-Row Picture Marquee with Edge Fade Mask */}
        <div 
          className="flex flex-col gap-4 sm:gap-5 relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)'
          }}
        >
          
          {/* Row 1: Moves RIGHT on scroll + continuous auto-flow */}
          <div className="flex gap-4 sm:gap-5 overflow-hidden whitespace-nowrap py-1" style={{ willChange: 'transform' }}>
            <div 
              className="flex gap-4 sm:gap-5 shrink-0 items-center animate-marquee-right"
              style={{ transform: `translateX(${marqueeOffset - 200}px)`, transition: 'transform 0.1s linear' }}
            >
              {row1Images.map((src, idx) => (
                <div 
                  key={`r1-${idx}`} 
                  className="w-[360px] sm:w-[420px] h-[230px] sm:h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#151515] border border-[#D7E2EA]/15 shadow-2xl hover:border-white/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                >
                  <img src={src} alt="Engineering showcase preview" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Moves LEFT on scroll + continuous auto-flow */}
          <div className="flex gap-4 sm:gap-5 overflow-hidden whitespace-nowrap py-1" style={{ willChange: 'transform' }}>
            <div 
              className="flex gap-4 sm:gap-5 shrink-0 items-center animate-marquee-left"
              style={{ transform: `translateX(${-(marqueeOffset - 200)}px)`, transition: 'transform 0.1s linear' }}
            >
              {row2Images.map((src, idx) => (
                <div 
                  key={`r2-${idx}`} 
                  className="w-[360px] sm:w-[420px] h-[230px] sm:h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#151515] border border-[#D7E2EA]/15 shadow-2xl hover:border-white/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                >
                  <img src={src} alt="Engineering showcase preview" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ==========================================
          3. ABOUT SECTION
          ========================================== */}
      <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
        
        {/* 4 Decorative 3D Corner Images */}
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none">
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" 
            alt="Moon 3D icon" 
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain animate-pulse" 
          />
        </FadeIn>

        <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none">
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" 
            alt="Object 3D icon" 
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain" 
          />
        </FadeIn>

        <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none">
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" 
            alt="Lego 3D icon" 
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain" 
          />
        </FadeIn>

        <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none">
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" 
            alt="Group 3D icon" 
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain" 
          />
        </FadeIn>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center z-20 gap-10 sm:gap-14 md:gap-16">
          
          <FadeIn delay={0} y={40}>
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
              About me
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={30}>
            <p className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)]">
              As a first-year B.Tech CSE-Data Science student at USICT Delhi, I specialize in modern frontend engineering, creative UI architecture, and intuitive design systems. Powered by React, TypeScript, Tailwind CSS, and Firebase cloud backends, I bring complex data science concepts to life through fluid animations, responsive layouts, and polished real-world digital experiences. Let&apos;s build something incredible together!
            </p>
          </FadeIn>

          <div className="pt-6">
            <FadeIn delay={0.3} y={20}>
              <ContactButton onClick={() => setContactModalOpen(true)} />
            </FadeIn>
          </div>

        </div>

      </section>


      {/* ==========================================
          4. SERVICES SECTION
          ========================================== */}
      <section id="services" className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20">
        <div className="max-w-5xl mx-auto">
          
          <FadeIn delay={0} y={40}>
            <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 text-[#0C0C0C] text-[clamp(3rem,12vw,160px)] tracking-tight">
              Services
            </h2>
          </FadeIn>

          <div className="flex flex-col">
            {[
              {
                num: "01",
                title: "Modern Frontend Engineering",
                desc: "Building high-performance, responsive web applications using React, TypeScript, and modern component hierarchies with buttery-smooth interactions."
              },
              {
                num: "02",
                title: "UI/UX & Creative Interaction",
                desc: "Crafting pixel-perfect design systems, fluid micro-interactions with Framer Motion, and aesthetic typography that leaves an unforgettable visual impression."
              },
              {
                num: "03",
                title: "Firebase & Cloud Backend",
                desc: "Integrating real-time Cloud Firestore, authentication pipelines, cloud storage, edge functions, and client API architectures for instant scaling."
              },
              {
                num: "04",
                title: "Data Science Dashboards",
                desc: "Transforming predictive algorithms and complex datasets into engaging visual analytics, interactive telemetry charts, and intuitive user dashboards."
              },
              {
                num: "05",
                title: "Web Performance & Edge Deployment",
                desc: "Optimizing client-side bundle performance, SEO score, cross-device responsiveness, and streamlined continuous deployments on Vercel."
              }
            ].map((service, index) => (
              <FadeIn key={service.num} delay={index * 0.1} y={30}>
                <div className="py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10">
                  <div className="font-black text-[#0C0C0C] text-[clamp(2.5rem,8vw,120px)] leading-none shrink-0">
                    {service.num}
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
                    <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1rem,2.2vw,2.1rem)]">
                      {service.title}
                    </h3>
                    <p className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/70 text-[clamp(0.85rem,1.6vw,1.25rem)]">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>


      {/* ==========================================
          5. PROJECTS SECTION
          ========================================== */}
      <section id="projects" className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-32 px-5 sm:px-8 md:px-10 relative z-30">
        <div className="max-w-6xl mx-auto">
          
          <FadeIn delay={0} y={40}>
            <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-24 text-[clamp(3rem,12vw,160px)] tracking-tight">
              Project
            </h2>
          </FadeIn>

          {/* Sticky Stacking Projects */}
          <div className="flex flex-col gap-12 sm:gap-16">
            {[
              {
                id: "01",
                title: "MediCycle",
                tagline: "HealthTech / Medicine Supply Network",
                description: "An innovative digital platform designed to optimize essential medicine distribution and eliminate expiration waste through domain-isolated stakeholder portals, hospital clinical commands, and verified pharmacy supplies.",
                link: "https://medicycle-phi.vercel.app/",
                mainPreview: "/projects/medicycle-browser-frame.png",
                mainBadge: "MediCycle — Unified Medicine Supply & Redistribution Network",
                techStack: ["React", "TypeScript", "Tailwind CSS", "Data Science", "Vercel"],
                tile1: {
                  tag: "DOMAIN 01 • DIRECT CARE",
                  title: "Patient & Verified Care Access",
                  desc: "Find trusted nearby medicine stock, compare generic prices, and manage verified refills.",
                  img: "/projects/medicycle-card-patient.png",
                  chips: ["Medicine Search", "Generic Price Match", "Verified Refills"],
                  stats: [
                    { label: "Salvage Rate", value: "94.2%" },
                    { label: "Dispatch SLA", value: "< 2 hrs" }
                  ]
                },
                tile2: {
                  tag: "DOMAIN 02 • CLINICAL COMMAND",
                  title: "Hospital Wards & Chemist Network",
                  desc: "Monitor ICU buffer stocks, route short-dated inventory before expiration, and manage peer transfers.",
                  img: "/projects/medicycle-card-hospital.png",
                  chips: ["ICU Buffers", "Zero Expiry Routing", "Peer Transfers"],
                  stats: [
                    { label: "Waste Reduction", value: "85%" },
                    { label: "Network Wards", value: "24/7 Active" }
                  ]
                }
              },
              {
                id: "02",
                title: "SafeRoute & DS Systems",
                tagline: "Data Science & Urban Safety",
                description: "An intelligent urban navigation and safety evaluation platform leveraging data science algorithms to compute optimal transit paths, live risk analytics, and real-time hazard alerts.",
                link: "https://safe-route-jade.vercel.app/",
                mainPreview: "/projects/saferoute-browser-frame.png",
                mainBadge: "SafeRoute — Never Walk Blind | AI & Data Science Navigation",
                techStack: ["Data Science", "Spatial Analytics", "React", "Mapbox", "Vercel"],
                tile1: {
                  tag: "CORE MODEL • RISK EVALUATION",
                  title: "Dynamic Safety Score: 82 / 100",
                  desc: "Real-time navigation computing safest paths using street illumination, crowd density, and historical safety data.",
                  img: "/projects/saferoute-shield.png",
                  chips: ["Lower Concern Rating", "Illumination Index", "Pedestrian Flow"],
                  stats: [
                    { label: "Safety Index", value: "82/100" },
                    { label: "Optimal Path", value: "Real-Time" }
                  ]
                },
                tile2: {
                  tag: "EMERGENCY • RAPID DISPATCH",
                  title: "Instant SOS & Hazard Analytics",
                  desc: "One-tap emergency beacon dispatching live coordinates, geo-fenced safety boundaries, and crime-density heatmaps.",
                  img: "/projects/saferoute-badge.png",
                  chips: ["Instant SOS Trigger", "Live GPS Dispatch", "Perimeter Alerts"],
                  stats: [
                    { label: "Response Latency", value: "< 500ms" },
                    { label: "Coverage", value: "Urban Grid" }
                  ]
                }
              }
            ].map((proj, index) => {
              const targetScale = 1 - (2 - 1 - index) * 0.03;
              return (
                <div 
                  key={proj.id} 
                  className="sticky top-24 md:top-32 h-[85vh] flex flex-col justify-center"
                  style={{ top: `${6 + index * 4}rem` }}
                >
                  <motion.div 
                    className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-10 h-full flex flex-col justify-between shadow-2xl overflow-hidden"
                    style={{ transform: `scale(${targetScale})`, transformOrigin: 'top center' }}
                  >
                    
                    {/* Top Info Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <div>
                        <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#BBCCD7]/60">
                          Project {proj.id} — {proj.tagline}
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[#D7E2EA] mt-1">
                          {proj.title}
                        </h3>
                      </div>
                      <LiveProjectButton 
                        href={proj.link} 
                        label="Live Vercel Preview" 
                      />
                    </div>

                    <p className="text-[#D7E2EA]/80 font-light text-sm sm:text-base md:text-lg max-w-3xl mb-3">
                      {proj.description}
                    </p>

                    {/* Preview Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 overflow-hidden min-h-[260px]">
                      
                      {/* Left Column: 2 Feature-Packed Domain/Model Cards (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col gap-3 h-full">
                        
                        {/* Tile 1 */}
                        <div className="flex-1 rounded-2xl bg-gradient-to-br from-[#16181F] to-[#0D0F14] border border-[#D7E2EA]/15 p-3.5 sm:p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-[#D7E2EA]/30 transition-all duration-300">
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <div>
                              <div className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-emerald-400 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                {proj.tile1.tag}
                              </div>
                              <h4 className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-wide text-[#D7E2EA] mt-0.5">
                                {proj.tile1.title}
                              </h4>
                            </div>
                            <div className="flex gap-1.5">
                              {proj.tile1.stats.map((s, idx) => (
                                <div key={idx} className="text-right bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                                  <div className="text-[8px] uppercase tracking-wider text-[#D7E2EA]/60">{s.label}</div>
                                  <div className="text-[11px] font-bold text-[#D7E2EA]">{s.value}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 my-1">
                            <div className="w-24 sm:w-28 h-14 sm:h-16 shrink-0 rounded-lg overflow-hidden bg-black/40 border border-white/10 p-1 flex items-center justify-center">
                              <img 
                                src={proj.tile1.img} 
                                alt={proj.tile1.title} 
                                className="w-full h-full object-contain rounded transition-transform duration-300 group-hover:scale-105" 
                              />
                            </div>
                            <p className="text-[11px] sm:text-xs text-[#D7E2EA]/75 font-light leading-relaxed line-clamp-2">
                              {proj.tile1.desc}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
                            {proj.tile1.chips.map((chip, idx) => (
                              <span key={idx} className="text-[9px] uppercase font-medium tracking-wide bg-white/5 border border-white/10 text-[#BBCCD7] px-2 py-0.5 rounded-full">
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tile 2 */}
                        <div className="flex-1 rounded-2xl bg-gradient-to-br from-[#16181F] to-[#0D0F14] border border-[#D7E2EA]/15 p-3.5 sm:p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-[#D7E2EA]/30 transition-all duration-300">
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <div>
                              <div className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-cyan-400 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                                {proj.tile2.tag}
                              </div>
                              <h4 className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-wide text-[#D7E2EA] mt-0.5">
                                {proj.tile2.title}
                              </h4>
                            </div>
                            <div className="flex gap-1.5">
                              {proj.tile2.stats.map((s, idx) => (
                                <div key={idx} className="text-right bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                                  <div className="text-[8px] uppercase tracking-wider text-[#D7E2EA]/60">{s.label}</div>
                                  <div className="text-[11px] font-bold text-[#D7E2EA]">{s.value}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 my-1">
                            <div className="w-24 sm:w-28 h-14 sm:h-16 shrink-0 rounded-lg overflow-hidden bg-black/40 border border-white/10 p-1 flex items-center justify-center">
                              <img 
                                src={proj.tile2.img} 
                                alt={proj.tile2.title} 
                                className="w-full h-full object-contain rounded transition-transform duration-300 group-hover:scale-105" 
                              />
                            </div>
                            <p className="text-[11px] sm:text-xs text-[#D7E2EA]/75 font-light leading-relaxed line-clamp-2">
                              {proj.tile2.desc}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
                            {proj.tile2.chips.map((chip, idx) => (
                              <span key={idx} className="text-[9px] uppercase font-medium tracking-wide bg-white/5 border border-white/10 text-[#BBCCD7] px-2 py-0.5 rounded-full">
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Right Column: Full Interactive Showcase (7 cols) */}
                      <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-[#0F1116] border border-[#D7E2EA]/15 h-full relative group flex flex-col justify-between shadow-2xl">
                        <div className="w-full flex-1 relative overflow-hidden flex items-center justify-center p-2 sm:p-3">
                          <img 
                            src={proj.mainPreview} 
                            alt={`${proj.title} main showcase`} 
                            className="w-full h-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.02]" 
                            loading="lazy" 
                          />
                        </div>

                        {/* Bottom Overlay Bar */}
                        <div className="p-3 bg-gradient-to-t from-black via-black/90 to-transparent border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-white/90">
                              {proj.mainBadge}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {proj.techStack.map((tech, idx) => (
                                <span key={idx} className="text-[8px] sm:text-[9px] uppercase tracking-wider bg-white/10 text-[#BBCCD7] px-2 py-0.5 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-full border border-white/20 transition-colors"
                          >
                            <span>Open App</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ==========================================
          FOOTER / CONTACT SECTION
          ========================================== */}
      <footer id="contact" className="bg-[#080808] border-t border-[#D7E2EA]/10 py-16 px-6 md:px-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          
          <h2 className="hero-heading font-black uppercase text-3xl sm:text-5xl md:text-6xl tracking-tight">
            Let&apos;s Build Together
          </h2>
          <p className="text-[#D7E2EA]/70 font-light max-w-lg text-sm sm:text-base">
            Whether you have a hackathon idea, an interactive web project, or a frontend engineering role, my inbox and phone are always open.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[#D7E2EA] font-medium text-sm sm:text-base">
            <a 
              href="mailto:kartikdabas26@gmail.com" 
              className="px-6 py-3 rounded-full border border-[#D7E2EA]/20 bg-[#141414] hover:bg-[#1E1E1E] transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#BBCCD7]" />
              <span>kartikdabas26@gmail.com</span>
            </a>
            <a 
              href="tel:+918780443405" 
              className="px-6 py-3 rounded-full border border-[#D7E2EA]/20 bg-[#141414] hover:bg-[#1E1E1E] transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#BBCCD7]" />
              <span>+91 8780443405</span>
            </a>
          </div>

          <div className="flex gap-6 items-center justify-center pt-2">
            <a 
              href="https://github.com/kartikdabas26-cell" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          <div className="pt-8 text-xs font-light text-[#D7E2EA]/40 uppercase tracking-widest">
            © {new Date().getFullYear()} Kartik Dabas. All rights reserved. USICT Delhi.
          </div>

        </div>
      </footer>


      {/* ==========================================
          CONTACT MODAL POPUP
          ========================================== */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setContactModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border-2 border-[#D7E2EA]/30 rounded-[30px] p-6 sm:p-10 w-full max-w-lg relative shadow-2xl"
            >
              <button
                onClick={() => setContactModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#1C1C1C] text-[#D7E2EA] hover:bg-[#2A2A2A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#D7E2EA] mb-2">
                Get In Touch
              </h3>
              <p className="text-[#D7E2EA]/70 text-sm mb-4">
                Reach out directly via email (<a href="mailto:kartikdabas26@gmail.com" className="text-white underline">kartikdabas26@gmail.com</a>) or phone (<a href="tel:+918780443405" className="text-white underline">+91 8780443405</a>), or drop a message below!
              </p>

              {formSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                  <CheckCircle2 className="w-16 h-16 text-green-400 animate-bounce" />
                  <h4 className="text-xl font-bold uppercase text-[#D7E2EA]">Message Sent Successfully!</h4>
                  <p className="text-sm text-[#D7E2EA]/70">Thank you for reaching out to Kartik.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/70 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/70 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/70 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#1A1A1A] border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors resize-none"
                      placeholder="Let's talk about your project..."
                    />
                  </div>

                  <div className="pt-2">
                    <ContactButton className="w-full py-4 text-center cursor-pointer">
                      Send Message
                    </ContactButton>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
