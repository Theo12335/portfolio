// app/components/header.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa';

const Header: React.FC = () => {
    const [showConnectDesktopDropdown, setShowConnectDesktopDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showConnectMobileModal, setShowConnectMobileModal] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const connectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = ['hero', 'about-me', 'skills', 'projects'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnterConnect = () => {
        if (connectTimeoutRef.current) clearTimeout(connectTimeoutRef.current);
        setShowConnectDesktopDropdown(true);
    };

    const handleMouseLeaveConnect = () => {
        connectTimeoutRef.current = setTimeout(() => setShowConnectDesktopDropdown(false), 200);
    };

    const handleLogoScrollToHero = () => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    const handleMobileConnectClick = () => {
        setIsMobileMenuOpen(false);
        setShowConnectMobileModal(true);
    };

    useEffect(() => {
        if (showConnectMobileModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showConnectMobileModal]);

    const navItems = [
        { id: 'about-me', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
    ];

    const contactItems = [
        { icon: EnvelopeIcon, label: 'Email', value: 'theodore12335@gmail.com', href: 'mailto:theodore12335@gmail.com' },
        { icon: FaWhatsapp, label: 'WhatsApp', value: '+63 976 220 2341', href: 'https://wa.me/639762202341' },
        { icon: FaTelegram, label: 'Telegram', value: '@Theorhoe', href: 'https://t.me/Theorhoe' },
        { icon: FaLinkedin, label: 'LinkedIn', value: 'Theodore Romeo Bascon', href: 'https://www.linkedin.com/in/theodore-romeo-bascon-a98a01282/' },
    ];

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 w-full flex justify-center pointer-events-auto transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div
                    className={`rounded-2xl px-4 md:px-6 items-center flex relative transition-all duration-300 ${isScrolled ? 'w-[92%] md:w-[85%]' : 'w-[95%] md:w-[90%]'}`}
                    style={{
                        backgroundColor: isScrolled ? 'rgba(12, 25, 41, 0.9)' : 'rgba(12, 25, 41, 0.7)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                >
                    {/* Desktop View */}
                    <div className="hidden md:flex items-center justify-between w-full py-2">
                        {/* Logo */}
                        <motion.div
                            onClick={handleLogoScrollToHero}
                            className="cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image
                                src="/logo.svg"
                                alt="TRB Logo"
                                width={isScrolled ? 40 : 48}
                                height={isScrolled ? 40 : 48}
                                priority
                                className="transition-all duration-300"
                            />
                        </motion.div>

                        {/* Navigation */}
                        <nav className="flex items-center gap-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => handleNavClick(e, item.id)}
                                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                                        activeSection === item.id
                                            ? 'text-[#06b6d4]'
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                    <span
                                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#06b6d4] rounded-full transition-all duration-300 ${
                                            activeSection === item.id ? 'w-4' : 'w-0 group-hover:w-4'
                                        }`}
                                    />
                                </a>
                            ))}

                            {/* Connect Button */}
                            <div className="relative ml-2" onMouseEnter={handleMouseEnterConnect} onMouseLeave={handleMouseLeaveConnect}>
                                <motion.button
                                    className="flex items-center gap-1.5 px-4 py-2 bg-[#06b6d4] text-white text-sm font-semibold rounded-xl hover:bg-[#0891b2] transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Let&apos;s Connect
                                    <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${showConnectDesktopDropdown ? 'rotate-180' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {showConnectDesktopDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-72 bg-[#0c1929]/95 backdrop-blur-xl rounded-xl shadow-2xl z-[60] p-4 border border-white/10"
                                        >
                                            <h3 className="text-lg font-semibold text-white mb-3">Get in Touch</h3>
                                            <div className="space-y-1">
                                                {contactItems.map((item, index) => (
                                                    <a
                                                        key={index}
                                                        href={item.href}
                                                        target={item.href.startsWith('mailto') ? undefined : '_blank'}
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                                                    >
                                                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#06b6d4]/20 transition-colors">
                                                            <item.icon className="w-4 h-4 text-[#06b6d4]" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs text-gray-500">{item.label}</p>
                                                            <p className="text-sm text-white truncate">{item.value}</p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </nav>
                    </div>

                    {/* Mobile View */}
                    <div className="flex md:hidden w-full items-center justify-between py-2">
                        <motion.div
                            onClick={handleLogoScrollToHero}
                            className="cursor-pointer"
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image
                                src="/logo.svg"
                                alt="TRB Logo"
                                width={40}
                                height={40}
                                priority
                            />
                        </motion.div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6 text-white" />
                            ) : (
                                <Bars3Icon className="h-6 w-6 text-white" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-xl overflow-hidden border border-white/10"
                                style={{ backgroundColor: 'rgba(12, 25, 41, 0.95)', backdropFilter: 'blur(16px)' }}
                            >
                                <nav className="flex flex-col p-4 gap-1">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.id}
                                            onClick={(e) => handleNavClick(e, item.id)}
                                            className="py-3 px-4 text-white text-center rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                    <button
                                        onClick={handleMobileConnectClick}
                                        className="mt-2 py-3 px-4 bg-[#06b6d4] text-white font-semibold rounded-xl hover:bg-[#0891b2] transition-all"
                                    >
                                        Let&apos;s Connect
                                    </button>
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.header>

            {/* Mobile Contact Modal */}
            <AnimatePresence>
                {showConnectMobileModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 md:hidden"
                        onClick={() => setShowConnectMobileModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#0c1929] p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-white">Get in Touch</h3>
                                <button
                                    onClick={() => setShowConnectMobileModal(false)}
                                    className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <XMarkIcon className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {contactItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        target={item.href.startsWith('mailto') ? undefined : '_blank'}
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                                    >
                                        <div className="p-2.5 rounded-xl bg-[#06b6d4]/10">
                                            <item.icon className="w-5 h-5 text-[#06b6d4]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">{item.label}</p>
                                            <p className="text-sm text-white">{item.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
