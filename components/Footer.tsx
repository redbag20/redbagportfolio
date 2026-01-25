import React from 'react';

interface FooterProps {
    content: {
        copyright: string;
    }
}

const Footer: React.FC<FooterProps> = ({ content }) => {
    const currentYear = new Date().getFullYear();
    const copyrightText = content.copyright.replace('{year}', currentYear.toString());

    return (
        <footer className="mt-16 md:mt-24 py-8 border-t border-gray-800/30 text-center text-gray-500 text-xs md:text-sm">
            <div className="container mx-auto px-6">
                 <p>{copyrightText}</p>
            </div>
        </footer>
    );
};

export default Footer;