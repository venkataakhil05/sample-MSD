'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CareerTimeline.module.css';

gsap.registerPlugin(ScrollTrigger);

const events = [
    { year: '1981', label: 'Born in Ranchi', desc: 'July 7, 1981 — Mahendra Singh Dhoni enters the world.' },
    { year: '2001', label: 'Ticket Examiner', desc: 'Works as TTE at Kharagpur Railway Station while playing local cricket.' },
    { year: '2004', label: 'International Debut', desc: 'ODI debut vs Bangladesh in Chittagong. A career begins.' },
    { year: '2005', label: 'Historic 148*', desc: '148* vs Pak in Vishakhapatnam — the shot that introduced Dhoni to the world.' },
    { year: '2007', label: 'T20 World Cup', desc: 'Leads India to their maiden ICC World Twenty20 title in South Africa.' },
    { year: '2008', label: 'Test Captaincy', desc: 'Takes over Test captaincy — India climbs to No.1 ranking by 2009.' },
    { year: '2011', label: 'World Cup Glory', desc: 'That six at Wankhede. 28-year wait ends. A nation erupts.' },
    { year: '2013', label: 'Champions Trophy', desc: 'Only captain ever to win all three major ICC limited-overs trophies.' },
    { year: '2018', label: 'IPL Title III', desc: 'CSK returns from two-year ban and wins IPL under MSD leadership.' },
    { year: '2020', label: 'Retirement', desc: '"Thank you. Jai Hind." — Two words. Instagram post. A nation grieved.' },
];

export default function CareerTimeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section heading
            gsap.from(`.${styles.heading}`, {
                scrollTrigger: { trigger: `.${styles.heading}`, start: 'top 85%' },
                y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
            });

            // Line draw
            if (lineRef.current) {
                gsap.from(lineRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        end: 'bottom 60%',
                        scrub: 1,
                    },
                    scaleX: 0,
                    transformOrigin: 'left center',
                });
            }

            // Nodes stagger in
            gsap.utils.toArray<HTMLElement>(`.${styles.node}`).forEach((node, i) => {
                gsap.from(node, {
                    scrollTrigger: { trigger: node, start: 'top 85%', toggleActions: 'play none none none' },
                    y: 40, opacity: 0, scale: 0.85,
                    duration: 0.6,
                    delay: i * 0.04,
                    ease: 'back.out(1.5)',
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.headerRow}>
                <span className={styles.eyebrow}>CHAPTER BY CHAPTER</span>
                <h2 className={styles.heading}>
                    CAREER <span className={styles.gold}>TIMELINE</span>
                </h2>
                <p className={styles.sub}>Every defining moment. Every year that mattered.</p>
            </div>

            <div className={styles.trackWrap}>
                {/* Connecting line */}
                <div className={styles.trackLine} ref={lineRef} />

                {/* Nodes */}
                <div className={styles.track}>
                    {events.map((ev, i) => (
                        <div
                            key={i}
                            className={`${styles.node} ${activeIdx === i ? styles.nodeActive : ''}`}
                            onMouseEnter={() => setActiveIdx(i)}
                            onMouseLeave={() => setActiveIdx(null)}
                        >
                            <div className={styles.dot}>
                                <div className={styles.dotInner} />
                            </div>
                            <div className={styles.year}>{ev.year}</div>
                            <div className={styles.label}>{ev.label}</div>

                            {/* Tooltip */}
                            <div className={styles.tooltip}>
                                <div className={styles.tooltipArrow} />
                                <div className={styles.tooltipYear}>{ev.year}</div>
                                <div className={styles.tooltipTitle}>{ev.label}</div>
                                <div className={styles.tooltipDesc}>{ev.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
