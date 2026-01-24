'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';

interface FloatingAstronautProps extends Omit<ImageProps, 'className' | 'style'> {
    floatRange?: number;
    floatDuration?: number;
    transitionDuration?: number;
}

const FloatingAstronaut = ({
    floatRange = 20,
    floatDuration = 5000,
    transitionDuration = 5000,
    width,
    height,
    onLoad,
    ...imageProps
}: FloatingAstronautProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Only animate when visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const moveInterval = setInterval(() => {
            const randomX = (Math.random() * 2 - 1) * floatRange;
            const randomY = (Math.random() * 2 - 1) * floatRange;
            setPosition({ x: randomX, y: randomY });
        }, floatDuration);

        return () => clearInterval(moveInterval);
    }, [floatRange, floatDuration, isVisible]);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (onLoad) {
            onLoad(e);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative transition-transform ease-in-out"
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transitionDuration: `${transitionDuration}ms`,
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            <Image
                {...imageProps}
                width={width}
                height={height}
                alt={imageProps.alt ?? ''}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                }}
                onLoad={handleImageLoad}
            />
        </div>
    );
};

export default FloatingAstronaut;