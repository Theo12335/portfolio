'use client';

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import DynamicID from "@/app/components/id";
import React, { useState, useEffect } from 'react';
import useTypewriter from '@/app/hooks/useTypewriter';
import FloatingAstronaut from '@/app/components/astronaut';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import CategorizedIconsDisplay from '@/app/components/categories';
import Carousel from '@/app/components/carousel';

export default function Home() {
  const wordsToAnimate = ["Front-End Developer", "UI/UX Designer"];
  const introGreeting = React.useMemo(() => ["Hello, I'm a Junior"], []);

  const [startAnimatedText, setStartAnimatedText] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // NEW: State to track modal open/close

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

  // NEW: Effect to control body overflow based on modal state
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      // Optional: Add padding-right to body to prevent content shift if scrollbar disappears
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = ''; // Reset to default
      document.body.style.paddingRight = ''; // Reset padding
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isModalOpen]);


  // Handler to open the modal (passed to Carousel)
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Handler to close the modal (passed to ProjectModal)
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    // Conditional class to ensure no scrolling on main page when modal is open
    // This is a simple approach, another is to directly manipulate document.body in an effect as above.
    <div className={`relative flex flex-col min-h-screen ${isModalOpen ? 'overflow-hidden' : ''}`}>
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto">
        <DynamicID />
      </div>
      {/* Main content div: Ensure it doesn't have its own overflow-y-auto that would hide footer */}
      <div className="relative z-10 flex flex-col px-[10%] min-h-screen pointer-events-none">
        <Header />

        <div className="flex flex-col text-center min-h-screen">
          <div className="flex mt-[20%] text-center justify-center">
            <h3 className="text-xl">
              {animatedIntroText}
            </h3>
          </div>
          <div className="mt-2 text-center">
            <h1 className="text-5xl font-bold">
              {startAnimatedText && (
                <>
                  <span className="font-semibold text-[#00a6c0]">{animatedText}</span>
                  <span className="animate-blink">|</span>
                </>
              )}
            </h1>
          </div>
          {showArrow && (
            <div className="mt-[30%] mb-20 h-10 flex items-center justify-center">
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
                <ChevronDownIcon className="h-10 w-10 text-white animate-bounce" />
              </a>
            </div>
          )}
        </div>

        <div id="about-me" className="items-center justify-center min-h-[95%]">
          <div className="flex flex-col items-center justify-center mt-[7%]">
            <h3 className="text-5xl font-bold ">
              About <span className="text-[#C1E8FF]">Me</span>
            </h3>
          </div>
          <div className="flex flex-row items-center justify-center w-full py-[5%]">
            <div className="flex flex-col items-left w-full min-h-[95%] justify-center py-[7%] w-70%">
              <div className="items-center justify-center">
                <h1 className="text-7xl font-bold">
                  Theodore Romeo S. Bascon
                  <span className="text-3xl font-bold text-[#C1E8FF] ml-6 ">
                    Front-End Developer
                  </span>
                </h1>
              </div>
              <div>
                <p className="flex text-lg max-w-prose text-left w-full leading-relaxed tracking-wider mt-[2%]">
                  Frontend Developer eager to grow into full-stack roles, with a solid foundation in C# and .NET. I enjoy bringing dynamic, modern designs to life and thrive on learning new technologies to tackle challenges. Proficient in React.js, Next.js, JavaScript/TypeScript, HTML, CSS/Tailwind, Node.js, and Firebase, I&apos;m passionate about building engaging user experiences. Always excited to collaborate and create innovative solutions.
                </p>
              </div>
              <div className="flex mt-[5%]">
                <a
                  href="https://drive.google.com/file/d/1KWxMBOpTVBL529X3Ti4BpDPEf-0Ylm1B/view?usp=sharing"
                  target="Resume"
                  rel="noopener noreferrer"
                  className="bg-[#00a6c0] text-white px-4 py-2 rounded-2xl hover:scale-105 hover:bg-[#557793] hover:text-white transition-all duration-150 font-bold pointer-events-auto">
                  <h1 className="text-2xl font-bold">
                    Resume
                  </h1>
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center w-full overflow-hidden min-h-[95%] mt-[-7%] w-30%">
              <div className="justify-center py-[10%]">
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
              <div className="flex flex-row items-right justify-bottom gap-6">
                <Link href="https://github.com/Theo12335" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="pointer-events-auto">
                  <FaGithub className="text-4xl hover:text-[#00a6c0] transition-colors duration-200" />
                </Link>
                <Link href="https://www.linkedin.com/in/theodore-romeo-bascon-a98a01282/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="pointer-events-auto">
                  <FaLinkedin className="text-4xl hover:text-[#00a6c0] transition-colors duration-200" />
                </Link>
                <Link href="https://www.facebook.com/theodore.bascon.3/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="pointer-events-auto">
                  <FaFacebook className="text-4xl hover:text-[#00a6c0] transition-colors duration-200" />
                </Link>
                <Link href="https://www.instagram.com/theodorebascon/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="pointer-events-auto">
                  <FaInstagram className="text-4xl hover:text-[#00a6c0] transition-colors duration-200" />
                </Link>
                <Link href="https://x.com/rhoetheo" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="pointer-events-auto">
                  <BsTwitterX className="text-4xl hover:text-[#00a6c0] transition-colors duration-200" />
                </Link>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-screen mb-2" id="skills">
          <div className="flex flex-col justify-top mt-[6%] min-h-[95%] px-[5%] pointer-events-auto">
            <CategorizedIconsDisplay />
          </div>
        </div>
        <div className="px-[5%] pb-[3%] pt-[6%]" id="projects">
          <div className="flex flex-col items-center justify-top mb-2 min-h-[90%] bg-white bg-opacity-20 rounded-lg px-[10%]">
            <h2 className="text-5xl font-bold text-center mt-5 mb-8">My <span className="text-[#C1E8FF]">Projects</span></h2>
            <div>
              {/* Pass the open/close handlers to Carousel */}
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