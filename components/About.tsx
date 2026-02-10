'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    SiCplusplus, SiPython, SiHtml5, SiCss3, SiJavascript, SiPhp, SiBootstrap,
    SiDotnet, SiNestjs, SiNextdotjs,
    SiGit, SiGnubash, SiLinux, SiFigma,
    SiMysql, SiPostgresql
} from 'react-icons/si';
import { FaCode, FaUniversity, FaSchool } from 'react-icons/fa'; // Generic code icon for Java

export default function About() {
    const skillCategories = [
        {
            title: 'Programming Languages',
            skills: [
                { name: 'C++', icon: SiCplusplus, color: '#00599C' },
                { name: 'Python', icon: SiPython, color: '#3776AB' },
                { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
                { name: 'CSS', icon: SiCss3, color: '#1572B6' },
                { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
                { name: 'PHP', icon: SiPhp, color: '#777BB4' },
                { name: 'Java', icon: FaCode, color: '#007396' },
                { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
            ]
        },
        {
            title: 'Libraries/Frameworks',
            skills: [
                { name: 'ASP.NET', icon: SiDotnet, color: '#512BD4' },
                { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
                { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
            ]
        },
        {
            title: 'Tools / Platforms',
            skills: [
                { name: 'Git', icon: SiGit, color: '#F05032' },
                { name: 'Bash', icon: SiGnubash, color: '#4EAA25' },
                { name: 'Linux', icon: SiLinux, color: '#FCC624' },
                { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
            ]
        },
        {
            title: 'Databases',
            skills: [
                { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
                { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section id="about" className="section">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                data-aos="fade-up"
            >
                {/* About <span className="gradient-text">Me</span> */}
                {/* About Me */}
            </motion.h2>

            {/* Skills Section */}
            {/* <motion.h3
                className="skills-heading"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                data-aos="fade-up"
            >
                Skills Stack
            </motion.h3>

            <div className="skills-categories">
                {skillCategories.map((category, catIndex) => (
                    <motion.div
                        key={catIndex}
                        className="skill-category"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.1 }}
                        data-aos="fade-up"
                        data-aos-delay={catIndex * 100}
                    >
                        <h4 className="category-title">{category.title}</h4>
                        <div className="category-skills">
                            {category.skills.map((skill, skillIndex) => {
                                const Icon = skill.icon;
                                return (
                                    <motion.div
                                        key={skillIndex}
                                        className="skill-item"
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Icon className="skill-icon-svg" style={{ color: skill.color }} />
                                        <span className="skill-name-text">{skill.name}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div> */}

            {/* Education Section */}
            <div className="experience-section-modern">
                <div
                    className="experience-header-modern"
                    data-aos="fade-up"
                    data-aos-duration="600"
                >
                    <span className="experience-label-modern">✱ MY EDUCATION</span>
                </div>

                <div className="experience-list-modern">
                    <div
                        className="experience-item-modern"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                    >
                        <div className="experience-company-modern">American International University-Bangladesh</div>
                        <div className="experience-title-modern">Bachelor of Science in Computer Science</div>
                        <div className="experience-date-modern">2020 - 2024</div>
                    </div>

                    <div
                        className="experience-item-modern"
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-duration="600"
                    >
                        <div className="experience-company-modern">Ideal College, Dhanmondi</div>
                        <div className="experience-title-modern">Higher Secondary Certificate</div>
                        <div className="experience-date-modern">2017 - 2019</div>
                    </div>
                </div>
            </div>

            {/* Experience Section */}
            <div className="experience-section-modern">
                <div
                    className="experience-header-modern"
                    data-aos="fade-up"
                    data-aos-duration="600"
                >
                    <span className="experience-label-modern">✱ MY EXPERIENCE</span>
                </div>

                <div className="experience-list-modern">
                    <div
                        className="experience-item-modern"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                    >
                        <div className="experience-company-modern">Polygon Technology</div>
                        <div className="experience-title-modern">Software Engineering Intern</div>
                        <div className="experience-date-modern">Jun 2024 - Present</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
