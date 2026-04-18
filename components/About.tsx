import React, { useState, useEffect, useRef } from 'react';
import { SummaryIcon, ServicesIcon, StrengthsIcon } from './icons/AboutIcons';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface StatItem {
    value: number;
    suffix: string;
    label: string;
}

interface AboutProps {
    content: {
        name: string;
        role: string;
        stats: StatItem[];
        summary_title: string;
        summary: string[];
        services_title: string;
        services: string[];
        strengths_title: string;
        strengths: string[];
        partner_streamers_title?: string;
        partner_streamers?: { name: string; image: string; url?: string }[];
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
        <div className="border-b border-gray-800/40 last:border-b-0 relative">
            {/* Active red accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-red-500 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-6 px-6 md:px-8 hover:bg-white/[0.02] transition-colors duration-200"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    <div className="text-red-500 mr-4 md:mr-5">{icon}</div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-100 tracking-wide font-display">{title}</h3>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className="grid transition-all duration-500 ease-in-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
                <div className="overflow-hidden">
                    <div className="pl-14 md:pl-16 pr-6 md:pr-8 pb-6">
                        <ul className="space-y-3 text-gray-400 text-sm md:text-base list-disc list-inside">
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

const StatCounter: React.FC<{ stat: StatItem; index: number }> = ({ stat, index }) => {
    const numRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = numRef.current;
        if (!el || !window.gsap) return;
        const { gsap } = window;
        if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

        const obj = { val: 0 };
        gsap.to(obj, {
            val: stat.value,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
            },
            onUpdate: () => {
                el.textContent = Math.round(obj.val).toString();
            },
        });
    }, [stat.value]);

    return (
        <div className="flex items-center">
            <div className="flex-1">
                <div className="flex items-baseline gap-1">
                    <span ref={numRef} className="text-6xl md:text-8xl lg:text-[7rem] font-extrabold text-white font-display leading-none">0</span>
                    <span className="text-3xl md:text-5xl font-bold text-red-500">{stat.suffix}</span>
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-2 uppercase tracking-[0.25em] font-medium">{stat.label}</div>
            </div>
            {index < 2 && (
                <div className="hidden md:block w-px h-20 bg-gray-800/50 ml-8" />
            )}
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
        <section id="about" className="py-24 md:py-40">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Stats strip - full width, horizontal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 mb-24 scroll-reveal">
                    {content.stats.map((stat, i) => (
                        <StatCounter key={i} stat={stat} index={i} />
                    ))}
                </div>

                {/* Offset layout: title left, accordion right */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-4 scroll-reveal">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider font-display leading-tight">{content.name}</h2>
                        <p className="text-base md:text-lg text-gray-500 mt-3">{content.role}</p>
                        <div className="w-12 h-[3px] bg-red-500 mt-6"></div>
                    </div>

                    <div className="md:col-span-8 scroll-reveal">
                        <div className="border border-gray-800/30 rounded-lg overflow-hidden bg-white/[0.01]">
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

                        {content.partner_streamers && content.partner_streamers.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-800/40 scroll-reveal">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 font-display flex items-center">
                                    <span className="w-1.5 h-6 bg-red-500 mr-3 inline-block rounded-sm"></span>
                                    {content.partner_streamers_title}
                                </h3>
                                <div className="flex gap-6 md:gap-10 flex-wrap">
                                    {content.partner_streamers.map((streamer, idx) => (
                                        <a key={idx} href={streamer.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group cursor-pointer">
                                            <div className="w-40 h-52 md:w-56 md:h-72 rounded-2xl overflow-hidden bg-white/[0.02] border border-gray-800/50 group-hover:border-red-500/50 transition-all duration-300 relative shadow-lg">
                                                <img 
                                                    src={streamer.image} 
                                                    alt={streamer.name} 
                                                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                            </div>
                                            <span className="mt-4 text-base md:text-lg font-semibold text-gray-400 group-hover:text-white transition-colors duration-300 tracking-wide">
                                                {streamer.name}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
