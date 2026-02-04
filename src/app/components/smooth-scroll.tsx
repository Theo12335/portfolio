'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        // Defer initialization slightly to prioritize critical rendering
        const timeoutId = setTimeout(() => {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            });

            lenisRef.current = lenis;

            function raf(time: number) {
                lenis.raf(time);
                rafRef.current = requestAnimationFrame(raf);
            }

            rafRef.current = requestAnimationFrame(raf);
        }, 100);

        const cleanupTimeout = timeoutId;

        // Handle anchor links with smooth scroll
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]');
            if (anchor) {
                const href = anchor.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement && lenisRef.current) {
                        lenisRef.current.scrollTo(targetElement as HTMLElement, {
                            offset: -100,
                            duration: 1.5,
                        });
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            clearTimeout(cleanupTimeout);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return <>{children}</>;
}
