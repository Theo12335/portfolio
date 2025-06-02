// app/page.tsx
'use client';

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/solid'; // Ensure this is correctly installed and imported
import DynamicID from "@/app/components/id";
import React, { useState, useEffect } from 'react';
import useTypewriter from '@/app/hooks/useTypewriter';
import FloatingAstronaut from '@/app/components/astronaut';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import CategorizedIconsDisplay from '@/app/components/categories';
import Carousel from '@/app/components/carousel';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
    const wordsToAnimate = ["Full Stack Developer", "UI/UX Designer"];
    const introGreeting = React.useMemo(() => ["Hello, I'm a Junior"], []);

    const [startAnimatedText, setStartAnimatedText] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        if (isModalOpen) {
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
    }, [isModalOpen]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`relative flex flex-col min-h-screen ${isModalOpen ? 'overflow-hidden' : ''}`}>
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto hidden md:block">
                <DynamicID />
            </div>
            <div className="relative z-10 flex flex-col px-[5%] sm:px-[10%] min-h-screen pointer-events-none">
                <Header />

                <div className="flex flex-col text-center min-h-screen pb-20 sm:pb-0" id="hero">
                    <div className="flex mt-[25%] sm:mt-[20%] text-center justify-center">
                        <h3 className="text-lg md:text-xl">
                            {animatedIntroText}
                            <Analytics />
                            <SpeedInsights />
                        </h3>
                    </div>
                    <div className="mt-2 text-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
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

                <div id="about-me" className="items-center justify-center min-h-[95%]">
                    <div className="flex flex-col items-center justify-center mt-[10%] sm:mt-[7%]">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold ">
                            About <span className="text-[#C1E8FF]">Me</span>
                        </h3>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full py-[5%]">
                        <div className="flex flex-col items-center md:items-start w-full md:w-7/10 min-h-[95%] justify-center py-[7%] text-center md:text-left">
                            <div className="items-center justify-center">
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                                    Theodore Romeo S. Bascon
                                    <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-[#C1E8FF] mt-1 md:ml-6 md:inline md:mt-0">
                                        Full Stack Developer
                                    </span>
                                </h1>
                            </div>
                            <div>
                                <p className="flex text-sm sm:text-base md:text-lg max-w-prose text-center md:text-left w-full leading-relaxed tracking-wider mt-[2%]">
                                    Highly motivated Website Developer, I&apos;m passionate about crafting responsive, user-friendly interfaces. My expertise centers on front-end technologies like HTML, CSS/Tailwind, JavaScript/TypeScript, React, and Next.js. I also bring hands-on experience with backend tools, including C#, .NET, Node.js, Firebase, and Supabase, adept at database management and CRUD operations. I&apos;m eager to apply my skills to real-world projects and gain practical experience with Agile methodologies, CI/CD pipelines, and SCRUM practices, as I aim to grow into a well-rounded full-stack developer.
                                </p>
                            </div>
                            <div className="flex mt-[5%] justify-center md:justify-start">
                                <a
                                    href="https://drive.google.com/file/d/1pc_Do0uJVMQbg6sQm8KBn_6J3L3lc6VY/view?usp=sharing"
                                    target="Resume"
                                    rel="noopener noreferrer"
                                    className="bg-[#00a6c0] text-white px-4 py-2 rounded-2xl hover:scale-105 hover:bg-[#557793] hover:text-white transition-all duration-150 font-bold pointer-events-auto">
                                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                                        Resume
                                    </h1>
                                </a>
                            </div>
                        </div>
                        {/* MODIFIED: Container for Astronaut and Social Icons */}
                        <div className="hidden items-center w-full md:w-3/10 overflow-hidden min-h-[95%] mt-5 md:mt-[-7%] md:flex md:flex-col">
                            <div className="justify-center py-[10%] hidden md:block mt-[18%]"> {/* This already correctly uses hidden md:block */}
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
                            {/* MODIFIED: Container for Social Media Icons */}
                            <div className="hidden items-end justify-center md:justify-center gap-6 mt-4 md:mt-0 md:flex md:flex-row">
                                {/* Note: Changed items-right to items-end (standard Tailwind), md:justify-bottom to md:justify-center (or md:items-end if vertical alignment was key) */}
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
                            <div> {/* This empty div was present, keeping it */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="min-h-screen mb-2" id="skills">
                    <div className="flex flex-col justify-top mt-[10%] sm:mt-[6%] min-h-[95%] px-[0%] sm:px-[5%] pointer-events-auto">
                        <CategorizedIconsDisplay />
                    </div>
                </div>

                <div className="px-[0%] sm:px-[5%] pb-[3%] pt-[10%] sm:pt-[6%]" id="projects">
                    <div className="flex flex-col items-center justify-top mb-2 min-h-[90%] bg-white bg-opacity-20 rounded-lg px-[5%] sm:px-[10%] py-5 sm:py-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mt-5 mb-8">My <span className="text-[#C1E8FF]">Projects</span></h2>
                        <div> {/* This is the div the linter might have pointed to if line numbers were off */}
                            <Carousel onOpenModal={handleOpenModal} onCloseModal={handleCloseModal} />
                        </div>
                    </div>
                </div>

            </div>
            <div className="pointer-events-auto z-10">
                <Footer />
            </div>
        </div >
    );
}