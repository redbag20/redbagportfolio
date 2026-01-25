import React from 'react';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { SoundcloudIcon } from './icons/SoundcloudIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';
import { DiscordIcon } from './icons/DiscordIcon';
import { ChatIcon } from './icons/ChatIcon';

interface ContactProps {
    content: {
        title: string;
        email: string;
        cta_button: string;
        social_title: string;
    }
}

const Contact: React.FC<ContactProps> = ({ content }) => {
    return (
        <section id="contact" className="py-24 md:py-32 text-center">
            <div className="container mx-auto px-6 scroll-reveal max-w-3xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-wider">{content.title}</h2>
                
                <div className="mt-10">
                    <a 
                        href="https://open.kakao.com/me/redbagmusic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center gap-3 text-lg font-bold"
                    >
                        <span className="relative z-10 px-8 py-4 text-white bg-[#FF0F0F] rounded-full transition-transform duration-300 ease-in-out group-hover:scale-105">
                            <ChatIcon className="inline-block w-5 h-5 mr-2" />
                            {content.cta_button}
                        </span>
                         <span className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></span>
                    </a>
                </div>

                <div className="mt-8 text-gray-400">
                    <p>or email at <a href={`mailto:${content.email}`} className="text-red-400 hover:underline transition-colors">{content.email}</a></p>
                </div>

                <div className="mt-20">
                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 tracking-wider">{content.social_title}</h3>
                     <div className="flex justify-center items-center space-x-6 md:space-x-8">
                        <a href="https://www.youtube.com/@redbagmusic20" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300 transform hover:scale-110">
                            <YouTubeIcon className="w-8 h-8" />
                        </a>
                        <a href="https://x.com/RedBag20" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300 transform hover:scale-110">
                            <TwitterIcon className="w-7 h-7" />
                        </a>
                        <a href="https://discordapp.com/users/394411135265439746" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300 transform hover:scale-110">
                            <DiscordIcon className="w-8 h-8" />
                        </a>
                        <a href="https://soundcloud.com/redbagmusics" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300 transform hover:scale-110">
                            <SoundcloudIcon className="w-8 h-8" />
                        </a>
                        <a href="https://www.instagram.com/red_bagmusic/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300 transform hover:scale-110">
                            <InstagramIcon className="w-8 h-8" />
                        </a>
                        <a href="https://open.spotify.com/artist/3vNTm5jI4IdPYBupammjTN?si=BLE8QIWeQyS3egi9TMgb0g" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300 transform hover:scale-110">
                            <SpotifyIcon className="w-7 h-7" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;