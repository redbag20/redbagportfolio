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
    onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, content, onNavigate }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    const handleMobileLinkClick = (target: string, isPage: boolean = false) => {
        setIsMenuOpen(false);
        if (isPage) {
            onNavigate(target);
        } else {
            scrollToSection(target);
        }
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-black/50 backdrop-blur-lg border-b border-gray-800/50' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <button onClick={() => onNavigate('home')} className="text-2xl font-black text-white text-glow tracking-wider focus:outline-none focus-visible:ring-2 ring-red-500 rounded-sm px-1 z-10">
                        {content.logo}
                    </button>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-10">
                        <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide">{content.nav.about}</button>
                        <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide">{content.nav.portfolio}</button>
                        <button onClick={() => onNavigate('pricing')} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide">{content.nav.pricing}</button>
                        <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide">{content.nav.contact}</button>
                    </nav>

                    {/* Desktop Language Switcher */}
                    <div className="hidden md:flex items-center space-x-1 bg-gray-900/50 border border-gray-700/60 rounded-full p-0.5">
                        <button 
                            onClick={() => setLanguage('KR')} 
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors duration-300 ${language === 'KR' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}>
                            KR
                        </button>
                        <button 
                            onClick={() => setLanguage('EN')}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors duration-300 ${language === 'EN' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}>
                            EN
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="relative w-10 h-10 -mr-2 focus:outline-none"
                            aria-label="Open menu"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8">
                                <span aria-hidden="true" className={`block absolute h-0.5 w-8 bg-red-500 transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-3'}`} style={{boxShadow: '0 0 8px rgba(255,15,15,0.8)'}}></span>
                                <span aria-hidden="true" className={`block absolute h-0.5 w-8 bg-red-500 transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'translate-y-0'}`} style={{boxShadow: '0 0 8px rgba(255,15,15,0.8)'}}></span>
                                <span aria-hidden="true" className={`block absolute h-0.5 w-8 bg-red-500 transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-3'}`} style={{boxShadow: '0 0 8px rgba(255,15,15,0.8)'}}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[60] bg-black/90 backdrop-blur-lg transition-opacity duration-300 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <nav className="flex flex-col items-center justify-center h-full gap-8 text-center">
                    <button onClick={() => handleMobileLinkClick('about')} className="text-3xl font-bold text-gray-300 active:text-red-500 transition-colors duration-200">{content.nav.about}</button>
                    <button onClick={() => handleMobileLinkClick('portfolio')} className="text-3xl font-bold text-gray-300 active:text-red-500 transition-colors duration-200">{content.nav.portfolio}</button>
                    <button onClick={() => handleMobileLinkClick('pricing', true)} className="text-3xl font-bold text-gray-300 active:text-red-500 transition-colors duration-200">{content.nav.pricing}</button>
                    <button onClick={() => handleMobileLinkClick('contact')} className="text-3xl font-bold text-gray-300 active:text-red-500 transition-colors duration-200">{content.nav.contact}</button>
                    
                    <div className="absolute bottom-16">
                         <div className="flex items-center space-x-1 bg-gray-900/50 border border-gray-700/60 rounded-full p-0.5">
                            <button 
                                onClick={() => setLanguage('KR')} 
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${language === 'KR' ? 'bg-red-600 text-white' : 'text-gray-400'}`}>
                                KR
                            </button>
                            <button 
                                onClick={() => setLanguage('EN')}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${language === 'EN' ? 'bg-red-600 text-white' : 'text-gray-400'}`}>
                                EN
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;