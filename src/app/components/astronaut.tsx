// app/components/FloatingAstronaut.tsx (or app/components/astronaut.tsx)
'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";

interface FloatingAstronautProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    floatRange?: number;
    floatDuration?: number;
    transitionDuration?: number;
}

// MODIFICATION HERE:
// Instead of `const FloatingAstronaut: React.FC<FloatingAstronautProps> = ({ ... }) => {`,
// use `const FloatingAstronaut = ({ src, alt, width, height, floatRange = 20, floatDuration = 5000, transitionDuration = 5000 }: FloatingAstronautProps) => {`
const FloatingAstronaut = ({
    src,
    alt,
    width,
    height,
    floatRange = 20,
    floatDuration = 5000,
    transitionDuration = 5000,
}: FloatingAstronautProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const moveInterval = setInterval(() => {
            const randomX = (Math.random() * 2 - 1) * floatRange;
            const randomY = (Math.random() * 2 - 1) * floatRange;
            setPosition({ x: randomX, y: randomY });
        }, floatDuration);

        return () => clearInterval(moveInterval);
    }, [floatRange, floatDuration]);

    return (
        <div
            className={`
        relative
        transition-transform ease-in-out
      `}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transitionDuration: `${transitionDuration}ms`,
            }}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
            />
        </div>
    );
};

export default FloatingAstronaut;