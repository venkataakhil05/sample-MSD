'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAudio } from '@/contexts/SoundContext';

gsap.registerPlugin(ScrollTrigger);

interface SignatureProps {
    onComplete?: () => void;
}

const Signature = ({ onComplete }: SignatureProps) => {
    const { playSound } = useAudio();
    const pathRef = useRef<SVGPathElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLParagraphElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);
    const hasTriggeredRef = useRef(false);

    useEffect(() => {
        if (!pathRef.current || !svgRef.current) return;

        const path = pathRef.current;
        const length = path.getTotalLength();

        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1,
        });

        const triggerEffects = () => {
            if (hasTriggeredRef.current) return;
            hasTriggeredRef.current = true;

            // 0. Play Crowd Sound & Shutter
            playSound('crowd');
            playSound('shutter');

            // 1. Screen shake
            if (wrapRef.current) {
                gsap.to(wrapRef.current, {
                    x: '+=4', y: '+=2', duration: 0.06, yoyo: true, repeat: 7,
                    ease: 'power1.inOut',
                    onComplete: () => { gsap.set(wrapRef.current!, { x: 0, y: 0 }); },
                });
            }

            // 2. Mobile vibration
            if (navigator.vibrate) navigator.vibrate(180);

            // 3. Gold dust particles
            if (svgRef.current) {
                const rect = svgRef.current.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2 + window.scrollY;

                for (let i = 0; i < 16; i++) {
                    const p = document.createElement('div');
                    const size = Math.random() * 6 + 3;
                    p.style.cssText = `
            position:absolute;
            width:${size}px;height:${size}px;
            border-radius:50%;
            background:radial-gradient(circle, #FFD700, #e8a000);
            left:${cx}px;top:${cy}px;
            pointer-events:none;z-index:9999;
            transform:translate(-50%,-50%);
          `;
                    document.body.appendChild(p);
                    particlesRef.current.push(p);

                    const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.5;
                    const dist = 80 + Math.random() * 120;
                    gsap.to(p, {
                        x: Math.cos(angle) * dist,
                        y: Math.sin(angle) * dist - 40,
                        opacity: 0,
                        scale: 0.3,
                        duration: 1.0 + Math.random() * 0.6,
                        ease: 'power2.out',
                        onComplete: () => { p.remove(); },
                    });
                }
            }

            // 4. ABSOLUTE SILENCE — 2 full seconds.
            // Freeze all GSAP animations AND cursor AND audio tails.
            gsap.globalTimeline.pause();

            // Freeze cursor by overriding pointer events
            const customCursor = document.querySelector('[class*="cursor"]') as HTMLElement | null;
            if (customCursor) { customCursor.style.pointerEvents = 'none'; customCursor.style.transition = 'none'; }

            // Signal to audio system that silence is enforced
            document.body.dataset.silence = 'true';

            setTimeout(() => {
                gsap.globalTimeline.resume();

                // Restore cursor
                if (customCursor) { customCursor.style.pointerEvents = ''; customCursor.style.transition = ''; }

                // Lift silence lock
                delete document.body.dataset.silence;

                // 5. Quote fades in after silence
                if (quoteRef.current) {
                    gsap.fromTo(quoteRef.current,
                        { opacity: 0, y: 16 },
                        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }
                    );
                }

                if (onComplete) onComplete();

                // Shutter sound to exit silence
                playSound('shutter');
            }, 2000);
        };

        const ctx = gsap.context(() => {
            let triggered = false;
            gsap.to(path, {
                scrollTrigger: {
                    trigger: svgRef.current,
                    start: 'top 90%',
                    end: 'center center',
                    scrub: 1,
                    onLeave: () => {
                        if (!triggered) { triggered = true; triggerEffects(); }
                    },
                },
                strokeDashoffset: 0,
                ease: 'power2.out',
                onComplete: () => {
                    if (!triggered) { triggered = true; triggerEffects(); }
                },
            });
        }, svgRef);

        return () => {
            ctx.revert();
            particlesRef.current.forEach((p) => p.remove());
            particlesRef.current = [];
            hasTriggeredRef.current = false;
        };
    }, [onComplete, playSound]);

    return (
        <div ref={wrapRef} style={{ textAlign: 'center' }}>
            <svg
                ref={svgRef}
                width="600"
                height="300"
                viewBox="0 0 600 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ maxWidth: '100%', height: 'auto', filter: 'drop-shadow(0 0 5px #F2CD1E)' }}
            >
                <path
                    ref={pathRef}
                    d="M150 200 C150 150, 180 100, 200 80 C210 70, 230 50, 240 80 C250 110, 220 180, 200 220 C180 260, 140 280, 140 240 C140 200, 200 120, 250 100 C300 80, 350 150, 320 200 C300 230, 250 250, 280 200 C310 150, 400 50, 450 50 C480 50, 420 250, 400 280 C390 295, 380 250, 420 200 C450 160, 500 100, 550 50 L300 280"
                    stroke="#F2CD1E"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <p
                ref={quoteRef}
                style={{
                    opacity: 0,
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
                    color: 'rgba(255,215,0,0.7)',
                    letterSpacing: '0.06em',
                    marginTop: '1.2rem',
                    maxWidth: '480px',
                    margin: '1.2rem auto 0',
                    lineHeight: 1.6,
                }}
            >
                "The process is more important than the result."
            </p>
        </div>
    );
};

export default Signature;
