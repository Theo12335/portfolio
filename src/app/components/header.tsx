// app/components/header.tsx
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => (
    <header className="fixed top-0 left-0 right-0 z-10 w-full py-4 flex justify-center pointer-events-auto">
        <div
            className="flex flex-row w-[95%] rounded-3xl py-3 items-center"
            style={{ backgroundColor: 'rgba(7, 131, 152, 0.3)' }}
        >
            <div className="flex flex-row items-center justify-center w-[30%] ml-[2%]">
                <Link href="/">
                    <Image
                        className="w-[25%] h-[25%]"
                        src="/logo.svg"
                        alt="Logo"
                        width={80}
                        height={80}
                        priority
                    />
                </Link>
            </div>
            <div className="flex flex-row items-center justify-end px-[7%] text-white w-[70%]">
                <a
                    href="#about-me"
                    onClick={(e) => {
                        e.preventDefault();
                        const aboutMeSection = document.getElementById('about-me');
                        if (aboutMeSection) {
                            aboutMeSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="mr-4 hover:scale-110 hover:text-white transition-all duration-300"
                    aria-label="Scroll to About Me section"
                >
                    About Me
                </a>
                <a
                    href="#skils"
                    onClick={(e) => {
                        e.preventDefault();
                        const aboutMeSection = document.getElementById('skills');
                        if (aboutMeSection) {
                            aboutMeSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="mr-4 hover:scale-110 hover:text-white transition-all duration-300"
                    aria-label="Scroll to About Me section"
                >
                    Tech Stack
                </a>
                <Link href="#portfolio" className="mr-4 hover:scale-110 hover:text-white transition-all duration-300"> {/* Added mr-4 for consistency */}
                    Portfolio
                </Link>
                <div className="flex items-center justify-center ml-4">
                    <Link href="#contact" className="bg-[#00a6c0] text-white px-4 py-2 rounded-2xl hover:scale-105 hover:bg-[#557793] hover:text-white transition-all duration-150 font-bold"> {/* Fixed text-[#FFFFF] to text-white */}
                        Let&apos;s Connect!
                    </Link>
                </div>
            </div>
        </div>
    </header>
);

export default Header;