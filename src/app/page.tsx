// app/page.tsx
'use client';

import Image from "next/image";
import Header from "@/app/components/header";
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import DynamicID from "@/app/components/id";
import React, { useState, useEffect } from 'react';
import useTypewriter from '@/app/hooks/useTypewriter';
import FloatingAstronaut from '@/app/components/astronaut'; // Import the new component


export default function Home() {
  const wordsToAnimate = ["Front-End Developer", "UI/UX Designer"];
  const animatedText = useTypewriter(wordsToAnimate, 100, 50, 1500, 700, true);
  const introGreeting = ["Hello, I'm a Junior"];
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
    <div className="relative flex flex-col min-h-screen">

      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto">
        <DynamicID />
      </div>

      <div className="relative z-10 flex flex-col pointer-events-none">

        <div className="flex flex-col justify-center pointer-events-auto z-30 relative">
          <Header />
        </div>

        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center">
          <div className="mt-[20%] text-center">
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
            <div className="mt-[20%] mb-20 pointer-events-auto">
              <ChevronDownIcon className="h-10 w-10 text-white animate-bounce" />
            </div>
          )}
        </div>

        <div className="flex flex-row items-center justify-center py-20">
          <div className="flex flex-col items-center justify-center w-[45%] h-screen">
            <div>
              <h3 className="text-4xl font-bold">
                About Me
              </h3>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Hi My name is Theodore Romeo S. Bascon
              </h1>
            </div>
            <p className="mt-4 text-lg max-w-prose text-center px-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="mt-4 text-lg max-w-prose text-center px-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-[45%] overflow-hidden h-screen"> {/* Added overflow-hidden for safety */}
            <FloatingAstronaut
              src="/astronaut.svg"
              alt="Floating Astronaut"
              width={350}
              height={350}
              floatRange={50} // Recommended adjustment: 50px for more noticeable movement
              floatDuration={5000} // How long each random move takes (in milliseconds)
              transitionDuration={5000} // How long the CSS transition for movement lasts (in milliseconds)
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center py-20 bg-gray-100">
          <h2 className="text-3xl font-bold">Portfolio Section (Scroll Down!)</h2>
        </div>

      </div>
    </div>
  );
}