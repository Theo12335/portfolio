// app/components/header.tsx
'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
    // Renamed state from showModal to showDropdown for clarity
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <>
            {/* Header (Navigation Bar) */}
            <header className="fixed top-0 left-0 right-0 z-50 w-full py-4 flex justify-center pointer-events-auto">
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
                        {/* Smooth scroll links */}
                        <a
                            href="#about-me"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="mr-4 hover:scale-110 hover:text-white transition-all duration-300"
                        >
                            About Me
                        </a>
                        <a
                            href="#skills"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="mr-4 hover:scale-110 hover:text-white transition-all duration-300"
                        >
                            Tech Stack
                        </a>
                        <a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="mr-4 hover:scale-110 hover:text-white transition-all duration-300"
                        >
                            Projects
                        </a>

                        {/* Let's Connect Dropdown Trigger and Content */}
                        {/* Added a relative container for the dropdown positioning */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShowDropdown(true)} // Show dropdown on hover
                            onMouseLeave={() => setShowDropdown(false)} // Hide dropdown when mouse leaves
                        >
                            <button
                                className="bg-[#00a6c0] text-white px-4 py-2 rounded-2xl hover:scale-105 hover:bg-[#557793] hover:text-white transition-all duration-150 font-bold"
                            >
                                Let&apos;s Connect!
                            </button>

                            {/* Dropdown Content */}
                            {showDropdown && (
                                <div
                                    // Position dropdown absolutely below the button
                                    // z-200 ensures it's above the header (z-50) but below the ProjectModal (z-1000)
                                    className="absolute right-0 mt-2 w-64 bg-[#041d56] bg-opacity-[80%] rounded-lg shadow-lg z-[200]
                                                py-2 px-3 flex flex-col items-start"
                                >
                                    <h3 className="text-xl font-semibold mb-2 text-white px-2 py-1">Contact Me</h3>
                                    {/* Each contact item is now a styled link */}
                                    <p className="block w-full text-white text-base py-2 px-2">
                                        <strong>Name:</strong> Theodore Romeo S. Bascon
                                    </p>
                                    <a
                                        href="mailto:theodore12335@gmail.com"
                                        className="block w-full text-white text-base py-2 px-2 rounded-md
                                                   hover:bg-white hover:bg-opacity-10 hover:text-[#00a6c0] transition-colors"
                                    >
                                        <strong>Email:</strong> theodore12335@gmail.com
                                    </a>
                                    <a
                                        href="https://wa.me/639762202341"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-white text-base py-2 px-2 rounded-md
                                                   hover:bg-white hover:bg-opacity-10 hover:text-[#00a6c0] transition-colors"
                                    >
                                        <strong>WhatsApp:</strong> +63 976 220 2341
                                    </a>
                                    <a
                                        href="https://t.me/Theorhoe"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-white text-base py-2 px-2 rounded-md
                                                   hover:bg-white hover:bg-opacity-10 hover:text-[#00a6c0] transition-colors"
                                    >
                                        <strong>Telegram:</strong> @Theorhoe
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Removed the Contact Modal JSX entirely as it's replaced by the dropdown */}
        </>
    );
};

export default Header;