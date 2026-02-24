'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

/* ═════════════════════════════════════════════════════ DATA */
const photos = [
    { src: 'https://s3.ap-south-1.amazonaws.com/static.dynamitenews.com/wp-content/uploads/2020/04/02/world-cup-2011-9th-anniversary-of-historic-win-against-sri-lanka/5e8593f743c91.jpeg', title: 'World Cup 2011', tag: 'ICONIC', size: 'large' },
    { src: 'https://wallpapercave.com/wp/wp5975354.jpg', title: 'Calculated Finish', tag: 'BATTING', size: 'small' },
    { src: 'https://wallpapercave.com/wp/wp6860276.jpg', title: 'Leading the Charge', tag: 'CAPTAIN', size: 'small' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4TEk7ffPvYR3EA52HXHasEE8K_0fwmsAFhQ&s', title: 'Lightning Stumping', tag: 'KEEPING', size: 'small' },
    { src: 'https://wallpapercave.com/wp/wp4074312.jpg', title: 'Test Mace', tag: 'TESTS', size: 'small' },
    { src: 'https://wallpapercave.com/wp/wp1859949.jpg', title: 'CSK Pride', tag: 'IPL', size: 'large' },
];

const videos = [
    { id: 'Wjv6MDNZIAM', title: 'The Helicopter Shot', subtitle: 'The stroke that redefined finishing' },
    { id: 'HNOo0rBSNm8', title: '2011 World Cup Final', subtitle: 'The six that made a billion dreams real' },
    { id: 'mFHI3S_QRZE', title: 'Dhoni Finishes Off', subtitle: 'Calm. Clinical. Devastating.' },
];

const TITLE = 'MEDIA';

/* ════════════════════════════════════════════════════ PAGE */
export default function Media() {
    const pageRef = useRef<HTMLDivElement>(null);
    const irisRef = useRef<HTMLDivElement>(null);
    const lensRef = useRef<HTMLDivElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const videoSecRef = useRef<HTMLElement>(null);

    /* 3D tilt */
    const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
        gsap.to(el, { rotateX: y, rotateY: x, duration: 0.25, ease: 'power2.out', transformPerspective: 700 });
    }, []);

    const resetTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,0.4)', transformPerspective: 700 });
    }, []);

    useEffect(() => {
        const iris = irisRef.current;
        const lens = lensRef.current;
        const flash = flashRef.current;
        const title = titleRef.current;
        const sub = subtitleRef.current;

        /* Reset */
        if (iris) gsap.set(iris, { display: 'block' });
        if (title) gsap.set(title, { opacity: 0 });
        if (sub) gsap.set(sub, { opacity: 0, y: 20 });

        /* Set iris blades start position (CLOSED — all at center) */
        const blades = iris?.querySelectorAll<HTMLElement>(`.${styles.blade}`);
        if (blades) {
            gsap.set(blades[0], { yPercent: 0 }); // top
            gsap.set(blades[1], { xPercent: 0 }); // right
            gsap.set(blades[2], { yPercent: 0 }); // bottom
            gsap.set(blades[3], { xPercent: 0 }); // left
        }

        /* Lens center starts small */
        if (lens) gsap.set(lens, { scale: 0, opacity: 0 });

        const safetyTimer = setTimeout(() => {
            if (iris) gsap.set(iris, { display: 'none' });
            if (flash) gsap.set(flash, { display: 'none' });
        }, 5000);

        const tl = gsap.timeline();

        /* PHASE 1 — lens appear (gleam at center) */
        tl.to(lens, { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' }, 0.2);

        /* PHASE 2 — iris blades slide open (the aperture opens) */
        if (blades) {
            tl.to(blades[0], { yPercent: -105, duration: 0.9, ease: 'expo.inOut' }, 0.65); // top up
            tl.to(blades[1], { xPercent: 105, duration: 0.9, ease: 'expo.inOut' }, 0.65); // right
            tl.to(blades[2], { yPercent: 105, duration: 0.9, ease: 'expo.inOut' }, 0.65); // bottom down
            tl.to(blades[3], { xPercent: -105, duration: 0.9, ease: 'expo.inOut' }, 0.65); // left
        }

        /* PHASE 3 — camera flash as iris fully opens */
        tl.to(flash, {
            opacity: 1, duration: 0.08,
            onStart: () => { if (flash) gsap.set(flash, { display: 'block' }); },
        }, 1.5);
        tl.to(flash, {
            opacity: 0, duration: 0.45, ease: 'power2.out',
            onComplete: () => {
                clearTimeout(safetyTimer);
                if (iris) gsap.set(iris, { display: 'none' });
                if (flash) gsap.set(flash, { display: 'none' });
            },
        }, 1.58);

        /* PHASE 4 — MEDIA title types out letter by letter */
        tl.to(title, { opacity: 1, duration: 0.01 }, 1.65);
        if (title) {
            const letters = title.querySelectorAll<HTMLElement>(`.${styles.letter}`);
            tl.fromTo(letters,
                { opacity: 0, scale: 1.5, rotateX: -90 },
                { opacity: 1, scale: 1, rotateX: 0, duration: 0.35, stagger: 0.09, ease: 'back.out(1.7)', transformPerspective: 600 },
                1.7
            );
        }

        tl.to(sub, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 2.25);

        /* ScrollTrigger — photo develop effect */
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(`.${styles.photoCard}`);
            cards.forEach((card, i) => {
                const img = card.querySelector<HTMLElement>(`.${styles.photo}`);
                if (img) {
                    gsap.set(img, { filter: 'grayscale(100%) brightness(0.5)' });
                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top 85%',
                        once: true,
                        onEnter: () => {
                            gsap.to(card, { opacity: 1, y: 0, duration: 0.55, delay: (i % 3) * 0.1, ease: 'expo.out' });
                            /* develop: B&W → full color */
                            gsap.to(img, {
                                filter: 'grayscale(0%) brightness(1)',
                                duration: 1.2, delay: (i % 3) * 0.1 + 0.2, ease: 'power2.inOut',
                            });
                        },
                    });
                    gsap.set(card, { opacity: 0, y: 60 });
                }
            });

            const vCards = gsap.utils.toArray<HTMLElement>(`.${styles.videoCard}`);
            gsap.set(vCards, { y: 60, opacity: 0 });
            ScrollTrigger.create({
                trigger: videoSecRef.current,
                start: 'top 75%',
                once: true,
                onEnter: () => gsap.to(vCards, { y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: 'expo.out' }),
            });
        }, pageRef);

        return () => {
            tl.kill();
            ctx.revert();
            clearTimeout(safetyTimer);
            gsap.set([title, sub], { clearProps: 'all' });
        };
    }, []);

    return (
        <div className={styles.page} ref={pageRef}>

            {/* Camera flash */}
            <div className={styles.flash} ref={flashRef} />

            {/* ── IRIS (4-blade camera aperture) ───────────────── */}
            <div className={styles.iris} ref={irisRef}>
                {/* Lens gleam at center */}
                <div className={styles.lens} ref={lensRef}>
                    <div className={styles.lensRing} />
                    <div className={styles.lensInner} />
                    <div className={styles.lensGlint} />
                </div>

                {/* 4 triangular blades */}
                <div className={`${styles.blade} ${styles.bladeTop}`} />
                <div className={`${styles.blade} ${styles.bladeRight}`} />
                <div className={`${styles.blade} ${styles.bladeBottom}`} />
                <div className={`${styles.blade} ${styles.bladeLeft}`} />
            </div>

            {/* ── Hero Header ──────────────────────────────────── */}
            <header className={styles.hero}>
                <p className={styles.eyebrow}>MS DHONI // VISUAL ARCHIVE</p>
                <h1 className={styles.title} ref={titleRef}>
                    {TITLE.split('').map((ch, i) => (
                        <span key={i} className={styles.letter}>{ch}</span>
                    ))}
                </h1>
                <p className={styles.subtitle} ref={subtitleRef}>Frames that froze time</p>
                <div className={styles.heroRule} />
            </header>

            {/* ── Photo Grid ───────────────────────────────────── */}
            <section className={styles.photoSection} ref={gridRef}>
                <div className={styles.photoGrid}>
                    {photos.map((photo, i) => (
                        <div
                            key={i}
                            className={`${styles.photoCard} ${photo.size === 'large' ? styles.large : ''}`}
                            onMouseMove={handleTilt}
                            onMouseLeave={resetTilt}
                        >
                            <div className={styles.photoInner}>
                                <Image
                                    src={photo.src}
                                    alt={photo.title}
                                    fill
                                    className={styles.photo}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className={styles.photoOverlay}>
                                    <span className={styles.photoTag}>{photo.tag}</span>
                                    <h3 className={styles.photoTitle}>{photo.title}</h3>
                                    <div className={styles.overlayLine} />
                                </div>
                                <span className={styles.photoBadge}>{String(i + 1).padStart(2, '0')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Ticker ───────────────────────────────────────── */}
            <div className={styles.ticker}>
                <div className={styles.tickerInner}>
                    {Array.from({ length: 4 }).map((_, ri) =>
                        ['WORLD CUP 2011', 'T20 WC 2007', 'HELICOPTER SHOT', 'CSK CHAMPION', 'CAPTAIN COOL', '10,773 ODI RUNS'].map((t, ti) => (
                            <span key={`${ri}-${ti}`} className={styles.tickerItem}>{t} ✦</span>
                        ))
                    )}
                </div>
            </div>

            {/* ── Videos ───────────────────────────────────────── */}
            <section className={styles.videoSection} ref={videoSecRef}>
                <div className={styles.sectionHead}>
                    <p className={styles.sectionEye}>HISTORIC MOMENTS</p>
                    <h2 className={styles.sectionTitle}>MATCH <span className={styles.accent}>REELS</span></h2>
                </div>
                <div className={styles.videoGrid}>
                    {videos.map((v, i) => (
                        <div key={i} className={styles.videoCard}>
                            <div className={styles.videoThumb}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                                    title={v.title}
                                    allowFullScreen
                                    className={styles.videoEmbed}
                                />
                                <div className={styles.videoCardGlow} />
                            </div>
                            <div className={styles.videoInfo}>
                                <span className={styles.videoNum}>{String(i + 1).padStart(2, '0')}</span>
                                <div>
                                    <h3 className={styles.videoTitle}>{v.title}</h3>
                                    <p className={styles.videoSub}>{v.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
