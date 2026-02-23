'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './DhoniIndex.module.css';

gsap.registerPlugin(ScrollTrigger);

const indexes = [
    {
        label: 'Calmness Index',
        value: 97,
        caption: 'Zero panic in 50+ high-pressure international chases.',
        icon: '🧘',
        color: '#f2cd1e',
    },
    {
        label: 'Chase Mastery',
        value: 94,
        caption: 'Highest ODI chasing win % in recorded cricket history.',
        icon: '🎯',
        color: '#e8a000',
    },
    {
        label: 'Captaincy Stability',
        value: 96,
        caption: 'Longest unbeaten Test captaincy run — calm under siege.',
        icon: '🛡️',
        color: '#f2cd1e',
    },
    {
        label: 'WK-Captain Rarity',
        value: 99,
        caption: 'The only captain to claim all 3 ICC limited-overs titles.',
        icon: '👑',
        color: '#ffffff',
    },
];

const CIRCUMFERENCE = 2 * Math.PI * 54; // radius = 54

export default function DhoniIndex() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(`.${styles.heading}`, {
                scrollTrigger: { trigger: `.${styles.heading}`, start: 'top 85%' },
                y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
            });

            gsap.utils.toArray<HTMLElement>(`.${styles.card}`).forEach((card, i) => {
                const circle = card.querySelector(`.${styles.arcFill}`) as SVGCircleElement | null;
                const scoreEl = card.querySelector(`.${styles.score}`) as HTMLElement | null;
                const target = parseInt(card.dataset.value || '0', 10);

                // Entrance
                gsap.from(card, {
                    scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
                    y: 60, opacity: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
                });

                // Arc + number animation
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 88%',
                    onEnter: () => {
                        const obj = { val: 0 };
                        gsap.to(obj, {
                            val: target,
                            duration: 1.8,
                            ease: 'power2.out',
                            onUpdate: () => {
                                if (scoreEl) scoreEl.textContent = `${Math.round(obj.val)}`;
                                if (circle) {
                                    const offset = CIRCUMFERENCE - (obj.val / 100) * CIRCUMFERENCE;
                                    circle.style.strokeDashoffset = `${offset}`;
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
            </div>

            <div className={styles.grid}>
                {indexes.map((idx, i) => (
                    <div
                        key={i}
                        className={styles.card}
                        data-value={idx.value}
                        style={{ '--index-color': idx.color } as React.CSSProperties}
                    >
                        <div className={styles.meterWrap}>
                            <svg viewBox="0 0 120 120" className={styles.svg}>
                                <circle
                                    className={styles.arcBg}
                                    cx="60" cy="60" r="54"
                                    fill="none" strokeWidth="7"
                                />
                                <circle
                                    className={styles.arcFill}
                                    cx="60" cy="60" r="54"
                                    fill="none" strokeWidth="7"
                                    strokeDasharray={CIRCUMFERENCE}
                                    strokeDashoffset={CIRCUMFERENCE}
                                    strokeLinecap="round"
                                    transform="rotate(-90 60 60)"
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
