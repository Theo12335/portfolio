// app/page.tsx
'use client';

import Header from "@/app/components/header";
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import DynamicID from "@/app/components/id";
import React, { useState, useEffect } from 'react';
import useTypewriter from '@/app/hooks/useTypewriter';
import FloatingAstronaut from '@/app/components/astronaut'; // Import the new component
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs'; // Using BsTwitterX for X.com icon

export default function Home() {
  const wordsToAnimate = ["Front-End Developer", "UI/UX Designer"];
  const animatedText = useTypewriter(wordsToAnimate, 100, 50, 1500, 700, true);
  const introGreeting = React.useMemo(() => ["Hello, I'm a Junior"], []);
  const animatedIntroText = useTypewriter(introGreeting, 100, 50, 0, 0, false);
  const [showArrow, setShowArrow] = useState(false);
  

  useEffect(() => {
    if (animatedIntroText === introGreeting[0]) {
      const timer = setTimeout(() => {
        setShowArrow(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animatedIntroText, introGreeting]);


  return (
    <div className="relative flex flex-col min-h-screen px-4">

      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto">
        <DynamicID />
      </div>

      <div className="relative z-10 flex flex-col pointer-events-none">

        <div className="flex flex-col justify-center pointer-events-auto z-30 relative">
          <Header />
        </div>

        <div className="flex flex-col px-4 text-center min-h-screen">
          <div className="flex mt-[20%] text-center justify-center">
            <h3 className="text-xl">
              {animatedIntroText}
            </h3>
          </div>
          <div className="mt-2 text-center">
            <h1 className="text-5xl font-bold">
              {animatedIntroText === introGreeting[0] && (
                <>
                  <span className="font-semibold text-[#00a6c0]">{animatedText}</span>
                  <span className="animate-blink">|</span>
                </>
              )}
            </h1>
          </div>
          {showArrow && (
            <div className="mt-[20%] mb-20 h-10 pointer-events-auto flex items-center justify-center">
              <a
                href="#about-me" // Link to the target section ID
                onClick={(e) => {
                  e.preventDefault(); // Prevent default jump behavior
                  const aboutMeSection = document.getElementById('about-me');
                  if (aboutMeSection) {
                    aboutMeSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll
                  }
                }}
                className="cursor-pointer" // Add a cursor pointer to indicate clickability
                aria-label="Scroll to About Me section"
              >
                <ChevronDownIcon className="h-10 w-10 text-white animate-bounce" />
              </a>
            </div>
          )}
        </div>

        <div id="about-me" className="items-center justify-center py-20 min-h-screen px-[5%]">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-5xl font-bold ">
              About <span className="text-[#C1E8FF]">Me</span>
            </h3>
          </div>
          <div className="flex flex-row items-center justify-center mt-10">
            <div className="flex flex-col items-left w-full h-screen justify-center">
              <div className="items-center justify-center">
                <h1 className="text-7xl font-bold mt-[-25%]">
                  Theodore Romeo S. Bascon
                </h1>
                <h2 className="text-3xl font-bold text-[#C1E8FF] mt-[3%]">
                  Front-End Developer
                </h2>
              </div>
              <p className="mt-4 text-lg max-w-prose text-left w-full leading-relaxed tracking-wider">
                Frontend Developer eager to grow into full-stack roles, with a solid foundation in C# and .NET. I enjoy bringing dynamic, modern designs to life and thrive on learning new technologies to tackle challenges. Proficient in React.js, Next.js, JavaScript/TypeScript, HTML, CSS/Tailwind, Node.js, and Firebase, I&apos;m passionate about building engaging user experiences. Always excited to collaborate and create innovative solutions.
              </p>
            </div>
            <div className="flex flex-col items-center py-[10%] w-full overflow-hidden h-screen"> {/* Added overflow-hidden for safety */}
              <div>
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
              <div className="flex flex-row items-center justify-bottom space-x-7 mt-[8%] pointer-events-auto"> {/* Added flex for alignment and spacing */}
                <Link href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub className="text-4xl text-gray-400 hover:text-white transition-colors duration-200" />
                </Link>
                <Link href="https://linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin className="text-4xl text-gray-400 hover:text-white transition-colors duration-200" />
                </Link>
                <Link href="https://facebook.com/your-facebook-profile" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook className="text-4xl text-gray-400 hover:text-white transition-colors duration-200" />
                </Link>
                <Link href="https://instagram.com/your-instagram-profile" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram className="text-4xl text-gray-400 hover:text-white transition-colors duration-200" />
                </Link>
                <Link href="https://x.com/your-x-profile" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
                  <BsTwitterX className="text-4xl text-gray-400 hover:text-white transition-colors duration-200" />
                </Link>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center py-20 bg-gray-100">
          <h2 className="text-3xl font-bold">Portfolio Section (Scroll Down!)</h2>
        </div>

      </div>
    </div>
  );
}