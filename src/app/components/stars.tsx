// src/components/InteractiveStarryBg.tsx (Simplified Concept)
'use client';

import React, { useRef, useEffect } from 'react';

const InteractiveStarryBg = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let stars: Array<{ x: number; y: number; radius: number }> = [];
        const mouse = { x: 0, y: 0 };
        const connectionRadius = 150; // Max distance for lines
        const mouseProximityRadius = 100; // How close mouse needs to be to "activate" stars for line drawing

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight; // Or parent container height
            // Re-initialize stars on resize if needed
            stars = [];
            for (let i = 0; i < 150; i++) { // Create 100 stars
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                });
            }
        };

        resizeCanvas(); // Initial size and star generation

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', resizeCanvas);

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw stars
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // White stars
                ctx.fill();
            });

            // Draw lines based on mouse proximity
            stars.forEach(star1 => {
                const distToMouse = Math.sqrt(Math.pow(star1.x - mouse.x, 2) + Math.pow(star1.y - mouse.y, 2));

                if (distToMouse < mouseProximityRadius) {
                    stars.forEach(star2 => {
                        if (star1 === star2) return; // Don't connect a star to itself

                        const distance = Math.sqrt(Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2));

                        if (distance < connectionRadius) {
                            ctx.beginPath();
                            ctx.moveTo(star1.x, star1.y);
                            ctx.lineTo(star2.x, star2.y);
                            // Line opacity based on distance from mouse or distance between stars
                            const opacity = 1 - (distance / connectionRadius);
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`; // Faint white lines
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    });
                }
            });
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            // Potentially cancel animation frame if you have a handle to it
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-[-1]" // Position behind all content
        // Tailwind classes can style the canvas element itself if needed,
        // but the drawing happens via JavaScript.
        />
    );
};

export default InteractiveStarryBg;