
import React, { useEffect } from 'react';

interface ModalProps {
    youtubeId: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ youtubeId, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-4xl bg-black rounded-xl shadow-2xl shadow-red-900/40 aspect-video"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 w-8 h-8 text-white/50 hover:text-white transition-colors duration-200 z-10"
                    aria-label="Close modal"
                >
                     <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&showinfo=0&color=white`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Modal;