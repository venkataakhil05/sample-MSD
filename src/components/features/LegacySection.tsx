'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './LegacySection.module.css';

gsap.registerPlugin(ScrollTrigger);

const tiles = [
    {
        icon: '🟡',
        title: 'CSK: More Than a Team',
        body: 'Chennai Super Kings became a dynasty under Dhoni — 5 IPL titles, a culture of calm aggression, and a fanbase that chants "Dhoni! Dhoni!" every match, even when he\'s not batting.',
    },
    {
        icon: '🏏',
        title: 'Reshaping Indian Cricket',
        body: 'He normalised wicket-keepers as captains, legitimized T20 as a serious format, and proved that aggressive intent and cold logic could coexist in the same mind.',
    },
    {
        icon: '🌱',
        title: 'Youth Inspiration',
        body: 'From Ranchi to the world. Dhoni showed every small-town kid that geography and infrastructure are not barriers — only mindset is.',
    },
    {
        icon: '🧘',
        title: 'The Mentorship Aura',
        body: 'Kohli, Jadeja, Bumrah — all shaped under Dhoni\'s shadow. He never sought credit. He removed ego from leadership and made others believe in themselves.',
    },
];

export default function LegacySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
        const ctx = gsap.context(() => {
            gsap.from(`.${styles.heading}`, {
                scrollTrigger: { trigger: `.${styles.heading}`, start: 'top 85%' },
                y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
            });
            gsap.utils.toArray<HTMLElement>(`.${styles.tile}`).forEach((tile, i) => {
                gsap.from(tile, {
                    scrollTrigger: { trigger: tile, start: 'top 88%', toggleActions: 'play none none none' },
                    y: 50, opacity: 0, duration: 0.75, delay: i * 0.08, ease: 'power3.out',
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.starfield} aria-hidden="true">
                {mounted && Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className={styles.star}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>

            <div className={styles.inner}>
                <span className={styles.eyebrow}>THE FINAL CHAPTER</span>
                <h2 className={styles.heading}>
                    LEGACY NEVER <span className={styles.gold}>RETIRES</span>
                </h2>
                <p className={styles.sub}>
                    He hung up his gloves. The impact never will.
                </p>

                <div className={styles.grid}>
                    {tiles.map((tile, i) => (
                        <div key={i} className={styles.tile}>
                            <div className={styles.tileIcon}>{tile.icon}</div>
                            <h3 className={styles.tileTitle}>{tile.title}</h3>
                            <p className={styles.tileBody}>{tile.body}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.finalQuote}>
                    <span className={styles.quoteMark}>"</span>
                    Champions aren&apos;t built by outcomes. They&apos;re built by what they pour into every quiet moment before the world is watching.
                    <span className={styles.quoteMark}>"</span>
                </div>
            </div>
        </section>
    );
}
