import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { useAudio } from '@/contexts/SoundContext';

export function useEasterEggs(ghostNumSelector: string) {
    const { playSound } = useAudio();
    const scrollPauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const breathingTween = useRef<gsap.core.Tween | null>(null);
    const quoteOverlaySet = useRef<Set<HTMLDivElement>>(new Set());

    const showQuote = useCallback((text: string, isGolden = false) => {
        const el = document.createElement('div');
        el.style.cssText = `
            position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
            z-index:99999;pointer-events:none;text-align:center;
            font-family:'Oswald',sans-serif;font-size:clamp(1.4rem,4vw,2.5rem);
            color:${isGolden ? '#f5c518' : '#ffffff'};
            letter-spacing:0.15em;text-transform:uppercase;
            text-shadow:0 0 50px ${isGolden ? 'rgba(245, 197, 24, 0.8)' : 'rgba(255,255,255,0.4)'};
            padding:2.5rem;max-width:800px;opacity:0;
        `;
        el.textContent = text;
        document.body.appendChild(el);
        quoteOverlaySet.current.add(el);

        gsap.to(el, {
            opacity: 1, y: -20, duration: 0.8, ease: 'power3.out',
            onComplete: () => {
                gsap.to(el, {
                    opacity: 0, y: -40, duration: 0.8, delay: 2.2, ease: 'power3.in',
                    onComplete: () => {
                        el.remove();
                        quoteOverlaySet.current.delete(el);
                    }
                });
            }
        });
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const currentQuoteOverlaySet = quoteOverlaySet.current;
        // ── Easter Egg 1: Press "7" → golden border halo + quote ─────────
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === '7') {
                playSound('crowd');

                // 1. Full-screen golden radial burst — unmissable
                const flash = document.createElement('div');
                flash.style.cssText = `
                    position:fixed;inset:0;pointer-events:none;z-index:99999;
                    background:radial-gradient(ellipse at center,
                        rgba(245, 197, 24, 0.55) 0%,
                        rgba(245, 180, 0, 0.30) 40%,
                        transparent 75%);
                `;
                document.body.appendChild(flash);
                gsap.fromTo(flash,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out',
                        onComplete: () => {
                            gsap.to(flash, {
                                opacity: 0, duration: 1.4, ease: 'power2.in',
                                onComplete: () => flash.remove(),
                            });
                        }
                    }
                );

                // 2. Gold border glow on entire viewport
                gsap.fromTo(document.documentElement,
                    { outline: '0px solid #f5c518' },
                    {
                        outline: '8px solid #f5c518',
                        duration: 0.3, yoyo: true, repeat: 3, ease: 'power2.inOut',
                        onComplete: () => {
                            (document.documentElement as HTMLElement).style.outline = '';
                        }
                    }
                );

                // 3. Giant centered quote text — unmissable
                showQuote('"DEFINING A GENERA7ION"', true);
            }
        };
        window.addEventListener('keydown', onKeyDown);

        // ── Easter Egg 2: Long hover on hero image → rare quote ────────
        const heroImg = document.querySelector('[data-easter="hero-img"]') as HTMLElement | null;
        let hoverTimer: ReturnType<typeof setTimeout> | null = null;

        if (heroImg) {
            const onEnter = () => {
                hoverTimer = setTimeout(() => {
                    showQuote('"THE PROCESS IS THE ULTIMATE PRIZE"');
                }, 1800);
            };
            const onLeave = () => { if (hoverTimer) clearTimeout(hoverTimer); };
            heroImg.addEventListener('mouseenter', onEnter);
            heroImg.addEventListener('mouseleave', onLeave);
        }

        // ── Easter Egg 3: Scroll pause → breathing "07" ────────────────
        const onScroll = () => {
            if (scrollPauseTimer.current) clearTimeout(scrollPauseTimer.current);
            if (breathingTween.current) {
                breathingTween.current.kill();
                breathingTween.current = null;
                const el = document.querySelector(ghostNumSelector) as HTMLElement | null;
                if (el) gsap.set(el, { scale: 1 });
            }
            scrollPauseTimer.current = setTimeout(() => {
                const el = document.querySelector(ghostNumSelector) as HTMLElement | null;
                if (!el) return;
                breathingTween.current = gsap.to(el, {
                    scale: 1.08,
                    duration: 2,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                });
            }, 3000);
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('scroll', onScroll);
            if (hoverTimer) clearTimeout(hoverTimer);
            if (scrollPauseTimer.current) clearTimeout(scrollPauseTimer.current);
            if (breathingTween.current) breathingTween.current.kill();
            currentQuoteOverlaySet.forEach(el => el.remove());
            currentQuoteOverlaySet.clear();
        };
    }, [ghostNumSelector, showQuote, playSound]);
}

