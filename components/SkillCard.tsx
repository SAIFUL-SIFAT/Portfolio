'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SkillCardProps {
    name: string;
    icon?: string;
    index: number;
}

export default function SkillCard({ name, icon, index }: SkillCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            className="skill-card-container"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="skill-card"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
            >
                <div className="skill-card-front">
                    {icon && <span className="skill-icon">{icon}</span>}
                    <span className="skill-name">{name}</span>
                </div>
                <div className="skill-card-back">
                    <span className="skill-level">Proficient</span>
                </div>
            </motion.div>
        </motion.div>
    );
}
