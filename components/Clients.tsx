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
    const totalWidthRef = useRef<number>(0);

    // Drag state
    const isDown = useRef(false);
    const startX = useRef(0);
    const currentX = useRef(0);

    useEffect(() => {
        if (!sectionRef.current || typeof window === 'undefined' || !window.gsap || clients_data.length === 0) return;

        const { gsap } = window;
        if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

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

            // Calculate half because we duplicated the items 4 times (original + 3 copies seems to be what was rendered)
            // Actually the map is [...clients_data, ...clients_data, ...clients_data, ...clients_data]
            // We need the width of one full set to be consistent with logical wrapping?
            // The original logic was: totalWidth = allItemsArr.reduce(...) / 2;
            // The logic: totalWidth is the distance to move before wrapping.
            // If the rendered list is 4 sets, usually we move by 1 set width or 2 sets width.
            // The original code used / 2. Let's stick to that logic assuming it was correct for the loop.
            // Wait, if 4 sets are rendered, and we move by total/2, we move past 2 sets.
            // That matches the visual seamless loop if the content is 2 sets repeated?
            // Actually if we display 4 sets, usually we move 1 set length and reset.
            // But let's keep original logic: totalWidth = sum... / 2.

            const fullWidth = allItemsArr.reduce((acc, item) => acc + item.offsetWidth, 0);
            const moveDistance = fullWidth / 2;
            totalWidthRef.current = moveDistance;

            if (moveDistance === 0) return;

            gsap.set(marquee, { x: 0 });

            marqueeAnimation.current = gsap.to(marquee, {
                x: `-=${moveDistance}`,
                duration: moveDistance / 40, // Speed control (pixels per second)
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % moveDistance)
                }
            });

            // Pause on hover/touch
            container = marquee.parentElement as HTMLDivElement;
            if (container) {
                container.addEventListener('mouseenter', handleInteractionStart);
                container.addEventListener('mouseleave', handleInteractionEnd);
                // Touch events for pausing (replaced by our manual handlers later? 
                // actually we keep these for simple hover-pause, but drag will override appropriately)
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

    const handleWheel = (e: React.WheelEvent) => {
        if (!marqueeRef.current || !totalWidthRef.current || !window.gsap) return;

        // Prevent default only if we are scrolling horizontally or if we decide to hijack vertical scroll
        // User asked for mouse wheel support. 
        // e.deltaY is usually vertical scroll. 
        // We add to x.

        const { gsap } = window;
        const currentVal = gsap.getProperty(marqueeRef.current, "x");
        const delta = e.deltaY || e.deltaX; // Support both

        // Move
        let newVal = currentVal - delta;

        // Wrap to stay in [-totalWidth, 0]
        const max = totalWidthRef.current;
        newVal = (newVal % max - max) % max;

        gsap.set(marqueeRef.current, { x: newVal });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!marqueeRef.current || !window.gsap) return;
        isDown.current = true;
        startX.current = e.pageX;
        currentX.current = window.gsap.getProperty(marqueeRef.current, "x");

        if (marqueeRef.current.parentElement) {
            marqueeRef.current.parentElement.style.cursor = 'grabbing';
        }
    };

    const handleMouseLeave = () => {
        isDown.current = false;
        if (marqueeRef.current && marqueeRef.current.parentElement) {
            marqueeRef.current.parentElement.style.cursor = 'grab';
        }
    };

    const handleMouseUp = () => {
        isDown.current = false;
        if (marqueeRef.current && marqueeRef.current.parentElement) {
            marqueeRef.current.parentElement.style.cursor = 'grab';
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown.current || !marqueeRef.current || !window.gsap || !totalWidthRef.current) return;
        e.preventDefault();

        const x = e.pageX;
        const walk = (x - startX.current) * 1.5; // Drag speed
        let newVal = currentX.current + walk;

        // Wrap to stay in [-totalWidth, 0]
        const max = totalWidthRef.current;
        newVal = (newVal % max - max) % max;

        window.gsap.set(marqueeRef.current, { x: newVal });
    };

    return (
        <section id="clients" ref={sectionRef} className="py-20 md:py-32">
            <div className="container mx-auto px-6 text-center mb-16 clients-title">
                <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">{content.title}</h2>
            </div>
            <div
                className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onWheel={handleWheel}
            >
                <div ref={marqueeRef} className="flex w-max items-center">
                    {[...clients_data, ...clients_data, ...clients_data, ...clients_data].map((client, index) => (
                        <div key={index} className="client-logo px-6 md:px-10 flex-shrink-0">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/[0.06] border border-white/[0.08] overflow-hidden flex items-center justify-center p-3 hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-300">
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        className="w-full h-full object-contain rounded-lg"
                                    />
                                </div>
                                <span className="text-[10px] text-gray-600 tracking-wider whitespace-nowrap">{client.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Clients;