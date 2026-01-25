import React, { useRef, useEffect } from 'react';
import type { Client } from '../types';

declare global {
    interface Window {
        gsap: any;
    }
}

interface ClientsProps {
    content: {
        title: string;
    };
    clients_data: Client[];
}

const Clients: React.FC<ClientsProps> = ({ content, clients_data }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeAnimation = useRef<any>(null);

    useEffect(() => {
        if (!sectionRef.current || typeof window === 'undefined' || !window.gsap || clients_data.length === 0) return;
        
        const { gsap } = window;
        gsap.registerPlugin(gsap.ScrollTrigger);

        const marquee = marqueeRef.current;
        const titleEl = sectionRef.current?.querySelector('.clients-title');

        // Animate title on scroll
        const ctx = gsap.context(() => {
            if (titleEl) {
                gsap.from(titleEl, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: 'power3.out',
                });
            }
        }, sectionRef);

        // Setup continuous marquee animation
        let container: HTMLDivElement | null = null;
        const handleInteractionStart = () => marqueeAnimation.current?.pause();
        const handleInteractionEnd = () => marqueeAnimation.current?.play();
        
        const marqueeTimer = setTimeout(() => {
            if (!marquee) return;
            
            marqueeAnimation.current?.kill();

            const allItemsArr = gsap.utils.toArray('.client-logo') as HTMLDivElement[];
            if (allItemsArr.length === 0) return;

            const totalWidth = allItemsArr.reduce((acc, item) => acc + item.offsetWidth, 0) / 2;
            if (totalWidth === 0) return;

            gsap.set(marquee, { x: 0 });

            marqueeAnimation.current = gsap.to(marquee, {
                x: `-=${totalWidth}`,
                duration: totalWidth / 40, // Speed control (pixels per second)
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
                }
            });

            // Pause on hover/touch
            container = marquee.parentElement as HTMLDivElement;
            if (container) {
                container.addEventListener('mouseenter', handleInteractionStart);
                container.addEventListener('mouseleave', handleInteractionEnd);
                container.addEventListener('touchstart', handleInteractionStart, { passive: true });
                container.addEventListener('touchend', handleInteractionEnd);
            }
        }, 100);

        return () => {
            clearTimeout(marqueeTimer);
            marqueeAnimation.current?.kill();
            if (container) {
                container.removeEventListener('mouseenter', handleInteractionStart);
                container.removeEventListener('mouseleave', handleInteractionEnd);
                container.removeEventListener('touchstart', handleInteractionStart);
                container.removeEventListener('touchend', handleInteractionEnd);
            }
            ctx.revert();
        };
    }, [clients_data]);

    return (
        <section id="clients" ref={sectionRef} className="py-20 md:py-32 bg-[#050505]">
            <div className="container mx-auto px-6 text-center mb-16 clients-title">
                <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">{content.title}</h2>
            </div>
            <div className="w-full overflow-hidden">
                <div ref={marqueeRef} className="flex w-max items-center">
                    {[...clients_data, ...clients_data].map((client, index) => (
                        <div key={index} className="client-logo px-12 md:px-20 flex-shrink-0">
                            <img 
                                src={client.logo} 
                                alt={client.name} 
                                className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Clients;