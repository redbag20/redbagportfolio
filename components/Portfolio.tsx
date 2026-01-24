
import React, { useState } from 'react';
import Modal from './Modal';
import PortfolioMarquee from './PortfolioMarquee';
import type { PortfolioItem, PortfolioCategory } from '../types';

interface PortfolioProps {
    content: {
        title: string;
        items: PortfolioItem[];
        categories: Record<PortfolioCategory, string>;
    }
}

const portfolioOrder: PortfolioCategory[] = ['오리지널곡', '믹스마스터', '라이브 사운드 오퍼레이팅', '상업음악'];

const Portfolio: React.FC<PortfolioProps> = ({ content }) => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    
    const openModal = (youtubeId: string) => {
        setSelectedVideo(youtubeId);
    };

    const closeModal = () => {
        setSelectedVideo(null);
    };

    return (
        <section id="portfolio" className="py-24 md:py-40 bg-black relative overflow-hidden">
             <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(240,32,32,0.15),rgba(255,255,255,0))]"></div>
            <div className="container mx-auto px-6 text-center mb-16 scroll-reveal relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white text-glow uppercase tracking-widest">{content.title}</h2>
            </div>
            
            <div className="relative z-10 space-y-20">
                {portfolioOrder.map(category => {
                    const categoryItems = content.items.filter(item => item.category === category);
                    if (categoryItems.length === 0) return null;

                    return (
                        <div key={category} className="scroll-reveal">
                            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-300 mb-8 tracking-wide">{content.categories[category]}</h3>
                            <div className="relative">
                                <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 z-10 bg-gradient-to-r from-black to-transparent"></div>
                                <PortfolioMarquee items={categoryItems} onCardClick={openModal} />
                                <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24 z-10 bg-gradient-to-l from-black to-transparent"></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedVideo && <Modal youtubeId={selectedVideo} onClose={closeModal} />}
        </section>
    );
};

export default Portfolio;