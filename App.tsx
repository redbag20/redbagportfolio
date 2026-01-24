
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Clients from './components/Clients';
import Contact from './components/Contact';
import { content } from './data/content';
import type { Language } from './types';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('KR');
    const currentContent = content[language];

    useEffect(() => {
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
    }, []);

    return (
        <div className="bg-[#050505] min-h-screen overflow-x-hidden">
            <Header language={language} setLanguage={setLanguage} content={currentContent.header} />
            <main>
                <Hero content={currentContent.hero} />
                <About content={currentContent.about} />
                <Portfolio content={currentContent.portfolio} />
                <Clients content={currentContent.clients} clients_data={currentContent.clients_data} />
                <Contact content={currentContent.contact} />
            </main>
        </div>
    );
};

export default App;