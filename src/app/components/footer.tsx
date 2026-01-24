// app/components/footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { ChevronUpIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: FaGithub, href: 'https://github.com/Theo12335', label: 'GitHub', hoverColor: 'hover:text-white' },
        { icon: FaLinkedin, href: 'https://www.linkedin.com/in/theodore-romeo-bascon-a98a01282/', label: 'LinkedIn', hoverColor: 'hover:text-[#0077b5]' },
        { icon: FaFacebook, href: 'https://www.facebook.com/theodore.bascon.3/', label: 'Facebook', hoverColor: 'hover:text-[#1877f2]' },
        { icon: FaInstagram, href: 'https://www.instagram.com/theodorebascon/', label: 'Instagram', hoverColor: 'hover:text-[#e4405f]' },
        { icon: BsTwitterX, href: 'https://x.com/rhoetheo', label: 'X', hoverColor: 'hover:text-white' },
    ];

    const quickLinks = [
        { label: 'About Me', href: '#about-me' },
        { label: 'Tech Stack', href: '#skills' },
        { label: 'Projects', href: '#projects' },
    ];

    return (
        <footer className="relative w-full bg-gradient-to-b from-transparent to-[#020617] text-white pointer-events-auto">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Mobile Compact Footer */}
            <div className="md:hidden px-4 py-6">
                {/* Top row: Logo + Back to top */}
                <div className="flex items-center justify-between mb-4">
                    <Link href="#hero" className="flex items-center gap-2">
                        <Image
                            src="/logo.svg"
                            alt="TRB Logo"
                            width={32}
                            height={32}
                            className="opacity-80"
                        />
                        <span className="text-sm font-semibold text-white">TRB</span>
                    </Link>
                    <motion.button
                        onClick={scrollToTop}
                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronUpIcon className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* Social Links Row */}
                <div className="flex items-center justify-center gap-4 mb-4">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className={`p-2 rounded-lg bg-white/5 text-gray-400 ${social.hoverColor} hover:bg-white/10 transition-all duration-300`}
                        >
                            <social.icon className="text-base" />
                        </a>
                    ))}
                </div>

                {/* Contact Button */}
                <a
                    href="mailto:theodore12335@gmail.com"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#06b6d4]/10 text-[#06b6d4] text-sm font-medium rounded-lg hover:bg-[#06b6d4]/20 transition-all duration-300 mb-4"
                >
                    <EnvelopeIcon className="w-4 h-4" />
                    theodore12335@gmail.com
                </a>

                {/* Copyright */}
                <p className="text-gray-500 text-xs text-center">
                    © {currentYear} Theodore Romeo S. Bascon
                </p>
            </div>

            {/* Desktop Full Footer */}
            <div className="hidden md:block max-w-6xl mx-auto px-6 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="#hero" className="inline-block">
                            <Image
                                src="/logo.svg"
                                alt="TRB Logo"
                                width={48}
                                height={48}
                                className="opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </Link>
                        <h3 className="text-xl font-bold text-white">Theodore Romeo Bascon</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Full Stack Developer passionate about building high-performance web applications with modern technologies.
                        </p>
                        {/* Contact Info */}
                        <div className="space-y-2 pt-2">
                            <a
                                href="mailto:theodore12335@gmail.com"
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#06b6d4] transition-colors"
                            >
                                <EnvelopeIcon className="w-4 h-4" />
                                theodore12335@gmail.com
                            </a>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <MapPinIcon className="w-4 h-4" />
                                Cebu City, Philippines
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-px bg-[#06b6d4] group-hover:w-3 transition-all duration-300" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Let&apos;s Connect</h4>
                        <p className="text-gray-400 text-sm">
                            Open for opportunities and collaborations. Feel free to reach out!
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={`p-2.5 rounded-lg bg-white/5 text-gray-400 ${social.hoverColor} hover:bg-white/10 transition-all duration-300`}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon className="text-lg" />
                                </motion.a>
                            ))}
                        </div>
                        {/* CTA Button */}
                        <a
                            href="mailto:theodore12335@gmail.com"
                            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[#06b6d4] text-white text-sm font-semibold rounded-xl hover:bg-[#0891b2] transition-all duration-300"
                        >
                            <EnvelopeIcon className="w-4 h-4" />
                            Get in Touch
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                {/* Bottom Section */}
                <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Theodore Romeo S. Bascon. All rights reserved.
                    </p>

                    {/* Back to Top Button */}
                    <motion.button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                        whileHover={{ y: -2 }}
                    >
                        Back to top
                        <span className="p-1 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors">
                            <ChevronUpIcon className="w-4 h-4" />
                        </span>
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
