'use client';

import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

export default function Projects() {
    const projects = [
        {
            title: 'Online Learning Management System',
            description: 'A online learning management platform for students, admin, instructor and moderator, where students can enroll in courses, view their progress, and take quizzes. Instructors can create and manage courses, while admins can oversee the entire platform.',
            link: 'https://github.com/SAIFUL-SIFAT/Online-Learning-Management-System'
        },
        {
            title: 'Covid-19-Analysis_2020',
            description: 'A comprehensive data analysis project focusing on the COVID-19 pandemic in 2020, utilizing various data visualization techniques and statistical methods to understand trends, impacts, and patterns of the virus spread.',
            link: 'https://github.com/SAIFUL-SIFAT/Covid-19-Analysis_2020'
        },
        {
            title: 'Online Bookstore',
            description: 'A full-stack e-commerce platform for buying and selling books, featuring user authentication, book listings, a shopping cart, and order management. Developed with a focus on a seamless user experience and robust backend functionality.',
            link: 'https://github.com/SAIFUL-SIFAT/Book_Haven'
        },
        {
            title: 'Mini Apple Store',
            description: 'A Java-based desktop application simulating a mini Apple Store, allowing users to browse products, add items to a cart, and complete a mock purchase. Features include product display, cart management, and basic order processing functionalities.',
            link: 'https://github.com/SAIFUL-SIFAT/Mini_Apple_Store'
        }
    ];

    return (
        <section id="projects" className="project_section">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Featured <span className="gradient-text">Projects</span>
            </motion.h2>
            <div className="project-cards">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        link={project.link}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
