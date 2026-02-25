'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './UntoldNumbers.module.css';
import PrimarySourceBadge from '../ui/PrimarySourceBadge';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: 'Chase Win %', value: 59.6, suffix: '%', context: 'As India\'s captain in successful ODI chases' },
    { label: 'Unbeaten Finishes', value: 84, suffix: '', context: 'Matches finished without getting out in ODIs' },
    { label: 'Stumpings / Match', value: 0.56, suffix: '', context: 'International career — no keeper comes close' },
    { label: 'Captain Win %', value: 59.6, suffix: '%', context: 'Across all formats — international career' },
    { label: 'ICC Title Wins', value: 3, suffix: '/3', context: 'Only captain ever to win all three major ICC titles' },
    { label: 'Last-Over Finishes', value: 43, suffix: '+', context: 'Matches won or tied for India in last 6 balls' },
    { label: 'Test Avg at No. 5+', value: 42.1, suffix: '', context: 'Middle-order reliability at the highest level' },
    { label: 'World Record Stumpings', value: 195, suffix: '', context: 'Most stumpings in international cricket — ever' },
];

export default function UntoldNumbers() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(`.${styles.card}`).forEach((card) => {
                const valueEl = card.querySelector(`.${styles.value}`) as HTMLElement;
                if (!valueEl) return;
                const targetStr = valueEl.dataset.target || '0';
                const target = parseFloat(targetStr) || 0;
                const isDecimal = targetStr.includes('.');
                const obj = { val: 0 };

                gsap.from(card, {
                    scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
                    y: 40,
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                });

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 88%',
                    onEnter: () => {
                        gsap.to(obj, {
                            val: target,
                            duration: 1.8,
                            ease: 'power2.out',
                            onUpdate: () => {
                                valueEl.textContent = isDecimal
                                    ? obj.val.toFixed(1)
                                    : Math.round(obj.val).toString();
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
                <span className={styles.eyebrow}>BEYOND THE SCOREBOOK</span>
                <div className={styles.titleArea}>
                    <h2 className={styles.heading}>
                        UNTOLD <span className={styles.gold}>NUMBERS</span>
                    </h2>
                    <PrimarySourceBadge />
                </div>
                <p className={styles.sub}>Stats that define the finisher — not just the batter.</p>
            </div>

            <div className={styles.grid}>
                {stats.map((s, i) => (
                    <div key={i} className={styles.card}>
                        <div className={styles.valueRow}>
                            <span
                                className={styles.value}
                                data-target={s.value}
                            >
                                {s.value.toString().includes('.') ? s.value.toFixed(1) : s.value}
                            </span>
                            <span className={styles.suffix}>{s.suffix}</span>
                        </div>
                        <div className={styles.label}>{s.label}</div>
                        <div className={styles.context}>{s.context}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
