import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import PhoneDeck from '../components/PhoneDeck';
import Portfolio from '../components/Portfolio';
import Clients from '../components/Clients';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

interface HomePageProps {
    content: any;
}

const SectionDivider: React.FC<{ number: string }> = ({ number }) => (
    <div className="flex items-center gap-4 max-w-6xl mx-auto px-6 py-8">
        <span className="text-[10px] font-medium tracking-[0.3em] text-gray-700 font-display">{number}</span>
        <div className="flex-1 h-px bg-gray-800/40"></div>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ content }) => {
    return (
        <main>
            <Hero content={content.hero} />
            <SectionDivider number="01" />
            <About content={content.about} />
            {/* Latest Work marquee */}
            <div className="py-16 md:py-24 scroll-reveal">
                <div className="container mx-auto px-6 max-w-6xl mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-[2px] bg-red-500"></div>
                        <h3 className="text-sm md:text-base uppercase tracking-[0.2em] text-gray-400 font-semibold font-display">{content.hero.latest}</h3>
                    </div>
                </div>
                <div className="h-40 md:h-52">
                    <PhoneDeck items={content.hero.phone_deck_items} />
                </div>
            </div>
            <SectionDivider number="02" />
            <Portfolio content={content.portfolio} />
            <SectionDivider number="03" />
            <Clients content={content.clients} clients_data={content.clients_data} />
            <SectionDivider number="04" />
            <Pricing content={content.pricing} />
            <SectionDivider number="05" />
            <Contact content={content.contact} />
            <Footer content={content.footer} />
        </main>
    );
};

export default HomePage;
