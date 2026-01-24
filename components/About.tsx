
import React, { useState } from 'react';
import { SummaryIcon, ServicesIcon, StrengthsIcon } from './icons/AboutIcons';

interface AboutProps {
    content: {
        name: string;
        role: string;
        summary_title: string;
        summary: string[];
        services_title: string;
        services: string[];
        strengths_title: string;
        strengths: string[];
    }
}

const AccordionItem: React.FC<{
    title: string;
    items: string[];
    icon: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}> = ({ title, items, icon, isOpen, onClick }) => (
    <div className="border-b border-gray-800/50">
        <button
            className="w-full flex justify-between items-center text-left py-6 px-2 focus:outline-none"
            onClick={onClick}
        >
            <div className="flex items-center">
                <div className="text-red-500 mr-5">{icon}</div>
                <span className="text-lg md:text-xl font-semibold text-gray-100">{title}</span>
            </div>
            <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        >
            <div className="pb-6 pl-12 pr-2">
                 <ul className="space-y-3 text-gray-400">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-start">
                             <svg className="w-3 h-3 mr-3 mt-1.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);


const About: React.FC<AboutProps> = ({ content }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleAccordionClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    const sections = [
        { title: content.summary_title, items: content.summary, icon: <SummaryIcon /> },
        { title: content.services_title, items: content.services, icon: <ServicesIcon /> },
        { title: content.strengths_title, items: content.strengths, icon: <StrengthsIcon /> },
    ];

    return (
        <section id="about" className="py-20 md:py-32 bg-black">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16 scroll-reveal">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider">{content.name}</h2>
                    <p className="text-lg md:text-xl text-gray-400 mt-3">{content.role}</p>
                </div>

                <div className="scroll-reveal">
                    {sections.map((section, index) => (
                         <AccordionItem
                            key={index}
                            title={section.title}
                            items={section.items}
                            icon={section.icon}
                            isOpen={openIndex === index}
                            onClick={() => handleAccordionClick(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;