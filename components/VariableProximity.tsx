'use client';

import { useEffect, useRef, type RefObject } from 'react';

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
    const textRef = useRef<HTMLDivElement>(null);
    const charsRef = useRef<HTMLSpanElement[]>([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const rafId = useRef<number>();

    const parseFontSettings = (settings: string) => {
        const result: Record<string, number> = {};
        const matches = settings.matchAll(/'(\w+)'\s+(\d+)/g);
        for (const match of matches) {
            result[match[1]] = parseInt(match[2]);
        }
        return result;
    };

    const fromSettings = parseFontSettings(fromFontVariationSettings);
    const toSettings = parseFontSettings(toFontVariationSettings);

    const interpolateFontSettings = (proximity: number) => {
        const interpolated = Object.keys(fromSettings).map(key => {
            const from = fromSettings[key];
            const to = toSettings[key] || from;
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

        const distance = Math.sqrt(
            Math.pow(mouseX - charCenterX, 2) + Math.pow(mouseY - charCenterY, 2)
        );

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
        if (!containerRect) return;

        charsRef.current.forEach((char) => {
            if (!char) return;
            const charRect = char.getBoundingClientRect();
            const proximity = calculateProximity(charRect, containerRect);
            char.style.fontVariationSettings = interpolateFontSettings(proximity);
        });

        rafId.current = requestAnimationFrame(updateCharacters);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mousePos.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            rafId.current = requestAnimationFrame(updateCharacters);

            return () => {
                container.removeEventListener('mousemove', handleMouseMove);
                if (rafId.current) {
                    cancelAnimationFrame(rafId.current);
                }
            };
        }
    }, [containerRef]);

    return (
        <div ref={textRef} className={`variable-proximity ${className}`}>
            <span className="sr-only">{label}</span>
            <span aria-hidden="true">
                {label.split('').map((char, index) => (
                    <span
                        key={index}
                        ref={(el) => {
                            if (el) charsRef.current[index] = el;
                        }}
                        style={{
                            display: 'inline-block',
                            fontVariationSettings: fromFontVariationSettings,
                            transition: 'font-variation-settings 0.1s ease-out'
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </span>
        </div>
    );
}
