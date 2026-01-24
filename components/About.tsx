
import React, { useState } from 'react';
import { SummaryIcon, ServicesIcon, StrengthsIcon } from './icons/AboutIcons';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

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

interface AccordionItemProps {
    title: string;
    items: string[];
    icon: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, items, icon, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-800/60 last:border-b-0">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-6 px-4 md:px-6 hover:bg-gray-900/40 transition-colors duration-200"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    <div className="text-red-500 mr-4 md:mr-5">{icon}</div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-100 tracking-wide">{title}</h3>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className="grid transition-all duration-500 ease-in-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
                <div className="overflow-hidden">
                    <div className="pl-14 md:pl-16 pr-4 md:pr-6 pb-6">
                        <ul className="space-y-3 text-gray-400 text-base md:text-lg list-disc list-inside">
                            {items.map((item, index) => (
                                <li key={index} className="leading-relaxed">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};


const About: React.FC<AboutProps> = ({ content }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
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

                <div className="bg-gray-900/20 border border-gray-800/50 rounded-xl shadow-lg scroll-reveal">
                    {sections.map((section, index) => (
                        <AccordionItem
                            key={index}
                            title={section.title}
                            items={section.items}
                            icon={section.icon}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
