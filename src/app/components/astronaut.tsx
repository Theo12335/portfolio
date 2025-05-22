'use client';

import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const moveInterval = setInterval(() => {
            const randomX = (Math.random() * 2 - 1) * floatRange;
            const randomY = (Math.random() * 2 - 1) * floatRange;
            setPosition({ x: randomX, y: randomY });
        }, floatDuration);

        return () => clearInterval(moveInterval);
    }, [floatRange, floatDuration]);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        console.log('Astronaut image loaded');
        if (onLoad) {
            onLoad(e);
        }
    };

    return (
        <div
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