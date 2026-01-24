'use client';

import { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
    // Optimize ScrollTrigger for performance
    ScrollTrigger.config({ limitCallbacks: true });
}

// Parallax scroll effect
interface ParallaxProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        gsap.to(ref.current, {
            y: () => speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: ref.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

// Scroll-triggered reveal
interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
}

export function ScrollReveal({
    children,
    className = '',
    direction = 'up',
    delay = 0,
    duration = 1,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        const directions = {
            up: { y: 60, x: 0 },
            down: { y: -60, x: 0 },
            left: { x: 60, y: 0 },
            right: { x: -60, y: 0 },
        };

        gsap.fromTo(
            ref.current,
            {
                opacity: 0,
                ...directions[direction],
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, [direction, delay, duration]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

// Horizontal scroll section
interface HorizontalScrollProps {
    children: ReactNode;
    className?: string;
}

export function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !scrollRef.current) return;

        const scrollWidth = scrollRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;

        gsap.to(scrollRef.current, {
            x: -(scrollWidth - containerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: () => `+=${scrollWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });
    }, []);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={scrollRef} className="flex">
                {children}
            </div>
        </div>
    );
}

// Text split animation
interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export function SplitText({ text, className = '', delay = 0 }: SplitTextProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        const chars = ref.current.querySelectorAll('.char');

        gsap.fromTo(
            chars,
            {
                opacity: 0,
                y: 50,
                rotateX: -90,
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.03,
                delay,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, [delay]);

    return (
        <div ref={ref} className={className} style={{ perspective: '1000px' }}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className="char inline-block"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </div>
    );
}

// Counter animation
interface CounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export function Counter({ end, duration = 2, suffix = '', prefix = '', className = '' }: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const countRef = useRef({ value: 0 });

    useGSAP(() => {
        if (!ref.current) return;

        gsap.to(countRef.current, {
            value: end,
            duration,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: ref.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            onUpdate: () => {
                if (ref.current) {
                    ref.current.textContent = `${prefix}${Math.round(countRef.current.value)}${suffix}`;
                }
            },
        });
    }, [end, duration, suffix, prefix]);

    return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}

// Scale on scroll
interface ScaleOnScrollProps {
    children: ReactNode;
    className?: string;
}

export function ScaleOnScroll({ children, className = '' }: ScaleOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        gsap.fromTo(
            ref.current,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

// Stagger children on scroll
interface StaggerOnScrollProps {
    children: ReactNode;
    className?: string;
    childSelector?: string;
    stagger?: number;
}

export function StaggerOnScroll({
    children,
    className = '',
    childSelector = ':scope > *',
    stagger = 0.1,
}: StaggerOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        const elements = ref.current.querySelectorAll(childSelector);

        gsap.fromTo(
            elements,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, [childSelector, stagger]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

// Rotate on scroll
interface RotateOnScrollProps {
    children: ReactNode;
    className?: string;
    rotation?: number;
}

export function RotateOnScroll({ children, className = '', rotation = 360 }: RotateOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        gsap.to(ref.current, {
            rotation,
            ease: 'none',
            scrollTrigger: {
                trigger: ref.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });
    }, [rotation]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
