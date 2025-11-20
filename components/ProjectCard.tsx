'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
    index: number;
}

export default function ProjectCard({ title, description, link, index }: ProjectCardProps) {
    return (
        <motion.div
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
        >
            <div className="card-glow"></div>
            <div className="card-content">
                <div className="card__descr-wrapper">
                    <motion.h3
                        className="card__title"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {title}
                    </motion.h3>
                    <motion.p
                        className="card__descr"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {description}
                    </motion.p>
                </div>
                <motion.div
                    className="card__links"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.a
                        className="link"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaGithub style={{ marginRight: '8px' }} />
                        View Project
                        <FaExternalLinkAlt style={{ marginLeft: '8px', fontSize: '0.8em' }} />
                    </motion.a>
                </motion.div>
            </div>
        </motion.div>
    );
}
