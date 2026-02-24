'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './VoicesFeed.module.css';

gsap.registerPlugin(ScrollTrigger);

const voices = [
    { text: '"He never panicked."' },
    { text: '"The quietest man in the loudest moments."' },
    { text: '"He made the impossible feel like a Tuesday afternoon."' },
    { text: '"Calm is not the absence of pressure. He proved that."' },
    { text: '"When he walked in, the match wasn\'t over. It had just begun."' },
];

export default function VoicesFeed() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(`.${styles.title}`, {
                scrollTrigger: { trigger: `.${styles.title}`, start: 'top 85%' },
                opacity: 0, y: 30, duration: 1, ease: 'power3.out',
            });

            gsap.utils.toArray<HTMLElement>(`.${styles.voiceItem}`).forEach((item, i) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 40, filter: 'blur(6px)' },
                    {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 88%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse',
                        },
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1.0,
                        delay: i * 0.05,
                        ease: 'power3.out',
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            {/* Grain texture overlay */}
            <div className={styles.grain} aria-hidden="true" />

            <div className={styles.inner}>
                <span className={styles.eyebrow}>COLLECTIVE MEMORY</span>
                <h2 className={styles.title}>
                    VOICES <span className={styles.gold}>ABOUT DHONI</span>
                </h2>
                <p className={styles.sub}>Words whispered across generations. No attribution needed — everyone knows.</p>

                <div className={styles.feed}>
                    {voices.map((v, i) => (
                        <div key={i} className={styles.voiceItem}>
                            <div className={styles.voiceLine} aria-hidden="true" />
                            <p className={styles.voiceText}>{v.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
