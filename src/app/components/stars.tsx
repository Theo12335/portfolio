// src/components/InteractiveStarryBg.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';

const InteractiveStarryBg = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMobile, setIsMobile] = useState(false); // State to track if mobile view
    const animationFrameId = useRef<number | null>(null); // To store animation frame ID

    // Define your mobile breakpoint (e.g., 768px for Tailwind's 'md')
    const mobileBreakpoint = 768;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Common variables
        let stars: Array<{ x: number; y: number; radius: number; vx?: number; vy?: number; opacity?: number }> = [];
        let shootingStars: Array<{ x: number; y: number; len: number; speed: number; angle: number; opacity: number }> = [];
        const mouse = { x: 0, y: 0 };
        const connectionRadius = 150;
        const mouseProximityRadius = 100;

        const checkScreenSize = () => {
            const newIsMobile = window.innerWidth < mobileBreakpoint;
            if (newIsMobile !== isMobile) { // Only update and re-init if mode changes
                setIsMobile(newIsMobile);
                // When screen size changes enough to switch modes, re-initialize
                // This will be caught by the dependency array of the main useEffect
            }
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const initCommonStars = (numStars: number) => {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    // For potential future subtle movement, not used actively in desktop for now
                    vx: (Math.random() - 0.5) * 0.1,
                    vy: (Math.random() - 0.5) * 0.1,
                    opacity: Math.random() * 0.5 + 0.3, // For galaxy stars
                });
            }
        };

        const initShootingStars = () => {
            // Periodically create a shooting star for mobile
            if (isMobile && Math.random() < 0.02 && shootingStars.length < 3) { // Control frequency and max count
                shootingStars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height / 2, // Start mostly from top half
                    len: Math.random() * 80 + 50,
                    speed: Math.random() * 5 + 5,
                    angle: Math.PI / 4 + (Math.random() * Math.PI / 6 - Math.PI / 12), // Angle downwards
                    opacity: 1,
                });
            }
        };


        const drawCommonStars = () => {
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity || 0.8})`;
                ctx.fill();
            });
        };

        const drawShootingStars = () => {
            shootingStars.forEach((ss, index) => {
                ctx.beginPath();
                const tailX = ss.x - ss.len * Math.cos(ss.angle);
                const tailY = ss.y - ss.len * Math.sin(ss.angle);
                const gradient = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(tailX, tailY);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Move shooting star
                ss.x += ss.speed * Math.cos(ss.angle);
                ss.y += ss.speed * Math.sin(ss.angle);
                ss.opacity -= 0.01; // Fade out

                // Remove if faded or off-screen
                if (ss.opacity <= 0 || ss.x > canvas.width + ss.len || ss.y > canvas.height + ss.len) {
                    shootingStars.splice(index, 1);
                }
            });
        };

        const animateDesktop = () => {
            animationFrameId.current = requestAnimationFrame(animateDesktop);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCommonStars();

            stars.forEach(star1 => {
                const distToMouse = Math.sqrt(Math.pow(star1.x - mouse.x, 2) + Math.pow(star1.y - mouse.y, 2));
                if (distToMouse < mouseProximityRadius) {
                    stars.forEach(star2 => {
                        if (star1 === star2) return;
                        const distance = Math.sqrt(Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2));
                        if (distance < connectionRadius) {
                            ctx.beginPath();
                            ctx.moveTo(star1.x, star1.y);
                            ctx.lineTo(star2.x, star2.y);
                            const opacity = 1 - (distance / connectionRadius);
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`; // Slightly more subtle
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    });
                }
            });
        };

        const animateMobile = () => {
            animationFrameId.current = requestAnimationFrame(animateMobile);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCommonStars(); // Galaxy stars
            initShootingStars(); // Potentially add new shooting stars
            drawShootingStars(); // Draw and move existing shooting stars
        };

        // --- Setup ---
        const initialize = () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            checkScreenSize(); // This sets canvas width/height and isMobile

            if (isMobile) {
                initCommonStars(200); // More stars for a galaxy feel
                shootingStars = []; // Reset shooting stars
                animateMobile();
            } else {
                initCommonStars(150); // Original number for desktop
                animateDesktop();
            }
        };


        initialize(); // Initial setup

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        const handleResize = () => {
            // Check screen size might trigger a re-initialization if mode changes
            const currentModeIsMobile = window.innerWidth < mobileBreakpoint;
            if (currentModeIsMobile !== isMobile) {
                // Mode changed, useEffect will re-run due to isMobile dependency change
                setIsMobile(currentModeIsMobile);
            } else {
                // Mode didn't change, just resize canvas and re-initialize elements without full effect re-run
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                if (isMobile) {
                    initCommonStars(200);
                    shootingStars = [];
                } else {
                    initCommonStars(150);
                }
            }
        };

        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        window.addEventListener('resize', handleResize);

        return () => {
            if (!isMobile) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            window.removeEventListener('resize', handleResize);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isMobile]); // Re-run effect if `isMobile` state changes

    // Effect to initially set screen size and add listener for it
     useEffect(() => {
        const initialCheck = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };
        initialCheck(); // Set initial state

        // We only need one resize listener for setting the isMobile state
        // The other resize logic is handled inside the main useEffect
        const updateMobileStateOnResize = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };
        window.addEventListener('resize', updateMobileStateOnResize);
        return () => window.removeEventListener('resize', updateMobileStateOnResize);
    }, []);


    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-[-1]"
        />
    );
};

export default InteractiveStarryBg;