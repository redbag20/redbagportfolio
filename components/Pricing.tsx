import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface PriceCardData {
    title: string;
    features: string[];
    note: string;
}

interface NotesSectionData {
    title: string;
    list: string[];
}

interface PricingProps {
    content: {
        title: string;
        cards: PriceCardData[];
        cta_button: string;
        pricingNotes: NotesSectionData;
        generalNotes: NotesSectionData;
        copyrightNotes: NotesSectionData;
    };
}

const CheckmarkIcon = () => (
    <svg className="w-4 h-4 mr-3 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
    </svg>
);

const PriceCard: React.FC<{ card: PriceCardData; index: number }> = ({ card, index }) => {
    const featuresWithPriceStyling = card.features.map(feature => {
        const strikethroughMatch = feature.match(/(.*?)(~~(.*?)~~)?$/);
        const mainFeature = strikethroughMatch ? strikethroughMatch[1].trim() : feature;
        const originalPrice = strikethroughMatch ? strikethroughMatch[3] : undefined;

        const parts = mainFeature.split(/(: ₩|: \+₩)/);
        if (parts.length > 1) {
            const pricePart = (parts[1] + parts[2]).replace(' (', '\u00A0(');
            return (
                <span key={feature} className="flex flex-wrap items-baseline gap-x-2">
                    <span>
                        {parts[0]}
                        <span className="text-lg font-bold text-white">{pricePart}</span>
                    </span>
                    {originalPrice && (
                        <span className="text-xs text-gray-500 line-through decoration-gray-500">{originalPrice}</span>
                    )}
                </span>
            );
        }
        
        if (originalPrice) {
            return (
                <span key={feature} className="flex flex-wrap items-baseline gap-x-2">
                    <span>{mainFeature}</span>
                    <span className="text-xs text-gray-500 line-through decoration-gray-500">{originalPrice}</span>
                </span>
            );
        }

        return mainFeature;
    });

    return (
        <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-xl p-8 flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.03] group">
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-baseline gap-3 mb-6">
                <span className="text-xs text-gray-700 font-display font-bold">0{index + 1}</span>
                <h3 className="text-xl font-bold text-white font-display">{card.title}</h3>
            </div>
            <ul className="space-y-3 text-gray-400 text-sm flex-grow">
                {featuresWithPriceStyling.map((feature, i) => (
                    <li key={i} className="flex items-start">
                        <CheckmarkIcon />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            {card.note && (
                <p className="text-xs text-gray-600 mt-8 text-center">{card.note}</p>
            )}
        </div>
    );
};

const CollapsibleNotes: React.FC<{ notes: NotesSectionData; defaultOpen?: boolean }> = ({ notes, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border border-white/[0.06] rounded-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
            >
                <h2 className="text-base font-bold text-white font-display">{notes.title}</h2>
                <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className="grid transition-all duration-500 ease-in-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                <div className="overflow-hidden">
                    <ul className="space-y-3 text-gray-500 text-sm px-6 pb-5">
                        {notes.list.map((note: string, index: number) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="text-red-500/60 mt-1 text-xs">•</span>
                                <span className="leading-relaxed">
                                    {note.split('**').map((part, i) =>
                                        i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-300">{part}</strong> : part
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const Pricing: React.FC<PricingProps> = ({ content }) => {
    return (
        <section id="pricing" className="py-28 md:py-40">
            <div className="container mx-auto px-6 max-w-6xl scroll-reveal">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">{content.title}</h2>
                    <div className="w-12 h-[3px] bg-red-500 mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.cards.map((card, index) => (
                        <PriceCard key={index} card={card} index={index} />
                    ))}
                </div>

                <div className="space-y-3 mt-16">
                    {content.pricingNotes && <CollapsibleNotes notes={content.pricingNotes} defaultOpen />}
                    {content.generalNotes && <CollapsibleNotes notes={content.generalNotes} />}
                    {content.copyrightNotes && <CollapsibleNotes notes={content.copyrightNotes} />}
                </div>

            </div>
        </section>
    );
};

export default Pricing;
