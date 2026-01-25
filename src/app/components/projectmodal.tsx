// app/components/ProjectModal.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { BsGlobe } from 'react-icons/bs';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Portal from './portal';

interface Project {
    id: number;
    image: string;
    hoverImage: string;
    title: string;
    description: string;
    shortDescription: string;
    tech: string[];
    logo: string;
    githubUrl?: string;
    websiteUrl?: string;
    contributions: string;
    galleryImages: string[];
    projectInfo: string;
    color: string;
}

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const gallerySlideCount = project.galleryImages.length;
    const galleryAutoCycleIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const goToGallerySlide = (index: number) => {
        let newIndex = index;
        if (newIndex < 0) newIndex = gallerySlideCount - 1;
        else if (newIndex >= gallerySlideCount) newIndex = 0;
        setGalleryCurrentIndex(newIndex);
    };

    const startGalleryAutoCycle = React.useCallback(() => {
        if (galleryAutoCycleIntervalRef.current) clearInterval(galleryAutoCycleIntervalRef.current);
        galleryAutoCycleIntervalRef.current = setInterval(() => {
            setGalleryCurrentIndex((prev) => (prev + 1) % gallerySlideCount);
        }, 4000);
    }, [gallerySlideCount]);

    const stopGalleryAutoCycle = React.useCallback(() => {
        if (galleryAutoCycleIntervalRef.current) {
            clearInterval(galleryAutoCycleIntervalRef.current);
            galleryAutoCycleIntervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (gallerySlideCount > 1) startGalleryAutoCycle();
        return () => stopGalleryAutoCycle();
    }, [gallerySlideCount, startGalleryAutoCycle, stopGalleryAutoCycle]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isImageExpanded) setIsImageExpanded(false);
                else onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        // Lock body scroll
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            window.scrollTo(0, scrollY);
        };
    }, [onClose, isImageExpanded]);

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
    };

    return (
        <Portal wrapperId="modal-root">
            <motion.div
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto p-4"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={onClose}
                onWheel={(e) => e.stopPropagation()}
            >
                <motion.div
                    className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl bg-gradient-to-br from-[#0c1929] to-[#020617] border border-white/10 shadow-2xl flex flex-col"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button - Fixed position relative to modal */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300"
                        aria-label="Close project details"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>

                    {/* Scrollable Content */}
                    <div
                        ref={scrollContainerRef}
                        className="overflow-y-auto overscroll-contain flex-1 custom-scrollbar"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {/* Hero Section with Gallery */}
                        <div className="relative">
                            {/* Main Gallery Image */}
                            <div className="relative w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={galleryCurrentIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 cursor-pointer"
                                        onClick={() => setIsImageExpanded(true)}
                                    >
                                        <Image
                                            src={project.galleryImages[galleryCurrentIndex]}
                                            alt={`${project.title} screenshot`}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Gallery Navigation */}
                                {gallerySlideCount > 1 && (
                                    <>
                                        <button
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 z-10"
                                            onClick={() => { stopGalleryAutoCycle(); goToGallerySlide(galleryCurrentIndex - 1); startGalleryAutoCycle(); }}
                                            aria-label="Previous screenshot"
                                        >
                                            <ChevronLeftIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 z-10"
                                            onClick={() => { stopGalleryAutoCycle(); goToGallerySlide(galleryCurrentIndex + 1); startGalleryAutoCycle(); }}
                                            aria-label="Next screenshot"
                                        >
                                            <ChevronRightIcon className="w-5 h-5" />
                                        </button>
                                    </>
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0c1929] to-transparent pointer-events-none" />
                            </div>

                            {/* Thumbnail Strip */}
                            {gallerySlideCount > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10" role="tablist" aria-label="Screenshot thumbnails">
                                    {project.galleryImages.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => { stopGalleryAutoCycle(); setGalleryCurrentIndex(index); startGalleryAutoCycle(); }}
                                            className={`w-12 h-8 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                                                index === galleryCurrentIndex
                                                    ? 'border-[#06b6d4] opacity-100'
                                                    : 'border-transparent opacity-50 hover:opacity-80'
                                            }`}
                                            aria-label={`View screenshot ${index + 1}`}
                                            aria-selected={index === galleryCurrentIndex}
                                            role="tab"
                                        >
                                            <Image
                                                src={img}
                                                alt={`Thumbnail ${index + 1}`}
                                                width={48}
                                                height={32}
                                                className="object-cover w-full h-full"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="p-6 md:p-8">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                                {/* Logo */}
                                <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 relative mx-auto md:mx-0">
                                    <Image
                                        src={project.logo}
                                        alt={`${project.title} logo`}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>

                                {/* Title and Meta */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row items-center md:items-center gap-3 mb-3">
                                        <h2 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h2>
                                        <div className="flex gap-2">
                                            {project.githubUrl && (
                                                <Link
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`View ${project.title} on GitHub`}
                                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
                                                >
                                                    <FaGithub className="text-xl" />
                                                </Link>
                                            )}
                                            {project.websiteUrl && (
                                                <Link
                                                    href={project.websiteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`Visit ${project.title} website`}
                                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
                                                >
                                                    <BsGlobe className="text-xl" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                        {project.tech.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2 mx-auto md:mx-0">
                                    {project.websiteUrl && (
                                        <Link
                                            href={project.websiteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#06b6d4] text-white font-semibold rounded-full hover:bg-[#0891b2] transition-all duration-300 text-sm"
                                        >
                                            <BsGlobe className="text-sm" />
                                            Live Demo
                                        </Link>
                                    )}
                                    {project.githubUrl && (
                                        <Link
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-sm"
                                        >
                                            <FaGithub className="text-sm" />
                                            Source Code
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                            {/* Content Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* My Role */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                        <span className="w-1 h-5 bg-[#06b6d4] rounded-full"></span>
                                        My Role & Contributions
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {project.contributions}
                                    </p>
                                </div>

                                {/* About the Project */}
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                        <span className="w-1 h-5 bg-[#06b6d4] rounded-full"></span>
                                        About the Project
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {project.projectInfo}
                                    </p>
                                </div>
                            </div>

                            {/* Key Features (optional enhancement) */}
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                                    <span className="w-1 h-5 bg-[#06b6d4] rounded-full"></span>
                                    Key Highlights
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                                        <div className="text-2xl font-bold text-[#06b6d4] mb-1">{project.tech.length}</div>
                                        <div className="text-xs text-gray-400">Technologies</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                                        <div className="text-2xl font-bold text-[#06b6d4] mb-1">{project.galleryImages.length}</div>
                                        <div className="text-xs text-gray-400">Screenshots</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                                        <div className="text-2xl font-bold text-[#06b6d4] mb-1">{project.githubUrl ? '✓' : '—'}</div>
                                        <div className="text-xs text-gray-400">Open Source</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                                        <div className="text-2xl font-bold text-[#06b6d4] mb-1">{project.websiteUrl ? '✓' : '—'}</div>
                                        <div className="text-xs text-gray-400">Live Demo</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Expanded Image View */}
            <AnimatePresence>
                {isImageExpanded && (
                    <motion.div
                        className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/95 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsImageExpanded(false)}
                        role="dialog"
                        aria-label="Expanded screenshot view"
                    >
                        <button
                            onClick={() => setIsImageExpanded(false)}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
                            aria-label="Close expanded view"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-full h-full max-w-7xl max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={project.galleryImages[galleryCurrentIndex]}
                                alt={`${project.title} screenshot expanded`}
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                        {gallerySlideCount > 1 && (
                            <>
                                <button
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
                                    onClick={(e) => { e.stopPropagation(); goToGallerySlide(galleryCurrentIndex - 1); }}
                                    aria-label="Previous screenshot"
                                >
                                    <ChevronLeftIcon className="w-6 h-6" />
                                </button>
                                <button
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
                                    onClick={(e) => { e.stopPropagation(); goToGallerySlide(galleryCurrentIndex + 1); }}
                                    aria-label="Next screenshot"
                                >
                                    <ChevronRightIcon className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </Portal>
    );
};

export default ProjectModal;
