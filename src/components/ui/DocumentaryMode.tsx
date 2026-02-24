'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDocumentary } from '@/contexts/DocumentaryContext';
import { useAudio } from '@/contexts/SoundContext';
import styles from './DocumentaryMode.module.css';

gsap.registerPlugin(ScrollTrigger);

// Exact cinematic captions per section — per spec
const CAPTIONS: { selector: string; text: string }[] = [
    { selector: '#section-hero', text: '2007. A young captain. No fear.' },
    { selector: '#section-autograph', text: 'He signed his name. Cricket signed his legacy.' },
    { selector: '#section-careers', text: 'The numbers tell one story. The calm tells another.' },
    { selector: '#section-trophies', text: 'Three titles. One man. History.' },
    { selector: '#section-voices', text: 'A generation speaks — in hushed, grateful tones.' },
    { selector: '#section-dna', text: "He didn't just play. He transformed the game." },
    { selector: '#section-index', text: 'No metric captures it fully. But this comes close.' },
    { selector: '#section-legacy', text: 'The number retired. The impact never will.' },
    { selector: '#section-decision', text: 'Enter the classroom of calm: The Decision Room.' },
];

// Auto-scroll target speed in px/second
const AUTO_SCROLL_SPEED = 30;

export default function DocumentaryMode() {
    const { isDocMode, toggleDocMode } = useDocumentary();
    const { playSound } = useAudio();
    const captionRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const barsRef = useRef<HTMLDivElement>(null);
    const currentCaptionRef = useRef<string>('');
    const autoScrollRef = useRef<number | null>(null);
    const lastFrameRef = useRef<number>(0);
    const [showTooltip, setShowTooltip] = useState(false);

    // ── Tooltip on first-use ─────────────────────────────────────
    const handleToggle = () => {
        if (!isDocMode) {
            playSound('shutter');
            const seen = typeof window !== 'undefined' && localStorage.getItem('docmode-tooltip-seen');
            if (!seen) {
                setShowTooltip(true);
                localStorage.setItem('docmode-tooltip-seen', '1');
                setTimeout(() => setShowTooltip(false), 5000);
            }
        }
        toggleDocMode();
    };

    // ── Caption animation ────────────────────────────────────────
    const showCaption = (text: string) => {
        if (!captionRef.current || currentCaptionRef.current === text) return;
        currentCaptionRef.current = text;
        const el = captionRef.current;
        el.textContent = text;
        gsap.fromTo(el,
            { opacity: 0, y: 12 },
            {
                opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
                onComplete: () => {
                    gsap.to(el, { opacity: 0, y: -10, duration: 0.7, delay: 3.5, ease: 'power2.in' });
                }
            }
        );
    };

    // ── Auto-scroll RAF loop ─────────────────────────────────────
    const startAutoScroll = () => {
        lastFrameRef.current = performance.now();
        const tick = (now: number) => {
            const delta = (now - lastFrameRef.current) / 1000; // seconds
            lastFrameRef.current = now;
            // Stop at bottom
            if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight) {
                window.scrollBy(0, AUTO_SCROLL_SPEED * delta);
                autoScrollRef.current = requestAnimationFrame(tick);
            } else {
                autoScrollRef.current = null;
            }
        };
        autoScrollRef.current = requestAnimationFrame(tick);
    };

    const stopAutoScroll = () => {
        if (autoScrollRef.current !== null) {
            cancelAnimationFrame(autoScrollRef.current);
            autoScrollRef.current = null;
        }
    };

    // ── Handle user scroll interruption in doc mode ──────────────
    useEffect(() => {
        if (!isDocMode) return;
        const onWheel = () => {
            // User manual scroll — pause auto-scroll temporarily, resume after 2s
            stopAutoScroll();
            const t = setTimeout(() => {
                if (autoScrollRef.current === null) startAutoScroll();
            }, 2000);
            return () => clearTimeout(t);
        };
        window.addEventListener('wheel', onWheel, { passive: true });
        return () => window.removeEventListener('wheel', onWheel);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDocMode]);

    // ── Main Documentary Mode effect ─────────────────────────────
    useEffect(() => {
        if (isDocMode) {
            // 1. Slow GSAP global timeline to 2.5× slower (timeScale 0.4)
            gsap.globalTimeline.timeScale(0.4);

            // 2. Start auto-scroll
            startAutoScroll();

            // 3. Set up caption scroll triggers
            const triggers: ScrollTrigger[] = [];
            CAPTIONS.forEach(({ selector, text }) => {
                const el = document.querySelector(selector);
                if (!el) return;
                const st = ScrollTrigger.create({
                    trigger: el,
                    start: 'top 60%',
                    onEnter: () => showCaption(text),
                    onEnterBack: () => showCaption(text),
                });
                triggers.push(st);
            });

            return () => {
                // Restore timeline speed & stop auto-scroll on exit
                gsap.globalTimeline.timeScale(1);
                stopAutoScroll();
                triggers.forEach(t => t.kill());
                currentCaptionRef.current = '';
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDocMode]);

    return (
        <>
            {/* Toggle Button */}
            <button
                className={`${styles.toggle} ${isDocMode ? styles.active : ''}`}
                onClick={handleToggle}
                aria-label={isDocMode ? 'Exit Documentary Mode' : 'Enter Documentary Mode'}
                title={isDocMode ? 'Exit Documentary Mode' : '🎥 Documentary Mode'}
            >
                <span className={styles.icon}>{isDocMode ? '⏹' : '🎥'}</span>
                <span className={styles.label}>{isDocMode ? 'EXIT DOC' : 'DOC MODE'}</span>
            </button>

            {/* First-use onboarding tooltip */}
            {showTooltip && (
                <div className={styles.onboardTooltip} role="tooltip" aria-live="polite">
                    <span className={styles.tooltipIcon}>🎬</span>
                    <div>
                        <p className={styles.tooltipTitle}>Documentary Mode</p>
                        <p className={styles.tooltipText}>
                            Slows time, guides the story, and lets you experience Dhoni's journey like a film.
                        </p>
                    </div>
                </div>
            )}

            {/* Cinematic letterbox bars */}
            {isDocMode && (
                <div className={styles.cinematicBars} ref={barsRef}>
                    <div className={styles.barTop} />
                    <div className={styles.barBottom} />
                </div>
            )}

            {/* Cinematic vignette overlay */}
            {isDocMode && (
                <div ref={overlayRef} className={styles.vignette} aria-hidden="true" />
            )}

            {/* Caption bar — Netflix subtitle style */}
            {isDocMode && (
                <div className={styles.captionBar} aria-live="polite">
                    <div ref={captionRef} className={styles.caption} />
                </div>
            )}
        </>
    );
}
