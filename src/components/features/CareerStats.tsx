'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CareerStats.module.css';
import { careerStats } from '@/data/stats';
import PrimarySourceBadge from '../ui/PrimarySourceBadge';

gsap.registerPlugin(ScrollTrigger);

type Format = 'test' | 'odi' | 't20i' | 'ipl';

const CareerStats = () => {
    const [activeTab, setActiveTab] = useState<Format>('odi');
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading: upward entrance — "Rise" narrative energy
            gsap.from(`.${styles.heading}`, {
                scrollTrigger: {
                    trigger: `.${styles.heading}`,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
                y: 40, opacity: 0, duration: 0.9, ease: 'expo.out',
            });
            // Stat cards stagger upward — confident, progressive reveal
            gsap.from(`.${styles.statCard}`, {
                scrollTrigger: {
                    trigger: `.${styles.statsGrid}`,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                y: 30, opacity: 0,
                duration: 0.7,
                ease: 'expo.out',
                stagger: 0.07,
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const tabs: { id: Format; label: string }[] = [
        { id: 'test', label: 'TEST' },
        { id: 'odi', label: 'ODI' },
        { id: 't20i', label: 'T20I' },
        { id: 'ipl', label: 'IPL' },
    ];

    const data = careerStats.formats[activeTab];

    return (
        <section className={styles.statsSection} ref={sectionRef}>
            <div className={styles.headerRow}>
                <h2 className={styles.heading}>CAREER <span className={styles.goldText}>STATS</span></h2>
                <PrimarySourceBadge />
            </div>

            <div className={styles.tabs}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Matches</span>
                    <span className={styles.statValue}>{data.matches}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Runs</span>
                    <span className={styles.statValue}>{data.runs}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Average</span>
                    <span className={styles.statValue}>{data.average}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Strike Rate</span>
                    <span className={styles.statValue}>{data.strikeRate}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Highest</span>
                    <span className={styles.statValue}>{data.highest}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>100s / 50s</span>
                    <span className={styles.statValue}>{data.centuries} / {data.fifties}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Catches</span>
                    <span className={styles.statValue}>{data.catches}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Stumpings</span>
                    <span className={styles.statValue}>{data.stumpings}</span>
                </div>
            </div>
        </section>
    );
};

export default CareerStats;
