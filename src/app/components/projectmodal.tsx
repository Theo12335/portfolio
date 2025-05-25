// app/components/ProjectModal.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';   // GitHub icon
import { BsGlobe } from 'react-icons/bs';   // Website icon

// Define the Project interface (needs to be consistent with Carousel.tsx)
interface Project {
  id: number;
  image: string;
  hoverImage: string;
  title: string;
  description: string; // Full description
  shortDescription: string;
  tech1: string;
  tech2: string;
  tech3: string;
  logo: string;
  githubUrl?: string;
  websiteUrl?: string;
  contributions: string;
  galleryImages: string[]; // Array of image paths for the second carousel
  projectInfo: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const gallerySlideCount = project.galleryImages.length;
  const galleryAutoCycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Gallery navigation functions
  const goToGallerySlide = (index: number) => {
    let newIndex = index;
    if (newIndex < 0) {
      newIndex = gallerySlideCount - 1;
    } else if (newIndex >= gallerySlideCount) {
      newIndex = 0;
    }
    setGalleryCurrentIndex(newIndex);
  };

  // Functions to start/stop gallery auto-cycle
  const startGalleryAutoCycle = React.useCallback(() => {
    if (galleryAutoCycleIntervalRef.current) {
      clearInterval(galleryAutoCycleIntervalRef.current);
    }
    galleryAutoCycleIntervalRef.current = setInterval(() => {
      setGalleryCurrentIndex((prevIndex) => (prevIndex + 1) % gallerySlideCount);
    }, 4000); // Auto-cycle every 4 seconds for gallery (can adjust)
  }, [gallerySlideCount]);

  const stopGalleryAutoCycle = React.useCallback(() => {
    if (galleryAutoCycleIntervalRef.current) {
      clearInterval(galleryAutoCycleIntervalRef.current);
      galleryAutoCycleIntervalRef.current = null;
    }
  }, []);

  // Effect to update gallery slide position and manage auto-cycle
  useEffect(() => {
    if (galleryTrackRef.current) {
      galleryTrackRef.current.style.transform = `translateX(-${galleryCurrentIndex * 100}%)`;
    }

    if (gallerySlideCount > 1) {
      startGalleryAutoCycle();
    }

    return () => {
      stopGalleryAutoCycle(); // Clean up interval on component unmount
    };
  }, [galleryCurrentIndex, gallerySlideCount, startGalleryAutoCycle, stopGalleryAutoCycle]);

  // REMOVE THIS useEffect BLOCK:
  // useEffect(() => {
  //   const originalOverflow = document.body.style.overflow;
  //   const originalPaddingRight = document.body.style.paddingRight;

  //   // Calculate scrollbar width to prevent content reflow when scrollbar disappears
  //   const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  //   document.body.style.overflow = 'hidden';
  //   if (scrollbarWidth > 0) {
  //     document.body.style.paddingRight = `${scrollbarWidth}px`;
  //   }

  //   return () => {
  //     document.body.style.overflow = originalOverflow;
  //     document.body.style.paddingRight = originalPaddingRight;
  //   };
  // }, []);


  // Dynamically inject CSS for modal animation
  useEffect(() => {
    if (typeof document === 'undefined') return; // Ensure it's client-side

    const styleId = 'modal-animation-styles';
    let styleTag = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = `
      @keyframes modal-enter-kf {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .animate-modal-enter {
        animation: modal-enter-kf 0.3s ease-out forwards;
      }
    `;

    return () => {
      if (document.head.contains(styleTag)) {
        document.head.removeChild(styleTag);
      }
    };
  }, []);

