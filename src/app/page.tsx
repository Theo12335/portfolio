// app/page.tsx
'use client';

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Link from 'next/link';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';
import DynamicID from "@/app/components/id";
import React, { useState, useEffect, useRef } from 'react';
import useTypewriter from '@/app/hooks/useTypewriter';
import FloatingAstronaut from '@/app/components/astronaut';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import CategorizedIconsDisplay from '@/app/components/categories';
import Carousel from '@/app/components/carousel';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Image from 'next/image';

export default function Home() {
    const [showConnectDesktopDropdown, setShowConnectDesktopDropdown] = useState(false);
    const connectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const wordsToAnimate = ["Full Stack Developer", "UI/UX Designer"];
    const introGreeting = React.useMemo(() => ["Hello, I'm a Junior"], []);

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
        <div className={`relative flex flex-col min-h-screen ${isCarouselModalOpen || isCertificationsModalOpen ? 'overflow-hidden' : ''}`}>
            <Analytics />
            <SpeedInsights />

            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto hidden md:block">
                <DynamicID />
            </div>

            <div className="relative z-10 flex flex-col px-[5%] sm:px-[10%] min-h-screen pointer-events-none">
                <Header />

                {/* Hero Section */}
                <div className="flex flex-col text-center min-h-screen pb-20 sm:pb-0" id="hero">
                    <div className="flex mt-[25%] sm:mt-[20%] text-center justify-center">
                        <h3 className="text-2xl md:text-2xl">
                            {animatedIntroText}
                        </h3>
                    </div>
                    <div className="mt-2 text-center">
                        <h1 className="text-5xl sm:text-4xl lg:text-6xl font-bold">
                            {startAnimatedText && (
                                <>
                                    <span className="font-semibold text-[#00a6c0]">{animatedText}</span>
                                    <span className="animate-blink">|</span>
                                </>
                            )}
                        </h1>
                    </div>
                    {showArrow && (
                        <div className="fixed bottom-8 left-0 right-0 z-20 flex items-center justify-center h-10 pointer-events-none sm:relative sm:mt-[25%] sm:mb-20 sm:bottom-auto sm:left-auto sm:right-auto sm:z-auto sm:pointer-events-auto">
                            <a
                                href="#about-me"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const aboutMeSection = document.getElementById('about-me');
                                    if (aboutMeSection) {
                                        aboutMeSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="cursor-pointer pointer-events-auto"
                                aria-label="Scroll to About Me section"
                            >
                                <ChevronDownIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-bounce" />
                            </a>
                        </div>
                    )}
                </div>

                {/* About Me Section */}
                <div id="about-me" className="items-center justify-center min-h-[95%]">
                    <div className="flex flex-col items-center justify-center mt-[10%] sm:mt-[7%]">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold ">
                            About <span className="text-[#C1E8FF]">Me</span>
                        </h3>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full py-[5%]">
                        <div className="flex flex-col items-center md:items-start w-full lg:w-4/6 md:w-7/10 min-h-[95%] justify-center py-[7%] text-center md:text-left">
                            <div className="items-center justify-center">
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                                    Theodore Romeo S. Bascon
                                </h1>
                                <div className="mt-3">
                                    <h2 className="block text-3xl sm:text-3xl lg:text-4xl font-bold text-[#C1E8FF] md:ml-2 md:inline">
                                        Full Stack Developer
                                    </h2>
                                </div>
                            </div>
                            <div>
                                <p className="flex text-sm sm:text-base ml-2 md:text-lg max-w-prose text-center md:text-left w-full leading-relaxed tracking-wider mt-[2%]">
                                    Highly motivated Website Developer, I&apos;m passionate about crafting responsive, user-friendly interfaces. My expertise centers on front-end technologies like HTML, CSS/Tailwind, JavaScript/TypeScript, React, and Next.js. I also bring hands-on experience with backend tools, including C#, .NET, Node.js, Firebase, and Supabase, adept at database management and CRUD operations. I&apos;m eager to apply my skills to real-world projects and gain practical experience with Agile methodologies, CI/CD pipelines, and SCRUM practices, as I aim to grow into a well-rounded full-stack developer.
                                </p>
                            </div>
                            <div className="flex mt-[3%] justify-center md:justify-start ml-2">
                                {/* Resume Button */}
                                <a
                                    href="https://drive.google.com/file/d/1pc_Do0uJVMQbg6sQm8KBn_6J3L3lc6VY/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#00a6c0] bg-opacity-[60%] text-white px-10 py-2 rounded-2xl hover:scale-105 hover:bg-[#557793] hover:text-white transition-all duration-150 font-bold pointer-events-auto">
                                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                                        Resume
                                    </h1>
                                </a>

                                {/* Certifications Button & Dropdown/Modal - FIX APPLIED HERE */}
                                <div
                                    className="relative pointer-events-auto w-full ml-[5%]"
                                    onMouseEnter={handleMouseEnterConnect} // Moved to parent div
                                    onMouseLeave={handleMouseLeaveConnect} // Moved to parent div
                                >
                                    <button
                                        className="flex bg-[#00a6c0] bg-opacity-[60%] text-white pl-10 pr-7 py-2 rounded-2xl hover:scale-105 hover:bg-[#557793] hover:text-white transition-all duration-150 font-bold text-lg sm:text-xl md:text-2xl"
                                        onClick={() => {
                                            // Trigger modal only on mobile screens
                                            if (typeof window !== 'undefined' && window.innerWidth < 768) {
                                                handleOpenCertificationsModal();
                                            }
                                        }}
                                    >
                                        Certifications <ChevronDownIcon className="flex mt-2.5 ml-4 h-4 w-4 justify-center items-center" />
                                    </button>

                                    {/* Desktop Dropdown Content - Hidden on mobile */}
                                    {showConnectDesktopDropdown && (
                                        <div className="hidden md:flex absolute right-0 mt-2 w-full bg-[#97cadb] bg-opacity-[10%] rounded-lg shadow-lg z-[60] py-4 px-3 flex-row items-center justify-center gap-6">
                                            {/* HubSpot Certification (SEO) */}
                                            <div className="academy-badge hover:scale-105 transition-transform duration-150">
                                                <a href="https://app-na2.hubspot.com/academy/achievements/6mj8xr8x/en/1/theodore-romeo-bascon/seo" target="_blank" rel="noopener noreferrer">
                                                    <img src='https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/58432a35f9b5419d8a03f5397fc50ce3.png' alt="HubSpot SEO Certification" />
                                                </a>
                                                <h1 className="flex items-center justify-center text-center mt-4">SEO Certification</h1>
                                            </div>

                                            {/* WordPress Certification - Desktop */}
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
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Astronaut and Social Media Icons */}
                        <div className="hidden items-center w-full lg:w-2/6 md:w-3/10 overflow-hidden min-h-[95%] mt-5 md:mt-[-7%] md:flex md:flex-col">
                            <div className="justify-center py-[10%] hidden md:block mt-[23%]">
                                <FloatingAstronaut
                                    src="/astronaut.svg"
                                    alt="Floating Astronaut"
                                    width={350}
                                    height={350}
                                    floatRange={80}
                                    floatDuration={2000}
                                    transitionDuration={3000}
                                    loading="eager"
                                    priority
                                />
                            </div>
                            <div className="hidden items-end justify-center md:justify-center gap-6 mt-4 md:mt-0 md:flex md:flex-row">
                                <Link href="https://github.com/Theo12335" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="pointer-events-auto">
                                    <FaGithub className="text-3xl md:text-4xl hover:text-[#00a6c0] transition-colors duration-200" />
                                </Link>
                                <Link href="https://www.linkedin.com/in/theodore-romeo-bascon-a98a01282/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="pointer-events-auto">
                                    <FaLinkedin className="text-3xl md:text-4xl hover:text-[#00a6c0] transition-colors duration-200" />
                                </Link>
                                <Link href="https://www.facebook.com/theodore.bascon.3/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="pointer-events-auto">
                                    <FaFacebook className="text-3xl md:text-4xl hover:text-[#00a6c0] transition-colors duration-200" />
                                </Link>
                                <Link href="https://www.instagram.com/theodorebascon/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="pointer-events-auto">
                                    <FaInstagram className="text-3xl md:text-4xl hover:text-[#00a6c0] transition-colors duration-200" />
                                </Link>
                                <Link href="https://x.com/rhoetheo" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="pointer-events-auto">
                                    <BsTwitterX className="text-3xl md:text-4xl hover:text-[#00a6c0] transition-colors duration-200" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="min-h-screen mb-2" id="skills">
                    <div className="flex flex-col justify-top mt-[10%] sm:mt-[6%] min-h-[95%] px-[0%] sm:px-[5%] pointer-events-auto">
                        <CategorizedIconsDisplay />
                    </div>
                </div>

                {/* Projects Section */}
                <div className="px-[0%] sm:px-[5%] pb-[3%] pt-[10%] sm:pt-[6%]" id="projects">
                    <div className="flex flex-col items-center justify-top mb-2 min-h-[90%] bg-white bg-opacity-20 rounded-lg px-[5%] sm:px-[10%] py-5 sm:py-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mt-5 mb-8">My <span className="text-[#C1E8FF]">Projects</span></h2>
                        <div>
                            <Carousel onOpenModal={handleOpenCarouselModal} onCloseModal={handleCloseCarouselModal} />
                        </div>
                    </div>
                </div>

            </div>

            {/* Mobile Certifications Modal - Renders only when isCertificationsModalOpen is true */}
            {isCertificationsModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-[70] flex items-center justify-center p-4">
                    <div className="relative bg-[#041d56] bg-opacity-[40%] rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-6">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseCertificationsModal}
                            className="absolute top-3 right-3 text-white hover:text-[#00a6c0] transition-colors duration-150"
                            aria-label="Close certifications"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-4">My Certifications</h2>
                        <div className="flex flex-col items-center justify-center gap-6 w-full">
                            {/* HubSpot Certification (SEO) - Mobile Modal */}
                            <div className="academy-badge hover:scale-105 transition-transform duration-150">
                                <a href="https://app-na2.hubspot.com/academy/achievements/6mj8xr8x/en/1/theodore-romeo-bascon/seo" target="_blank" rel="noopener noreferrer">
                                    <img src='https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/58432a35f9b5419d8a03f5397fc50ce3.png' alt="HubSpot SEO Certification" />
                                </a>
                                <h1 className="flex items-center justify-center text-center mt-4 text-white">SEO Certification</h1>
                            </div>

                            {/* WordPress Certification - Mobile Modal */}
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