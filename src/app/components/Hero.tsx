"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { profile } from "@/data/profile";

const greetings = [
  "Hello",
  "नमस्ते",
  "你好",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 50, mass: 1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const bgX = useTransform(springX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY = useTransform(springY, [-0.5, 0.5], ["-2%", "2%"]);

  const imgX = useTransform(springX, [-0.5, 0.5], [15, -15]);
  const imgY = useTransform(springY, [-0.5, 0.5], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const cardRotate = useTransform(dragX, [-200, 200], [-15, 15]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  return (
    <motion.section 
      onMouseMove={handleMouseMove}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-[#080808]"
    >
      {/* Animated Subtle Background */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute inset-[-10%] z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px" 
          }} 
        />
      </motion.div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 lg:gap-32">
        
        {/* Left Side: Text Content */}
        <div className="flex-1 space-y-6 max-w-2xl">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A]/80 backdrop-blur-sm border border-white/10 text-xs font-medium text-green-400">
            Available
          </motion.div>

          <motion.div variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight flex flex-wrap items-center gap-x-4 sm:gap-x-5 py-4 z-20 relative">
            <div className="relative w-[130px] sm:w-[160px] md:w-[200px] h-[1.2em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="absolute left-0"
                >
                  {greetings[index]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span>I am {profile.monogram}riyanka 👋</span>
          </motion.div>

          <motion.p variants={itemVariants} className="text-[15px] md:text-[17px] leading-relaxed text-[#A8A8A3] max-w-lg">
            I am a {profile.role} focusing on Full Stack, AI, and Blockchain. Dedicated to building premium digital experiences from the first sketch to the final shipped product.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
            <a 
              href={profile.resumeFile} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="download-btn group"
            >
              <span>Download CV</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-y-0.5 transition-transform z-10">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </a>
            <a 
              href="#contact" 
              className="cssbuttons-io-button ml-2"
            >
              Let&apos;s connect
              <div className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Visual */}
        <motion.div variants={itemVariants} className="relative z-10 w-full md:w-auto flex justify-center md:block pt-24 md:pt-0">
          <motion.div 
            animate={{ y: [0, -6, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ x: imgX, y: imgY }}
            className="relative flex flex-col items-center"
          >
            {/* The whole draggable assembly */}
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.4}
              style={{ x: dragX, y: dragY, rotate: cardRotate, transformOrigin: "50% -100px" }}
              className="relative flex flex-col items-center z-30 cursor-grab active:cursor-grabbing"
            >
              {/* Lanyard/Wire */}
              <div className="lanyard-wire absolute bottom-full mb-[-4px] w-[2px] h-[50vh] bg-gradient-to-b from-white/0 via-white/20 to-white/50" />
              
              {/* Clip */}
              <div className="absolute -top-[14px] flex flex-col items-center z-20">
                {/* The "8" shape rings */}
                <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-white/50 -mb-[2px]" />
                <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-white/50 -mb-[1px]" />
                
                {/* The metal clasp */}
                <div className="w-4 h-5 rounded-sm bg-gradient-to-b from-[#999] to-[#555] shadow-sm flex items-center justify-center border border-white/20 clip-path-polygon">
                   <div className="w-1 h-2 rounded-full bg-black/20" />
                </div>
              </div>
              
              {/* Portrait Card */}
              <div className="w-56 h-72 sm:w-64 sm:h-80 bg-[#1A1A1A] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] flex flex-col relative pointer-events-none mt-2">
                {/* Orange Badge Header */}
                <div className="h-6 w-full bg-[#FF5C00] flex items-center justify-center shrink-0">
                  <div className="w-10 h-1 bg-black/20 rounded-full" />
                </div>
                <div className="flex-1 relative">
                  <Image 
                    src="/Image/priyanka.jpeg" 
                    alt={profile.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
