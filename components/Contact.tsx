
import React from 'react';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { DiscordIcon } from './icons/DiscordIcon';

interface ContactProps {
    content: {
        title: string;
        button: string;
        email: string;
    }
}

const Contact: React.FC<ContactProps> = ({ content }) => {
    return (
        <section id="contact" className="py-24 md:py-40 bg-black text-center">
            <div className="container mx-auto px-6 scroll-reveal max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">{content.title}</h2>
                <a 
                    href={`mailto:${content.email}`}
                    className="group relative inline-block text-lg font-semibold"
                >
                    <span className="relative z-10 px-10 py-4 text-white bg-red-600 rounded-full transition-colors duration-300 group-hover:bg-red-700">{content.button}</span>
                     <span className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"></span>
                </a>
                <p className="text-gray-500 mt-8 text-base">{content.email}</p>
                <div className="flex justify-center items-center space-x-8 mt-12">
                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300 transform hover:scale-110">
                        <YouTubeIcon className="w-7 h-7" />
                    </a>
                    <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300 transform hover:scale-110">
                        <DiscordIcon className="w-7 h-7" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;