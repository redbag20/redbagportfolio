import React, { useRef, useEffect, useState } from 'react';
import type { PortfolioItem } from '../types';
import { LeftArrowIcon, RightArrowIcon } from './icons/ArrowIcons';

interface PortfolioMarqueeProps {
    items: PortfolioItem[];
    onCardClick: (youtubeId: string) => void;
}

const VideoCard: React.FC<{ item: PortfolioItem; onClick: () => void }> = ({ item, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) scale(1.04)`;
    };
    const handleMouseLeave = () => {
        const el = cardRef.current;
        if (!el) return;
        el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
    };

    return (
        <div
            className="group relative flex-shrink-0 w-[440px] h-[247.5px] mx-5"
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <button className="w-full h-full text-left">
                <div ref={cardRef} className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-black/40 transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 group-hover:border-red-500 group-hover:shadow-[0_0_35px_-5px_rgba(255,15,15,0.8)] z-10"></div>
                    <img 
                        src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                         <div className="w-16 h-16 bg-red-600/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20">
                            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg>
                         </div>
                    </div>
                     <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h3 className="text-white font-bold text-lg truncate">{item.title}</h3>
                        <p className="text-red-400 text-sm font-medium">{item.role}</p>
                    </div>
                </div>
            </button>
        </div>
    );
};

const PortfolioMarquee: React.FC<PortfolioMarqueeProps> = ({ items, onCardClick }) => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = () => {
        const el = marqueeRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollLeft(scrollLeft > 1);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };

    useEffect(() => {
        const el = marqueeRef.current;
        if (!el) return;
        
        checkScrollButtons();

        el.addEventListener('scroll', checkScrollButtons, { passive: true });
        window.addEventListener('resize', checkScrollButtons);
        
        return () => {
            el.removeEventListener('scroll', checkScrollButtons);
            window.removeEventListener('resize', checkScrollButtons);
        };
    }, [items]);

    const handleNavClick = (direction: 'left' | 'right') => {
        const el = marqueeRef.current;
        if (!el) return;
        const scrollAmount = el.clientWidth * 0.9;
        el.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };
    
    return (
        <div className="relative group/marquee">
            <button 
                onClick={() => handleNavClick('left')}
                aria-label="Scroll left"
                className="absolute top-1/2 -translate-y-1/2 left-0 z-20 p-4 bg-black/40 rounded-full text-white transition-all duration-300 hover:bg-black/70 disabled:opacity-0 disabled:cursor-not-allowed transform opacity-0 group-hover/marquee:opacity-100 -translate-x-6"
                disabled={!canScrollLeft}
            >
                <LeftArrowIcon />
            </button>

            <div 
                ref={marqueeRef} 
                className="flex overflow-x-auto py-2 snap-x snap-mandatory no-scrollbar"
            >
                {items.map((item, index) => (
                    <div className="snap-start" key={`${item.id}-${index}`}>
                        <VideoCard 
                            item={item} 
                            onClick={() => item.youtubeId && onCardClick(item.youtubeId)}
                        />
                    </div>
                ))}
            </div>

            <button 
                onClick={() => handleNavClick('right')}
                aria-label="Scroll right"
                className="absolute top-1/2 -translate-y-1/2 right-0 z-20 p-4 bg-black/40 rounded-full text-white transition-all duration-300 hover:bg-black/70 disabled:opacity-0 disabled:cursor-not-allowed transform opacity-0 group-hover/marquee:opacity-100 translate-x-6"
                disabled={!canScrollRight}
            >
                <RightArrowIcon />
            </button>
        </div>
    );
};

export default PortfolioMarquee;