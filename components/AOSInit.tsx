'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInit() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
            easing: 'ease-out-cubic',
            offset: 100,
            delay: 0,
            anchorPlacement: 'top-bottom',
        });

        // Refresh AOS on scroll to ensure animations work
        const handleScroll = () => {
            AOS.refresh();
        };

        window.addEventListener('scroll', handleScroll);

        // Initial refresh
        setTimeout(() => {
            AOS.refresh();
        }, 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return null;
}
