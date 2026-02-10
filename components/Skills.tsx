'use client';

import {
    SiCplusplus, SiPython, SiHtml5, SiCss3, SiJavascript, SiPhp, SiBootstrap,
    SiDotnet, SiNestjs, SiNextdotjs,
    SiGit, SiGnubash, SiLinux, SiFigma,
    SiMysql, SiPostgresql
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

export default function Skills() {

    const skillCategories = [
        {
            title: 'PROGRAMMING LANGUAGES',
            skills: [
                { name: 'C++', icon: SiCplusplus, color: '#00599C' },
                { name: 'Python', icon: SiPython, color: '#3776AB' },
                { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
                { name: 'CSS', icon: SiCss3, color: '#1572B6' },
                { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
                { name: 'PHP', icon: SiPhp, color: '#777BB4' },
                { name: 'Java', icon: FaJava, color: '#007396' },
                { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
            ]
        },
        {
            title: 'LIBRARIES/FRAMEWORKS',
            skills: [
                { name: 'ASP.NET', icon: SiDotnet, color: '#512BD4' },
                { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
                { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
            ]
        },
        {
            title: 'TOOLS / PLATFORMS',
            skills: [
                { name: 'Git', icon: SiGit, color: '#F05032' },
                { name: 'Bash', icon: SiGnubash, color: '#4EAA25' },
                { name: 'Linux', icon: SiLinux, color: '#FCC624' },
                { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
            ]
        },
        {
            title: 'DATABASES',
            skills: [
                { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
                { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
            ]
        }
    ];

    return (
        <section id="skills" className="skills-section-modern">
            <div className="skills-container-modern">
                <div className="skills-header-modern">
                    <span
                        className="skills-label-modern"
                        data-aos="fade-up"
                        data-aos-duration="600"
                    >
                        ✱ MY STACK
                    </span>

                </div>

                <div className="skills-grid-modern">
                    {skillCategories.map((category, catIndex) => (
                        <div
                            key={catIndex}
                            className="skill-category-modern"
                            data-aos="fade-up"
                            data-aos-delay={200 + catIndex * 150}
                            data-aos-duration="600"
                        >
                            <h3
                                className="category-title-modern"
                                data-aos="fade-right"
                                data-aos-delay={250 + catIndex * 150}
                                data-aos-duration="500"
                            >
                                {category.title}
                            </h3>
                            <div className="category-skills-modern">
                                {category.skills.map((skill, skillIndex) => {
                                    const Icon = skill.icon;
                                    return (
                                        <div
                                            key={skillIndex}
                                            className="skill-badge-modern"
                                            data-aos="zoom-in"
                                            data-aos-delay={300 + catIndex * 150 + skillIndex * 50}
                                            data-aos-duration="400"
                                        >
                                            <Icon
                                                className="skill-badge-icon"
                                                style={{ color: skill.color }}
                                            />
                                            <span className="skill-badge-name">{skill.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
