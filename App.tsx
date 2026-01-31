import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import { content } from './data/content';
import type { Language } from './types';

const ScrollToTop: React.FC = () => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 500);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    if (!visible) return null;
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-red-600/80 hover:bg-red-600 text-white rounded-full shadow-lg shadow-red-900/30 backdrop-blur-sm transition-all duration-300 flex items-center justify-center hover:scale-110"
            aria-label="Scroll to top"
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};

const MouseGlow: React.FC = () => {
    const glowRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = glowRef.current;
        if (!el) return;
        let raf = 0;
        let mx = -500, my = -500;
        const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
        const update = () => {
            el.style.left = mx + 'px';
            el.style.top = my + 'px';
            raf = requestAnimationFrame(update);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        raf = requestAnimationFrame(update);
        return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
    }, []);
    return <div ref={glowRef} className="hero-glow-cursor hidden md:block" />;
};

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = cursorRef.current;
        if (!el || !window.matchMedia('(pointer: fine)').matches) return;
        let mx = -100, my = -100;
        const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; el.style.left = mx + 'px'; el.style.top = my + 'px'; };
        const onOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            if (t.closest('a, button, [role="button"]')) el.classList.add('hovering');
        };
        const onOut = () => el.classList.remove('hovering');
        window.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseover', onOver, { passive: true });
        document.addEventListener('mouseout', onOut, { passive: true });
        return () => { window.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver); document.removeEventListener('mouseout', onOut); };
    }, []);
    return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
};

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('KR');
    const currentContent = content[language];

    useEffect(() => {
        if (!window.gsap || typeof ScrollTrigger === 'undefined') return;
        const { gsap } = window;
        gsap.registerPlugin(ScrollTrigger);

        const timer = setTimeout(() => {
            const targets = document.querySelectorAll('.scroll-reveal');
            targets.forEach((el) => {
                gsap.fromTo(el,
                    { y: 60, opacity: 0, scale: 0.97 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        }
                    }
                );
            });

            document.querySelectorAll('#about h2, #portfolio h2, #clients h2, #pricing h2, #contact h2').forEach(heading => {
                gsap.fromTo(heading,
                    { y: 40, opacity: 0, letterSpacing: '0.3em' },
                    {
                        y: 0, opacity: 1, letterSpacing: '0.15em',
                        duration: 1.2,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: heading,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        }
                    }
                );
            });
        }, 150);

        return () => {
            clearTimeout(timer);
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [language]);

    return (
        <div className="bg-[#050505] min-h-screen overflow-x-hidden">
            <MouseGlow />
            <CustomCursor />
            <Header language={language} setLanguage={setLanguage} content={currentContent.header} />
            <HomePage content={currentContent} />
            <ScrollToTop />
        </div>
    );
};

export default App;
