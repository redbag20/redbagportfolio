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

const socials = [
    { href: 'https://www.youtube.com/@redbagmusic20', icon: YouTubeIcon, label: 'YouTube' },
    { href: 'https://x.com/RedBag20', icon: TwitterIcon, label: 'Twitter' },
    { href: 'https://discordapp.com/users/394411135265439746', icon: DiscordIcon, label: 'Discord' },
    { href: 'https://soundcloud.com/redbagmusics', icon: SoundcloudIcon, label: 'SoundCloud' },
    { href: 'https://www.instagram.com/red_bagmusic/', icon: InstagramIcon, label: 'Instagram' },
    { href: 'https://open.spotify.com/artist/3vNTm5jI4IdPYBupammjTN?si=BLE8QIWeQyS3egi9TMgb0g', icon: SpotifyIcon, label: 'Spotify' },
];

const Contact: React.FC<ContactProps> = ({ content }) => {
    return (
        <section id="contact" className="py-28 md:py-40">
            <div className="container mx-auto px-6 max-w-6xl scroll-reveal">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
                    {/* Left — big headline */}
                    <div className="md:col-span-5">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]" style={{ wordBreak: 'keep-all', whiteSpace: 'pre-line' }}>
                            {content.title}
                        </h2>
                        <div className="w-12 h-[3px] bg-red-500 mt-6"></div>
                    </div>

                    {/* Right — CTA + socials */}
                    <div className="md:col-span-7 flex flex-col gap-10">
                        <div>
                            <a
                                href="https://open.kakao.com/me/redbagmusic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cta-pulse inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-[1.03]"
                            >
                                <ChatIcon className="w-5 h-5" />
                                {content.cta_button}
                            </a>
                        </div>

                        <p className="text-gray-500 text-sm">
                            or email at{' '}
                            <a href={`mailto:${content.email}`} className="text-gray-300 hover:text-red-400 transition-colors underline underline-offset-4 decoration-gray-700 hover:decoration-red-500">
                                {content.email}
                            </a>
                        </p>

                        <div>
                            <h3 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-5 font-medium">{content.social_title}</h3>
                            <div className="flex flex-wrap gap-5">
                                {socials.map(({ href, icon: Icon, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-2 text-gray-600 hover:text-white transition-colors duration-300"
                                        aria-label={label}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-xs tracking-wider hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">{label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
