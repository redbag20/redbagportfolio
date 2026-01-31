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

const portfolioOrder: PortfolioCategory[] = ['오리지널 및 개인 프로젝트', '보컬 디렉팅 및 믹스마스터링', '믹스마스터', '라이브 사운드 오퍼레이팅', '상업음악'];

const Portfolio: React.FC<PortfolioProps> = ({ content }) => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <section id="portfolio" className="py-28 md:py-44 relative overflow-hidden">
            <div className="container mx-auto px-6 mb-20 scroll-reveal relative z-10">
                <h2 className="text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tight font-display">{content.title}</h2>
                <div className="w-12 h-[3px] bg-red-500 mt-4"></div>
            </div>

            <div className="relative z-10 space-y-24">
                {portfolioOrder.map(category => {
                    const categoryItems = content.items.filter(item => item.category === category);
                    if (categoryItems.length === 0) return null;

                    return (
                        <div key={category} className="scroll-reveal">
                            <div className="container mx-auto px-6 mb-6">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-300 tracking-wide font-display">
                                    {content.categories[category]}
                                </h3>
                            </div>
                            <div className="relative">
                                <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[#050505] to-transparent"></div>
                                <PortfolioMarquee items={categoryItems} onCardClick={(id) => setSelectedVideo(id)} />
                                <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[#050505] to-transparent"></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedVideo && <Modal youtubeId={selectedVideo} onClose={() => setSelectedVideo(null)} />}
        </section>
    );
};

export default Portfolio;
