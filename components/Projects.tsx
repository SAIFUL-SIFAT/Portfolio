'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const projects = [
        {
            id: 1,
            title: 'Online Art Store',
            tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind CSS'],
            link: 'https://github.com/SAIFUL-SIFAT/Online_Art_Store',
            image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop',
        },
        {
            id: 2,
            title: 'Petal - Pearl',
            tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Nest.Js'],
            link: 'https://github.com/SAIFUL-SIFAT/Petal_-_Pearl',
            image: '/assets/petalpearl.png',
        },
        {
            id: 3,
            title: 'Online Bookstore',
            tags: ['JavaScript', 'C#', 'PostgreSQL', 'HTML', 'CSS'],
            link: 'https://github.com/SAIFUL-SIFAT/Book_Haven',
            image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&h=800&fit=crop',
        },
        {
            id: 4,
            title: 'Mini Apple Store',
            tags: ['Java', 'Swing', 'MySQL'],
            link: 'https://github.com/SAIFUL-SIFAT/Mini_Apple_Store',
            image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop',
        },
    ];

    return (
        <section id="projects" className="projects-showcase">
            <div className="projects-container">
                <motion.div
                    className="projects-header"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="projects-label">✱ SELECTED PROJECTS</span>

                </motion.div>

                <div className="projects-wrapper">
                    {/* Image Preview - Right Side (Hidden on Mobile) */}
                    <div className="projects-image-preview">
                        {projects.map((project, index) => (
                            <motion.img
                                key={project.id}
                                src={project.image}
                                alt={project.title}
                                className="preview-img"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: hoveredProject === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        ))}
                    </div>

                    {/* Projects List */}
                    <div className="projects-list-modern">
                        {projects.map((project, index) => (
                            <motion.a
                                key={project.id}
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`project-item-modern ${hoveredProject !== null && hoveredProject !== index ? 'dimmed' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredProject(index)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <div className="project-content-modern">
                                    <div className="project-number-modern">
                                        _{String(index + 1).padStart(2, '0')}.
                                    </div>
                                    <div className="project-info-modern">
                                        <h4 className="project-title-modern">
                                            {project.title}
                                            <span className="arrow-icon">
                                                <FaExternalLinkAlt />
                                            </span>
                                        </h4>
                                        <div className="project-tags-modern">
                                            {project.tags.map((tag, i) => (
                                                <div key={i} className="tag-item">
                                                    <span>{tag}</span>
                                                    {i < project.tags.length - 1 && (
                                                        <span className="tag-dot"></span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
