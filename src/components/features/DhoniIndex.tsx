'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './DhoniIndex.module.css';

gsap.registerPlugin(ScrollTrigger);

const indexes = [
    {
        label: 'Calmness Index',
        value: 98,
        caption: 'Consistently maintaining sub-70 BPM in high-pressure chases.',
        icon: '🧘‍♂️',
        color: '#f5c518',
    },
    {
        label: 'Chase Mastery',
        value: 94,
        caption: 'Highest ODI chasing win % in recorded cricket history.',
        icon: '🎯',
        color: '#f5c518',
    },
    {
        label: 'Captaincy Stability',
        value: 96,
        caption: 'Longest unbeaten Test captaincy run — calm under siege.',
        icon: '🛡️',
        color: '#f5c518',
    },
    {
        label: 'WK-Captain Rarity',
        value: 99,
        caption: 'The only captain to claim all 3 ICC limited-overs titles.',
        icon: '👑',
        color: '#ffffff',
    },
];

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function DhoniIndex() {
    const sectionRef = useRef<HTMLElement>(null);
    // Refs to each card's DOM node — populated after mount via callback refs
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        // Set initial arc state imperatively so React never manages strokeDashoffset
        cardRefs.current.forEach((card) => {
            if (!card) return;
            const arc = card.querySelector<SVGCircleElement>(`.${styles.arcFill}`);
            if (arc) {
                // Set via style — GSAP will animate this, React won't override it
                arc.style.strokeDasharray = `${CIRCUMFERENCE}`;
                arc.style.strokeDashoffset = `${CIRCUMFERENCE}`; // fully hidden
            }
        });

        const ctx = gsap.context(() => {
            // Heading entrance
            gsap.from(`.${styles.heading}`, {
                scrollTrigger: { trigger: `.${styles.heading}`, start: 'top 85%' },
                y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
            });

            cardRefs.current.forEach((card, i) => {
                const idxData = indexes[i];
                if (!card || !idxData) return;

                const arc = card.querySelector<SVGCircleElement>(`.${styles.arcFill}`);
                const scoreEl = card.querySelector<HTMLElement>(`.${styles.score}`);
                const target = idxData.value;
                const isDecimal = target.toString().includes('.');

                // Card entrance
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                    },
                    y: 60, opacity: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out',
                });

                // Arc + number count-up — fires exactly once on enter
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 88%',
                    once: true,         // ← critical: prevents re-trigger issues
                    onEnter: () => {
                        const obj = { val: 0 };
                        gsap.to(obj, {
                            val: target,
                            duration: 1.8,
                            ease: 'power2.out',
                            onUpdate() {
                                const v = Math.round(obj.val);
                                if (scoreEl) scoreEl.textContent = `${v}`;
                                if (arc) {
                                    // Animate from full-hidden to reveal
                                    const offset = CIRCUMFERENCE - (obj.val / 100) * CIRCUMFERENCE;
                                    arc.style.strokeDashoffset = `${offset}`;
                                }
                            },
                            onComplete() {
                                // Snap to exact final values — no floating point drift
                                if (scoreEl) scoreEl.textContent = `${target}`;
                                if (arc) {
                                    arc.style.strokeDashoffset = `${CIRCUMFERENCE - (target / 100) * CIRCUMFERENCE}`;
                                }
                            },
                        });
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.headerRow}>
                <span className={styles.eyebrow}>GLOBAL AUTHORITY</span>
                <h2 className={styles.heading}>
                    THE DHONI <span className={styles.gold}>INDEX</span>
                </h2>
                <p className={styles.sub}>Four dimensions no player has matched — in recorded cricket history.</p>
                <p className={styles.credibility}>
                    Indices derived from international match outcomes, pressure scenarios, and leadership consistency — not fan opinion.
                </p>
            </div>

            <div className={styles.grid}>
                {indexes.map((idx, i) => (
                    <div
                        key={i}
                        className={styles.card}
                        ref={(el) => { cardRefs.current[i] = el; }}
                        style={{ '--index-color': idx.color } as React.CSSProperties}
                    >
                        <div className={styles.meterWrap}>
                            {/*
                              NOTE: Do NOT set strokeDashoffset as a React prop here.
                              It is set imperatively in useEffect so GSAP fully owns it.
                              React setting this prop on re-render would override GSAP's values.
                            */}
                            <svg viewBox="0 0 120 120" className={styles.svg}>
                                <circle
                                    className={styles.arcBg}
                                    cx="60" cy="60" r={RADIUS}
                                    fill="none" strokeWidth="7"
                                />
                                <circle
                                    className={styles.arcFill}
                                    cx="60" cy="60" r={RADIUS}
                                    fill="none" strokeWidth="7"
                                    strokeLinecap="round"
                                    transform="rotate(-90 60 60)"
                                /* strokeDasharray and strokeDashoffset are set via style in useEffect */
                                />
                            </svg>
                            <div className={styles.meterCenter}>
                                <span className={styles.icon}>{idx.icon}</span>
                                <span className={styles.score}>0</span>
                                <span className={styles.outOf}>/100</span>
                            </div>
                        </div>
                        <div className={styles.cardBody}>
                            <h3 className={styles.label}>{idx.label}</h3>
                            <p className={styles.caption}>{idx.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
