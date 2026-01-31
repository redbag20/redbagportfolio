import React, { useEffect, useRef } from 'react';

interface HeroProps {
    content: {
        title: string;
        name: string;
        phone_deck_items: { id: number; image: string }[];
    };
}

const BAR_COUNT = 50;

const Hero: React.FC<HeroProps> = ({ content }) => {
    const heroRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number>(0);

    // Canvas equalizer
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const heights = Array.from({ length: BAR_COUNT }, () => Math.random() * 0.5 + 0.1);
        const targets = Array.from({ length: BAR_COUNT }, () => Math.random() * 0.8 + 0.2);
        let tick = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            if (!ctx || !canvas) return;
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            const totalGap = w * 0.25;
            const barWidth = (w - totalGap) / BAR_COUNT;
            const gap = totalGap / (BAR_COUNT - 1);

            tick++;
            if (tick % 6 === 0) {
                for (let i = 0; i < BAR_COUNT; i++) {
                    targets[i] = Math.random() * 0.9 + 0.1;
                }
            }

            for (let i = 0; i < BAR_COUNT; i++) {
                heights[i] += (targets[i] - heights[i]) * 0.07;
                const barH = heights[i] * h * 0.95;
                const x = i * (barWidth + gap);
                const y = h - barH;

                const gradient = ctx.createLinearGradient(x, h, x, y);
                const intensity = heights[i];
                gradient.addColorStop(0, `rgba(255, 15, 15, ${0.4 + intensity * 0.5})`);
                gradient.addColorStop(0.5, `rgba(255, 60, 60, ${0.15 + intensity * 0.25})`);
                gradient.addColorStop(1, 'rgba(255, 15, 15, 0.02)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.roundRect(x, y, barWidth, barH, 1);
                ctx.fill();
            }
            animFrameRef.current = requestAnimationFrame(draw);
        };

        animFrameRef.current = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    // GSAP entrance
    useEffect(() => {
        if (!heroRef.current || !window.gsap) return;
        const { gsap } = window;
        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-subtitle",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
            );
            gsap.fromTo(".hero-name",
                { y: 80, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power4.out', delay: 0.4 }
            );
            gsap.fromTo(".hero-line",
                { scaleX: 0 },
                { scaleX: 1, duration: 1.2, ease: 'power3.out', delay: 1.0 }
            );
            gsap.fromTo(".hero-eq-canvas",
                { opacity: 0 },
                { opacity: 1, duration: 2, ease: 'power2.out', delay: 0.3 }
            );
            gsap.fromTo(".scroll-indicator",
                { opacity: 0 },
                { opacity: 1, duration: 1, delay: 2 }
            );
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} id="hero" className="min-h-screen h-screen flex flex-col items-center justify-center relative text-center text-white overflow-hidden">
            <div className="hero-bg"></div>

            <canvas
                ref={canvasRef}
                className="hero-eq-canvas absolute inset-0 w-full h-full opacity-0"
                style={{ pointerEvents: 'none', zIndex: 0 }}
            />

            <div className="z-10 relative px-6">
                <p className="hero-subtitle text-xs md:text-sm uppercase tracking-[0.4em] text-gray-400 font-medium mb-6">
                    {content.title}
                </p>

                <h1 className="hero-name hero-text-clip select-none uppercase">
                    {content.name}
                </h1>

                <div className="hero-line w-24 h-px bg-red-500 mx-auto mt-8 origin-left"></div>
            </div>

            <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
};

export default Hero;
