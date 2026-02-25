'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
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
    const sectionRef = React.useRef<HTMLElement>(null);
    const [viewState, setViewState] = React.useState({
        mounted: false,
        stars: [] as { left: string; top: string; delay: string; size: string }[]
    });

    useEffect(() => {
        const generatedStars = Array.from({ length: 40 }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 4}s`,
            size: `${Math.random() * 2 + 1}px`,
        }));

        const timer = setTimeout(() => {
            setViewState({
                mounted: true,
                stars: generatedStars
            });
        }, 0);

        const ctx = gsap.context(() => {
            // Section fades in from darkness — timeless, legendary (no Y motion)
            // blur clears as it appears: like looking at something ancient coming into focus
            gsap.from(`.${styles.inner}`, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                filter: 'blur(8px)',
                duration: 1.8,
                ease: 'power1.inOut',
            });
            // Heading — slightly slower for weight
            gsap.from(`.${styles.heading}`, {
                scrollTrigger: { trigger: `.${styles.heading}`, start: 'top 85%' },
                opacity: 0, duration: 1.4, ease: 'power1.out',
            });
            // Tiles: soft fade-in, no Y motion — they're not rising, they're being revealed
            gsap.utils.toArray<HTMLElement>(`.${styles.tile}`).forEach((tile, i) => {
                gsap.from(tile, {
                    scrollTrigger: {
                        trigger: tile,
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                    },
                    opacity: 0,
                    duration: 1.2,
                    delay: i * 0.12,
                    ease: 'power1.inOut',
                });
            });
            // Final quote — slowest of all. Maximum weight.
            gsap.from(`.${styles.finalQuote}`, {
                scrollTrigger: { trigger: `.${styles.finalQuote}`, start: 'top 88%' },
                opacity: 0,
                duration: 2.0,
                ease: 'power1.inOut',
            });
        }, sectionRef);

        return () => {
            clearTimeout(timer);
            ctx.revert();
        };
    }, []);

    const { mounted, stars } = viewState;

    if (!mounted) return null;

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.starfield} aria-hidden="true">
                {stars.map((star, i) => (
                    <div
                        key={i}
                        className={styles.star}
                        style={{
                            left: star.left,
                            top: star.top,
                            animationDelay: star.delay,
                            width: star.size,
                            height: star.size,
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
                    <span className={styles.quoteMark}>&quot;</span>
                    Champions aren&apos;t built by outcomes. They&apos;re built by what they pour into every quiet moment before the world is watching.
                    <span className={styles.quoteMark}>&quot;</span>
                </div>
            </div>
        </section>
    );
}
