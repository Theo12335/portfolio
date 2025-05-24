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
import CategorizedIconsDisplay from '@/app/components/categories'; // Import the Categories component

export default function Home() {
  const wordsToAnimate = ["Front-End Developer", "UI/UX Designer"];
  const introGreeting = React.useMemo(() => ["Hello, I'm a Junior"], []);

  // State to control when the second animation starts
  const [startAnimatedText, setStartAnimatedText] = useState(false);

  // animatedIntroText will run first
  const animatedIntroText = useTypewriter(introGreeting, 100, 50, 0, 0, false, () => {
    // Callback function: once animatedIntroText is done, start the second animation
    setStartAnimatedText(true);
  });

  // animatedText will only run if startAnimatedText is true
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

  return (
    <div className="relative flex flex-col">

      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto">
        <DynamicID />
      </div>

      <div className="relative z-0 flex flex-col px-[10%]">
        <Header />

        <div className="flex flex-col text-center min-h-screen">
          <div className="flex mt-[20%] text-center justify-center">
            <h3 className="text-xl">
              {animatedIntroText}
            </h3>
          </div>
          <div className="mt-2 text-center">
            <h1 className="text-5xl font-bold">
              {/* Only render animatedText if startAnimatedText is true */}
              {startAnimatedText && (
                <>
                  <span className="font-semibold text-[#00a6c0]">{animatedText}</span>
                  <span className="animate-blink">|</span>
                </>
              )}
            </h1>
          </div>
          {showArrow && (
            <div className="mt-[30%] mb-20 h-10 pointer-events-auto flex items-center justify-center">
              <a
                href="#about-me"
                onClick={(e) => {
                  e.preventDefault();
                  const aboutMeSection = document.getElementById('about-me');
                  if (aboutMeSection) {
                    aboutMeSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="cursor-pointer"
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
                  className="bg-[#00a6c0] text-white px-4 py-2 rounded-2xl hover:scale-105 hover:bg-[#557793] hover:text-white transition-all duration-150 font-bold">
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
              <div className="flex flex-row items-right justify-bottom gap-6 pointer-events-auto">
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
        <div className="min-h-screen mb-2" id="skills">
          <div className="flex flex-col pointer-events-auto justify-top mt-[6%] min-h-[95%] px-[5%]">
            <CategorizedIconsDisplay />
          </div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div >
  );
}