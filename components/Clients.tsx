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
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!marqueeRef.current || typeof window === 'undefined' || !window.gsap || clients_data.length === 0) return;
        const { gsap } = window;
        const marquee = marqueeRef.current;
        
        const itemsArr = gsap.utils.toArray('.client-logo') as HTMLDivElement[];
        if(itemsArr.length === 0) return;

        const totalWidth = itemsArr.reduce((acc, item) => acc + item.offsetWidth, 0) / 2; // Divided by 2 because we duplicate the items

        const ctx = gsap.context(() => {
            gsap.to(marquee, {
                x: `-=${totalWidth}`,
                duration: clients_data.length * 8,
                ease: 'none',
                repeat: -1,
            });
        }, marquee);
        
        return () => ctx.revert();
    }, [clients_data]);

    return (
        <section id="clients" className="py-20 md:py-32 bg-[#050505]">
            <div className="container mx-auto px-6 text-center mb-16 scroll-reveal">
                <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">{content.title}</h2>
            </div>
            <div className="w-full overflow-hidden scroll-reveal">
                <div ref={marqueeRef} className="flex w-max">
                    {[...clients_data, ...clients_data].map((client, index) => (
                        <div key={index} className="client-logo px-10 md:px-16 flex-shrink-0">
                            <img 
                                src={client.logo} 
                                alt={client.name} 
                                className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Clients;