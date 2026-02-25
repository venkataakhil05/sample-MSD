'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════ DATA */

const formats = [
    {
        id: 'odi', label: 'ODI', tagline: 'One Day International', accent: '#f5c518', direction: 'left',
        stats: [
            { label: 'Matches', value: 350 },
            { label: 'Runs', value: 10773 },
            { label: 'Average', value: 50.57, decimals: 2 },
            { label: 'Strike Rate', value: 87.56, decimals: 2 },
            { label: 'Hundreds', value: 10 },
            { label: 'Fifties', value: 73 },
            { label: 'Stumpings', value: 123 },
        ],
    },
    {
        id: 'test', label: 'TEST', tagline: 'Test Cricket', accent: '#ffffff', direction: 'right',
        stats: [
            { label: 'Matches', value: 90 },
            { label: 'Runs', value: 4876 },
            { label: 'Average', value: 38.09, decimals: 2 },
            { label: 'Strike Rate', value: 59.11, decimals: 2 },
            { label: 'Hundreds', value: 6 },
            { label: 'Fifties', value: 33 },
            { label: 'Stumpings', value: 38 },
        ],
    },
    {
        id: 't20', label: 'T20I', tagline: 'Twenty20 International', accent: '#f5c518', direction: 'left',
        stats: [
            { label: 'Matches', value: 98 },
            { label: 'Runs', value: 1617 },
            { label: 'Average', value: 37.60, decimals: 2 },
            { label: 'Strike Rate', value: 126.13, decimals: 2 },
            { label: 'Hundreds', value: 0 },
            { label: 'Fifties', value: 2 },
            { label: 'Stumpings', value: 34 },
        ],
    },
];

const trophies = [
    { year: '2007', title: 'ICC T20 World Cup', subtitle: "South Africa - India's inaugural T20 title", icon: 'T20' },
    { year: '2010', title: 'Asia Cup', subtitle: 'Sri Lanka - ODI dominance', icon: 'AC' },
    { year: '2011', title: 'ICC ODI World Cup', subtitle: 'India - Historic six at Wankhede', icon: 'WC' },
    { year: '2013', title: 'Champions Trophy', subtitle: 'England - Completed ICC triple', icon: 'CT' },
    { year: '2016', title: 'Asia Cup', subtitle: 'Bangladesh - Second Asia Cup title', icon: 'AC' },
    { year: '2010', title: 'IPL - CSK', subtitle: 'Chennai Super Kings', icon: 'IPL' },
    { year: '2011', title: 'IPL - CSK', subtitle: 'Back-to-back IPL titles', icon: 'IPL' },
    { year: '2018', title: 'IPL - CSK', subtitle: 'Comeback season triumph', icon: 'IPL' },
    { year: '2021', title: 'IPL - CSK', subtitle: 'Fourth IPL crown', icon: 'IPL' },
    { year: '2023', title: 'IPL - CSK', subtitle: 'Fifth IPL championship', icon: 'IPL' },
];

const records = [
    'Most stumpings in international cricket — 195 ✦',
    'Most dismissals as wicket-keeper for India — 829 ✦',
    'Most matches as India captain — 332 ✦',
    'Only captain to win all 3 ICC limited-overs trophies ✦',
    'Fastest 50 in ODIs — off just 13 balls ✦',
    'ICC Cricket Hall of Fame inductee 2025 ✦',
    'Khel Ratna Award 2008 ✦ Padma Shri 2009 ✦ Padma Bhushan 2018 ✦',
    '5× IPL Champion as CSK captain ✦',
    '329 ODI wins as captain — most by any Indian skipper ✦',
    'India #1 Test ranking under his captaincy — 2009 ✦',
];

const captaincy = [
    { format: 'ODI', played: 200, won: 110, lost: 74, tied: 8, nr: 8, winPct: 55 },
    { format: 'TEST', played: 60, won: 27, lost: 18, tied: 0, nr: 15, winPct: 45 },
    { format: 'T20I', played: 72, won: 41, lost: 28, tied: 1, nr: 2, winPct: 57 },
];

