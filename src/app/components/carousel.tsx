// components/Carousel.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ProjectModal from './projectmodal';

// Define the Project interface with all properties
interface Project {
    id: number;
    image: string;
    hoverImage: string;
    title: string;
    shortDescription: string;
    description: string;
    tech: string[];
    logo: string;
    githubUrl?: string;
    websiteUrl?: string;
    contributions: string;
    galleryImages: string[];
    projectInfo: string;
    color: string;
}

const projectsData: Project[] = [
    {
        id: 1,
        image: '/futurethinkedge/colored-logo.svg',
        hoverImage: '/futurethinkedge/Screenshot 2026-01-23 033017.png',
        title: 'Guided Edge',
        shortDescription: 'An AI-powered adaptive learning platform designed for students with ADHD, featuring gamified learning with superhero personas and personalized experiences.',
        tech: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'AI/ML'],
        description: 'Guided Edge is a comprehensive AI-powered adaptive learning platform designed specifically for students with ADHD and other learning differences. The platform provides personalized, gamified learning experiences with superhero personas, making education engaging and accessible.',
        logo: '/futurethinkedge/colored-logo.svg',
        websiteUrl: 'https://futurethinkedge.org',
        contributions: 'As the Front-End Lead and AI Integration Developer, I architected the entire frontend application using Next.js 15 with TypeScript. I implemented the AI-powered classroom integration with multiple AI model routing (Gemini, DeepSeek, Claude), developed the Brain Gym with 39+ cognitive training games, and built the emotion detection system using ResNet-50 + CBAM. I also contributed to the game development aspects and ensured GDPR/FERPA compliance throughout the platform.',
        galleryImages: ['/futurethinkedge/Screenshot 2026-01-23 033017.png', '/futurethinkedge/Screenshot 2026-01-23 033347.png', '/futurethinkedge/Screenshot 2026-01-23 033415.png', '/futurethinkedge/Screenshot 2026-01-23 033518.png', '/futurethinkedge/Screenshot 2026-01-23 033608.png'],
        projectInfo: 'Guided Edge features research-validated knowledge tracing with a 92-94% AUC target, mental health signal detection with 988 Lifeline integration, and a dynamic XP engine with streak multipliers. The platform supports multiple user roles including students, teachers, parents, admins, clinical staff, and board members, each with tailored dashboards and features.',
        color: '#FE6462',
    },
    {
        id: 2,
        image: '/futurethinkhub/Screenshot 2026-01-23 074356.png',
        hoverImage: '/futurethinkhub/Screenshot 2026-01-23 074414.png',
        title: 'FutureThink Hub',
        shortDescription: 'A comprehensive web platform for a Baltimore-based 501(c)(3) nonprofit focused on food security, workforce development, and economic mobility.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GoHighLevel'],
        description: 'FutureThink Hub is the official website for a Baltimore-based nonprofit organization dedicated to transforming lives through food security, workforce development, and economic mobility. The platform has helped serve 29,000+ families and distributed 20+ million pounds of food.',
        logo: '/futurethinkhub/Screenshot 2026-01-23 074356.png',
        websiteUrl: 'https://futurethinkhub.org',
        contributions: 'I built the entire website from scratch, implementing a modern Next.js 15 application with App Router architecture. I integrated GoHighLevel CRM for contact management and payment processing, developed the donation system with both one-time and recurring payment options, created dynamic initiative pages, and built the blog and events system. I also implemented SEO optimization and ensured responsive design across all devices.',
        galleryImages: ['/futurethinkhub/Screenshot 2026-01-23 074356.png', '/futurethinkhub/Screenshot 2026-01-23 074414.png', '/futurethinkhub/Screenshot 2026-01-23 074429.png', '/futurethinkhub/Screenshot 2026-01-23 074445.png', '/futurethinkhub/Screenshot 2026-01-23 074507.png', '/futurethinkhub/Screenshot 2026-01-23 074548.png', '/futurethinkhub/Screenshot 2026-01-23 074608.png'],
        projectInfo: 'The platform serves the Baltimore community with programs including Grocery Giveaway Saturdays, community fridges, holiday food drives, culinary sponsorships, and the Guided Edge AI education platform. It features donation processing, volunteer registration, event management, and a photo gallery showcasing the nonprofit\'s impact.',
        color: '#94D96B',
    },
    {
        id: 3,
        image: '/lachow/La Chow Logo Clear Bg.svg',
        hoverImage: '/lachow/Screenshot 2026-01-23 074039.png',
        title: 'La Chow',
        shortDescription: 'A full-stack web platform for a premier shared commercial kitchen space and event venue in downtown Baltimore.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe'],
        description: 'La Chow is a comprehensive web platform for a premier shared commercial kitchen space and event venue located in downtown Baltimore, Maryland. The platform provides flexible kitchen rentals, event spaces, and office spaces for food entrepreneurs, caterers, and businesses.',
        logo: '/lachow/La Chow Logo Clear Bg.svg',
        websiteUrl: 'https://thelachow.com',
        contributions: 'I built the entire monorepo application from scratch, including both the customer-facing website and admin dashboard. I implemented Stripe payment integration for online ordering, Supabase database integration, blog and events management system, and SEO optimization with structured data. I also developed the package builder for custom rental plans and integrated Google Analytics.',
        galleryImages: ['/lachow/Screenshot 2026-01-23 074039.png', '/lachow/Screenshot 2026-01-23 074059.png', '/lachow/Screenshot 2026-01-23 074122.png', '/lachow/Screenshot 2026-01-23 074133.png', '/lachow/Screenshot 2026-01-23 074152.png', '/lachow/Screenshot 2026-01-23 074204.png'],
        projectInfo: 'The platform includes commercial kitchen rental information and booking, event space and wedding venue booking, office space rentals, a package builder for custom plans, blog and magazine content, and newsletter subscription. The admin dashboard provides content management, Google Analytics integration, and business oversight.',
        color: '#0D0D0D',
    },
    {
        id: 4,
        image: '/lumined/LOGO.png',
        hoverImage: '/lumined/Screenshot 2026-01-23 073020.png',
        title: 'LuminEd',
        shortDescription: 'A comprehensive gradebook management system with role-based access for administrators, teachers, and students.',
        tech: ['ASP.NET Core', 'C#', 'SQLite', 'Bootstrap', 'Entity Framework'],
        description: 'LuminEd is a comprehensive, production-ready gradebook management system built with ASP.NET Core 9, Razor Views, and SQLite. It provides a complete solution for educational institutions to manage students, teachers, courses, enrollments, and grades with an intuitive, role-based interface.',
        logo: '/lumined/LOGO.png',
        githubUrl: 'https://github.com/kisetzuu/LuminEd',
        contributions: 'As a Full-Stack Developer and QA Lead, I was responsible for the majority of frontend development using Razor Views and Bootstrap 5. I implemented the teacher and student dashboards, grade entry system with live letter grade calculations, PDF report card generation using iTextSharp, and the authentication system with BCrypt password hashing. I also conducted comprehensive QA testing to ensure system stability and security.',
        galleryImages: ['/lumined/Screenshot 2026-01-23 073020.png', '/lumined/Screenshot 2026-01-23 073111.png', '/lumined/Screenshot 2026-01-23 073152.png', '/lumined/Screenshot 2026-01-23 073240.png', '/lumined/Screenshot 2026-01-23 073311.png', '/lumined/Screenshot 2026-01-23 073416.png', '/lumined/Screenshot 2026-01-23 073432.png', '/lumined/Screenshot 2026-01-23 073602.png', '/lumined/Screenshot 2026-01-23 073616.png'],
        projectInfo: 'The system features role-based authentication (Admin, Teacher, Student), comprehensive user and course management, weighted grade calculations, account lockout security, complete audit trails for grade modifications, and PDF report card generation with GPA calculations on a 4.0 scale.',
        color: '#059669',
    },
    {
        id: 5,
        image: '/gearfolio/Screenshot 2026-01-23 212529.png',
        hoverImage: '/gearfolio/Screenshot 2026-01-23 212550.png',
        title: 'GearFolio',
        shortDescription: 'An AI-powered portfolio creation and discovery platform for CIT-U students with career recommendations and job discovery features.',
        tech: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Appwrite'],
        description: 'GearFolio is an AI-powered portfolio creation and discovery platform designed for CIT-U (Cebu Institute of Technology - University) students. It enables students to create professional portfolios, discover peers\' work, and receive AI-driven career recommendations.',
        logo: '/gearfolio/Screenshot 2026-01-23 212529.png',
        githubUrl: 'https://github.com/ICPEP-SE-CITU/GearFolio',
        contributions: 'I served as the Project Manager and built the complete Settings page with all its functionality. This included account management, profile picture handling, security settings with password management, theme selection (Dark, Light, System Default), portfolio privacy controls, and social account connections (LinkedIn, Facebook, GitHub, Instagram, Microsoft). I also contributed to project planning and team coordination.',
        galleryImages: ['/gearfolio/Screenshot 2026-01-23 212529.png', '/gearfolio/Screenshot 2026-01-23 212550.png'],
        projectInfo: 'GearFolio features portfolio creation and customization, portfolio discovery and search, AI-powered career path suggestions with skill level assessments, job listings with filtering and map visualization, and a comprehensive help and support section with FAQs and tutorials.',
        color: '#4F46E5',
    },
    {
        id: 6,
        image: '/bashhibachi/Screenshot 2026-01-23 072110.png',
        hoverImage: '/bashhibachi/Screenshot 2026-01-23 072122.png',
        title: 'Bash Hibachi',
        shortDescription: 'A modern, premium web application for a street food hibachi restaurant featuring sophisticated animations and a mobile-first design.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
        description: 'Bash Hibachi is a sleek, animated website showcasing a teppanyaki/hibachi food truck service that specializes in live fire cooking, catering, and private events. The site features parallax scrolling, GSAP-powered animations, and a premium dark aesthetic.',
        logo: '/bashhibachi/Screenshot 2026-01-23 072110.png',
        websiteUrl: 'https://bashhibachi.com',
        contributions: 'I built the entire website from scratch using Next.js 16 with App Router. I implemented sophisticated animations using GSAP and Framer Motion, including parallax scrolling, menu card stacking animations, and scroll-triggered reveals. I designed and developed the responsive layout with a mobile-first approach, created the menu page with categorized items, and built the contact/booking form system.',
        galleryImages: ['/bashhibachi/Screenshot 2026-01-23 072110.png', '/bashhibachi/Screenshot 2026-01-23 072122.png', '/bashhibachi/Screenshot 2026-01-23 072152.png', '/bashhibachi/Screenshot 2026-01-23 072211.png'],
        projectInfo: 'The website features a hero section with parallax backgrounds, a scrolling marquee banner, sticky text sections, an interactive menu showcase with GSAP-powered stacking card animations, and a comprehensive booking form. The design uses a premium dark aesthetic with Playfair Display and Inter fonts.',
        color: '#C65D07',
    },
    {
        id: 7,
        image: '/medsmonitor/Screenshot 2026-01-23 073737.png',
        hoverImage: '/medsmonitor/Screenshot 2026-01-23 073751.png',
        title: 'MedsMonitor',
        shortDescription: 'An Arduino-integrated web application that monitors medications taken by users in real-time with IoT sensor integration.',
        tech: ['Next.js', 'TypeScript', 'Arduino', 'Vercel', 'IoT'],
        description: 'MedsMonitor is an innovative web application that integrates with Arduino hardware to provide real-time medication monitoring for users. Built with Next.js and deployed on Vercel, the project combines IoT sensor data with a web interface to track medication adherence and usage patterns.',
        logo: '/medsmonitor/Screenshot 2026-01-23 073737.png',
        githubUrl: 'https://github.com/Theo12335/MedsMonitor',
        websiteUrl: 'https://meds-monitor.vercel.app/',
        contributions: 'I built the entire application from scratch, developing both the frontend web interface and the Arduino integration. I implemented real-time medication tracking using sensor data, created the user dashboard for monitoring medication adherence, and deployed the application on Vercel. The system helps users maintain their medication schedules with real-time notifications and tracking.',
        galleryImages: ['/medsmonitor/Screenshot 2026-01-23 073737.png', '/medsmonitor/Screenshot 2026-01-23 073751.png', '/medsmonitor/Screenshot 2026-01-23 073819.png', '/medsmonitor/Screenshot 2026-01-23 073840.png', '/medsmonitor/Screenshot 2026-01-23 073923.png', '/medsmonitor/Screenshot 2026-01-23 074004.png'],
        projectInfo: 'MedsMonitor combines IoT hardware with modern web technologies to solve the important problem of medication adherence. The Arduino integration allows for physical pill dispenser monitoring, while the Next.js frontend provides users with an intuitive interface to track their medication history and receive reminders.',
        color: '#EC4899',
    },
    {
        id: 8,
        image: '/SyncLogo.svg',
        hoverImage: '/Landing.png',
        title: 'Sync',
        shortDescription: 'A real-time collaboration platform for document editing, task tracking, and team communication with live updates and version control.',
        tech: ['Next.js', 'React', 'Firebase', 'WebSocket'],
        description: 'Sync is a sophisticated real-time collaboration platform designed to enhance team productivity and communication. This full-stack application leverages Next.js for a fast and scalable frontend, React for interactive UI components, and Firebase for robust backend services.',
        logo: '/SyncLogo.svg',
        githubUrl: 'https://github.com/mantequilla45/Sync',
        websiteUrl: 'https://sync-project.vercel.app/',
        contributions: 'My primary role in the Sync project involved developing the real-time document editing feature, utilizing Firebase\'s real-time database capabilities to ensure seamless updates across all collaborators. I also implemented the user authentication system and designed the task management interface, focusing on user experience and data synchronization. I contributed significantly to the overall architecture, conducting rigorous testing and debugging to ensure a stable and performant application.',
        galleryImages: ['/Landing.png', '/About.png', '/DocumentPage.png', '/Home.png', '/TaskManager.png', '/Account.png'],
        projectInfo: 'The core innovation of Sync lies in its ability to provide a truly collaborative environment where multiple users can interact with documents and tasks simultaneously without conflicts. It includes advanced features like version history, role-based access control, and integrated chat, making it an ideal solution for remote and distributed teams.',
        color: '#8b5cf6',
    },
    {
        id: 9,
        image: '/BSDOC.svg',
        hoverImage: '/BSDOC1.png',
        title: 'BSDOC',
        shortDescription: 'A web-based health platform offering OTC medication suggestions, symptom checking, and trusted health resources for convenient self-care.',
        tech: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Firebase'],
        description: 'BSDOC is a web-based application I helped develop as part of a group project for our Modern Systems Analysis and Design course, marking my first experience in web development as the lead front-end designer and developer.',
        logo: '/BSDOC.svg',
        githubUrl: 'https://github.com/mantequilla45/bsdoc',
        websiteUrl: 'https://bsdoc-project.vercel.app/',
        contributions: 'BSDOC started as my idea for a Windows Forms project. I focused on developing the front-end user interface, logo designing, ensuring a responsive and intuitive experience across various devices. My responsibilities included implementing the symptom checker logic, refining the medication suggestions, implementing symptom tracking for the admin dashboard, and making sure that the medical history for each user is reflected on unto the profile. I also led design discussions to refine the overall user flow and contributed significantly to the backend logic for data processing and secure resource access, improving both functionality and user engagement.',
        galleryImages: ['/BSDOC1.png', '/BSDOC2.png', '/BSDOC3.png', '/BSDOC4.png', '/BSDOC5.png', '/BSDOC6.png'],
        projectInfo: 'BSDOC stands out by combining accessible health information with practical self-care tools. It was developed with a strong emphasis on user privacy and data security, adhering to industry best practices. The platform is continuously updated based on user feedback and emerging health guidelines to provide the most relevant and reliable information.',
        color: '#06b6d4',
    },
];

