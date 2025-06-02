// app/components/header.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Ensure @heroicons/react is installed

const Header: React.FC = () => {
    const [showConnectDesktopDropdown, setShowConnectDesktopDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showConnectMobileModal, setShowConnectMobileModal] = useState(false);
    const connectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnterConnect = () => {
        if (connectTimeoutRef.current) clearTimeout(connectTimeoutRef.current);
        setShowConnectDesktopDropdown(true);
    };
    const handleMouseLeaveConnect = () => {
        connectTimeoutRef.current = setTimeout(() => setShowConnectDesktopDropdown(false), 200);
    };

    const handleLogoScrollToHero = () => {
        console.log("Logo clicked! Scrolling to #hero section...");
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.warn("Element with id 'hero' not found. Scrolling to top...");
            if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen && showConnectMobileModal) setShowConnectMobileModal(false);
    };

    const handleMobileNavLinkClick = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMobileMenuOpen(false);
    };

    const handleMobileConnectClick = () => {
        setIsMobileMenuOpen(false);
        setShowConnectMobileModal(true);
    };

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        if (showConnectMobileModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalOverflow; // Restore previous or default
        }
        return () => {
            document.body.style.overflow = originalOverflow; // Restore on unmount or if state changes back
        };
    }, [showConnectMobileModal]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 w-full py-4 flex justify-center pointer-events-auto">
                <div
                    className="w-[95%] rounded-3xl py-3 px-4 md:px-0 items-center flex relative"
                    style={{ backgroundColor: 'rgba(7, 131, 152, 0.3)' }}
                >
                    {/* --- DESKTOP VIEW --- */}
                    <div className="hidden md:flex flex-row items-center justify-center w-[30%] ml-[2%]">
                        <div onClick={handleLogoScrollToHero} className="cursor-pointer">
                            <Image src="/logo.svg" alt="Logo" width={80} height={80} priority className="w-[25%] h-[25%]" />
                        </div>
                    </div>
                    <nav className="hidden md:flex flex-row items-center justify-end px-[7%] text-white w-[70%]">
                        <a href="#about-me" onClick={(e) => { e.preventDefault(); document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' }); }} className="mr-4 hover:scale-110 hover:text-white transition-all duration-300">About Me</a>
                        <a href="#skills" onClick={(e) => { e.preventDefault(); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); }} className="mr-4 hover:scale-110 hover:text-white transition-all duration-300">Tech Stack</a>
                        <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="mr-4 hover:scale-110 hover:text-white transition-all duration-300">Projects</a>
                        <div className="relative" onMouseEnter={handleMouseEnterConnect} onMouseLeave={handleMouseLeaveConnect}>
                            <button className="bg-[#00a6c0] text-white px-4 py-2 rounded-2xl hover:scale-105 hover:bg-[#557793] hover:text-white transition-all duration-150 font-bold">Let&apos;s Connect!</button>
                            {showConnectDesktopDropdown && (
                                <div className="absolute right-0 mt-2 w-64 bg-[#041d56] bg-opacity-[80%] rounded-lg shadow-lg z-[60] py-2 px-3 flex flex-col items-start">
                                    <h3 className="text-xl font-semibold mb-2 text-white px-2 py-1">Contact Me</h3>
                                    <p className="block w-full text-white text-base py-2 px-2"><strong>Name:</strong> Theodore Romeo S. Bascon</p>
                                    <a href="mailto:theodore12335@gmail.com" className="block w-full text-white text-base py-2 px-2 rounded-md hover:bg-white hover:bg-opacity-10 hover:text-[#00a6c0] transition-colors"><strong>Email:</strong> theodore12335@gmail.com</a>
                                    <a href="https://wa.me/639762202341" target="_blank" rel="noopener noreferrer" className="block w-full text-white text-base py-2 px-2 rounded-md hover:bg-white hover:bg-opacity-10 hover:text-[#00a6c0] transition-colors"><strong>WhatsApp:</strong> +63 976 220 2341</a>
                                    <a href="https://t.me/Theorhoe" target="_blank" rel="noopener noreferrer" className="block w-full text-white text-base py-2 px-2 rounded-md hover:bg-white hover:bg-opacity-10 hover:text-[#00a6c0] transition-colors"><strong>Telegram:</strong> @Theorhoe</a>
                                    <a href="https://www.linkedin.com/in/theodore-romeo-bascon-a98a01282/" target="_blank" rel="noopener noreferrer" className="block w-full text-white text-base py-2 px-2 rounded-md hover:bg-white hover:bg-opacity-10 hover:text-[#00a6c0] transition-colors"><strong>LinkedIn:</strong> Theodore Romeo Bascon</a>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* --- MOBILE VIEW --- */}
                    <div className="flex md:hidden w-full items-center justify-between">
                        <div onClick={handleLogoScrollToHero} className="cursor-pointer">
                            <Image src="/logo.svg" alt="Logo" width={60} height={60} priority />
                        </div>
                        <div>
                            <button onClick={toggleMobileMenu} className="text-white focus:outline-none p-1 rounded-md hover:bg-white hover:bg-opacity-10" aria-label="Toggle menu">
                                {isMobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div
                            className="md:hidden absolute top-full left-0 right-0 mt-1 w-full rounded-b-2xl shadow-xl py-3 z-40" // z-40 to be below header bar content but above page
                            style={{ backgroundColor: 'rgba(7, 131, 152, 0.95)' }}
                        >
                            <nav className="flex flex-col items-center space-y-2 px-4">
                                <a onClick={() => handleMobileNavLinkClick('about-me')} className="text-white py-2 text-lg w-full text-center rounded-md hover:bg-white hover:bg-opacity-20 transition-colors cursor-pointer">About Me</a>
                                <a onClick={() => handleMobileNavLinkClick('skills')} className="text-white py-2 text-lg w-full text-center rounded-md hover:bg-white hover:bg-opacity-20 transition-colors cursor-pointer">Tech Stack</a>
                                <a onClick={() => handleMobileNavLinkClick('projects')} className="text-white py-2 text-lg w-full text-center rounded-md hover:bg-white hover:bg-opacity-20 transition-colors cursor-pointer">Projects</a>
                                <button
                                    onClick={handleMobileConnectClick}
                                    className="bg-[#00a6c0] text-white mt-2 px-4 py-2 text-lg rounded-2xl hover:scale-105 hover:bg-[#557793] transition-all duration-150 font-bold w-full max-w-xs"
                                >
                                    Let&apos;s Connect!
                                </button>
                            </nav>
                        </div>
                    )}
                </div> {/* End of inner rounded bar */}
            </header>

            {/* "Let's Connect!" MOBILE MODAL (Popup Window) */}
            {showConnectMobileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4 md:hidden transition-opacity duration-300 ease-in-out pointer-events-auto"> {/* MODIFIED: Added pointer-events-auto */}
                    <div className="bg-[#072045] p-5 sm:p-6 rounded-xl shadow-2xl max-w-xs w-full relative transform transition-all duration-300 ease-in-out scale-100 opacity-100">
                        <button
                            onClick={() => setShowConnectMobileModal(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10" // Added z-10 to ensure button is above its parent bg
                            aria-label="Close contact modal"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white text-center">Contact Me</h3>
                        <div className="space-y-2 text-sm sm:text-base">
                            <p className="text-white py-1"><strong>Name:</strong> Theodore Romeo S. Bascon</p>
                            <a href="mailto:theodore12335@gmail.com" className="block w-full text-white py-2 px-2 rounded-md hover:bg-white hover:bg-opacity-10 hover:text-[#00a6c0] transition-colors">
                                <strong>Email:</strong> theodore12335@gmail.com
                            </a>
                            <a href="https://wa.me/639762202341" target="_blank" rel="noopener noreferrer" className="block w-full text-white py-2 px-2 rounded-md hover:bg-white hover:bg-opacity-10 hover:text-[#00a6c0] transition-colors">
                                <strong>WhatsApp:</strong> +63 976 220 2341
                            </a>
                            <a href="https://t.me/Theorhoe" target="_blank" rel="noopener noreferrer" className="block w-full text-white py-2 px-2 rounded-md hover:bg-white hover:bg-opacity-10 hover:text-[#00a6c0] transition-colors">
                                <strong>Telegram:</strong> @Theorhoe
                            </a>
                            <a href="https://www.linkedin.com/in/theodore-romeo-bascon-a98a01282/" target="_blank" rel="noopener noreferrer" className="block w-full text-white py-2 px-2 rounded-md hover:bg-white hover:bg-opacity-10 hover:text-[#00a6c0] transition-colors">
                                <strong>LinkedIn:</strong> Theodore Romeo Bascon
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;