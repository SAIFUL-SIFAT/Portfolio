'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import GradientText from './GradientText';
import BlurText from './BlurText';
import RotatingText from './RotatingText';
import VariableProximity from './VariableProximity';

export default function Hero() {
    const [name, setName] = useState('');
    const fullName = 'Sifat';
    const professions = ['Web Developer', 'Software Engineer'];
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let nameIndex = 0;
        const typeInterval = setInterval(() => {
            if (nameIndex < fullName.length) {
                setName(fullName.substring(0, nameIndex + 1));
                nameIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 150);

        return () => clearInterval(typeInterval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section id="home" className="section hero-section">
            <div className="hero-container">
                {/* Left Panel: Image and Button */}
                <motion.div
                    className="hero-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    data-aos="fade-right"
                >
                    <Tilt
                        tiltMaxAngleX={15}
                        tiltMaxAngleY={15}
                        perspective={1000}
                        scale={1.05}
                        transitionSpeed={2000}
                        gyroscope={true}
                        className="hero-tilt"
                    >
                        <div className="profile-image-wrapper">
                            <Image
                                src="/assets/a.jpg"
                                alt="Saiful Sifat"
                                width={280}
                                height={280}
                                style={{ borderRadius: '20px', objectFit: 'cover' }}
                                priority
                            />
                            <div className="image-glow"></div>
                        </div>
                    </Tilt>

                    <motion.div className="hero-cta" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <a href="/assets/Resume_Saiful_Alam.pdf" download className="download-link">
                            <button className="button" type="button">
                                <span className="button__text">Download CV</span>
                                <span className="button__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className="svg">
                                        <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
                                        <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
                                        <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Panel: Text Content */}
                <motion.div
                    className="hero-right"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    data-aos="fade-left"
                >
                    <motion.div variants={itemVariants} className="hero-greeting">
                        <h1 className="hero-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <BlurText text="Welcome to My" delay={150} animateBy="words" direction="top" className="inline-block mr-2" />
                            {/* Use RotatingText for an animated "Portfolio" OR keep GradientText for Portfolio */}
                            {/* <GradientText>Portfolio</GradientText> */}
                            Portfolio
                        </h1>
                    </motion.div>

                    <motion.div variants={itemVariants} className="hero-identity">
                        <p className="identity-text">
                            {/* I&apos;m <GradientText><span id="name">{name}</span></GradientText>, a{' '} */}
                            I&apos;m a{' '}
                            {/* RotatingText shows professions with per-character stagger. We wrap it inside GradientText classes. */}
                            <span style={{ display: 'inline-block', marginLeft: 6 }}>
                                <RotatingText
                                    texts={professions}
                                    rotationInterval={3000}           // how long each profession stays
                                    staggerDuration={0.03}           // delay between characters
                                    splitBy="characters"             // animate by characters
                                    loop={true}
                                    auto={true}
                                    mainClassName="rotating-text-inline"
                                    splitLevelClassName="rotating-word"
                                    elementLevelClassName="rotating-char gradient-char" // apply gradient here
                                />
                                .
                            </span>
                        </p>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="hero-description"
                        ref={descriptionRef}
                        style={{ position: 'relative' }}
                    >
                        <VariableProximity
                            label="Hi, I'm Sifat — a passionate software engineer. I specialize in building modern, user-focused web applications using technologies like NestJs, ASP.NET MVC, PHP. With a strong foundation in Python, TypeScript, and C++, I love turning ideas into fast, clean, and scalable solutions. Currently, I'm diving deeper into frontend development and exploring system design to build impactful digital experiences."
                            className="variable-proximity-demo"
                            fromFontVariationSettings="'wght' 400, 'opsz' 9"
                            toFontVariationSettings="'wght' 900, 'opsz' 40"
                            containerRef={descriptionRef}
                            radius={100}
                            falloff="linear"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
