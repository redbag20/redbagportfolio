import React from 'react';
import { ChatIcon } from '../components/icons/ChatIcon';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import Footer from '../components/Footer';

interface PriceCardData {
    title: string;
    features: string[];
    note: string;
}

interface NotesSectionData {
    title: string;
    list: string[];
}

interface PricingPageProps {
    content: {
        pricing: {
            title: string;
            cards: PriceCardData[];
            cta_button: string;
            pricingNotes: NotesSectionData;
            generalNotes: NotesSectionData;
            copyrightNotes: NotesSectionData;
        },
        footer: {
            copyright: string;
        }
    }
    onNavigate: (page: string) => void;
}

const CheckmarkIcon = () => (
    <svg className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
    </svg>
);

const PriceCard: React.FC<{ card: PriceCardData }> = ({ card }) => {
    const featuresWithPriceStyling = card.features.map(feature => {
        const parts = feature.split(/(: ₩|: \+₩)/);
        if (parts.length > 1) {
            const pricePart = (parts[1] + parts[2]).replace(' (', '\u00A0(');
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
    );
};

const NotesSection: React.FC<{ notes: NotesSectionData, className?: string }> = ({ notes, className = '' }) => (
    <div className={`max-w-4xl mx-auto bg-gray-900/20 border border-gray-800/50 rounded-xl p-8 ${className}`}>
        <h2 className="text-2xl font-bold text-white text-center mb-6">{notes.title}</h2>
        <ul className="space-y-4 text-gray-400">
            {notes.list.map((note: string, index: number) => (
                <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-red-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="leading-relaxed">
                        {note.split('**').map((part, i) => 
                            i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-200">{part}</strong> : part
                        )}
                    </span>
                </li>
            ))}
        </ul>
    </div>
);


const PricingPage: React.FC<PricingPageProps> = ({ content, onNavigate }) => {
    const pricingContent = content.pricing;
    return (
        <div className="min-h-screen bg-[#0A0A0A] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-[#0A0A0A] to-[#0A0A0A]">
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-gray-800/50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <button 
                        onClick={() => onNavigate('home')} 
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide group"
                    >
                        <ArrowLeftIcon className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
                        Back to Site
                    </button>
                     <div className="text-xl font-black text-white text-glow tracking-wider">
                        Red Bag
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-20 md:pt-32 md:pb-24 animate-page-in">
                 <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-black text-white text-glow uppercase tracking-widest">{pricingContent.title}</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pricingContent.cards.map((card, index) => (
                            <PriceCard key={index} card={card} />
                        ))}
                    </div>

                    {pricingContent.pricingNotes && (
                        <NotesSection notes={pricingContent.pricingNotes} className="mt-16" />
                    )}

                    {pricingContent.generalNotes && (
                        <NotesSection notes={pricingContent.generalNotes} className="mt-8" />
                    )}

                    {pricingContent.copyrightNotes && (
                        <NotesSection notes={pricingContent.copyrightNotes} className="mt-8" />
                    )}

                    <div className="text-center mt-20">
                        <a 
                            href="https://open.kakao.com/me/redbagmusic"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center gap-3 text-lg font-bold"
                        >
                            <span className="relative z-10 px-8 py-4 text-white bg-[#FF0F0F] rounded-full transition-transform duration-300 ease-in-out group-hover:scale-105">
                                <ChatIcon className="inline-block w-5 h-5 mr-2" />
                                {pricingContent.cta_button}
                            </span>
                             <span className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></span>
                        </a>
                    </div>
                </div>
            </main>
            <Footer content={content.footer} />
        </div>
    );
};

export default PricingPage;