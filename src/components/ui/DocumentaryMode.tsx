'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDocumentary } from '@/contexts/DocumentaryContext';
import styles from './DocumentaryMode.module.css';

gsap.registerPlugin(ScrollTrigger);

// Cinematic captions associated with section IDs
const CAPTIONS: { selector: string; text: string }[] = [
    { selector: '#section-hero', text: '2007. A young captain. No fear.' },
    { selector: '#section-autograph', text: 'He signed his name. Cricket signed his legacy.' },
    { selector: '#section-careers', text: 'The numbers tell one story. The calm tells another.' },
    { selector: '#section-trophies', text: 'Three titles. One man. History.' },
    { selector: '#section-voices', text: 'A generation speaks — in hushed, grateful tones.' },
    { selector: '#section-dna', text: 'He didn\'t just play. He transformed the game forever.' },
    { selector: '#section-index', text: 'No metric captures it fully. But this comes close.' },
    { selector: '#section-legacy', text: 'The number retired. The impact never will.' },
];

export default function DocumentaryMode() {
    const { isDocMode, toggleDocMode } = useDocumentary();
    const captionRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const currentCaptionRef = useRef<string>('');

    useEffect(() => {
        if (!isDocMode) return;

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
            triggers.forEach(t => t.kill());
        };
    }, [isDocMode]);

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

    return (
        <>
            {/* Toggle Button */}
            <button
                className={`${styles.toggle} ${isDocMode ? styles.active : ''}`}
                onClick={toggleDocMode}
                aria-label={isDocMode ? 'Exit Documentary Mode' : 'Enter Documentary Mode'}
                title={isDocMode ? 'Exit Documentary Mode' : '🎥 Documentary Mode'}
            >
                <span className={styles.icon}>{isDocMode ? '⏹' : '🎥'}</span>
                <span className={styles.label}>{isDocMode ? 'EXIT DOC' : 'DOC MODE'}</span>
            </button>

            {/* Cinematic vignette overlay */}
            {isDocMode && (
                <div ref={overlayRef} className={styles.vignette} aria-hidden="true" />
            )}

            {/* Caption bar */}
            {isDocMode && (
                <div className={styles.captionBar} aria-live="polite">
                    <div ref={captionRef} className={styles.caption} />
                </div>
            )}
        </>
    );
}
