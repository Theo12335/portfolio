// app/components/footer.tsx
'use client';

import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

const Footer: React.FC = () => (
    <footer className="flex flex-col w-full bg-[#0A162E] text-white justify-center items-center bg-opacity-80 pointer-events-auto py-[1.5%]">
        <div className="flex flex-col items-center justify-left border-b border-white w-[80%] sm:w-[70%] md:w-[60%] py-2"> {/* Made width slightly more responsive */}
            {/* Container for Text and Icons - MODIFIED for responsive layout */}
            <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between w-full mb-4">
                {/* Text Section - MODIFIED for responsive alignment */}
                <div className="flex flex-col items-center text-center md:items-start md:text-left"> {/* Corrected `first-letter:` typo and made alignment responsive */}
                    <div>
                        {/* Title - Text alignment made responsive */}
                        <h2 className="flex justify-center md:justify-start text-3xl font-bold">Connect with Me</h2>
                    </div>
                    <div>
                        {/* Subtext - Text alignment made responsive */}
                        <p className="flex justify-center md:justify-start text-sm pt-2 text-[#C1E8FF]">
                            Ready for opportunities and collaborations!
                        </p>
                    </div>
                </div>

                {/* Icons Section - MODIFIED for responsive layout and sizing */}
                <div className="flex flex-row justify-center md:justify-end gap-4 md:gap-5 mt-4 md:mt-0"> {/* Adjusted gap and margin for mobile */}
                    <Link href="https://github.com/Theo12335" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="pointer-events-auto">
                        <FaGithub className="text-3xl md:text-4xl hover:text-[#00a6c0] transition-colors duration-200" /> {/* Responsive icon size */}
                    </Link>
                    <Link href="https://www.linkedin.com/in/theodore-romeo-bascon-a98a01282/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="pointer-events-auto">
                        <FaLinkedin className="text-3xl md:text-4xl hover:text-[#00a6c0] transition-colors duration-200" /> {/* Responsive icon size */}
                    </Link>
                    <Link href="https://www.facebook.com/theodore.bascon.3/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="pointer-events-auto">
                        <FaFacebook className="text-3xl md:text-4xl hover:text-[#00a6c0] transition-colors duration-200" /> {/* Responsive icon size */}
                    </Link>
                    <Link href="https://www.instagram.com/theodorebascon/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="pointer-events-auto">
                        <FaInstagram className="text-3xl md:text-4xl hover:text-[#00a6c0] transition-colors duration-200" /> {/* Responsive icon size */}
                    </Link>
                    <Link href="https://x.com/rhoetheo" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="pointer-events-auto">
                        <BsTwitterX className="text-3xl md:text-4xl hover:text-[#00a6c0] transition-colors duration-200" /> {/* Responsive icon size */}
                    </Link>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full pt-[2%] text-[#00a6c0] px-4 text-center"> {/* Added px-4 and text-center for copyright on small screens */}
            <h1 className="text-sm mb-1">© 2025 Theodore Romeo S. Bascon. All Rights Reserved.</h1> {/* Made copyright text slightly smaller */}
        </div>
    </footer>
);

export default Footer;