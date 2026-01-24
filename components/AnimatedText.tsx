
import React, { useRef, useLayoutEffect } from 'react';

// Keywords for highlighting
const keywords = [
    'Sound Design', '사운드 디자인', 'Sound Engineer', '사운드 엔지니어', 
    'Composer', '작곡가', 'BGM', 'Dolby Atmos', '음향 오퍼레이팅', 
    '믹싱 & 마스터링', 'Mixing & Mastering', 'Nuendo', '사운드', 'sound'
];
// Create a case-insensitive regex that captures the keywords
const keywordRegex = new RegExp(`(${keywords.join('|')})`, 'gi');

interface AnimatedTextProps {
    text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
    const textRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        if (!textRef.current || typeof window === 'undefined' || !window.gsap?.ScrollTrigger) return;
        // FIX: ScrollTrigger is a property of gsap, not window.
        const { gsap } = window;
        gsap.registerPlugin(gsap.ScrollTrigger);
        
        const words = gsap.utils.toArray(textRef.current.children);
        if (words.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(words, 
                { opacity: 0.2 },
                {
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: 'top 90%', // Start animation when top of text is 90% from top of viewport
                        end: 'bottom 60%', // End when bottom of text is 60% from top of viewport
                        scrub: 1.5, // Smoothly ties animation to scroll
                    }
                }
            );
        }, textRef);

        return () => ctx.revert();
    }, [text]);

    // Split text by keywords, then render words within non-keyword parts
    const renderText = () => {
        return text.split(keywordRegex).filter(part => part).map((part, index) => {
            if (keywords.some(kw => kw.toLowerCase() === part.toLowerCase())) {
                // It's a keyword
                return <span key={index} className="animated-word keyword-glow">{part}</span>;
            } else {
                // It's a normal text part, split into words while preserving spaces
                return part.split(/(\s+)/).map((word, wordIndex) => {
                     if (word.trim() === '') return word; // return spaces as is
                     return <span key={`${index}-${wordIndex}`} className="animated-word">{word}</span>
                });
            }
        });
    };

    return <p ref={textRef} className="leading-relaxed">{renderText()}</p>;
};

export default AnimatedText;
