
import React, { useEffect, useRef } from 'react';
import PhoneDeck from './PhoneDeck';

interface DeckItem { id: number; image: string; }

interface HeroProps {
    content: {
        title: string;
        name: string;
        phone_deck_items: DeckItem[];
    };
}

const Hero: React.FC<HeroProps> = ({ content }) => {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!heroRef.current || typeof window === 'undefined' || !window.gsap) return;

        const { gsap } = window;
        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-title-line", 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.2 }
            );
             gsap.fromTo(".phone-deck-container", 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
            );
        }, heroRef);
        
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} id="hero" className="min-h-screen h-screen flex flex-col items-center justify-center gap-16 relative text-center text-white overflow-hidden p-6 pt-24">
            <div className="hero-bg"></div>
             <div className="z-10 relative">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase">
                    <span className="hero-title-line block text-gray-300 text-2xl md:text-4xl font-medium tracking-normal normal-case">{content.title}</span>
                    <span className="hero-title-line block mt-2 text-glow bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">{content.name}</span>
                </h1>
            </div>
            
            <div className="phone-deck-container w-full max-w-3xl lg:max-w-5xl aspect-video z-10 select-none">
                <PhoneDeck items={content.phone_deck_items} />
            </div>
        </section>
    );
};

export default Hero;