'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Signature from '@/components/ui/Signature';
import CareerStats from '@/components/features/CareerStats';
import BatGallery from '@/components/features/BatGallery';
import TrophyRoom from '@/components/features/TrophyRoom';
import DhoniDNA from '@/components/features/DhoniDNA';
import UntoldNumbers from '@/components/features/UntoldNumbers';
import DhoniIndex from '@/components/features/DhoniIndex';
import LegacySection from '@/components/features/LegacySection';
import VoicesFeed from '@/components/features/VoicesFeed';
import { useEasterEggs } from '@/hooks/useEasterEggs';
import { useAudio } from '@/contexts/SoundContext';

gsap.registerPlugin(ScrollTrigger);

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function scrambleTo(el: HTMLElement, target: string, duration = 0.7, delay = 0) {
  const len = target.length;
  const frames = Math.round(duration * 60);
  let frame = 0;
  const start = performance.now() + delay * 1000;

  const tick = (now: number) => {
    if (now < start) { requestAnimationFrame(tick); return; }
    const progress = Math.min(frame / frames, 1);
    const resolvedCount = Math.floor(progress * len);
    let result = '';
    for (let i = 0; i < len; i++) {
      if (i < resolvedCount) {
        result += target[i];
      } else {
        result += target[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    el.textContent = result;
    frame++;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const ghostNumRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const msRef = useRef<HTMLSpanElement>(null);
  const dhoniRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const customCursorRef = useRef<HTMLDivElement>(null);

  // Easter eggs — key "7" halo, long hover quote, scroll-pause breathing
  useEasterEggs(`.${styles.ghostNum}`);

  // Audio hook for ambience in autograph section
  const { playSound } = useAudio();

  useEffect(() => {
    const curtain = curtainRef.current;

    /* ── Reset ── */
    gsap.set([ghostNumRef.current, nameRef.current, taglineRef.current, ctaRef.current,
    imageWrapRef.current, pillsRef.current, scrollHintRef.current], { clearProps: 'all' });
    gsap.set([ghostNumRef.current], { opacity: 0, scale: 1.4, y: 60 });
    gsap.set([nameRef.current], { opacity: 0, y: 80 });
    gsap.set([taglineRef.current, ctaRef.current, pillsRef.current, scrollHintRef.current], { opacity: 0, y: 30 });
    gsap.set(imageWrapRef.current, { opacity: 0, clipPath: 'inset(0 100% 0 0)' });
    if (curtain) gsap.set(curtain, { display: 'flex' });

    const safetyTimer = setTimeout(() => {
      if (curtain) gsap.set(curtain, { display: 'none' });
    }, 5500);

    const hideCurtain = () => {
      clearTimeout(safetyTimer);
      if (curtain) gsap.set(curtain, { display: 'none' });
    };

    const tl = gsap.timeline();

    /* 1. Scanline sweeps top→bottom */
    if (scanRef.current) {
      gsap.set(scanRef.current, { top: '-4px', opacity: 1 });
      tl.to(scanRef.current, { top: '100%', duration: 1.0, ease: 'none' }, 0);
    }

    /* 2. Curtain collapses + light burst */
    tl.to(curtain, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 0.7,
      ease: 'expo.inOut',
      onComplete: hideCurtain,
    }, 0.9);

    /* 2b. Light burst radiates out */
    if (lightRef.current) {
      gsap.set(lightRef.current, { opacity: 0, scale: 0 });
      tl.to(lightRef.current, {
        opacity: 0.18, scale: 3, duration: 1.4, ease: 'expo.out',
      }, 1.3);
      tl.to(lightRef.current, { opacity: 0, duration: 1.0, ease: 'power2.in' }, 2.4);
    }

    /* 3. Ghost "07" rises */
    tl.to(ghostNumRef.current, {
      opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'expo.out',
    }, 1.4);

    /* 4. Hero image wipes in from left */
    tl.to(imageWrapRef.current, {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.0, ease: 'expo.inOut',
    }, 1.65);

    /* 5. Name scramble-in */
    tl.to(nameRef.current, {
      opacity: 1, y: 0, duration: 0.6, ease: 'expo.out',
      onComplete: () => {
        if (msRef.current) scrambleTo(msRef.current, 'MS', 0.55, 0);
        if (dhoniRef.current) scrambleTo(dhoniRef.current, 'DHONI', 0.7, 0.1);
      },
    }, 1.8);

    /* 6. Tagline, CTA, pills cascade */
    tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 2.35);
    tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 2.55);
    tl.to(pillsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 2.7);
    tl.to(scrollHintRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 2.9);

    /* ── Custom magnetic cursor ── */
    const moveCursor = (e: MouseEvent) => {
      if (!customCursorRef.current) return;
      gsap.to(customCursorRef.current, {
        x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', moveCursor);

    /* ── Scroll animations ── */
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.autographSection}`, {
        scrollTrigger: { trigger: `.${styles.autographSection}`, start: 'top 80%', scrub: 1 },
        backgroundColor: '#000', duration: 1,
      });
      gsap.from(`.${styles.legacyText}`, {
        scrollTrigger: { trigger: `.${styles.autographSection}`, start: 'top bottom', scrub: 2 },
        x: 200, opacity: 0,
      });

      // Trigger ambience on autograph section enter
      ScrollTrigger.create({
        trigger: `.${styles.autographSection}`,
        start: 'top 80%',
        onEnter: () => playSound('ambience'),
      });
    }, containerRef);

    return () => {
      tl.kill();
      ctx.revert();
      clearTimeout(safetyTimer);
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [playSound]);

  return (
    <div className={styles.page} ref={containerRef}>

      {/* Custom cursor */}
      <div className={styles.cursor} ref={customCursorRef} />

      {/* Light burst */}
      <div className={styles.lightBurst} ref={lightRef} />

      {/* ── Curtain ──────────────────────────────────────── */}
      <div className={styles.curtain} ref={curtainRef}>
        <div className={styles.curtainBg} />
        <div className={styles.scanline} ref={scanRef} />
        <div className={styles.curtainGrid} />
        <div className={styles.curtainCenter}>
          <div className={styles.curtainNum}>07</div>
          <div className={styles.curtainLabel}>MAHENDRA SINGH DHONI</div>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <main className={styles.hero}>

        {/* Ghost jersey number — also target for Easter Egg breathing animation */}
        <div className={styles.ghostNum} ref={ghostNumRef}>07</div>

        {/* Left column — text */}
        <div className={styles.heroText}>

          <p className={styles.eyebrow}>CAPTAIN COOL // JERSEY NO.</p>

          <div className={styles.nameWrap} ref={nameRef}>
            <span className={styles.nameMs} ref={msRef}>MS</span>
            <span className={styles.nameDhoni} ref={dhoniRef}>DHONI</span>
          </div>

          <p className={styles.tagline} ref={taglineRef}>
            Wicket-keeper. Captain. Legend.
          </p>

          <div className={styles.cta} ref={ctaRef}>
            <Link href="/about" className={styles.btnPrimary}>
              <span>Explore Journey</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/career" className={styles.btnSecondary}>Career Stats</Link>
          </div>

          {/* Mini stat pills */}
          <div className={styles.pills} ref={pillsRef}>
            {[
              { label: 'ODI Runs', val: '10,773' },
              { label: 'ICC Titles', val: '3' },
              { label: 'IPL Cups', val: '5×CSK' },
              { label: 'Stumpings', val: '195' },
            ].map((p) => (
              <div key={p.label} className={styles.pill}>
                <span className={styles.pillVal}>{p.val}</span>
                <span className={styles.pillLabel}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — hero image — data-easter attribute for Easter Egg long-hover */}
        <div className={styles.heroImg} ref={imageWrapRef} data-easter="hero-img">
          <Image
            src="/images/dhoni-hero.jpg"
            alt="MS Dhoni"
            fill
            priority
            className={styles.dhoniImg}
            sizes="(max-width: 768px) 100vw, 55vw"
          />
          <div className={styles.imgOverlay} />
          <div className={styles.imgStrip}>
            <span>ODI AVG</span>
            <span className={styles.stripVal}>50.57</span>
            <span>SR</span>
            <span className={styles.stripVal}>87.56</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className={styles.scrollHint} ref={scrollHintRef}>
          <div className={styles.scrollLine} />
          <span>SCROLL</span>
        </div>
      </main>


      {/* ── ACT I: IDENTITY ──────────────────────────────── */}

      {/* ── Autograph ────────────────────────────────────── */}
      <section id="section-autograph" className={styles.autographSection}>
        <div className={styles.autographContainer}>
          <h2 className={styles.legacyText}>LEGACY</h2>
          <div className={styles.signatureWrapper}><Signature /></div>
          <p className={styles.quote}>&quot;The process is more important than the result.&quot;</p>
        </div>
      </section>

      {/* ── ACT II: MASTERY ──────────────────────────────── */}

      {/* ── Career Stats ─────────────────────────────────── */}
      <div id="section-careers"><CareerStats /></div>

      {/* ── Bat Gallery ──────────────────────────────────── */}
      <BatGallery />

      {/* ── Trophy Room ──────────────────────────────────── */}
      <div id="section-trophies"><TrophyRoom /></div>

      {/* ── Dhoni DNA Timeline ───────────────────────────── */}
      <div id="section-dna"><DhoniDNA /></div>

      {/* ── Untold Numbers ───────────────────────────────── */}
      <UntoldNumbers />

      {/* ── Dhoni Index ──────────────────────────────────── */}
      <div id="section-index"><DhoniIndex /></div>

      {/* ── ACT III: LEGACY ──────────────────────────────── */}

      {/* ── Voices About Dhoni ───────────────────────────── */}
      <div id="section-voices"><VoicesFeed /></div>

      {/* ── Decision Room Entrance ── */}
      <section id="section-decision" className={styles.decisionEntrance}>
        <div className={styles.entranceContent}>
          <span className={styles.eyebrow}>THE CLASSROOM OF CALM</span>
          <h2 className={styles.entranceHeading}>DECISION <span className={styles.goldText}>ROOM</span></h2>
          <p className={styles.entranceSub}>
            Step into MS Dhoni&apos;s mind during the most high-stakes moments of his career.
            Can you think like him?
          </p>
          <Link href="/decision-room" className={styles.btnPrimary}>
            Think Like Dhoni
          </Link>
        </div>
      </section>

      {/* ── Legacy Never Retires ─────────────────────────── */}
      <div id="section-legacy"><LegacySection /></div>

    </div>
  );
}
