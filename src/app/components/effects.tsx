'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

// Spotlight effect that follows mouse
interface SpotlightProps {
    className?: string;
    fill?: string;
}

export function Spotlight({ className = '', fill = 'white' }: SpotlightProps) {
    return (
        <svg
            className={`pointer-events-none absolute z-[1] h-[169%] w-[138%] opacity-0 animate-spotlight lg:w-[84%] overflow-visible ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3787 2842"
            fill="none"
            style={{ filter: 'blur(0px)' }}
        >
            <g filter="url(#spotlightFilter)">
                <ellipse
                    cx="1924.71"
                    cy="273.501"
                    rx="1924.71"
                    ry="273.501"
                    transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                    fill={fill}
                    fillOpacity="0.21"
                />
            </g>
            <defs>
                <filter
                    id="spotlightFilter"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                    filterUnits="objectBoundingBox"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
                </filter>
            </defs>
        </svg>
    );
}

// Card with spotlight hover effect - optimized with RAF throttling
interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    spotlightColor?: string;
}

export function SpotlightCard({ children, className = '', spotlightColor = 'rgba(0, 166, 192, 0.15)' }: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const rafId = useRef<number | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || rafId.current) return;

        rafId.current = requestAnimationFrame(() => {
            if (!divRef.current) return;
            const rect = divRef.current.getBoundingClientRect();
            setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            rafId.current = null;
        });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            className={`relative overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            {children}
        </div>
    );
}

// Glowing border effect
interface GlowingBorderProps {
    children: ReactNode;
    className?: string;
    glowColor?: string;
}

export function GlowingBorder({ children, className = '', glowColor = '#06b6d4' }: GlowingBorderProps) {
    return (
        <div className={`relative group ${className}`}>
            <div
                className="absolute -inset-0.5 rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-300"
                style={{ background: `linear-gradient(90deg, ${glowColor}, #C1E8FF, ${glowColor})` }}
            />
            <div className="relative bg-[#0A162E] rounded-lg">
                {children}
            </div>
        </div>
    );
}

// Animated border beam
interface BorderBeamProps {
    className?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
}

export function BorderBeam({
    className = '',
    size = 200,
    duration = 15,
    borderWidth = 1.5,
    colorFrom = '#06b6d4',
    colorTo = '#C1E8FF',
    delay = 0,
}: BorderBeamProps) {
    return (
        <div
            style={{
                '--size': size,
                '--duration': duration,
                '--border-width': borderWidth,
                '--color-from': colorFrom,
                '--color-to': colorTo,
                '--delay': `-${delay}s`,
            } as React.CSSProperties}
            className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--size)*1px)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))] ${className}`}
        />
    );
}

// Meteors effect
interface MeteorsProps {
    number?: number;
}

export function Meteors({ number = 20 }: MeteorsProps) {
    const meteors = new Array(number).fill(true);

    return (
        <>
            {meteors.map((_, idx) => (
                <span
                    key={idx}
                    className="animate-meteor absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
                    style={{
                        top: 0,
                        left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
                        animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
                        animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`,
                    }}
                >
                    <span className="absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-[50%] bg-gradient-to-r from-slate-500 to-transparent" />
                </span>
            ))}
        </>
    );
}

// Gradient background with mouse tracking
interface GradientFollowProps {
    children: ReactNode;
    className?: string;
}

export function GradientFollow({ children, className = '' }: GradientFollowProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div className={`group relative ${className}`} onMouseMove={handleMouseMove}>
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            350px circle at ${mouseX}px ${mouseY}px,
                            rgba(0, 166, 192, 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />
            {children}
        </div>
    );
}

// Shimmer button effect
interface ShimmerButtonProps {
    children: ReactNode;
    className?: string;
    shimmerColor?: string;
}

export function ShimmerButton({
    children,
    className = '',
    shimmerColor = '#06b6d4',
}: ShimmerButtonProps) {
    return (
        <button
            className={`group relative overflow-hidden rounded-full px-6 py-3 font-medium transition-all duration-300 ${className}`}
            style={{
                background: `linear-gradient(110deg, transparent 33%, rgba(0, 166, 192, 0.3) 50%, transparent 67%)`,
                backgroundSize: '300% 100%',
            }}
        >
            <span
                className="absolute inset-0 animate-shimmer"
                style={{
                    background: `linear-gradient(110deg, transparent 33%, ${shimmerColor}40 50%, transparent 67%)`,
                    backgroundSize: '300% 100%',
                }}
            />
            <span className="relative z-10">{children}</span>
        </button>
    );
}

// Text shimmer effect
interface TextShimmerProps {
    children: string;
    className?: string;
}

export function TextShimmer({ children, className = '' }: TextShimmerProps) {
    return (
        <span
            className={`inline-flex animate-shimmer bg-[length:200%_100%] bg-clip-text text-transparent ${className}`}
            style={{
                backgroundImage: 'linear-gradient(110deg, #C1E8FF 35%, #06b6d4 50%, #C1E8FF 65%)',
            }}
        >
            {children}
        </span>
    );
}

// Floating element
interface FloatingProps {
    children: ReactNode;
    className?: string;
    duration?: number;
    distance?: number;
}

export function Floating({ children, className = '', duration = 3, distance = 10 }: FloatingProps) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [-distance, distance, -distance],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            {children}
        </motion.div>
    );
}
