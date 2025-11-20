'use client';

import { useLayoutEffect, useEffect, useRef, useState, type RefObject } from 'react';

interface VariableProximityProps {
    label: string;
    className?: string;
    fromFontVariationSettings: string;
    toFontVariationSettings: string;
    containerRef: RefObject<HTMLElement>;
    radius: number;
    falloff?: 'linear' | 'exponential' | 'gaussian';
}

export default function VariableProximity({
    label,
    className = '',
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius,
    falloff = 'linear'
}: VariableProximityProps) {
    const textRef = useRef<HTMLDivElement | null>(null);
    const charsRef = useRef<HTMLSpanElement[]>([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const rafId = useRef<number | null>(null);
    const [isReady, setIsReady] = useState(false);

    const parseFontSettings = (settings: string) => {
        const result: Record<string, number> = {};
        const regex = /'(\w+)'\s+(\d+)/g;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(settings)) !== null) {
            result[match[1]] = parseInt(match[2], 10);
        }
        return result;
    };

    const fromSettings = parseFontSettings(fromFontVariationSettings);
    const toSettings = parseFontSettings(toFontVariationSettings);

    const interpolateFontSettings = (proximity: number) => {
        const interpolated = Object.keys(fromSettings).map((key) => {
            const from = fromSettings[key];
            const to = toSettings[key] ?? from;
            // allow fractional interpolation but round for CSS compatibility
            const value = from + (to - from) * proximity;
            return `'${key}' ${Math.round(value)}`;
        });
        return interpolated.join(', ');
    };

    const calculateProximity = (charRect: DOMRect, containerRect: DOMRect) => {
        const charCenterX = charRect.left + charRect.width / 2;
        const charCenterY = charRect.top + charRect.height / 2;

        const mouseX = mousePos.current.x + containerRect.left;
        const mouseY = mousePos.current.y + containerRect.top;

        const dx = mouseX - charCenterX;
        const dy = mouseY - charCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > radius) return 0;

        let proximity = 1 - distance / radius;

        if (falloff === 'exponential') {
            proximity = Math.pow(proximity, 2);
        } else if (falloff === 'gaussian') {
            proximity = Math.exp(-Math.pow(distance / (radius / 2), 2));
        }

        return proximity;
    };

    const updateCharacters = () => {
        const containerRect = containerRef.current?.getBoundingClientRect();

        // Check if all characters are ready
        const allCharsReady = charsRef.current.length === label.length &&
            charsRef.current.every(el => el !== null && el !== undefined);

        if (!containerRect || !allCharsReady) {
            // Keep trying until everything is ready
            if (rafId.current) {
                rafId.current = requestAnimationFrame(updateCharacters);
            }
            return;
        }

        // Update each visible character
        for (let i = 0; i < charsRef.current.length; i++) {
            const el = charsRef.current[i];
            if (!el) continue;
            const charRect = el.getBoundingClientRect();
            const proximity = calculateProximity(charRect, containerRect);
            el.style.fontVariationSettings = interpolateFontSettings(proximity);
        }

        rafId.current = requestAnimationFrame(updateCharacters);
    };

    // Use layout effect so we can measure DOM synchronously after paint/layout
    useLayoutEffect(() => {
        if (!containerRef.current) return;

        // Initialize mouse position to center of container to avoid "top-left" glitch
        const rect = containerRef.current.getBoundingClientRect();
        mousePos.current = {
            x: rect.width / 2,
            y: rect.height / 2
        };

        // Wait a bit longer to ensure all characters are rendered
        setTimeout(() => setIsReady(true), 150);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef]);

    useEffect(() => {
        if (!isReady || !containerRef.current) return;

        const container = containerRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mousePos.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (!touch) return;
            const rect = container.getBoundingClientRect();
            mousePos.current = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        };

        const handleLeave = () => {
            // reset to center when leaving so the effect gracefully returns to 'from' settings
            const rect = container.getBoundingClientRect();
            mousePos.current = { x: rect.width / 2, y: rect.height / 2 };
            // also set all chars back to 'from' quickly
            charsRef.current.forEach((el) => {
                if (el) el.style.fontVariationSettings = fromFontVariationSettings;
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('touchmove', handleTouchMove, { passive: true });
        container.addEventListener('mouseleave', handleLeave);

        // start RAF loop (only once)
        if (!rafId.current) {
            rafId.current = requestAnimationFrame(updateCharacters);
        }

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('mouseleave', handleLeave);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
                rafId.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReady, containerRef, fromFontVariationSettings]);

    // Render characters and attach refs
    return (
        <div ref={textRef} className={`variable-proximity ${className}`}>
            <span className="sr-only">{label}</span>
            <span aria-hidden="true">
                {label.split('').map((char, index) => (
                    <span
                        key={index}
                        ref={(el) => {
                            if (el) {
                                charsRef.current[index] = el;
                            } else {
                                // keep array tight when element unmounts
                                charsRef.current[index] = null as any;
                            }
                        }}
                        style={{
                            display: 'inline-block',
                            fontVariationSettings: fromFontVariationSettings,
                            transition: 'font-variation-settings 0.12s ease-out'
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </span>
        </div>
    );
}
