// app/page.tsx
'use client';

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Link from 'next/link';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect, useRef } from 'react';
import useTypewriter from '@/app/hooks/useTypewriter';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Magnetic } from '@/app/components/motion';
import { TextShimmer } from '@/app/components/effects';
import { ScrollReveal, Counter } from '@/app/components/gsap-animations';
import dynamic from 'next/dynamic';

// Static import for 3D badge - critical hero element
import DynamicID from "@/app/components/id";

const FloatingAstronaut = dynamic(() => import('@/app/components/astronaut'), {
    ssr: false,
    loading: () => <div className="w-[420px] h-[420px]" />,
});

const CategorizedIconsDisplay = dynamic(() => import('@/app/components/categories'), {
    ssr: false,
    loading: () => <div className="min-h-[400px]" />,
});

const Carousel = dynamic(() => import('@/app/components/carousel'), {
    ssr: false,
    loading: () => <div className="min-h-[500px]" />,
});

// Lazy load analytics
const Analytics = dynamic(
    () => import("@vercel/analytics/next").then((mod) => mod.Analytics),
    { ssr: false }
);

const SpeedInsights = dynamic(
    () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
    { ssr: false }
);

export default function Home() {
    const [showConnectDesktopDropdown, setShowConnectDesktopDropdown] = useState(false);
    const connectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const wordsToAnimate = ["Full Stack Developer", "Software Engineer", "Web Developer"];
    const introGreeting = React.useMemo(() => ["Hi, I'm Theo"], []);

    const [isCertificationsModalOpen, setIsCertificationsModalOpen] = useState(false);

    // Mouse enter handler for the *parent container* of the button and dropdown
    const handleMouseEnterConnect = () => {
        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
            if (connectTimeoutRef.current) clearTimeout(connectTimeoutRef.current);
            setShowConnectDesktopDropdown(true);
        }
    };

    // Mouse leave handler for the *parent container* of the button and dropdown
    const handleMouseLeaveConnect = () => {
        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
            connectTimeoutRef.current = setTimeout(() => setShowConnectDesktopDropdown(false), 200);
        }
    };

    const handleOpenCertificationsModal = () => {
        setIsCertificationsModalOpen(true);
    };

    const handleCloseCertificationsModal = () => {
        setIsCertificationsModalOpen(false);
    };

    const [startAnimatedText, setStartAnimatedText] = useState(false);
    const [isCarouselModalOpen, setIsCarouselModalOpen] = useState(false);

    const animatedIntroText = useTypewriter(introGreeting, 100, 50, 0, 0, false, () => {
        setStartAnimatedText(true);
    });

    const animatedText = useTypewriter(startAnimatedText ? wordsToAnimate : [], 100, 50, 1500, 700, true);
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        if (animatedIntroText === introGreeting[0]) {
            const timer = setTimeout(() => {
                setShowArrow(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [animatedIntroText, introGreeting]);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;

        if (isCarouselModalOpen || isCertificationsModalOpen) {
            document.body.style.overflow = 'hidden';
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
        } else {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [isCarouselModalOpen, isCertificationsModalOpen]);

    const handleOpenCarouselModal = () => {
        setIsCarouselModalOpen(true);
    };

    const handleCloseCarouselModal = () => {
        setIsCarouselModalOpen(false);
    };

    return (
        <div className={`relative flex flex-col min-h-screen overflow-x-hidden ${isCarouselModalOpen || isCertificationsModalOpen ? 'overflow-hidden' : ''}`}>
            <Analytics />
            <SpeedInsights />

            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto hidden md:block">
                <DynamicID />
            </div>

            <div className="relative z-10 flex flex-col px-[5%] sm:px-[10%] min-h-screen pointer-events-none">
                <Header />

                {/* Hero Section */}
                <div className="flex flex-col min-h-screen pb-20 sm:pb-0 relative overflow-hidden justify-center" id="hero">
                    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
                        {/* Left content - Text */}
                        <div className="flex flex-col text-center md:text-left md:w-[60%] lg:w-[55%] z-10">
                            {/* Badge with enhanced pulse */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <motion.span
                                    className="hero-badge text-[#06b6d4] mb-4 text-sm sm:text-base cursor-default"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                    Open to Opportunities
                                </motion.span>
                            </motion.div>

                            {/* Intro text with gradient */}
                            <motion.div
                                className="mt-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-wide bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                                    {animatedIntroText}
                                </h3>
                            </motion.div>

                            {/* Main typed role with glow effect */}
                            <motion.div
                                className="mt-3 min-h-[4rem] sm:min-h-[5rem] relative"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                {startAnimatedText && (
                                    <div className="relative">
                                        {/* Subtle glow behind text */}
                                        <div className="absolute -inset-4 bg-[#06b6d4]/10 blur-2xl rounded-full opacity-50"></div>
                                        <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                            <TextShimmer className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">{animatedText}</TextShimmer>
                                            <span className="animate-blink text-[#06b6d4]">|</span>
                                        </h1>
                                    </div>
                                )}
                            </motion.div>

                            {/* Tagline - More scannable */}
                            {startAnimatedText && (
                                <motion.div
                                    className="mt-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    <p className="text-base sm:text-lg text-gray-400 max-w-md leading-relaxed">
                                        I build <span className="text-white font-medium">high-performance web applications</span> with modern technologies.
                                        <span className="text-gray-500"> Focused on</span> <span className="text-[#06b6d4]">clean code</span> <span className="text-gray-500">&</span> <span className="text-[#06b6d4]">great user experiences</span>.
                                    </p>
                                </motion.div>
                            )}

                            {/* CTA Buttons */}
                            {startAnimatedText && (
                                <motion.div
                                    className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center md:justify-start pointer-events-auto"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1 }}
                                >
                                    <Magnetic>
                                        <motion.a
                                            href="#projects"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="inline-flex items-center justify-center h-11 px-7 bg-[#06b6d4] text-white font-semibold rounded-full transition-all duration-300 text-sm"
                                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            View My Work
                                        </motion.a>
                                    </Magnetic>
                                    <Magnetic>
                                        <motion.a
                                            href="https://drive.google.com/file/d/1OtSl_4Nag1Vd4vHfqT-Tj9cmEOXetMy4/view?usp=sharing"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 h-11 px-7 bg-transparent border border-white/30 text-white font-semibold rounded-full transition-all duration-300 text-sm hover:bg-white/5 hover:border-white/50"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download CV
                                        </motion.a>
                                    </Magnetic>
                                    <Magnetic>
                                        <motion.a
                                            href="#about-me"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="inline-flex items-center justify-center h-11 px-7 border border-white/30 text-white/90 font-semibold rounded-full hover:bg-white/5 hover:border-white/50 transition-all duration-300 text-sm"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            About Me
                                        </motion.a>
                                    </Magnetic>
                                </motion.div>
                            )}

                            {/* Social Links */}
                            {startAnimatedText && (
                                <motion.div
                                    className="flex items-center gap-4 mt-6 justify-center md:justify-start pointer-events-auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 1.2 }}
                                >
                                    <Magnetic>
                                        <motion.a
                                            href="https://github.com/Theo12335"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-500 hover:text-white transition-colors duration-300"
                                            whileHover={{ scale: 1.15, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FaGithub className="text-xl" />
                                        </motion.a>
                                    </Magnetic>
                                    <Magnetic>
                                        <motion.a
                                            href="https://www.linkedin.com/in/theodore-romeo-bascon-a98a01282/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-500 hover:text-[#0077b5] transition-colors duration-300"
                                            whileHover={{ scale: 1.15, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FaLinkedin className="text-xl" />
                                        </motion.a>
                                    </Magnetic>
                                    <Magnetic>
                                        <motion.a
                                            href="https://x.com/rhoetheo"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-500 hover:text-white transition-colors duration-300"
                                            whileHover={{ scale: 1.15, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <BsTwitterX className="text-lg" />
                                        </motion.a>
                                    </Magnetic>
                                </motion.div>
                            )}
                        </div>

                        {/* Right side - Space for ID badge */}
                        <div className="hidden md:flex flex-col items-center justify-center md:w-[40%] lg:w-[45%]">
                        </div>
                    </div>

                    {/* Drag badge hint - fixed position below badge */}
                    {startAnimatedText && (
                        <motion.div
                            className="hidden md:block absolute top-[78vh] left-[66%] -translate-x-1/2 z-20 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                        >
                            <div className="glass-card px-3 py-1.5 text-xs text-white/70 flex items-center gap-2 animate-pulse-hint">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                                </svg>
                                Drag me!
                            </div>
                        </motion.div>
                    )}

                    {/* Scroll indicator */}
                    {showArrow && (
                        <motion.div
                            className="fixed bottom-8 left-0 right-0 z-20 flex items-center justify-center h-10 pointer-events-none sm:absolute sm:bottom-12 sm:left-auto sm:right-auto sm:w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.5 }}
                        >
                            <a
                                href="#about-me"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const aboutMeSection = document.getElementById('about-me');
                                    if (aboutMeSection) {
                                        aboutMeSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="cursor-pointer pointer-events-auto flex flex-col items-center gap-2 group"
                                aria-label="Scroll to About Me section"
                            >
                                <span className="text-xs text-white/60 uppercase tracking-widest hidden sm:block group-hover:text-white/80 transition-colors">Scroll</span>
                                <div className="animate-bounce">
                                    <ChevronDownIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white/60 group-hover:text-white transition-colors" />
                                </div>
                            </a>
                        </motion.div>
                    )}
                </div>

                {/* About Me Section */}
                <div id="about-me" className="min-h-screen py-16 sm:py-20 md:py-24 relative">

                    {/* Section Title */}
                    <ScrollReveal direction="up">
                        <div className="flex flex-col items-center justify-center mb-12 sm:mb-16 md:mb-20 relative">
                            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                                About <span className="bg-gradient-to-r from-[#06b6d4] to-[#67e8f9] bg-clip-text text-transparent">Me</span>
                            </h3>
                            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent mt-6"></div>
                        </div>
                    </ScrollReveal>

                    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 sm:gap-12 lg:gap-12 relative">
                        {/* Left Content */}
                        <div className="flex flex-col w-full lg:w-[55%] text-center lg:text-left">
                            {/* Name & Title */}
                            <ScrollReveal direction="left" delay={0.2}>
                                <div className="mb-8 relative">
                                    <p className="text-[#06b6d4] text-sm font-medium tracking-wide mb-2">Hello, I&apos;m</p>
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        Theodore Romeo S. Bascon
                                    </h1>
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#06b6d4] mt-3">
                                        Software Developer
                                    </h2>
                                </div>
                            </ScrollReveal>

                            {/* Bio Text - Cleaner */}
                            <ScrollReveal direction="up" delay={0.3}>
                                <div className="mb-8 space-y-3">
                                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                        I specialize in <span className="text-white font-semibold">Next.js & React</span> architecture,
                                        building enterprise-grade front-end systems with measurable impact.
                                    </p>
                                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                                        My expertise spans <span className="text-white font-medium">real-time WebSocket engineering</span>, <span className="text-white font-medium">AI integration</span>, and crafting
                                        complex interactive UIs with a <span className="text-[#06b6d4]">detail-oriented approach</span>.
                                    </p>
                                </div>
                            </ScrollReveal>

                            {/* Stats - Enhanced with icons */}
                            <ScrollReveal direction="up" delay={0.4}>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
                                    <div className="group relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative glass-card px-6 py-5 rounded-2xl border border-white/5 hover:border-[#06b6d4]/30 transition-all duration-300">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-[#06b6d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <span className="text-2xl sm:text-3xl font-bold text-white block">
                                                        <Counter end={30} suffix="%" />
                                                    </span>
                                                    <p className="text-xs text-gray-400">Faster Load</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative glass-card px-6 py-5 rounded-2xl border border-white/5 hover:border-[#06b6d4]/30 transition-all duration-300">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-[#06b6d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <span className="text-2xl sm:text-3xl font-bold text-white block">
                                                        <Counter end={95} suffix="+" />
                                                    </span>
                                                    <p className="text-xs text-gray-400">Lighthouse</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative glass-card px-6 py-5 rounded-2xl border border-white/5 hover:border-[#06b6d4]/30 transition-all duration-300">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-[#06b6d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <span className="text-2xl sm:text-3xl font-bold text-white block">
                                                        <Counter end={40} suffix="%" />
                                                    </span>
                                                    <p className="text-xs text-gray-400">Less Latency</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Buttons - More polished */}
                            <ScrollReveal direction="up" delay={0.5}>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                                    <a
                                        href="https://drive.google.com/file/d/1OtSl_4Nag1Vd4vHfqT-Tj9cmEOXetMy4/view?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative overflow-hidden bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white px-8 py-3.5 rounded-full font-semibold pointer-events-auto inline-flex items-center gap-2 shadow-lg shadow-[#06b6d4]/25 hover:shadow-[#06b6d4]/40 hover:scale-105 transition-all duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Download CV
                                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                    </a>

                                    {/* Certifications Button & Dropdown/Modal */}
                                    <div
                                        className="relative pointer-events-auto"
                                        onMouseEnter={handleMouseEnterConnect}
                                        onMouseLeave={handleMouseLeaveConnect}
                                    >
                                        <button
                                            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-full hover:bg-white/10 hover:border-[#06b6d4]/50 hover:scale-105 transition-all duration-300 font-semibold"
                                            onClick={() => {
                                                if (typeof window !== 'undefined' && window.innerWidth < 768) {
                                                    handleOpenCertificationsModal();
                                                }
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#06b6d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                            Certifications
                                            <ChevronDownIcon className="h-4 w-4" />
                                        </button>

                                        {/* Desktop Dropdown Content */}
                                        {showConnectDesktopDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="hidden lg:flex absolute left-0 mt-4 bg-[#0c1929]/95 backdrop-blur-2xl rounded-2xl shadow-2xl z-[60] p-6 flex-row items-start gap-8 border border-white/10"
                                            >
                                                <a href="https://app-na2.hubspot.com/academy/achievements/6mj8xr8x/en/1/theodore-romeo-bascon/seo" target="_blank" rel="noopener noreferrer" className="group text-center">
                                                    <div className="w-24 h-24 rounded-2xl overflow-hidden mb-3 bg-white/5 p-2 group-hover:bg-[#06b6d4]/10 transition-all duration-300">
                                                        <Image
                                                            src="https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/58432a35f9b5419d8a03f5397fc50ce3.png"
                                                            alt="HubSpot SEO Certification"
                                                            width={96}
                                                            height={96}
                                                            className="w-full h-full object-contain"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-gray-400 group-hover:text-[#06b6d4] transition-colors">SEO Cert</p>
                                                </a>

                                                <a href="https://drive.google.com/file/d/1sqxZH4m9gmd5vX9sywU0S3u2hKVLAXkb/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="group text-center">
                                                    <div className="w-24 h-24 rounded-2xl overflow-hidden mb-3 bg-white/5 p-2 group-hover:bg-[#06b6d4]/10 transition-all duration-300">
                                                        <Image
                                                            src="/wordpresscert.png"
                                                            alt="WordPress Certificate"
                                                            width={96}
                                                            height={96}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-gray-400 group-hover:text-[#06b6d4] transition-colors">WordPress Cert</p>
                                                </a>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Social Links - Cleaner */}
                            <ScrollReveal direction="up" delay={0.6}>
                                <div className="flex items-center justify-center lg:justify-start gap-2">
                                    <span className="text-xs text-gray-500 mr-2">Find me on</span>
                                    <div className="flex gap-1">
                                        <Magnetic>
                                            <Link href="https://github.com/Theo12335" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="pointer-events-auto p-2.5 rounded-lg hover:bg-white/5 transition-all duration-300 group">
                                                <FaGithub className="text-lg text-gray-400 group-hover:text-white transition-colors duration-200" />
                                            </Link>
                                        </Magnetic>
                                        <Magnetic>
                                            <Link href="https://www.linkedin.com/in/theodore-romeo-bascon-a98a01282/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="pointer-events-auto p-2.5 rounded-lg hover:bg-white/5 transition-all duration-300 group">
                                                <FaLinkedin className="text-lg text-gray-400 group-hover:text-[#0077b5] transition-colors duration-200" />
                                            </Link>
                                        </Magnetic>
                                        <Magnetic>
                                            <Link href="https://www.facebook.com/theodore.bascon.3/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="pointer-events-auto p-2.5 rounded-lg hover:bg-white/5 transition-all duration-300 group">
                                                <FaFacebook className="text-lg text-gray-400 group-hover:text-[#1877f2] transition-colors duration-200" />
                                            </Link>
                                        </Magnetic>
                                        <Magnetic>
                                            <Link href="https://www.instagram.com/theodorebascon/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="pointer-events-auto p-2.5 rounded-lg hover:bg-white/5 transition-all duration-300 group">
                                                <FaInstagram className="text-lg text-gray-400 group-hover:text-[#e4405f] transition-colors duration-200" />
                                            </Link>
                                        </Magnetic>
                                        <Magnetic>
                                            <Link href="https://x.com/rhoetheo" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="pointer-events-auto p-2.5 rounded-lg hover:bg-white/5 transition-all duration-300 group">
                                                <BsTwitterX className="text-lg text-gray-400 group-hover:text-white transition-colors duration-200" />
                                            </Link>
                                        </Magnetic>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right Side - Astronaut */}
                        <div className="hidden lg:flex flex-col items-center justify-center w-[40%] relative">
                            <ScrollReveal direction="right" delay={0.3}>
                                <div className="relative">
                                    <FloatingAstronaut
                                        src="/astronaut.svg"
                                        alt="Floating Astronaut"
                                        width={420}
                                        height={420}
                                        floatRange={60}
                                        floatDuration={2500}
                                        transitionDuration={3000}
                                        loading="eager"
                                        priority
                                    />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="py-16 sm:py-20 md:py-28" id="skills">
                    <div className="pointer-events-auto">
                        <CategorizedIconsDisplay />
                    </div>
                </div>

                {/* Projects Section */}
                <div className="py-16 sm:py-20 md:py-28" id="projects">
                    {/* Section Header */}
                    <ScrollReveal direction="up">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                                Featured <span className="bg-gradient-to-r from-[#06b6d4] to-[#67e8f9] bg-clip-text text-transparent">Projects</span>
                            </h2>
                            <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto">
                                A showcase of my recent work and contributions
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.2}>
                        <Carousel onOpenModal={handleOpenCarouselModal} onCloseModal={handleCloseCarouselModal} />
                    </ScrollReveal>
                </div>

            </div>

            {/* Mobile Certifications Modal - Renders only when isCertificationsModalOpen is true */}
            {isCertificationsModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-[70] flex items-center justify-center p-4">
                    <div className="relative bg-[#0f172a] bg-opacity-[40%] rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-6">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseCertificationsModal}
                            className="absolute top-3 right-3 text-white hover:text-[#06b6d4] transition-colors duration-150"
                            aria-label="Close certifications"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-4">My Certifications</h2>
                        <div className="flex flex-col items-center justify-center gap-6 w-full">
                            {/* HubSpot Certification (SEO) - Mobile Modal */}
                            <div className="academy-badge hover:scale-105 transition-transform duration-150">
                                <a href="https://app-na2.hubspot.com/academy/achievements/6mj8xr8x/en/1/theodore-romeo-bascon/seo" target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/58432a35f9b5419d8a03f5397fc50ce3.png"
                                        alt="HubSpot SEO Certification"
                                        width={150}
                                        height={150}
                                        className="object-contain"
                                        loading="lazy"
                                    />
                                </a>
                                <p className="flex items-center justify-center text-center mt-4 text-white">SEO Certification</p>
                            </div>
                            <a
                                href="https://drive.google.com/file/d/1sqxZH4m9gmd5vX9sywU0S3u2hKVLAXkb/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-white text-base text-center hover:scale-105 transition-transform duration-150"
                            >
                                <Image
                                    src="/wordpresscert.png"
                                    alt="WordPress Certificate"
                                    width={150}
                                    height={150}
                                    className="h-auto object-contain mx-auto mb-2"
                                    priority
                                />
                                <span>WordPress Certification</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="pointer-events-auto z-10">
                <Footer />
            </div>
        </div>
    );
}