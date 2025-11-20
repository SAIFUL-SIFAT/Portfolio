'use client';

import { useEffect, useState } from 'react';
import { FaEnvelope, FaFacebookF, FaInstagram, FaGithub, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const sections = document.querySelectorAll('section');

        const handleScroll = () => {
            let currentSection = 'home';

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 50) {
                    currentSection = section.getAttribute('id') || 'home';
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false); // Close menu after clicking
        }
    };

    return (
        <nav>
            <div className="brand-name">
                <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
                    Saiful Sifat
                </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <li>
                    <a
                        href="#home"
                        className={activeSection === 'home' ? 'active' : ''}
                        onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="#about"
                        className={activeSection === 'about' ? 'active' : ''}
                        onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                    >
                        About Me
                    </a>
                </li>
                <li>
                    <a
                        href="#projects"
                        className={activeSection === 'projects' ? 'active' : ''}
                        onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                    >
                        Projects
                    </a>
                </li>
            </ul>
            <div className="social-icons">
                <a href="mailto:sifat.sai3@gmail.com" target="_blank" rel="noopener noreferrer">
                    <FaEnvelope />
                </a>
                <a href="https://www.facebook.com/saiful.sifat1234" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                </a>
                <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
                <a href="https://github.com/SAIFUL-SIFAT" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </a>
            </div>
        </nav>
    );
}
