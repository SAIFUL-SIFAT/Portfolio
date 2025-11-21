'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile || !cursorRef.current) return;

        const cursor = cursorRef.current;
        const pos = { x: 0, y: 0 };
        const mouse = { x: 0, y: 0 };
        const speeds = {
            cursor: 0.5, // Increased from 0.2
            hover: 0.3   // Increased from 0.15
        };
        let currentSpeed = speeds.cursor;
        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Make visible on first move
            if (cursor.style.opacity === '0') {
                cursor.style.opacity = '1';
            }
        };

        const lerp = (start: number, end: number, factor: number) => {
            return start * (1 - factor) + end * factor;
        };

        const animate = () => {
            pos.x = lerp(pos.x, mouse.x, currentSpeed);
            pos.y = lerp(pos.y, mouse.y, currentSpeed);

            cursor.style.transform = `translate3d(${pos.x - 13}px, ${pos.y - 15}px, 0)`; // Center the cursor
            animationFrameId = requestAnimationFrame(animate);
        };

        // Interactive elements
        const handleMouseEnter = () => {
            cursor.classList.add('hover');
            currentSpeed = speeds.hover;
        };

        const handleMouseLeave = () => {
            cursor.classList.remove('hover');
            currentSpeed = speeds.cursor;
        };

        const handleTextEnter = () => {
            cursor.classList.add('hover-text');
            currentSpeed = speeds.hover;
        };

        const handleTextLeave = () => {
            cursor.classList.remove('hover-text');
            currentSpeed = speeds.cursor;
        };

        const setupListeners = () => {
            document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });

            document.querySelectorAll('input, textarea, p, h1, h2, h3, h4, h5, h6, span').forEach(el => {
                el.addEventListener('mouseenter', handleTextEnter);
                el.addEventListener('mouseleave', handleTextLeave);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        setupListeners();

        // Re-setup listeners when DOM changes (simple observer)
        const observer = new MutationObserver(setupListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();

            document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });

            document.querySelectorAll('input, textarea, p, h1, h2, h3, h4, h5, h6, span').forEach(el => {
                el.removeEventListener('mouseenter', handleTextEnter);
                el.removeEventListener('mouseleave', handleTextLeave);
            });
        };
    }, [isMobile]);

    if (isMobile || !mounted) return null;

    return createPortal(
        <div
            ref={cursorRef}
            id="custom-cursor"
            className="custom-cursor"
            style={{
                opacity: 0,
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 2147483647 // Force max z-index inline
            }}
        >
            <svg
                width="27"
                height="30"
                viewBox="0 0 27 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-svg"
            >
                <path
                    d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z"
                    fill="#1fd18b"
                    stroke="white"
                    strokeWidth="2"
                />
            </svg>
        </div>,
        document.body
    );
}