interface CarouselProps {
    onOpenModal: () => void;
    onCloseModal: () => void;
}

const Carousel: React.FC<CarouselProps> = ({ onOpenModal, onCloseModal }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const autoCycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const slideCount = projectsData.length;

    const goToSlide = (newIndex: number, dir: number) => {
        setDirection(dir);
        if (newIndex < 0) {
            setCurrentIndex(slideCount - 1);
        } else if (newIndex >= slideCount) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(newIndex);
        }
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const startAutoCycle = React.useCallback(() => {
        if (autoCycleIntervalRef.current) {
            clearInterval(autoCycleIntervalRef.current);
        }
        autoCycleIntervalRef.current = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
        }, 6000); // Slower cycling
    }, [slideCount]);

    const stopAutoCycle = React.useCallback(() => {
        if (autoCycleIntervalRef.current) {
            clearInterval(autoCycleIntervalRef.current);
            autoCycleIntervalRef.current = null;
        }
    }, []);

    // Only auto-cycle when visible in viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            startAutoCycle();
        } else {
            stopAutoCycle();
        }
        return () => stopAutoCycle();
    }, [isVisible, startAutoCycle, stopAutoCycle]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        stopAutoCycle();
        onOpenModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        startAutoCycle();
        onCloseModal();
    };

    const currentProject = projectsData[currentIndex];

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
    };

    return (
        <>
            <div ref={containerRef} className="relative w-full max-w-6xl mx-auto pointer-events-auto">
                {/* Main Project Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="p-4 sm:p-6 md:p-10"
                        >
                            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
                                {/* Project Image/Logo */}
                                <motion.div
                                    className="relative w-full lg:w-[45%] aspect-video lg:aspect-square max-w-md cursor-pointer group"
                                    onClick={() => openModal(currentProject)}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/[0.05]">
                                        {/* Default Image */}
                                        <Image
                                            src={currentProject.image}
                                            alt={currentProject.title}
                                            fill
                                            className="object-contain p-8 transition-all duration-500 group-hover:opacity-0 group-hover:scale-110"
                                            priority
                                        />
                                        {/* Hover Image */}
                                        <Image
                                            src={currentProject.hoverImage}
                                            alt={`${currentProject.title} preview`}
                                            fill
                                            className="object-cover opacity-0 transition-all duration-500 group-hover:opacity-100"
                                            priority
                                        />
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                            <span className="text-white text-sm font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                                                Click to view details
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Project Info */}
                                <div className="flex-1 text-center lg:text-left">
                                    {/* Title */}
                                    <motion.h3
                                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {currentProject.title}
                                    </motion.h3>

                                    {/* Tech Stack */}
                                    <motion.div
                                        className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {currentProject.tech.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </motion.div>

                                    {/* Description */}
                                    <motion.p
                                        className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {currentProject.shortDescription}
                                    </motion.p>

                                    {/* CTA Button */}
                                    <motion.button
                                        onClick={() => openModal(currentProject)}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#06b6d4] text-white font-semibold rounded-full hover:bg-[#0891b2] transition-all duration-300 shadow-lg shadow-[#06b6d4]/25"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        View Project
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows - Hidden on mobile, shown on sm+ */}
                    {slideCount > 1 && (
                        <>
                            <button
                                className="hidden sm:block absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm border border-white/10 z-10"
                                onClick={() => { stopAutoCycle(); goToSlide(currentIndex - 1, -1); startAutoCycle(); }}
                                aria-label="Previous project"
                            >
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                            <button
                                className="hidden sm:block absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm border border-white/10 z-10"
                                onClick={() => { stopAutoCycle(); goToSlide(currentIndex + 1, 1); startAutoCycle(); }}
                                aria-label="Next project"
                            >
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>

                {/* Dot Indicators */}
                {slideCount > 1 && (
                    <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Project slides">
                        {projectsData.map((project, index) => (
                            <button
                                key={index}
                                onClick={() => { stopAutoCycle(); goToSlide(index, index > currentIndex ? 1 : -1); startAutoCycle(); }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? 'w-8 bg-[#06b6d4]'
                                        : 'bg-white/20 hover:bg-white/40'
                                }`}
                                aria-label={`Go to project ${index + 1}: ${project.title}`}
                                aria-selected={index === currentIndex}
                                role="tab"
                            />
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && selectedProject && (
                <ProjectModal project={selectedProject} onClose={closeModal} />
            )}
        </>
    );
};

export default Carousel;
