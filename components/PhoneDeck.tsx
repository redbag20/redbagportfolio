import React, { useRef, useEffect } from 'react';

declare global {
    interface Window {
        gsap: any;
    }
}

interface DeckItem {
    id: number;
    image: string;
}

interface PhoneDeckProps {
    items: DeckItem[];
}

const PhoneDeck: React.FC<PhoneDeckProps> = ({ items }) => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const animation = useRef<any>(null);

    useEffect(() => {
        if (!marqueeRef.current || typeof window === 'undefined' || !window.gsap || items.length === 0) return;
        
        const { gsap } = window;
        const marqueeEl = marqueeRef.current;
        const container = marqueeEl.parentElement;
        
        const timer = setTimeout(() => {
            const itemsArr = gsap.utils.toArray('.marquee-item') as HTMLDivElement[];
            if(itemsArr.length === 0 || !itemsArr[0]) return;

            const totalWidth = (itemsArr.length / 2) * itemsArr[0].offsetWidth;
            if (totalWidth === 0) return;

            gsap.set(marqueeEl, { x: 0 });

            animation.current = gsap.to(marqueeEl, {
                x: `-=${totalWidth}`,
                duration: items.length * 10,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
                }
            });

            const handleInteractionStart = () => animation.current?.pause();
            const handleInteractionEnd = () => animation.current?.play();

            if (container) {
                container.addEventListener('mouseenter', handleInteractionStart);
                container.addEventListener('mouseleave', handleInteractionEnd);
                container.addEventListener('touchstart', handleInteractionStart, { passive: true });
                container.addEventListener('touchend', handleInteractionEnd);
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            animation.current?.kill();
            if (container) {
                const handleInteractionStart = () => animation.current?.pause();
                const handleInteractionEnd = () => animation.current?.play();
                container.removeEventListener('mouseenter', handleInteractionStart);
                container.removeEventListener('mouseleave', handleInteractionEnd);
                container.removeEventListener('touchstart', handleInteractionStart);
                container.removeEventListener('touchend', handleInteractionEnd);
            }
        };
    }, [items]);

    if (!items || items.length === 0) {
        return null;
    }

    let displayItems = [...items];
    while(displayItems.length > 0 && displayItems.length < 10) {
        displayItems = [...displayItems, ...items];
    }
    displayItems = [...displayItems, ...displayItems];

    return (
        <div className="relative w-full h-full bg-neutral-900/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden select-none">
            <div ref={marqueeRef} className="flex h-full w-max">
                {displayItems.map((item, index) => (
                    <div key={index} className="marquee-item flex-shrink-0 w-auto h-full px-3 py-3">
                        <div className="relative h-full aspect-video overflow-hidden rounded-xl shadow-lg">
                            <img 
                                src={item.image} 
                                alt={`Red Bag 포트폴리오 작업물 #${item.id}`}
                                className="w-full h-full object-cover" 
                                loading="lazy"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhoneDeck;