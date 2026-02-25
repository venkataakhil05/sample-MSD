'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Preloader.module.css';

interface PreloaderProps {
    onComplete?: () => void;
}

/** Cinematic quote that types in character-by-character */
const QUOTE = '"Calm is not the absence of pressure — it is mastering it."';
const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Preloader({ onComplete }: PreloaderProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const arcRef = useRef<SVGCircleElement>(null);
    const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [chars] = useState(() => QUOTE.split(''));

    useEffect(() => {
        const overlay = overlayRef.current;
        const arc = arcRef.current;
        if (!overlay || !arc) return;

        // Initialise arc
        arc.style.strokeDasharray = `${CIRCUMFERENCE}`;
        arc.style.strokeDashoffset = `${CIRCUMFERENCE}`;

        const tl = gsap.timeline({
            onComplete: () => {
                // Vertical bar wipe-out
                gsap.to(overlay, {
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                    duration: 0.7,
                    ease: 'expo.inOut',
                    onComplete: () => {
                        onComplete?.();
                    },
                });
            },
        });

        // 1. Arc fills 0 → 100%
        const arcObj = { val: 0 };
        tl.to(arcObj, {
            val: 100,
            duration: 1.8,
            ease: 'power2.inOut',
            onUpdate() {
                const offset = CIRCUMFERENCE - (arcObj.val / 100) * CIRCUMFERENCE;
                arc.style.strokeDashoffset = `${offset}`;
            },
        }, 0);

        // 2. Characters reveal one by one in sync with arc
        const charDuration = 1.6 / chars.length;
        chars.forEach((_, i) => {
            const el = charRefs.current[i];
            if (!el) return;
            tl.fromTo(el, { opacity: 0 }, {
                opacity: 1,
                duration: 0.04,
                ease: 'none',
            }, i * charDuration + 0.1);
        });

        // 3. Brief hold at 100%
        tl.to({}, { duration: 0.4 });

        return () => { tl.kill(); };
    }, [chars, onComplete]);

    return (
        <div className={styles.overlay} ref={overlayRef}>
            {/* Cinematic grid background */}
            <div className={styles.grid} aria-hidden="true" />

            {/* Arc progress meter */}
            <div className={styles.arcWrap} aria-hidden="true">
                <svg viewBox="0 0 100 100" className={styles.arcSvg}>
                    <circle
                        cx="50" cy="50" r={RADIUS}
                        fill="none" strokeWidth="2"
                        className={styles.arcBg}
                    />
                    <circle
                        cx="50" cy="50" r={RADIUS}
                        fill="none" strokeWidth="2"
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        className={styles.arcFill}
                        ref={arcRef}
                    />
                </svg>
                <div className={styles.arcLabel}>MSD</div>
            </div>

            {/* The quote */}
            <p className={styles.quote} aria-label={QUOTE}>
                {chars.map((ch, i) => (
                    <span
                        key={i}
                        ref={(el) => { charRefs.current[i] = el; }}
                        className={styles.char}
                        style={{ opacity: 0 }}
                    >
                        {ch === ' ' ? '\u00A0' : ch}
                    </span>
                ))}
            </p>
        </div>
    );
}
