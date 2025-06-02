// components/Carousel.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ProjectModal from './projectmodal'; // Assuming this path is correct

// Define the Project interface with all properties
interface Project {
    id: number;
    image: string;
    hoverImage: string;
    title: string;
    shortDescription: string;
    description: string;
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

const projectsData: Project[] = [
    {
        id: 1,
        image: '/BSDOC.svg',
        hoverImage: '/BSDOC1.png',
        title: 'BSDOC',
        shortDescription: 'BSDOC began as a Windows Forms application that I initially developed on my own. Over time, our team evolved it into a web-based platform designed to help users manage minor health concerns. It offers OTC medication suggestions, a symptom checker, and access to trusted health resources, making self-care more convenient and accessible.',
        tech1: 'Next.js',
        tech2: 'Tailwind CSS',
        tech3: 'TypeScript',
        description: 'BSDOC is a web-based application I helped develop as part of a group project for our Modern Systems Analysis and Design course, marking my first experience in web development as the lead front-end designer and developer. The app assists users in managing common health issues by allowing them to enter symptoms, receive over-the-counter medication suggestions, and access home care guidance. A core feature is its symptom checker, which analyzes user input to identify potential conditions and recommend appropriate treatments. I integrated Firebase to securely store user profiles and symptom history, enabling personalized recommendations based on previous entries.',
        logo: '/BSDOC.svg',
        githubUrl: 'https://github.com/mantequilla45/bsdoc',
        websiteUrl: 'https://bsdoc-project.vercel.app/',
        contributions: 'BSDOC started as my idea for a Windows Forms project, I focused on developing the front-end user interface, logo designing, ensuring a responsive and intuitive experience across various devices. My responsibilities included implementing the symptom checker logic, refining the medication suggestions, implementing symptom tracking for the admin dashboard, and making sure that the medical history for each user is reflected on unto the profile. I also led design discussions to refine the overall user flow and contributed significantly to the backend logic for data processing and secure resource access, improving both functionality and user engagement.',
        galleryImages: [
            '/BSDOC1.png',
            '/BSDOC2.png',
            '/BSDOC3.png',
            '/BSDOC4.png',
            '/BSDOC5.png',
            '/BSDOC6.png',
        ],
        projectInfo: 'BSDOC stands out by combining accessible health information with practical self-care tools. It was developed with a strong emphasis on user privacy and data security, adhering to industry best practices. The platform is continuously updated based on user feedback and emerging health guidelines to provide the most relevant and reliable information. This project highlights my ability to adapt existing solutions into modern web applications and manage complex features like real-time health data processing.',
    },
    {
        id: 2,
        image: '/SyncLogo.svg',
        hoverImage: '/Landing.png',
        title: 'Sync',
        shortDescription: 'Sync is a real-time collaboration platform we built to streamline document editing, task tracking, and team communication. It enables efficient teamwork through features such as live updates, version tracking, and secure user access management.',
        tech1: 'Next.js',
        tech2: 'React',
        tech3: 'Firebase',
        description: 'Sync is a sophisticated real-time collaboration platform designed to enhance team productivity and communication. This full-stack application leverages Next.js for a fast and scalable frontend, React for interactive UI components, and Firebase for robust backend services, including real-time database and authentication. It facilitates seamless collaboration across various functionalities from document editing to task assignments.',
        logo: '/SyncLogo.svg',
        githubUrl: 'https://github.com/mantequilla45/Sync',
        websiteUrl: 'https://sync-project.vercel.app/',
        contributions: 'My primary role in the Sync project involved developing the real-time document editing feature, utilizing Firebase’s real-time database capabilities to ensure seamless updates across all collaborators. I also implemented the user authentication system and designed the task management interface, focusing on user experience and data synchronization. I contributed significantly to the overall architecture, conducting rigorous testing and debugging to ensure a stable and performant application capable of handling multiple concurrent users.',
        galleryImages: [
            '/Landing.png',
            '/About.png',
            '/DocumentPage.png',
            '/Home.png',
            '/TaskManager.png',
            '/Account.png',
        ],
        projectInfo: 'The core innovation of Sync lies in its ability to provide a truly collaborative environment where multiple users can interact with documents and tasks simultaneously without conflicts. It includes advanced features like version history, role-based access control, and integrated chat, making it an ideal solution for remote and distributed teams. This project showcases my expertise in real-time data handling, user management, and building highly interactive web applications.',
    },
];

interface CarouselProps {
    onOpenModal: () => void;
    onCloseModal: () => void;
}

const Carousel: React.FC<CarouselProps> = ({ onOpenModal, onCloseModal }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoCycleIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const slideCount = projectsData.length;

    const goToSlide = (index: number) => {
        let newIndex = index;
        if (newIndex < 0) {
            newIndex = slideCount - 1;
        } else if (newIndex >= slideCount) {
            newIndex = 0;
        }
        setCurrentIndex(newIndex);
    };

    const startAutoCycle = React.useCallback(() => {
        if (autoCycleIntervalRef.current) {
            clearInterval(autoCycleIntervalRef.current);
        }
        autoCycleIntervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
        }, 3000);
    }, [slideCount]);

    const stopAutoCycle = React.useCallback(() => {
        if (autoCycleIntervalRef.current) {
            clearInterval(autoCycleIntervalRef.current);
            autoCycleIntervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        startAutoCycle();
        return () => {
            stopAutoCycle();
        };
    }, [currentIndex, slideCount, startAutoCycle, stopAutoCycle]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        stopAutoCycle();
        onOpenModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        startAutoCycle();
        onCloseModal();
    };

    return (
        <>
            <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg pointer-events-auto">
                <div
                    ref={trackRef}
                    className="flex transition-transform duration-500 ease-in-out"
                >
                    {projectsData.map((project) => (
                        <div
                            key={project.id}
                            className="group min-w-full text-center cursor-pointer flex flex-col items-center justify-center bg-transparent p-4 relative overflow-hidden"
                            onClick={() => openModal(project)}
                        >
                            {/* MODIFIED: Image container height is now responsive */}
                            <div className="relative w-full h-60 md:h-96 mb-4 transition-all duration-300">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    layout="fill"
                                    objectFit="contain"
                                    className="absolute top-0 left-0 w-full h-full opacity-100 transition-opacity duration-300 group-hover:opacity-0"
                                    priority
                                />
                                <Image
                                    src={project.hoverImage}
                                    alt={`${project.title} (hover)`}
                                    layout="fill"
                                    objectFit="contain"
                                    className="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    priority
                                />
                            </div>
                            <h3 className="text-5xl font-bold text-white mb-2 py-3">{project.title}</h3>
                            <p className="pb-2">
                                <span className="text-s bg-[#00a6c0] rounded-full px-2 py-1">{project.tech1}</span>
                                <span className="text-s bg-[#00a6c0] rounded-full px-2 py-1 ml-3">{project.tech2}</span>
                                <span className="text-s bg-[#00a6c0] rounded-full px-2 py-1 ml-3">{project.tech3}</span>
                            </p>
                            <p className="text-[#c1e8ff] text-sm max-w-prose mt-1">{project.shortDescription}</p>
                        </div>
                    ))}
                </div>
                {slideCount > 1 && (
                    <>
                        <button
                            className="absolute top-1/2 -translate-y-1/2 bg-transparent bg-opacity-60 text-white border-none p-3 cursor-pointer z-10 text-2xl rounded-full transition-colors duration-300 hover:bg-opacity-80 left-4"
                            onClick={() => { stopAutoCycle(); goToSlide(currentIndex - 1); startAutoCycle(); }}
                        >
                            ❮
                        </button>
                        <button
                            className="absolute top-1/2 -translate-y-1/2 bg-transparent bg-opacity-60 text-white border-none p-3 cursor-pointer z-10 text-2xl rounded-full transition-colors duration-300 hover:bg-opacity-80 right-4"
                            onClick={() => { stopAutoCycle(); goToSlide(currentIndex + 1); startAutoCycle(); }}
                        >
                            ❯
                        </button>
                    </>
                )}
            </div>

            {isModalOpen && selectedProject && (
                <ProjectModal project={selectedProject} onClose={closeModal} />
            )}
        </>
    );
};

export default Carousel;