  // Close modal if user clicks outside of the modal content
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Find the main modal content container by its class or ID
      // It's crucial to select the specific div that contains the modal's actual content
      const modalContent = document.querySelector('.modal-content-container');
      if (modalContent && !modalContent.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    // Outer overlay: fixed, covers whole screen, flexbox for centering
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-70 pointer-events-auto overflow-y-auto p-4 sm:p-8"> {/* Added p-4/p-8 for small screen padding */}
      {/* Modal content container: main modal box, now with max-h and overflow-y-auto */}
      <div className="modal-content-container bg-gray-800 text-white rounded-lg border border-gray-600 w-11/12 max-w-4xl relative shadow-xl transform transition-all duration-300 scale-95 opacity-0 animate-modal-enter
                   flex flex-col max-h-[90vh] overflow-y-auto"> {/* Added modal-content-container for outside click detection */}
        {/* Modal content inner padding, previously was on the main div */}
        <div className="p-4 sm:p-8"> {/* Internal padding for content */}
            {/* Close Button */}
            <span
              className="absolute top-4 right-6 text-gray-400 text-4xl font-bold cursor-pointer transition-colors duration-200 hover:text-white z-10" // Added z-10
              onClick={onClose}
            >
              &times;
            </span>

            {/* Header Section: Logo, Title, Tech, Social Links */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              {/* Large Logo */}
              <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 relative">
                <Image
                  src={project.logo}
                  alt={`${project.title} logo`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                  priority
                />
              </div>

              {/* Title, Tech, and External Links */}
              <div className="flex flex-col text-center md:text-left flex-grow">
                <div className="flex flex-col md:flex-row items-center md:items-baseline justify-center md:justify-start gap-4 mb-2">
                  <h2 className="text-4xl md:text-5xl font-bold text-[#C1E8FF]">{project.title}</h2>
                  {/* GitHub and Website Links */}
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="text-gray-400 hover:text-white transition-colors duration-200">
                        <FaGithub className="text-3xl" />
                      </Link>
                    )}
                    {project.websiteUrl && (
                      <Link href={project.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Website" className="text-gray-400 hover:text-white transition-colors duration-200">
                        <BsGlobe className="text-3xl" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Tech Labels */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                  <span className="text-sm bg-[#00a6c0] text-white rounded-full px-3 py-1 font-medium">{project.tech1}</span>
                  <span className="text-sm bg-[#00a6c0] text-white rounded-full px-3 py-1 font-medium">{project.tech2}</span>
                  <span className="text-sm bg-[#00a6c0] text-white rounded-full px-3 py-1 font-medium">{project.tech3}</span>
                  {/* Add more tech labels here as needed */}
                </div>
              </div>
            </div>

            {/* Project Description (Original Full Description) */}

            {/* My Contributions Paragraph */}
            <h3 className="text-2xl font-bold text-[#00a6c0] mb-3 mt-6">My Contributions</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">{project.contributions}</p>

            {/* Project Gallery Carousel */}
            {project.galleryImages.length > 0 && (
              <>
                <h3 className="text-2xl font-bold text-[#00a6c0] mb-3 mt-6">Project Gallery</h3>
                <div className="relative w-full overflow-hidden rounded-lg border border-gray-700 mb-8">
                  <div
                    ref={galleryTrackRef}
                    className="flex transition-transform duration-500 ease-in-out"
                  >
                    {project.galleryImages.map((imgSrc, index) => (
                      <div key={index} className="min-w-full flex items-center justify-center bg-gray-900 p-4">
                        <Image
                          src={imgSrc}
                          alt={`Gallery image ${index + 1} for ${project.title}`}
                          width={800}
                          height={500}
                          objectFit="contain"
                          className="w-full h-auto block max-h-[60vh]"
                          priority={index === 0}
                        />
                      </div>
                    ))}
                  </div>
                  {gallerySlideCount > 1 && (
                    <>
                      <button
                        className="absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white border-none p-3 cursor-pointer z-10 text-2xl rounded-full transition-colors duration-300 hover:bg-opacity-80 left-4"
                        onClick={() => { stopGalleryAutoCycle(); goToGallerySlide(galleryCurrentIndex - 1); startGalleryAutoCycle(); }}
                      >
                        ❮
                      </button>
                      <button
                        className="absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white border-none p-3 cursor-pointer z-10 text-2xl rounded-full transition-colors duration-300 hover:bg-opacity-80 right-4"
                        onClick={() => { stopGalleryAutoCycle(); goToGallerySlide(galleryCurrentIndex + 1); startGalleryAutoCycle(); }}
                      >
                        ❯
                      </button>
                    </>
                  )}
                </div>
              </>
            )}

            {/* Additional Project Information Paragraph */}
            <h3 className="text-2xl font-bold text-[#00a6c0] mb-3 mt-6">More About the Project</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">{project.projectInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;