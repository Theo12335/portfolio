'use client';

import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { useEffect, useRef, ReactNode } from 'react';

// Fade up animation for sections
interface FadeUpProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

export function FadeUp({ children, delay = 0, duration = 0.5, className = '', once = true }: FadeUpProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-100px' });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration, delay, ease: [0.25, 0.4, 0.25, 1] } }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Staggered children animation
interface StaggerContainerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
    once?: boolean;
}

export function StaggerContainer({ children, staggerDelay = 0.1, className = '', once = true }: StaggerContainerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1,
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger child item
interface StaggerItemProps {
    children: ReactNode;
    className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
        }
    };

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
}

// Scale up on scroll
interface ScaleUpProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function ScaleUp({ children, delay = 0, className = '' }: ScaleUpProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Slide in from left/right
interface SlideInProps {
    children: ReactNode;
    direction?: 'left' | 'right';
    delay?: number;
    className?: string;
}

export function SlideIn({ children, direction = 'left', delay = 0, className = '' }: SlideInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const xOffset = direction === 'left' ? -60 : 60;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: xOffset }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: xOffset }}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Text reveal animation (word by word)
interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const words = text.split(' ');

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay }
        }
    };

    const wordVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <motion.p
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
        >
            {words.map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
                    {word}
                </motion.span>
            ))}
        </motion.p>
    );
}

// Magnetic hover effect - optimized with throttling
interface MagneticProps {
    children: ReactNode;
    className?: string;
}

export function Magnetic({ children, className = '' }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const rafId = useRef<number | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (rafId.current) return; // Throttle with RAF

        rafId.current = requestAnimationFrame(() => {
            if (!ref.current) return;
            const { clientX, clientY } = e;
            const { left, top, width, height } = ref.current.getBoundingClientRect();
            const x = (clientX - left - width / 2) * 0.15;
            const y = (clientY - top - height / 2) * 0.15;
            ref.current.style.transform = `translate(${x}px, ${y}px)`;
            rafId.current = null;
        });
    };

    const handleMouseLeave = () => {
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }
        if (ref.current) {
            ref.current.style.transform = 'translate(0, 0)';
        }
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`transition-transform duration-200 ease-out ${className}`}
        >
            {children}
        </div>
    );
}

// Blur fade in - optimized without expensive blur filter
interface BlurFadeProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function BlurFade({ children, delay = 0, className = '' }: BlurFadeProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Hover scale effect
interface HoverScaleProps {
    children: ReactNode;
    scale?: number;
    className?: string;
}

export function HoverScale({ children, scale = 1.05, className = '' }: HoverScaleProps) {
    return (
        <motion.div
            whileHover={{ scale }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
