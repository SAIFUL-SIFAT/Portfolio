'use client';

import { useState } from 'react';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AOSInit from '@/components/AOSInit';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onFinish={() => setIsLoading(false)} />}
      <AOSInit />
      <ScrollProgress />
      <ParticleBackground />
      <div id="main-content" style={{ display: isLoading ? 'none' : 'block', position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
