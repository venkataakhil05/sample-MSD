'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import styles from './TrophyRoom.module.css';

const trophies = [
    {
        id: 1,
        year: '2007',
        title: 'ICC World Twenty20',
        location: 'Johannesburg, South Africa',
        note: 'India\'s first T20 World Cup. The iconic Joginder over. A nation\'s new obsession was born.',
        icon: '🏆',
        color: '#f5c518',
    },
    {
        id: 2,
        year: '2011',
        title: 'ICC Cricket World Cup',
        location: 'Wankhede Stadium, Mumbai',
        note: 'That six. That moment. 28 years of wait dissolved in one helicopter swing.',
        icon: '🌍',
        color: '#f5c518',
    },
    {
        id: 3,
        year: '2013',
        title: 'ICC Champions Trophy',
        location: 'Edgbaston, England',
        note: 'The only captain in history to win all three major ICC limited-overs trophies.',
        icon: '👑',
        color: '#E5E4E2',
    },
];

export default function TrophyRoom() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
        const card = cardRefs.current[idx];
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / rect.height) * 18;
        const rotateY = (x / rect.width) * 18;
        gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 800,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = (idx: number) => {
        const card = cardRefs.current[idx];
        if (!card) return;
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
    };

    return (
        <section className={styles.section}>
            <div className={styles.headerRow}>
                <span className={styles.eyebrow}>ICC TITLES</span>
                <h2 className={styles.heading}>
                    TROPHY <span className={styles.gold}>ROOM</span>
                </h2>
                <p className={styles.sub}>The only captain to claim all three. Hover to explore.</p>
            </div>

            <div className={styles.grid}>
                {trophies.map((t, i) => (
                    <div
                        key={t.id}
                        className={styles.card}
                        ref={(el) => { cardRefs.current[i] = el; }}
                        onMouseMove={(e) => handleMouseMove(e, i)}
                        onMouseLeave={() => handleMouseLeave(i)}
                        style={{ '--trophy-color': t.color } as React.CSSProperties}
                    >
                        <div className={styles.cardInner}>
                            <div className={styles.icon}>{t.icon}</div>
                            <div className={styles.year}>{t.year}</div>
                            <h3 className={styles.title}>{t.title}</h3>
                            <p className={styles.location}>{t.location}</p>
                            <div className={styles.divider} />
                            <p className={styles.note}>{t.note}</p>
                        </div>
                        <div className={styles.glowRing} />
                    </div>
                ))}
            </div>
        </section>
    );
}
