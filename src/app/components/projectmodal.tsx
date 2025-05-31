// app/components/ProjectModal.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { BsGlobe } from 'react-icons/bs';
import Portal from './portal'; // Import the new Portal component

// Define the Project interface (consistent with Carousel.tsx)
interface Project {
  id: number;
  image: string;
  hoverImage: string;
  title: string;
  description: string;
  shortDescription: string;
  tech1: string;
  tech2: string;
  tech3: string;
  logo: string;
  githubUrl?: string;
  websiteUrl?: string;
  contributions: string;
  galleryImages: string[];
  projectInfo: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // ... (rest of your existing state and functions like galleryCurrentIndex, etc.)

  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const gallerySlideCount = project.galleryImages.length;
  const galleryAutoCycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToGallerySlide = (index: number) => {
    let newIndex = index;
    if (newIndex < 0) {
      newIndex = gallerySlideCount - 1;
    } else if (newIndex >= gallerySlideCount) {
      newIndex = 0;
    }
    setGalleryCurrentIndex(newIndex);
  };

  const startGalleryAutoCycle = React.useCallback(() => {
    if (galleryAutoCycleIntervalRef.current) {
      clearInterval(galleryAutoCycleIntervalRef.current);
    }
    galleryAutoCycleIntervalRef.current = setInterval(() => {
      setGalleryCurrentIndex((prevIndex) => (prevIndex + 1) % gallerySlideCount);
    }, 4000);
  }, [gallerySlideCount]);

  const stopGalleryAutoCycle = React.useCallback(() => {
    if (galleryAutoCycleIntervalRef.current) {
      clearInterval(galleryAutoCycleIntervalRef.current);
      galleryAutoCycleIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (galleryTrackRef.current) {
      galleryTrackRef.current.style.transform = `translateX(-${galleryCurrentIndex * 100}%)`;
    }
    if (gallerySlideCount > 1) {
      startGalleryAutoCycle();
    }
    return () => {
      stopGalleryAutoCycle();
    };
  }, [galleryCurrentIndex, gallerySlideCount, startGalleryAutoCycle, stopGalleryAutoCycle]);


  // IMPORTANT: Keep your animation styles in ProjectModal.tsx as they are specific to the modal's appearance.
  // No need to move them to global styles or app/layout.
  useEffect(() => {
    if (typeof document === 'undefined') return;

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


  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
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
    // Wrap the entire modal structure with the Portal component
    <Portal wrapperId="modal-root">
      {/* Outer overlay: fixed, covers whole screen, flexbox for centering */}
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-70 pointer-events-auto overflow-y-auto p-4 sm:p-8">
        {/* Modal content container: main modal box, now with max-h and overflow-y-auto */}
        <div className="modal-content-container bg-gray-900 text-white rounded-lg border border-gray-600 w-11/12 max-w-4xl relative shadow-xl transform transition-all duration-300 scale-95 opacity-0 animate-modal-enter
                         flex flex-col max-h-[90vh] overflow-y-auto bg-opacity-[90%}">
          {/* Modal content inner padding, previously was on the main div */}
          <div className="p-4 sm:p-8">
            {/* Close Button */}
            <span
              className="absolute top-4 right-6 text-gray-400 text-4xl font-bold cursor-pointer transition-colors duration-200 hover:text-white z-10"
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
                  <h2 className="text-4xl md:text-5xl font-bold text-white">{project.title}</h2>
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
                </div>
              </div>
            </div>

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
    </Portal>
  );
};

export default ProjectModal;