const iplStats = [
    { label: 'Seasons', value: 16 },
    { label: 'Matches', value: 264 },
    { label: 'Runs', value: 5243 },
    { label: 'Average', value: 38.55, decimals: 2 },
    { label: 'SR', value: 135.92, decimals: 2 },
    { label: 'Titles', value: 5 },
    { label: 'Stumpings', value: 42 },
];

/* ══════════════════════════════════════════════════ UTILITIES */

const SCRAMBLE_CHARS = '0123456789';

function scrambleCountUp(el: HTMLElement, target: number, decimals = 0, delay = 0) {
    const duration = 1.8;
    const scrambleDuration = 0.5;

    // Phase 1: scramble random digits for scrambleDuration
    let scrambleFrame: ReturnType<typeof requestAnimationFrame>;
    const startTime = performance.now() + delay * 1000;

    const scramble = (now: number) => {
        if (now < startTime) { scrambleFrame = requestAnimationFrame(scramble); return; }
        const elapsed = now - startTime;
        if (elapsed < scrambleDuration * 1000) {
            const len = String(Math.round(target)).length;
            el.textContent = Array.from({ length: len })
                .map(() => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
                .join('');
            scrambleFrame = requestAnimationFrame(scramble);
        } else {
            cancelAnimationFrame(scrambleFrame);
            // Phase 2: smooth count up
            const obj = { val: 0 };
            gsap.to(obj, {
                val: target,
                duration,
                ease: 'power2.out',
                onUpdate() {
                    el.textContent = decimals
                        ? obj.val.toFixed(decimals)
                        : Math.round(obj.val).toLocaleString();
                },
                onComplete() {
                    el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString();
                },
            });
        }
    };
    scrambleFrame = requestAnimationFrame(scramble);
}

/* ════════════════════════════════════════════════════════ PAGE */

export default function Career() {
    const pageRef = useRef<HTMLDivElement>(null);
    const curtainRef = useRef<HTMLDivElement>(null);
    const scanRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const trophyRef = useRef<HTMLDivElement>(null);
    const iplRef = useRef<HTMLDivElement>(null);
    const captainRef = useRef<HTMLDivElement>(null);

    /* ── 3D Tilt handler ── */
    const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
        gsap.to(card, { rotateX: y, rotateY: x, duration: 0.3, ease: 'power2.out', transformPerspective: 800 });
    }, []);

    const resetTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)', transformPerspective: 800 });
    }, []);

    useEffect(() => {
        const curtain = curtainRef.current;
        const scan = scanRef.current;
        const title = titleRef.current;
        const sub = subRef.current;
        const cards = cardsRef.current;

        // Reset
        if (curtain) gsap.set(curtain, { display: 'flex', clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
        if (title) gsap.set(title, { y: 100, opacity: 0, skewX: 8 });
        if (sub) gsap.set(sub, { y: 40, opacity: 0 });
        if (cards) {
            const cardEls = cards.querySelectorAll<HTMLElement>(`.${styles.card}`);
            cardEls.forEach((c, i) => gsap.set(c, { x: formats[i]?.direction === 'right' ? 300 : -300, opacity: 0 }));
        }

        const safetyTimer = setTimeout(() => {
            if (curtain) gsap.set(curtain, { display: 'none' });
        }, 5000);

        const hideCurtain = () => {
            clearTimeout(safetyTimer);
            if (curtain) gsap.set(curtain, { display: 'none' });
        };

        /* MASTER TIMELINE */
        const tl = gsap.timeline();

        // 1. Scanline sweep
        if (scan) {
            gsap.set(scan, { top: '-4px', opacity: 1 });
            tl.to(scan, { top: '100%', duration: 0.9, ease: 'none' }, 0);
        }

        // 2. Curtain collapse upward
        tl.to(curtain, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 0.65,
            ease: 'expo.inOut',
            onComplete: hideCurtain,
        }, 0.85);

        // 3. CAREER title slams in
        tl.to(title, { y: 0, opacity: 1, skewX: 0, duration: 0.55, ease: 'expo.out' }, 1.2);

        // 4. Subtitle
        tl.to(sub, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, 1.55);

        // 5. Stat cards cascade
        if (cards) {
            const cardEls = Array.from(cards.querySelectorAll<HTMLElement>(`.${styles.card}`));
            tl.to(cardEls, { x: 0, opacity: 1, duration: 0.75, stagger: 0.15, ease: 'expo.out' }, 1.7);

            // ScrollTrigger scramble CountUp for each card
            const ctx = gsap.context(() => {
                cardEls.forEach((card, ci) => {
                    const valueEls = card.querySelectorAll<HTMLElement>(`.${styles.statValue}`);
                    const fmt = formats[ci];
                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top 82%',
                        once: true,
                        onEnter: () => {
                            valueEls.forEach((el, si) => {
                                const stat = fmt?.stats[si];
                                if (stat) scrambleCountUp(el, stat.value, stat.decimals ?? 0, si * 0.12);
                            });
                        },
                    });
                });

                /* Trophy cards — stagger reveal on scroll */
                const trophyCards = gsap.utils.toArray<HTMLElement>(`.${styles.trophyCard}`);
                gsap.set(trophyCards, { y: 60, opacity: 0, scale: 0.92 });
                ScrollTrigger.create({
                    trigger: trophyRef.current,
                    start: 'top 70%',
                    once: true,
                    onEnter: () => {
                        gsap.to(trophyCards, {
                            y: 0, opacity: 1, scale: 1,
                            duration: 0.7,
                            stagger: { amount: 0.8, from: 'start' },
                            ease: 'back.out(1.4)',
                        });
                    },
                });

                /* IPL stats scramble */
                const iplVals = gsap.utils.toArray<HTMLElement>(`.${styles.iplValue}`);
                ScrollTrigger.create({
                    trigger: iplRef.current,
                    start: 'top 80%',
                    once: true,
                    onEnter: () => {
                        iplStats.forEach((stat, i) => {
                            const el = iplVals[i];
                            if (el) scrambleCountUp(el, stat.value, stat.decimals ?? 0, i * 0.1);
                        });
                    },
                });

                /* Captaincy bars */
                const bars = gsap.utils.toArray<HTMLElement>(`.${styles.bar}`);
                ScrollTrigger.create({
                    trigger: captainRef.current,
                    start: 'top 80%',
                    once: true,
                    onEnter: () => {
                        bars.forEach((bar) => {
                            const pct = bar.dataset.pct ?? '0';
                            gsap.fromTo(bar,
                                { scaleX: 0 },
                                { scaleX: 1, '--target-w': `${pct}%`, duration: 1.4, ease: 'expo.out', transformOrigin: 'left' }
                            );
                        });
                    },
                });

            }, pageRef);

            return () => {
                tl.kill();
                ctx.revert();
                clearTimeout(safetyTimer);
                gsap.set([title, sub], { clearProps: 'all' });
            };
        }
    }, []);

    return (
        <div className={styles.page} ref={pageRef}>

            {/* ── Curtain ──────────────────────────────────── */}
            <div className={styles.curtain} ref={curtainRef}>
                <div className={styles.curtainBg} />
                <div className={styles.scanline} ref={scanRef} />
                <div className={styles.curtainLabel}>LOADING CAREER DATA</div>
                <div className={styles.curtainGrid} />
            </div>

            {/* ── Hero ─────────────────────────────────────── */}
            <header className={styles.hero}>
                <p className={styles.eyebrow}>MS DHONI // DATA TERMINAL</p>
                <h1 className={styles.title} ref={titleRef}>CAREER</h1>
                <p className={styles.subtitle} ref={subRef}>Numbers that define a Legend</p>
                <div className={styles.heroRule} />
            </header>

            {/* ── Stat Cards ───────────────────────────────── */}
            <section className={styles.cardsSection} ref={cardsRef}>
                {formats.map((fmt) => (
                    <div
                        key={fmt.id}
                        className={styles.card}
                        style={{ '--accent': fmt.accent } as React.CSSProperties}
                        onMouseMove={handleTilt}
                        onMouseLeave={resetTilt}
                    >
                        <span className={styles.cardGhost}>{fmt.label}</span>
                        <div className={styles.cardHead}>
                            <h2 className={styles.cardFormat}>{fmt.label}</h2>
                            <span className={styles.cardTag}>{fmt.tagline}</span>
                        </div>
                        <div className={styles.statsGrid}>
                            {fmt.stats.map((stat, si) => (
                                <div key={si} className={styles.statCell}>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                    <span className={styles.statValue}>—</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.cardLine} />
                    </div>
                ))}
            </section>

            {/* ── Trophies ─────────────────────────────────── */}
            <section className={styles.trophySection} ref={trophyRef}>
                <div className={styles.sectionHead}>
                    <p className={styles.sectionEye}>HONOURS</p>
                    <h2 className={styles.sectionTitle}>TROPHIES</h2>
                </div>
                <div className={styles.trophyGrid}>
                    {trophies.map((t, i) => (
                        <div
                            key={i}
                            className={styles.trophyCard}
                            onMouseMove={handleTilt}
                            onMouseLeave={resetTilt}
                        >
                            <span className={styles.trophyIcon}>{t.icon}</span>
                            <span className={styles.trophyYear}>{t.year}</span>
                            <h3 className={styles.trophyTitle}>{t.title}</h3>
                            <p className={styles.trophySub}>{t.subtitle}</p>
                            <div className={styles.trophyGlow} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Records Ticker ───────────────────────────── */}
            <div className={styles.tickerWrap}>
                <div className={styles.ticker}>
                    {[...records, ...records].map((r, i) => (
                        <span key={i} className={styles.tickerItem}>{r}</span>
                    ))}
                </div>
            </div>

            {/* ── IPL Stats ────────────────────────────────── */}
            <section className={styles.iplSection} ref={iplRef}>
                <div className={styles.sectionHead}>
                    <p className={styles.sectionEye}>INDIAN PREMIER LEAGUE</p>
                    <h2 className={styles.sectionTitle}>CSK <span className={styles.accent}>LEGACY</span></h2>
                </div>
                <div className={styles.iplGrid}>
                    {iplStats.map((stat, i) => (
                        <div key={i} className={styles.iplCell}>
                            <span className={styles.iplValue}>—</span>
                            <span className={styles.iplLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Captaincy ────────────────────────────────── */}
            <section className={styles.captainSection} ref={captainRef}>
                <div className={styles.sectionHead}>
                    <p className={styles.sectionEye}>LEADERSHIP</p>
                    <h2 className={styles.sectionTitle}>CAPTAINCY <span className={styles.accent}>RECORD</span></h2>
                </div>
                <div className={styles.captainTable}>
                    {captaincy.map((row) => (
                        <div key={row.format} className={styles.captainRow}>
                            <span className={styles.captainFormat}>{row.format}</span>
                            <div className={styles.captainBars}>
                                <div className={styles.barWrap}>
                                    <span className={styles.barLabel}>W {row.won}</span>
                                    <div
                                        className={`${styles.bar} ${styles.barWin}`}
                                        data-pct={row.winPct}
                                        style={{ width: `${row.winPct}%` }}
                                    />
                                </div>
                                <div className={styles.barWrap}>
                                    <span className={styles.barLabel}>L {row.lost}</span>
                                    <div
                                        className={`${styles.bar} ${styles.barLoss}`}
                                        data-pct={Math.round((row.lost / row.played) * 100)}
                                        style={{ width: `${Math.round((row.lost / row.played) * 100)}%` }}
                                    />
                                </div>
                            </div>
                            <span className={styles.captainPlayed}>P {row.played}</span>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
