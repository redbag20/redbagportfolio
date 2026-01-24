
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
            contact: string;
        }
    };
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, content }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-lg border-b border-gray-800/50' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <button onClick={() => scrollToSection('hero')} className="text-2xl font-black text-white text-glow tracking-wider focus:outline-none focus-visible:ring-2 ring-red-500 rounded-sm px-1">
                    {content.logo}
                </button>
                <nav className="hidden md:flex items-center space-x-10">
                    <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide">{content.nav.about}</button>
                    <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide">{content.nav.portfolio}</button>
                    <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide">{content.nav.contact}</button>
                </nav>
                <div className="flex items-center space-x-1 bg-gray-900/50 border border-gray-700/60 rounded-full p-0.5">
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
            </div>
        </header>
    );
};

export default Header;