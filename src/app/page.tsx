"use client";

import Image from "next/image";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Calendar, Award, BookOpen, MapPin, Megaphone, Network, BrainCircuit, Orbit, Languages } from "lucide-react";
import { profile, projects, experience, skills, strengths, certifications, education } from "@/data/profile";
import Hero from "./components/Hero";

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [certIndex, setCertIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const [isLightMode, setIsLightMode] = useState(false);
  const [selectedCert, setSelectedCert] = useState<{
    title: string;
    subtitle?: string;
    issuer: string;
    date?: string;
    image: string;
    recipientName?: string;
    credentialId?: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Active Section Scroll Spy
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "experience", "contact"];
      let current = activeSection;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            current = section;
          }
        }
      }
      if (current !== activeSection) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);
  
  // Auto-play interval for Certifications Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCertIndex((prev) => (prev + 1) % certifications.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  
  // Scroll animation for Experience Timeline
  const expRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: expScrollY } = useScroll({
    target: expRef,
    offset: ["start center", "end center"]
  });
  const expLineHeight = useTransform(expScrollY, [0, 1], ["0%", "100%"]);

  // Helper for Framer Motion variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-500 ${isLightMode ? 'light-mode bg-[#F8F9FA] text-[#1A1A1A]' : 'bg-[#0A0A0A] text-[#F5F5F5]'}`}>
      {/* Background Dot Pattern */}
      <div className="fixed inset-0 z-0 bg-dot-pattern pointer-events-none opacity-60" />

      {/* --- FLOATING NAVBAR --- */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 pointer-events-none flex justify-center">
        <nav className="pointer-events-auto flex items-center justify-between w-full bg-[#111]/70 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:bg-[#151515]/80 hover:border-white/20 p-2 pl-8">
          
          <div className="flex items-center gap-6 md:gap-8 text-sm font-medium text-white/50">
            <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }} className={`transition-colors ${activeSection === 'about' ? 'text-orange-500 font-bold' : 'hover:text-white'}`}>About</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }} className={`transition-colors ${activeSection === 'projects' ? 'text-orange-500 font-bold' : 'hover:text-white'}`}>Works</a>
            <a href="#experience" onClick={(e) => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) }} className={`transition-colors ${activeSection === 'experience' ? 'text-orange-500 font-bold' : 'hover:text-white'}`}>Experience</a>
          </div>
          
          <div className="flex items-center gap-5">
            {/* 3D Switch */}
            <div className="hidden md:flex items-center">
              <label className="switch origin-right scale-[1.15] m-0">
                <input type="checkbox" className="cb" checked={isLightMode} onChange={(e) => setIsLightMode(e.target.checked)} />
                <div className="toggle">
                  <span className="left">off</span>
                  <span className="right">on</span>
                </div>
              </label>
            </div>
            
            {/* Hire Me Button */}
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="cssbuttons-io-button" style={{ fontSize: '15px' }}>
              Hire Me
              <div className="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content Wrapper */}
      <main id="about" className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12 pt-32">
        
        {/* --- HERO SECTION --- */}
        <Hero />
        
        <div className="w-full h-[1px] bg-white/[0.05]" />

        {/* --- ABOUT ME / WHAT I DO --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h3 className="text-[#FF5C00] font-medium text-lg italic tracking-wide">// About me</h3>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The person behind the pixels</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6">
            
            {/* Main Photo Card */}
            <div className="glass-panel relative overflow-hidden group min-h-[400px] lg:min-h-full rounded-[32px]">
              {/* Pagination indicators */}
              <div className="absolute top-6 right-6 z-20 flex gap-1.5">
                <div className="w-6 h-1 rounded-full bg-white/80" />
                <div className="w-2 h-1 rounded-full bg-white/30" />
                <div className="w-2 h-1 rounded-full bg-white/30" />
              </div>
              <Image 
                src="/Image/priyanka.jpeg" 
                alt="About Priyanka" 
                layout="fill" 
                objectFit="cover" 
                className="transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-6">
              {/* Top Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-auto sm:h-[240px]">
                
                {/* Vinyl Player Card */}
                <div className="glass-panel flex flex-col items-center justify-between p-6 rounded-[32px] overflow-hidden group min-h-[240px]">
                  {/* Vinyl Graphic */}
                  <div className="relative w-full h-32 mt-[-24px] flex justify-center">
                    {/* The Vinyl sticking out */}
                    <div className="absolute top-4 w-28 h-28 bg-[#0a0a0a] rounded-full z-0 group-hover:translate-y-4 transition-transform duration-500 shadow-xl border border-[#222] flex items-center justify-center">
                      {/* Vinyl grooves */}
                      <div className="w-24 h-24 rounded-full border border-[#222] flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border border-[#222]" />
                      </div>
                    </div>
                    {/* The Sleeve Cover */}
                    <div className="absolute -top-10 w-[140%] h-36 bg-gradient-to-b from-[#E85D04] to-[#DC2F02] rounded-b-[100%] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.6)] z-10 flex justify-center items-end pb-1 group-hover:-translate-y-2 transition-transform duration-500">
                       <div className="absolute bottom-[-16px] w-14 h-14 bg-black rounded-full border-[3px] border-[#333] flex items-center justify-center">
                         <div className="w-3 h-3 bg-white rounded-full shadow-inner" />
                       </div>
                    </div>
                  </div>
                  
                  {/* Music Info */}
                  <div className="flex flex-col items-center mt-auto w-full gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
                       <rect x="6" y="4" width="4" height="16" />
                       <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    <div className="text-center">
                      <p className="text-[11px] text-white/50">Tyler</p>
                      <p className="text-sm font-semibold">See you again</p>
                    </div>
                    <div className="flex items-center gap-2 w-full mt-1 text-[10px] text-white/40">
                      <span>1:21</span>
                      <div className="flex-1 h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-white" />
                      </div>
                      <span>3:01</span>
                    </div>
                  </div>
                </div>

                {/* Pocket / Journey Card */}
                <div className="glass-panel p-6 rounded-[32px] flex flex-col justify-end group min-h-[240px]">
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-[#111] rounded-xl border border-white/5 shadow-inner">
                    {/* Polaroids inside pocket */}
                    <div className="absolute top-[-10px] left-2 w-[40%] aspect-[3/4] bg-white rounded shadow-lg -rotate-12 flex p-1 group-hover:-translate-y-6 group-hover:-rotate-[20deg] transition-transform duration-500 origin-bottom-left">
                       <div className="w-full h-full bg-orange-400 border border-black/10 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-black opacity-50 rotate-90">CODE</span>
                       </div>
                    </div>
                    <div className="absolute top-[-15px] right-4 w-[45%] aspect-[4/3] bg-white rounded shadow-lg rotate-6 flex p-1 group-hover:-translate-y-8 group-hover:rotate-12 transition-transform duration-500 origin-bottom-right z-10">
                       <div className="w-full h-full bg-[#1A1A1A] border border-black/10 flex items-center justify-center">
                          <span className="text-2xl">👩‍💻</span>
                       </div>
                    </div>
                    {/* The front of the pocket */}
                    <div className="absolute bottom-0 w-full h-16 bg-[#1A1A1A] rounded-b-xl border-t border-white/10 shadow-[0_-10px_20px_rgba(0,0,0,0.7)] z-20 flex items-center p-2 gap-2">
                       {/* Little stickers on pocket */}
                       <div className="w-8 h-5 bg-red-500 -rotate-6 rounded-[2px] border border-white/20 text-[6px] font-bold flex items-center justify-center">REACT</div>
                       <div className="w-6 h-6 bg-blue-500 rotate-12 rounded-full border border-white/20 text-[6px] font-bold flex items-center justify-center">AI</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto w-full z-30">
                    <h3 className="text-lg font-bold">My Journey</h3>
                    <span className="px-2 py-1 rounded bg-[#222] text-[10px] text-white/50 border border-white/5">76 milestones</span>
                  </div>
                </div>
                
              </div>
              
              {/* Note Card */}
              <div className="glass-panel p-6 rounded-[32px] h-[220px] flex flex-col items-center justify-center relative overflow-hidden group">
                 {/* Draggable Post-it note */}
                 <motion.div 
                   drag
                   dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                   dragElastic={0.2}
                   whileHover={{ scale: 1.05 }}
                   whileDrag={{ scale: 1.1, rotate: 0 }}
                   initial={{ rotate: -2 }}
                   className="absolute top-6 bg-[#FFE373] w-32 h-32 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6)] transform -rotate-2 flex flex-col items-center p-3 cursor-grab active:cursor-grabbing z-20"
                   style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                 >
                   {/* Tape / Pin */}
                   <div className="w-10 h-3 bg-white/40 -mt-5 mb-2 rotate-2 backdrop-blur-sm shadow-sm" />
                   <p className="text-black text-center text-sm font-semibold leading-snug mt-2">
                     Grab it and get<br/>surprise
                   </p>
                 </motion.div>
                 
                 <div className="mt-auto z-10 transition-opacity">
                   <p className="text-lg md:text-xl font-medium tracking-tight">I have a surprise for you 🫢</p>
                 </div>
              </div>

            </div>
          </div>
        </motion.section>

        <div className="w-full h-[1px] bg-white/[0.05]" />

        {/* --- MY PROJECTS --- */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h3 className="text-[#FF5C00] font-medium text-lg italic tracking-wide">// My Projects</h3>
            <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${isLightMode ? 'text-[#111111]' : 'text-white'}`}>These are ones that taught me the most</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => {
              const isFullWidth = idx === 0;
              const bgGradients = [
                "from-[#FFDAB9]/80 to-[#F4A460]/80", // Peach
                "from-[#EAE0D5]/80 to-[#C6AC8F]/80", // Beige
                "from-[#FFF5E1]/80 to-[#FFDAB9]/80", // Light warm
              ];
              const bgGradient = bgGradients[idx % bgGradients.length];

              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -4 }}
                  className={`glass-panel p-0 group cursor-pointer flex flex-col overflow-hidden transition-all duration-300 ${
                    isLightMode 
                      ? 'bg-white border-black/10 shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)]' 
                      : 'bg-[#0F0F0F] border-white/5 hover:border-white/15'
                  } ${isFullWidth ? 'md:col-span-2 md:flex-row' : ''}`}
                >
                  {/* TEXT CONTENT */}
                  <div className={`p-8 md:p-10 flex flex-col justify-between ${isFullWidth ? 'md:w-[45%]' : 'w-full order-2'}`}>
                    <div className="space-y-5">
                      <h3 className={`text-2xl md:text-3xl font-bold tracking-tight leading-snug ${isLightMode ? 'text-[#111111]' : 'text-white'}`}>
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 2).map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className={`px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                              isLightMode 
                                ? 'bg-[#F1F3F5] text-black/80 border border-black/10' 
                                : 'bg-[#222] text-white/70 border border-white/5'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className={`text-sm leading-relaxed ${isLightMode ? 'text-[#4A4A4A] font-medium' : 'text-white/50'}`}>
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center font-bold shadow-sm text-xs border border-white/10 shrink-0">
                          <span className="text-white text-xs font-bold leading-none select-none" style={{ color: "#FFFFFF" }}>
                            {profile.monogram}
                          </span>
                        </div>
                        <div>
                          <p className={`text-xs font-bold ${isLightMode ? 'text-[#111111]' : 'text-white'}`}>
                            {profile.shortName}
                          </p>
                          <p className={`text-[10px] ${isLightMode ? 'text-black/50 font-medium' : 'text-white/40'}`}>
                            Engineer
                          </p>
                        </div>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                        isLightMode 
                          ? 'bg-[#F1F3F5] border border-black/10 text-[#111111] group-hover:bg-[#FF5C00] group-hover:border-[#FF5C00] group-hover:text-white' 
                          : 'bg-[#1A1A1A] border border-white/10 text-white group-hover:bg-[#FF5C00] group-hover:border-[#FF5C00]'
                      }`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-colors currentColor">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* VISUAL / LAPTOP MOCKUP */}
                  <div className={`${isFullWidth ? 'md:w-[55%]' : 'w-full order-1'} bg-gradient-to-br ${bgGradient} p-8 flex items-center justify-center relative overflow-hidden min-h-[250px] md:min-h-[350px]`}>
                     {/* The Laptop */}
                     <div className="w-[85%] max-w-[320px] aspect-[16/10] bg-black rounded-t-xl border-4 border-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative flex flex-col group-hover:-translate-y-3 transition-transform duration-500">
                       {/* Screen contents */}
                       <div className="flex-1 bg-white rounded-t-lg overflow-hidden flex flex-col relative">
                          {/* Mock UI Header */}
                          <div className="h-4 bg-gray-50 border-b flex items-center px-2 gap-1.5 shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          </div>
                          {/* Mock UI Body */}
                          <div className="flex-1 p-3 flex gap-3">
                             <div className="w-1/3 h-full bg-gray-100 rounded-md border border-gray-200 flex flex-col gap-2 p-2">
                                <div className="w-full h-2 bg-gray-200 rounded-full" />
                                <div className="w-3/4 h-2 bg-gray-200 rounded-full" />
                                <div className="w-full h-12 bg-gray-200 rounded-sm mt-auto" />
                             </div>
                             <div className="w-2/3 h-full flex flex-col gap-2">
                                <div className="flex gap-2 h-1/3">
                                  <div className="flex-1 bg-orange-100 rounded-md border border-orange-200" />
                                  <div className="flex-1 bg-blue-100 rounded-md border border-blue-200" />
                                </div>
                                <div className="flex-1 bg-gray-100 rounded-md border border-gray-200 relative overflow-hidden flex items-center justify-center">
                                   {/* Abstract chart/circle */}
                                   <div className="w-10 h-10 rounded-full border-4 border-orange-400 border-r-transparent rotate-45" />
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* Laptop base */}
                       <div className="absolute top-full left-[-5%] w-[110%] h-3 bg-gradient-to-b from-[#444] to-[#111] rounded-b-xl shadow-2xl flex justify-center z-20">
                          <div className="w-1/4 h-1 bg-black/50 rounded-b-md" />
                       </div>
                     </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <div className="w-full h-[1px] bg-white/[0.05]" />

        {/* --- STACKS & EXPERIENCE --- */}
        <motion.section
          id="experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-12"
        >
          <div className="space-y-2">
            <h3 className="text-[#FF5C00] font-medium text-lg italic tracking-wide">// Stacks & Experience</h3>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Where I am good and where I learned from</h2>
          </div>

          {/* Stacks Card */}
          <div className="glass-panel p-6 md:p-8 bg-[#0C0C0C] rounded-[32px] border border-white/5 overflow-hidden">
            {/* Github style activity graph */}
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white/10 shrink-0">
                   <Image src="/Image/priyanka.jpeg" alt="Priyanka" layout="fill" objectFit="cover" />
                 </div>
                 <div className="flex flex-col gap-0.5">
                   <span className="font-bold text-white text-sm">@palacholla</span>
                   <span className="text-white/40 text-xs">775 contributions in the template timeline</span>
                 </div>
               </div>
               
               <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
                 <div className="min-w-[700px] grid grid-rows-7 grid-flow-col gap-[3px] opacity-90">
                  {Array.from({ length: 301 }).map((_, i) => {
                    const rand = Math.random();
                    let color = 'bg-[#161B22]'; // Empty
                    if (rand > 0.85) color = 'bg-[#39D353]'; // Highest
                    else if (rand > 0.7) color = 'bg-[#26A641]'; // High
                    else if (rand > 0.55) color = 'bg-[#006D32]'; // Medium
                    else if (rand > 0.4) color = 'bg-[#0E4429]'; // Low
                    
                    return (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (i % 43) * 0.01 }}
                        className={`w-3.5 h-3.5 rounded-sm ${color}`}
                      />
                    );
                  })}
                 </div>
               </div>
            </div>
            
            {/* Divider */}
            <div className="w-full h-[1px] bg-white/5 my-6" />

            {/* Skills Icons Marquee */}
            <div 
              className="relative w-full overflow-hidden flex flex-col gap-4" 
              style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
            >
              {/* Top Row - Sliding Left */}
              <motion.div 
                className="flex gap-4 min-w-max"
                animate={{ x: ["0%", "-25%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              >
                {/* Render 4 identical blocks to guarantee it spans wide screens without empty gaps */}
                {[...Array(4)].map((_, blockIdx) => (
                  <div key={blockIdx} className="flex gap-4 shrink-0 px-2">
                    {[
                      { text: 'C' }, 
                      { text: 'C++' }, 
                      { text: 'Java' }, 
                      { text: 'Python' }, 
                      { text: 'JS' }, 
                      { text: 'HTML5' }, 
                      { text: 'CSS' }, 
                      { text: 'React JS' }
                    ].map((skill, j) => (
                       <div key={j} className="h-14 md:h-16 px-6 md:px-8 rounded-[16px] bg-[#161616] border border-white/5 flex items-center justify-center hover:bg-[#222] hover:border-white/10 transition-colors shadow-inner cursor-pointer group">
                          <span className="text-white/40 text-sm md:text-base font-bold font-mono group-hover:text-white/80 transition-colors whitespace-nowrap">{skill.text}</span>
                       </div>
                    ))}
                  </div>
                ))}
              </motion.div>

              {/* Bottom Row - Sliding Right */}
              <motion.div 
                className="flex gap-4 min-w-max"
                animate={{ x: ["-25%", "0%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              >
                {[...Array(4)].map((_, blockIdx) => (
                  <div key={blockIdx} className="flex gap-4 shrink-0 px-2">
                    {[
                      { text: 'Blockchain' }, 
                      { text: 'Hedera' }, 
                      { text: 'Generative AI' }, 
                      { text: 'DSA (C)' }, 
                      { text: 'DSA (Python)' }, 
                      { text: 'Networks' }
                    ].map((skill, j) => (
                       <div key={j} className="h-14 md:h-16 px-6 md:px-8 rounded-[16px] bg-[#161616] border border-white/5 flex items-center justify-center hover:bg-[#222] hover:border-white/10 transition-colors shadow-inner cursor-pointer group">
                          <span className="text-white/40 text-sm md:text-base font-bold font-mono group-hover:text-white/80 transition-colors whitespace-nowrap">{skill.text}</span>
                       </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll Timeline */}
          <div className="relative pt-12 md:pl-8 max-w-4xl" ref={expRef}>
             {/* Background Line */}
             <div className="absolute left-[31px] top-12 bottom-0 w-[2px] bg-white/5 hidden md:block" />
             {/* Animated Line */}
             <motion.div 
               style={{ height: expLineHeight }} 
               className="absolute left-[31px] top-12 w-[2px] bg-gradient-to-b from-[#FF5C00] to-[#FF8C00] hidden md:block origin-top rounded-full shadow-[0_0_10px_#FF5C00]" 
             />

             <div className="space-y-24">
               {[...education].reverse().map((edu, idx) => {
                 return (
                   <motion.div 
                     key={`edu-${idx}`} 
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-10%" }}
                     transition={{ duration: 0.6, ease: "easeOut" }}
                     className="relative flex gap-8 md:gap-20 group"
                   >
                      {/* Number on left */}
                      <div className="hidden md:flex flex-col items-center w-16 shrink-0 relative z-10 pt-4 bg-[#0A0A0A]">
                         <span className="text-white/20 font-mono text-[15px] italic group-hover:text-white/60 transition-colors bg-[#0A0A0A] py-2">0{idx + 1}</span>
                      </div>

                      {/* Content on right */}
                      <div className="flex-1 relative pb-4">
                         {/* School Header */}
                         <div className="flex items-center gap-4">
                           <div className="w-16 h-16 rounded-[20px] bg-[#111] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform relative">
                             <span className="text-2xl font-bold text-white/80">{edu.institution.charAt(0)}</span>
                           </div>
                           <div className="flex flex-col justify-center">
                             <p className="text-sm font-medium text-white/40 mb-0.5">{edu.institution}</p>
                             <h4 className="text-[22px] font-bold tracking-tight text-white">{edu.degree}</h4>
                           </div>
                         </div>

                         {/* Badges Row */}
                         <div className="flex flex-col gap-3 mt-6">
                           <div className="flex items-center gap-2 text-[15px] font-medium">
                             <Calendar className="w-4 h-4 text-white/50" />
                             <span className="text-white/80">{edu.period}</span>
                           </div>
                           <div className="flex flex-wrap items-center gap-2">
                             <BookOpen className="w-4 h-4 text-blue-400 mr-1" />
                             <div className="px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-xs text-white/60 font-medium">Education</div>
                             <div className="px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-xs text-white/60 font-medium">{edu.location}</div>
                           </div>
                         </div>

                         {/* Description */}
                         {edu.note && (
                           <div className="mt-6 max-w-2xl">
                             <div className="flex items-start gap-3">
                               <MapPin className="w-4 h-4 mt-1 text-blue-500 shrink-0" />
                               <div>
                                 <p className="text-[15px] font-bold text-white/90">{edu.note}</p>
                               </div>
                             </div>
                           </div>
                         )}
                      </div>
                   </motion.div>
                 );
               })}

               {experience.map((exp, idx) => {
                 const overallIdx = education.length + idx;
                 return (
                 <motion.div 
                   key={`exp-${idx}`} 
                   initial={{ opacity: 0, y: 40 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-10%" }}
                   transition={{ duration: 0.6, ease: "easeOut" }}
                   className="relative flex gap-8 md:gap-20 group"
                 >
                    {/* Number on left */}
                    <div className="hidden md:flex flex-col items-center w-16 shrink-0 relative z-10 pt-4 bg-[#0A0A0A]">
                       <span className="text-white/20 font-mono text-[15px] italic group-hover:text-white/60 transition-colors bg-[#0A0A0A] py-2">0{overallIdx + 1}</span>
                    </div>

                    {/* Content on right */}
                    <div className="flex-1 relative pb-4">
                       {/* Company Header */}
                       <div className="flex items-center gap-4">
                         <div className="w-16 h-16 rounded-[20px] bg-[#111] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform relative">
                           <span className="text-2xl font-bold text-white/80">{exp.organization.charAt(0)}</span>
                         </div>
                         <div className="flex flex-col justify-center">
                           <p className="text-sm font-medium text-white/40 mb-0.5">{exp.organization}</p>
                           <h4 className="text-[22px] font-bold tracking-tight text-white">{exp.title}</h4>
                         </div>
                       </div>

                       {/* Badges Row */}
                       <div className="flex flex-col gap-3 mt-6">
                         <div className="flex items-center gap-2 text-[15px] font-medium">
                           <Calendar className="w-4 h-4 text-white/50" />
                           <span className="text-white/80">
                             {exp.period.split("–").map((part, i) => 
                               part.trim().toLowerCase() === "ongoing" 
                               ? <span key={i} className="text-green-500"> — Present</span> 
                               : <span key={i}>{i > 0 ? " — " : ""}{part.trim()}</span>
                             )}
                           </span>
                         </div>
                         <div className="flex flex-wrap items-center gap-2">
                           <Award className="w-4 h-4 text-orange-400 mr-1" />
                           {idx === 0 ? (
                             <>
                               <div className="px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-xs text-white/60 font-medium">Python</div>
                               <div className="px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-xs text-white/60 font-medium">Software Engineering</div>
                             </>
                           ) : (
                             <>
                               <div className="px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-xs text-white/60 font-medium">Java</div>
                               <div className="px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-xs text-white/60 font-medium">Full Stack</div>
                             </>
                           )}
                         </div>
                       </div>

                       {/* Description */}
                       <div className="mt-6 max-w-2xl">
                         <div className="flex items-start gap-3">
                           <Megaphone className="w-4 h-4 mt-1 text-orange-500 shrink-0" />
                           <div>
                             <p className="text-[15px] font-bold text-white/90 mb-2">Built and expanded practical technical skills</p>
                             <p className="text-[15px] text-white/50 leading-relaxed">
                               {exp.responsibilities.join(" ")}
                             </p>
                           </div>
                         </div>
                       </div>


                    </div>
                 </motion.div>
               );
             })}
             </div>
          </div>
        </motion.section>

        <div className="w-full h-[1px] bg-white/[0.05]" />



        {/* --- WORKING AREAS --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h3 className="text-[#FF5C00] font-medium text-lg italic tracking-wide">// Working Areas</h3>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">I can help you with these things</h2>
          </div>

          <div className="glass-panel divide-y divide-white/5 bg-[#0A0A0A] rounded-[32px] overflow-hidden border border-white/5">
            {[
              {
                title: "Programming Languages",
                items: ["C", "C++", "Java", "Python", "JavaScript"]
              },
              {
                title: "Web Technologies",
                items: ["HTML", "HTML5", "CSS", "React JS"]
              },
              {
                title: "Data Structures",
                items: ["Data Structures in C", "Data Structures in Python"]
              },
              {
                title: "Other Technologies",
                items: ["Blockchain Development", "Hedera Hashgraph", "Generative AI", "Computer Networks"]
              }
            ].map((area, idx) => (
              <div key={idx} className="overflow-hidden group">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                  className="w-full px-8 py-7 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className={`text-xl font-bold transition-colors ${activeAccordion === idx ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>{area.title}</span>
                  <motion.div
                    animate={{ rotate: activeAccordion === idx ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${activeAccordion === idx ? 'bg-orange-500 border-orange-500 text-black' : 'bg-[#111] border-white/10 text-white/50 group-hover:border-white/20'}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeAccordion === idx ? "auto" : 0, opacity: activeAccordion === idx ? 1 : 0 }}
                  className="px-8 overflow-hidden"
                >
                  <div className="pb-8 pt-2 flex flex-wrap gap-2 max-w-3xl">
                    {area.items.map((item, i) => (
                      <span key={i} className="px-4 py-2 rounded-full bg-[#1A1A1A] border border-white/5 text-[14px] font-medium text-white/70 hover:bg-[#222] transition-colors cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="w-full h-[1px] bg-white/[0.05]" />

        {/* --- CERTIFICATIONS --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-8 overflow-hidden py-12"
        >
          <div className="space-y-2">
            <h3 className="text-[#FF5C00] font-medium text-lg italic tracking-wide">// Certifications</h3>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">My Continuous Learning & Achievements</h2>
          </div>

          <div className="relative w-full h-[550px] flex items-center justify-center mt-12 perspective-[1000px]">
            {certifications.map((cert, idx) => {
              const total = certifications.length;
              let diff = idx - certIndex;
              if (diff > Math.floor(total / 2)) diff -= total;
              else if (diff < -Math.floor(total / 2)) diff += total;

              const isCenter = diff === 0;
              const isVisible = Math.abs(diff) <= 2; // Show 2 on each side if screen is wide enough

              return (
                <motion.div
                  key={idx}
                  className="absolute w-full max-w-lg cursor-pointer"
                  onClick={() => setCertIndex(idx)}
                  animate={{
                    x: diff * 280, // Horizontal spread
                    scale: isCenter ? 1 : 0.8,
                    opacity: isVisible ? (isCenter ? 1 : 0.4) : 0,
                    zIndex: isCenter ? 20 : 10 - Math.abs(diff),
                    rotateY: diff * -15 // Creates the 3D coverflow angle
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
                >
                  <div className={`glass-panel p-6 flex flex-col bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-3xl transition-shadow ${isCenter ? 'shadow-[0_0_60px_rgba(0,0,0,0.9)] border-white/10' : 'border-white/5'}`}>
                    {/* 16:9 Aspect Ratio Certificate Image Container (YouTube Thumbnail Style) */}
                    <div 
                      onClick={(e) => {
                        if (isCenter) {
                          e.stopPropagation();
                          setSelectedCert({
                            title: cert.title,
                            subtitle: "subtitle" in cert ? (cert.subtitle as string) : undefined,
                            issuer: cert.issuer,
                            date: cert.date,
                            image: cert.image,
                            recipientName: cert.recipientName,
                            credentialId: "credentialId" in cert ? (cert.credentialId as string) : undefined
                          });
                        }
                      }}
                      className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 mb-6 relative bg-[#0c0c0c] group/thumb"
                    >
                      {/* Ambient blur backdrop to fill 16:9 canvas cleanly */}
                      <Image 
                        src={cert.image} 
                        alt={cert.title} 
                        fill 
                        className="object-cover blur-md scale-110 opacity-30 pointer-events-none transition-opacity duration-300 group-hover/thumb:opacity-45" 
                      />
                      {/* Centered crisp full certificate maintaining original details */}
                      <Image 
                        src={cert.image} 
                        alt={cert.title} 
                        fill 
                        className="object-contain p-2 relative z-10 transition-transform duration-300 group-hover/thumb:scale-[1.02]" 
                      />
                      {/* Recipient tag */}
                      <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/90 flex items-center gap-1">
                        <Award className="w-3 h-3 text-orange-400" />
                        <span>{cert.recipientName || "Priyanka Durga Palacholla"}</span>
                      </div>
                      {/* 16:9 Badge */}
                      <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/60">
                        16:9
                      </div>
                      {/* Click prompt overlay for center item */}
                      {isCenter && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 backdrop-blur-[1px]">
                          <span className="px-3 py-1.5 rounded-full bg-orange-500 text-black text-xs font-bold shadow-lg flex items-center gap-1.5">
                            Inspect Certificate
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3 text-center">
                      <h3 className="text-xl font-bold text-white leading-tight">{cert.title}</h3>
                      {"subtitle" in cert && cert.subtitle && (
                        <p className="text-white/60 text-xs font-medium">{cert.subtitle}</p>
                      )}
                      <p className="text-orange-500 font-medium text-sm">{cert.issuer}</p>
                      <p className="text-white/40 text-xs font-mono bg-[#1A1A1A] px-3 py-1.5 rounded-full inline-block mt-2">
                        {cert.date || "Completed"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 z-30">
              <button 
                onClick={() => setCertIndex((prev) => (prev - 1 + certifications.length) % certifications.length)}
                aria-label="Previous Certificate"
                className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white/70 hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-colors shadow-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 z-30">
              <button 
                onClick={() => setCertIndex((prev) => (prev + 1) % certifications.length)}
                aria-label="Next Certificate"
                className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white/70 hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-colors shadow-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {certifications.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCertIndex(idx)}
                aria-label={`Go to certificate ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  certIndex === idx ? "w-8 bg-orange-500" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </motion.section>

        <div className="w-full h-[1px] bg-white/[0.05]" />

        {/* --- STRENGTHS --- */}
        <motion.section
          id="strengths"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-12"
        >
          <div className="space-y-2">
            <h3 className="text-[#FF5C00] font-medium text-lg italic tracking-wide">// Strengths</h3>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">What sets me apart</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[450px]">
            {strengths.map((strength, idx) => {
              const iconMap: Record<string, React.ReactNode> = {
                users: <Network size={26} strokeWidth={1.5} className="text-white group-hover:text-black transition-colors" />,
                zap: <BrainCircuit size={26} strokeWidth={1.5} className="text-white group-hover:text-black transition-colors" />,
                rocket: <Orbit size={26} strokeWidth={1.5} className="text-white group-hover:text-black transition-colors" />,
                globe: <Languages size={26} strokeWidth={1.5} className="text-white group-hover:text-black transition-colors" />,
              };

              return (
                <div 
                  key={idx}
                  className="relative group flex-1 md:hover:flex-[2.5] bg-[#0F0F0F] rounded-[32px] border border-white/5 flex flex-col justify-between p-6 md:p-8 cursor-pointer overflow-hidden transition-all duration-500 min-h-[200px]"
                >
                  {/* Glowing background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/10 group-hover:to-transparent transition-colors duration-500 z-0" />
                  
                  {/* Floating Icon */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-white/10 group-hover:bg-orange-500 group-hover:border-orange-400 group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] md:absolute md:top-8 md:left-1/2 md:-translate-x-1/2 md:group-hover:relative md:group-hover:translate-x-0 md:group-hover:left-0 md:group-hover:top-0">
                    {iconMap[strength.icon || 'zap']}
                  </div>
                  
                  {/* Content Container */}
                  <div className="relative z-10 mt-auto pt-8">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2 whitespace-nowrap md:text-xl md:-rotate-90 md:origin-bottom-left md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:group-hover:rotate-0 md:group-hover:relative md:group-hover:translate-x-0 md:group-hover:left-0 md:group-hover:bottom-0 transition-all duration-500 group-hover:text-orange-400">
                      {strength.title}
                    </h3>
                    
                    {/* Description - Hidden by default on desktop, shown on hover */}
                    <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-all duration-500">
                      <p className="overflow-hidden text-white/50 text-sm leading-relaxed font-medium md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {strength.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.section>
      </main>

      {/* --- RESEND-STYLE FOOTER --- */}
      <footer id="contact" className="relative z-10 bg-[#000] pt-24 pb-16 overflow-hidden border-t border-white/[0.05]">
        
        {/* Giant Faded Text */}
        <div className="w-full flex justify-center overflow-hidden pointer-events-none select-none relative -mb-16">
          <h1 className="text-[20vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent leading-none">
            PRIYANKA
          </h1>
          {/* Gradient mask to fade it into the background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-8">
            
            {/* Left Column: Location, Status, Socials */}
            <div className="lg:col-span-2 space-y-8">
              <div className="text-white/50 text-sm leading-relaxed font-medium">
                {profile.location.split(',').map((l, i) => <div key={i}>{l.trim()}</div>)}
              </div>
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/5">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-xs text-white/70 font-medium tracking-wide">Available for work</span>
              </div>

              <div className="flex gap-4 pt-2">
                <a href="https://github.com/palacholla" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href={`mailto:${profile.email}`} className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              </div>
            </div>

            {/* Right Columns: Links */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-8">
              
              {/* Column 1: Portfolio */}
              <div className="space-y-4">
                <h4 className="text-white font-medium text-sm mb-6">Portfolio</h4>
                <a href="#about" className="block text-white/50 hover:text-white transition-colors text-sm">About</a>
                <a href="#experience" className="block text-white/50 hover:text-white transition-colors text-sm">Experience</a>
                <a href="#projects" className="block text-white/50 hover:text-white transition-colors text-sm">Projects</a>
                <a href={profile.resumeFile} target="_blank" className="block text-white/50 hover:text-white transition-colors text-sm">Resume</a>
              </div>

              {/* Column 2: Connect */}
              <div className="space-y-4">
                <h4 className="text-white font-medium text-sm mb-6">Connect</h4>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="block text-white/50 hover:text-white transition-colors text-sm">LinkedIn</a>
                <a href="https://github.com/palacholla" target="_blank" rel="noopener noreferrer" className="block text-white/50 hover:text-white transition-colors text-sm">GitHub</a>
                <a href={`mailto:${profile.email}`} className="block text-white/50 hover:text-white transition-colors text-sm">Email</a>
              </div>

              {/* Column 3: Credits */}
              <div className="space-y-4">
                <h4 className="text-white font-medium text-sm mb-6">Credits</h4>
                <div className="text-sm text-white/50 leading-relaxed">
                  Designed & Developed by
                  <br />
                  <a href="https://welwaat.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500 transition-colors mt-2 inline-block font-medium">
                    WELWAAT Software
                  </a>
                  <br />
                  <span className="inline-flex items-center gap-2 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    <span className="text-white/40 text-xs font-normal">Open for new projects</span>
                  </span>
                </div>
                <div className="text-xs text-white/30 pt-6">
                  © {new Date().getFullYear()} {profile.name}
                </div>
              </div>

            </div>
          </div>
        </div>
      </footer>

      {/* --- CERTIFICATE LIGHTBOX MODAL --- */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#111] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Title and Close Button */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-orange-400">
                  Verified Credential • {selectedCert.recipientName || "Priyanka Durga Palacholla"}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
                  {selectedCert.title}
                </h3>
                {selectedCert.subtitle && (
                  <p className="text-sm text-white/60">{selectedCert.subtitle}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-colors shrink-0"
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* 16:9 Aspect Ratio Main Certificate Display */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
              <Image
                src={selectedCert.image}
                alt={selectedCert.title}
                fill
                className="object-cover blur-2xl scale-125 opacity-25 pointer-events-none"
              />
              <Image
                src={selectedCert.image}
                alt={selectedCert.title}
                fill
                className="object-contain p-3 relative z-10"
                priority
              />
            </div>

            {/* Details Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10 text-xs text-white/60 font-mono">
              <div className="flex flex-wrap items-center gap-4">
                <span>Issuer: <strong className="text-white font-sans">{selectedCert.issuer}</strong></span>
                {selectedCert.date && <span>Date: <strong className="text-white font-sans">{selectedCert.date}</strong></span>}
                {selectedCert.credentialId && (
                  <span>ID: <strong className="text-orange-400 font-mono">{selectedCert.credentialId}</strong></span>
                )}
              </div>
              <a
                href={selectedCert.image}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans font-medium transition-colors flex items-center gap-1.5"
              >
                Open Full Image
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
