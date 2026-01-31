import React from 'react';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { SoundcloudIcon } from './icons/SoundcloudIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';

interface FooterProps {
    content: {
        copyright: string;
    }
}

const socials = [
    { href: 'https://www.youtube.com/@redbagmusic20', icon: YouTubeIcon, label: 'YouTube' },
    { href: 'https://x.com/RedBag20', icon: TwitterIcon, label: 'X' },
    { href: 'https://soundcloud.com/redbagmusics', icon: SoundcloudIcon, label: 'SoundCloud' },
    { href: 'https://www.instagram.com/red_bagmusic/', icon: InstagramIcon, label: 'Instagram' },
    { href: 'https://open.spotify.com/artist/3vNTm5jI4IdPYBupammjTN', icon: SpotifyIcon, label: 'Spotify' },
];

const Footer: React.FC<FooterProps> = ({ content }) => {
    const currentYear = new Date().getFullYear();
    const copyrightText = content.copyright.replace('{year}', currentYear.toString());

    return (
        <footer className="mt-16 md:mt-24 border-t border-red-500/10">
            <div className="container mx-auto px-6 max-w-6xl py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-xs tracking-wider">{copyrightText}</p>
                <div className="flex items-center gap-5">
                    {socials.map(({ href, icon: Icon, label }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-400 transition-colors" aria-label={label}>
                            <Icon className="w-4 h-4" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
