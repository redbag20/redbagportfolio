import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import { content } from './data/content';
import type { Language } from './types';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('KR');
    const [page, setPage] = useState('home');
    const currentContent = content[language];

    useEffect(() => {
        // This effect needs to re-run when the page changes to observe new elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        const targets = document.querySelectorAll('.scroll-reveal');
        targets.forEach(target => observer.observe(target));

        return () => {
            targets.forEach(target => observer.unobserve(target));
        };
    }, [page, language]); // Re-run on page and language change

    const navigate = (targetPage: string) => {
        setPage(targetPage);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const pages: { [key: string]: React.ReactNode } = {
        home: <HomePage content={currentContent} />,
        pricing: <PricingPage content={currentContent} onNavigate={navigate} />,
    };

    return (
        <div className="bg-[#050505] min-h-screen overflow-x-hidden">
            {page === 'home' && <Header language={language} setLanguage={setLanguage} content={currentContent.header} onNavigate={navigate} />}
            {pages[page]}
        </div>
    );
};

export default App;