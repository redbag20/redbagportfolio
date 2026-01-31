import React, { useState, useEffect } from 'react';
import type { Language } from '../types';

interface HeaderProps {
    language: Language;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>;
    content: {
        logo: string;
        nav: {
            about: string;
            portfolio: string;
            pricing: string;
            contact: string;
        }
    };
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, content }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isMenuOpen]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleMobileLinkClick = (target: string) => {
        setIsMenuOpen(false);
        scrollToSection(target);
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-500 ${scrolled || isMenuOpen ? 'bg-black/60 backdrop-blur-xl border-b border-white/[0.04]' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 py-5 flex justify-between items-center">
                    {/* Logo */}
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-lg font-extrabold text-white tracking-[0.15em] uppercase font-display focus:outline-none focus-visible:ring-2 ring-red-500 rounded-sm px-1 z-10">
                        {content.logo}
                    </button>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-10">
                        {[
                            { label: content.nav.about, action: () => scrollToSection('about') },
                            { label: content.nav.portfolio, action: () => scrollToSection('portfolio') },
                            { label: content.nav.pricing, action: () => scrollToSection('pricing') },
                            { label: content.nav.contact, action: () => scrollToSection('contact') },
                        ].map(({ label, action }) => (
                            <button key={label} onClick={action} className="nav-link text-gray-400 hover:text-white transition-colors duration-200 text-xs font-medium tracking-[0.2em] uppercase">
                                {label}
                            </button>
                        ))}
                    </nav>

                    {/* Language toggle - minimal slash style */}
                    <div className="hidden md:flex items-center gap-0 text-xs font-medium tracking-wider">
                        <button
                            onClick={() => setLanguage('KR')}
                            className={`px-1.5 py-0.5 transition-colors duration-300 ${language === 'KR' ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}>
                            KR
                        </button>
                        <span className="text-gray-700">/</span>
                        <button
                            onClick={() => setLanguage('EN')}
                            className={`px-1.5 py-0.5 transition-colors duration-300 ${language === 'EN' ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}>
                            EN
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="relative w-10 h-10 -mr-2 focus:outline-none"
                            aria-label="Open menu"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7">
                                <span className={`block absolute h-[1.5px] w-7 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2.5'}`}></span>
                                <span className={`block absolute h-[1.5px] w-7 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'translate-y-0'}`}></span>
                                <span className={`block absolute h-[1.5px] w-7 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-2.5'}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile overlay */}
            <div className={`fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-2xl transition-opacity duration-300 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <nav className="flex flex-col items-center justify-center h-full gap-10 text-center">
                    {[
                        { label: content.nav.about, action: () => handleMobileLinkClick('about') },
                        { label: content.nav.portfolio, action: () => handleMobileLinkClick('portfolio') },
                        { label: content.nav.pricing, action: () => handleMobileLinkClick('pricing') },
                        { label: content.nav.contact, action: () => handleMobileLinkClick('contact') },
                    ].map(({ label, action }) => (
                        <button key={label} onClick={action} className="text-2xl font-bold text-gray-300 active:text-red-500 transition-colors duration-200 tracking-[0.15em] uppercase font-display">
                            {label}
                        </button>
                    ))}

                    <div className="absolute bottom-16 flex items-center gap-0 text-sm font-medium tracking-wider">
                        <button
                            onClick={() => setLanguage('KR')}
                            className={`px-3 py-2 transition-colors duration-300 ${language === 'KR' ? 'text-white' : 'text-gray-600'}`}>
                            KR
                        </button>
                        <span className="text-gray-700">/</span>
                        <button
                            onClick={() => setLanguage('EN')}
                            className={`px-3 py-2 transition-colors duration-300 ${language === 'EN' ? 'text-white' : 'text-gray-600'}`}>
                            EN
                        </button>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
