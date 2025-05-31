'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Header */}
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

                        {/* Let's Connect Button */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-[#00a6c0] text-white px-4 py-2 rounded-2xl hover:scale-105 hover:bg-[#557793] hover:text-white transition-all duration-150 font-bold"
                        >
                            Let&apos;s Connect!
                        </button>
                    </div>
                </div>
            </header>

            {/* Contact Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-black rounded-lg p-6 w-[40%] shadow-lg bg-opacity-[65%] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-white hover:text-[#00a6c0] text-2xl mr-4"
                        >
                            &times;
                        </button>
                        <div className="text-white px-[10%] py-[5%]">
                            <h2 className="text-3xl font-semibold mb-4 text-center px-2 py-4">Contact Me</h2>
                            <p className="mb-4 text-xl px-2 py-4"><strong>Name:</strong> Theodore Romeo S. Bascon</p>
                            <a href="mailto:your.email@example.com" className="hover:text-[#00a6c0]">
                                <p className="mb-4 text-xl hover:bg-white hover:bg-opacity-[10%] rounded-xl px-2 py-4"><strong>Email:</strong> theodore12335@gmail.com</p>
                            </a>
                            <a
                                href="https://wa.me/639762202341"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#00a6c0]"
                            >
                                <p className="mb-4 text-xl px-2 py-4 hover:bg-white hover:bg-opacity-[10%] rounded-xl"><strong>WhatsApp:</strong> +63 976 220 2341</p>
                            </a>
                            <a
                                href="https://t.me/Theorhoe"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#00a6c0]"
                            >
                                <p className="mb-4 text-xl px-2 py-4 hover:bg-white hover:bg-opacity-[10%] rounded-xl"><strong>Telegram:</strong> @Theorhoe</p>
                            </a>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
