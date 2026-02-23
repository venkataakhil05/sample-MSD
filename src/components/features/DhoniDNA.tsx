'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './DhoniDNA.module.css';

gsap.registerPlugin(ScrollTrigger);

const eras = [
    {
        phase: '2004 – 2006',
        tag: 'Raw Talent',
        habit: 'Fearless aggression',
        quote: '"I always tried to play like it was my last game. That\'s when you play at your best."',
        color: '#4a90d9',
        desc: 'From TTE to international debut. An unknown from Ranchi dismantling bowling attacks with no fear of reputation.',
    },
    {
        phase: '2007 – 2011',
        tag: 'Calm Under Chaos',
        habit: 'Process over outcome',
        quote: '"The best captains don\'t panic. They think while others react."',
        color: '#FFD700',
        desc: 'Three ICC trophies in five years. The birth of Captain Cool — leading India through the most intense matches with silence as his superpower.',
    },
    {
        phase: '2012 – 2014',
        tag: 'Iron Consistency',
        habit: 'Daily discipline, no shortcuts',
        quote: '"Form is temporary. Fitness and discipline keep you in the game longer than talent."',
        color: '#e89c30',
        desc: 'Even as age tested him, Dhoni\'s averages remained elite. A disciplined finisher emerging in a new era of power hitting.',
    },
    {
        phase: '2015 – 2019',
        tag: 'The Finisher Redefined',
        habit: 'Trust the process completely',
        quote: '"When you need 20 off 10, calm is a skill. Most can\'t learn it. I lived it."',
        color: '#e25c3a',
        desc: 'Middle-order mastery. The calm navigator steering impossible chases and rewriting what a No.5 or No.7 could achieve.',
    },
    {
        phase: '2020',
        tag: 'Legacy Sealed',
        habit: 'Grace in departure',
        quote: '"Thank you. Jai Hind."',
        color: '#a0c4ff',
        desc: 'Independence Day. Two words. A nation cried. The most graceful exit in cricket history — no press conference, no drama, only dignity.',
    },
];

export default function DhoniDNA() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(`.${styles.card}`).forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    x: i % 2 === 0 ? -60 : 60,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: 'power3.out',
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.headerRow}>
                <span className={styles.eyebrow}>PHILOSOPHY × HABIT</span>
                <h2 className={styles.heading}>
                    DHONI <span className={styles.gold}>DNA</span>
                </h2>
                <p className={styles.sub}>The mindset behind the milestones.</p>
            </div>

            <div className={styles.timeline}>
                <div className={styles.lineTrack} />
                {eras.map((era, i) => (
                    <div
                        key={i}
                        className={`${styles.card} ${i % 2 === 0 ? styles.left : styles.right}`}
                        style={{ '--era-color': era.color } as React.CSSProperties}
                    >
                        <div className={styles.dot} />
                        <div className={styles.cardContent}>
                            <div className={styles.phase}>{era.phase}</div>
                            <div className={styles.tag}>{era.tag}</div>
                            <p className={styles.desc}>{era.desc}</p>
                            <div className={styles.habitBadge}>{era.habit}</div>
                            <blockquote className={styles.quote}>{era.quote}</blockquote>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
