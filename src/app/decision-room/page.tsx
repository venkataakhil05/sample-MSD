'use client';

import React, { useState } from 'react';
import gsap from 'gsap';
import styles from './page.module.css';
import { scenarios } from '@/data/scenarios';

type Phase = 'intro' | 'question' | 'reveal' | 'final';

export default function DecisionRoom() {
    const [phase, setPhase] = useState<Phase>('intro');
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);

    const scenario = scenarios[currentIdx];
    const total = scenarios.length;

    const startGame = () => setPhase('question');

    const choose = (idx: number) => {
        if (phase !== 'question') return;
        setSelectedOption(idx);
        setPhase('reveal');
        if (idx === scenario.dhoniChoice) setScore((s) => s + 1);
        // Animate result card in
        setTimeout(() => {
            const el = document.querySelector(`.${styles.revealCard}`);
            if (el) {
                gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
            }
        }, 50);
    };

    const nextScenario = () => {
        if (currentIdx + 1 >= total) {
            setPhase('final');
        } else {
            setCurrentIdx((i) => i + 1);
            setSelectedOption(null);
            setPhase('question');
        }
    };

    const restart = () => {
        setCurrentIdx(0);
        setSelectedOption(null);
        setScore(0);
        setPhase('intro');
    };

    return (
        <div className={styles.page}>

            {/* ── Background decoration ── */}
            <div className={styles.bg}>
                <div className={styles.bgNum}>07</div>
                <div className={styles.bgLine} />
            </div>

            {/* ── INTRO ── */}
            {phase === 'intro' && (
                <div className={styles.intro}>
                    <span className={styles.eyebrow}>INTERACTIVE EXPERIENCE</span>
                    <h1 className={styles.title}>
                        DECISION <span className={styles.gold}>ROOM</span>
                    </h1>
                    <p className={styles.introDesc}>
                        Step into Dhoni&apos;s mind. Five iconic match moments. You make the call — then see what Captain Cool actually decided and why.
                    </p>
                    <div className={styles.introMeta}>
                        <span>{total} Scenarios</span>
                        <span>·</span>
                        <span>No time pressure</span>
                        <span>·</span>
                        <span>Pure mindset</span>
                    </div>
                    <button className={styles.startBtn} onClick={startGame}>
                        ENTER THE ROOM
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            )}

            {/* ── QUESTION ── */}
            {phase === 'question' && (
                <div className={styles.questionWrapper}>
                    <div className={styles.progress}>
                        <span className={styles.progressLabel}>Scenario {currentIdx + 1} / {total}</span>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${((currentIdx) / total) * 100}%` }} />
                        </div>
                    </div>

                    <div className={styles.scenarioCard}>
                        <div className={styles.scenarioMeta}>
                            <span className={styles.scenYear}>{scenario.year}</span>
                            <span className={styles.scenMatch}>{scenario.match}</span>
                        </div>
                        <div className={styles.situation}>{scenario.situation}</div>
                        <h2 className={styles.question}>{scenario.question}</h2>
                    </div>

                    <div className={styles.options}>
                        {scenario.options.map((opt, i) => (
                            <button key={i} className={styles.optionBtn} onClick={() => choose(i)}>
                                <span className={styles.optNum}>{String.fromCharCode(65 + i)}</span>
                                <span>{opt}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ── REVEAL ── */}
            {phase === 'reveal' && selectedOption !== null && (
                <div className={styles.revealWrapper}>
                    <div className={styles.progress}>
                        <span className={styles.progressLabel}>Scenario {currentIdx + 1} / {total}</span>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${((currentIdx) / total) * 100}%` }} />
                        </div>
                    </div>

                    {/* User choice feedback */}
                    <div className={`${styles.choiceTag} ${selectedOption === scenario.dhoniChoice ? styles.correct : styles.wrong}`}>
                        {selectedOption === scenario.dhoniChoice ? '✓ You chose like Dhoni' : '✗ Dhoni chose differently'}
                    </div>

                    <div className={styles.revealCard}>
                        <div className={styles.revealHeader}>
                            <span className={styles.revealLabel}>Dhoni&apos;s Decision</span>
                            <span className={styles.revealChoice}>{scenario.options[scenario.dhoniChoice]}</span>
                        </div>
                        <div className={styles.revealDivider} />
                        <div className={styles.revealBlock}>
                            <span className={styles.blockLabel}>What Happened</span>
                            <p>{scenario.outcome}</p>
                        </div>
                        <div className={styles.revealBlock}>
                            <span className={styles.blockLabel}>The Philosophy</span>
                            <blockquote className={styles.philosophy}>{scenario.philosophy}</blockquote>
                        </div>
                    </div>

                    <button className={styles.nextBtn} onClick={nextScenario}>
                        {currentIdx + 1 < total ? 'Next Scenario →' : 'See Final Score →'}
                    </button>
                </div>
            )}

            {/* ── FINAL ── */}
            {phase === 'final' && (
                <div className={styles.finalWrapper}>
                    <div className={styles.finalScore}>
                        <span className={styles.finalNum}>{score}</span>
                        <span className={styles.finalOf}>/ {total}</span>
                    </div>
                    <h2 className={styles.finalTitle}>
                        {score === total
                            ? 'Pure Captain Cool 🧊'
                            : score >= 3
                                ? 'You Think Like a Leader 🏆'
                                : score >= 1
                                    ? 'You Read the Game Well 🏏'
                                    : 'Even Dhoni Made Calls Others Disagreed With 💛'}
                    </h2>
                    <p className={styles.finalQuote}>
                        {score === total
                            ? '"Every option was the right option — when the calm is absolute."'
                            : score >= 3
                                ? '"The best decisions aren\'t always obvious. The best captains trust process over panic."'
                                : '"Cricket is never just about runs. It\'s about judgment under pressure."'}
                    </p>
                    <button className={styles.startBtn} onClick={restart}>Play Again</button>
                </div>
            )}
        </div>
    );
}
