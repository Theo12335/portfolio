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

        const createShootingStar = () => {
            // Random starting position - mostly from top and left edges
            const startFromTop = Math.random() > 0.3;
            let x, y;

            if (startFromTop) {
                x = Math.random() * canvas.width;
                y = -10;
            } else {
                x = -10;
                y = Math.random() * canvas.height * 0.5;
            }

            shootingStars.push({
                x,
                y,
                len: Math.random() * 120 + 80,
                speed: Math.random() * 12 + 8,
                angle: Math.PI / 4 + (Math.random() * 0.4 - 0.2), // ~45 degrees diagonal with variation
                opacity: 1,
            });
        };

        // Spawn shooting stars at intervals
        let lastShootingStarTime = 0;
        const shootingStarInterval = 1200; // New star every 1.2 seconds


        const drawCommonStars = () => {
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity || 0.8})`;
                ctx.fill();
            });
        };

        const drawShootingStars = () => {
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const ss = shootingStars[i];
                const tailX = ss.x - ss.len * Math.cos(ss.angle);
                const tailY = ss.y - ss.len * Math.sin(ss.angle);

                // Draw outer glow
                ctx.beginPath();
                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(tailX, tailY);
                const glowGradient = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
                glowGradient.addColorStop(0, `rgba(6, 182, 212, ${ss.opacity * 0.5})`);
                glowGradient.addColorStop(0.5, `rgba(103, 232, 249, ${ss.opacity * 0.2})`);
                glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.strokeStyle = glowGradient;
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Draw main streak
                ctx.beginPath();
                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(tailX, tailY);
                const gradient = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
                gradient.addColorStop(0.3, `rgba(103, 232, 249, ${ss.opacity * 0.7})`);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Draw bright head
                ctx.beginPath();
                ctx.arc(ss.x, ss.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`;
                ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Move shooting star diagonally
                ss.x += ss.speed * Math.cos(ss.angle);
                ss.y += ss.speed * Math.sin(ss.angle);
                ss.opacity -= 0.006;

                // Remove if faded or off-screen
                if (ss.opacity <= 0 || ss.x > canvas.width + 50 || ss.y > canvas.height + 50) {
                    shootingStars.splice(i, 1);
                }
            }
        };

        const animateDesktop = (timestamp: number = 0) => {
            animationFrameId.current = requestAnimationFrame(animateDesktop);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCommonStars();

            // Spawn new shooting star at intervals
            if (timestamp - lastShootingStarTime > shootingStarInterval && shootingStars.length < 3) {
                createShootingStar();
                lastShootingStarTime = timestamp;
            }

            drawShootingStars();

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

        const animateMobile = (timestamp: number = 0) => {
            animationFrameId.current = requestAnimationFrame(animateMobile);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCommonStars();

            // Spawn new shooting star at intervals (more frequent on mobile)
            if (timestamp - lastShootingStarTime > 1000 && shootingStars.length < 4) {
                createShootingStar();
                lastShootingStarTime = timestamp;
            }

            drawShootingStars();
        };

        // --- Setup ---
        const initialize = () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            checkScreenSize(); // This sets canvas width/height and isMobile

            if (isMobile) {
                initCommonStars(80); // Reduced for better mobile performance
                shootingStars = [];
                // Spawn initial shooting stars
                createShootingStar();
                animateMobile();
            } else {
                initCommonStars(100); // Reduced for better performance
                shootingStars = [];
                // Spawn initial shooting stars immediately
                createShootingStar();
                setTimeout(() => createShootingStar(), 500);
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
                    initCommonStars(80);
                    shootingStars = [];
                } else {
                    initCommonStars(100);
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