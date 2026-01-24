import React from 'react';
import { ChatIcon } from './icons/ChatIcon';

interface PriceCard {
    title: string;
    features: string[];
    note: string;
}

interface PricingProps {
    content: {
        title: string;
        cards: PriceCard[];
        cta_button: string;
    }
}

const CheckmarkIcon = () => (
    <svg className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
    </svg>
);


const PricingCard: React.FC<{ card: PriceCard; index: number }> = ({ card, index }) => {
    // Extract price from features that contain '₩'
    const featuresWithPriceStyling = card.features.map(feature => {
        const parts = feature.split(/(: ₩|: \+₩)/);
        if (parts.length > 1) {
            const pricePart = parts[1] + parts[2];
            return (
                <span key={feature}>
                    {parts[0]}
                    <span className="text-xl font-bold text-white">{pricePart}</span>
                </span>
            );
        }
        return feature;
    });

    return (
        <div className="relative bg-black/30 backdrop-blur-lg border border-red-500/30 rounded-2xl p-8 flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(240,32,32,0.6)] hover:border-red-500/60">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">{card.title}</h3>
            <ul className="space-y-4 text-gray-300 flex-grow">
                {featuresWithPriceStyling.map((feature, i) => (
                    <li key={i} className="flex items-start">
                        <CheckmarkIcon />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            {card.note && (
                <p className="text-sm text-gray-500 mt-8 text-center">{card.note}</p>
            )}
        </div>
    )
};


const Pricing: React.FC<PricingProps> = ({ content }) => {
    return (
        <section id="pricing" className="py-24 md:py-40 bg-[#0A0A0A]">
             <div className="container mx-auto px-6">
                <div className="text-center mb-16 scroll-reveal">
                    <h2 className="text-4xl md:text-5xl font-black text-white text-glow uppercase tracking-widest">{content.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-reveal">
                    {content.cards.map((card, index) => (
                        <PricingCard key={index} card={card} index={index} />
                    ))}
                </div>

                <div className="text-center mt-20 scroll-reveal">
                    <a 
                        href="https://open.kakao.com/me/redbagmusic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center gap-3 text-lg font-bold"
                    >
                        <span className="relative z-10 px-8 py-4 text-white bg-[#FF0F0F] rounded-full transition-transform duration-300 ease-in-out group-hover:scale-105">
                            <ChatIcon className="inline-block w-5 h-5 mr-2" />
                            {content.cta_button}
                        </span>
                         <span className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Pricing;