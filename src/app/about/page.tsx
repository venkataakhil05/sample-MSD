'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    { year: '1981', title: 'Born in Ranchi', description: 'Mahendra Singh Dhoni was born on July 7, 1981, in Ranchi, Bihar (now Jharkhand).' },
    { year: '2004', title: 'International Debut', description: 'Made his ODI debut against Bangladesh in Chittagong.' },
    { year: '2007', title: 'T20 World Cup', description: 'Led India to their first-ever T20 World Cup victory in South Africa.' },
    { year: '2011', title: 'World Cup Glory', description: 'The historic six at Wankhede! India lifts the ODI World Cup after 28 years.' },
    { year: '2013', title: 'Champions Trophy', description: 'Became the only captain to win all three major ICC trophies.' },
    { year: '2020', title: 'International Retirement', description: 'Bids adieu to international cricket, leaving a legacy unmatched.' },
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const curtainRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const curtainEl = curtainRef.current;
        const counter = counterRef.current;
        const titleEl = titleRef.current;
        const subtitleEl = subtitleRef.current;
        const bioEl = bioRef.current;
        const bars = curtainEl
            ? Array.from(curtainEl.querySelectorAll<HTMLElement>(`.${styles.curtainBar}`))
            : [];

        // ── CRITICAL: reset ALL elements to visible before every animation run ──
        // This prevents stale GSAP inline styles from hiding content on re-navigation
        gsap.set([titleEl, subtitleEl, bioEl], { clearProps: 'all' });
        if (curtainEl) gsap.set(curtainEl, { display: 'flex' });
        if (bars.length) gsap.set(bars, { yPercent: 0, clearProps: 'yPercent' });
        if (counter) { counter.textContent = '00'; gsap.set(counter, { opacity: 1, scale: 1 }); }

        // Safety fallback — always show content after 4 s if anything fails
        const safetyTimer = setTimeout(() => {
            if (curtainEl) gsap.set(curtainEl, { display: 'none' });
            gsap.set([titleEl, subtitleEl, bioEl], { clearProps: 'all' });
        }, 4000);

        const hideCurtain = () => {
            clearTimeout(safetyTimer);
            if (curtainEl) gsap.set(curtainEl, { display: 'none' });
        };

        // ── MAIN TIMELINE ───────────────────────────────────────────────────────
        const tl = gsap.timeline({ onComplete: hideCurtain });

        // 1. Counter: 00 → 07
        const counterObj = { val: 0 };
        tl.to(counterObj, {
            val: 7,
            duration: 0.6,
            ease: 'none',
            onUpdate: () => {
                if (counter) {
                    const v = Math.round(counterObj.val);
                    counter.textContent = v < 10 ? `0${v}` : `${v}`;
                }
            },
        }, 0);

        // 2. Flash counter
        tl.to(counter, { opacity: 0, duration: 0.12, yoyo: true, repeat: 2, ease: 'none' }, 0.6);

        // 2b. Snap counter back, then blast out with bar wipe
        tl.to(counter, { opacity: 1, duration: 0.04 }, 0.78);

        // 3. Curtain wipe — even bars up, odd bars down
        if (bars.length) {
            const evenBars = bars.filter((_, i) => i % 2 === 0);
            const oddBars = bars.filter((_, i) => i % 2 !== 0);
            tl.to(evenBars, { yPercent: -100, duration: 0.75, ease: 'expo.inOut', stagger: 0.03 }, 0.85);
            tl.to(oddBars, { yPercent: 100, duration: 0.75, ease: 'expo.inOut', stagger: 0.03 }, 0.85);
            tl.to(counter, { scale: 1.4, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0.85);
        }

        // 4 & 5. Clean simultaneous reveal — all text in together, no blur artifacts
        const textEls = [
            ...(titleEl ? [titleEl] : []),
            ...(subtitleEl ? [subtitleEl] : []),
            ...(bioEl ? [bioEl] : []),
        ];
        if (textEls.length) {
            gsap.set(textEls, { y: 60, opacity: 0 });
            tl.to(textEls, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.08,   // tiny stagger — feels sequential but near-instant
                ease: 'power4.out',
            }, 1.5);
        }

        // 6. Scroll-triggered milestone cards
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(`.${styles.milestone}`).forEach((el, i) => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
                    x: i % 2 === 0 ? -80 : 80,
                    opacity: 0,
                    duration: 0.75,
                    ease: 'power3.out',
                });
            });
            gsap.utils.toArray<HTMLElement>(`.${styles.year}`).forEach((el) => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: 'top 90%', end: 'bottom 30%', scrub: 1.5 },
                    x: -40, opacity: 0,
                });
            });
        }, containerRef);

        return () => {
            tl.kill();
            ctx.revert();
            clearTimeout(safetyTimer);
            // On unmount, clear any inline styles so re-mount starts clean
            gsap.set([titleEl, subtitleEl, bioEl], { clearProps: 'all' });
        };
    }, []);

    // Number of curtain bars
    const BAR_COUNT = 10;

    return (
        <div className={styles.container} ref={containerRef}>

            {/* ── Curtain Overlay ─────────────────────────────── */}
            <div className={styles.curtain} ref={curtainRef}>
                {Array.from({ length: BAR_COUNT }).map((_, i) => (
                    <div key={i} className={styles.curtainBar} />
                ))}
                {/* Big counter center */}
                <div className={styles.curtainCounter} ref={counterRef}>00</div>
            </div>

            {/* ── Page Header ─────────────────────────────────── */}
            <header className={styles.header}>
                <div className={styles.titleWrap} ref={titleRef}>
                    {['THE', 'JOURNEY'].map((word) => (
                        <div key={word} className={styles.titleClip}>
                            <span className={styles.titleWord}>{word}</span>
                        </div>
                    ))}
                </div>
                <p className={styles.subtitle} ref={subtitleRef}>From Ticket Collector to Trophy Collector</p>
            </header>

            {/* ── Biography ───────────────────────────────────── */}
            <section className={styles.biography}>
                <div className={styles.bioContent} ref={bioRef}>
                    <p>
                        Mahendra Singh Dhoni — affectionately known as &quot;Mahi&quot; or &quot;Captain Cool&quot; — was born
                        on July 7, 1981, in Ranchi, Bihar (now Jharkhand), the youngest of three children to Pan Singh
                        and Devaki Devi. He attended DAV Jawahar Vidya Mandir, where he first excelled as a football
                        goalkeeper before his coach, Keshav Banerjee, recognised his natural talent behind the wicket and
                        encouraged his switch to cricket.
                    </p>
                    <p>
                        Before cricket brought him fame, Dhoni worked as a Travelling Ticket Examiner (TTE) at Kharagpur
                        Railway Station from 2001 to 2003 — a detail that became one of cricket&apos;s most beloved rags-to-riches stories.
                        He made his first-class debut for Bihar in the 1999–2000 Ranji Trophy, scoring 68 runs on debut and
                        recording his maiden first-class century against Bengal the following season.
                    </p>
                    <p>
                        Dhoni made his ODI debut on December 23, 2004, against Bangladesh, followed by his Test debut in
                        December 2005 against Sri Lanka. His aggressive batting and lightning-fast stumpings quickly drew
                        attention, and by 2007 he had been appointed captain of India&apos;s ODI team. By 2008 he held the
                        captaincy across all three formats, ushering in one of the most dominant eras in Indian cricket.
                    </p>
                    <p>
                        As captain, Dhoni made history by becoming the only skipper to win all three major ICC limited-overs
                        tournaments: the 2007 ICC World Twenty20 in South Africa, the 2011 Cricket World Cup at Wankhede
                        Stadium — where his unbeaten 91 in the final sealed a 28-year wait — and the 2013 ICC Champions
                        Trophy in England. He also guided India to back-to-back Asia Cup titles in 2010 and 2016, and to
                        the No.1 ranking in Test cricket in 2009.
                    </p>
                    <p>
                        His records speak for themselves: over 10,000 ODI runs at an average above 50, a world-record
                        195 stumpings in international cricket, 829 total dismissals as keeper for India, and 332 matches
                        captained — the most by any Indian skipper. His signature helicopter shot became iconic worldwide.
                        Off the field, he was honoured with the Khel Ratna Award (2008), Padma Shri (2009), Padma Bhushan
                        (2018), and in June 2025 was inducted into the ICC Cricket Hall of Fame.
                    </p>
                    <p>
                        In the Indian Premier League, Dhoni remains the heartbeat of Chennai Super Kings, leading them to
                        five IPL titles (2010, 2011, 2018, 2021, 2023). He retired from Test cricket in December 2014,
                        stepped down as India&apos;s captain in January 2017, and on August 15, 2020 — Independence Day —
                        announced his retirement from all international cricket. His last international innings was in the
                        2019 World Cup semi-final against New Zealand. A legend whose calm under pressure changed how
                        the world sees the game.
                    </p>
                </div>
            </section>

            {/* ── Timeline ────────────────────────────────────── */}
            <section className={styles.timeline}>
                {milestones.map((milestone, index) => (
                    <div key={index} className={styles.milestone}>
                        <div className={styles.year}>{milestone.year}</div>
                        <div className={styles.details}>
                            <h3>{milestone.title}</h3>
                            <p>{milestone.description}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
