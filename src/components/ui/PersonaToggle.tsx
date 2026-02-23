'use client';

import React from 'react';
import { usePersona } from '@/contexts/PersonaContext';
import styles from './PersonaToggle.module.css';

export default function PersonaToggle() {
    const { persona, togglePersona } = usePersona();

    return (
        <button
            className={styles.toggle}
            onClick={togglePersona}
            title={persona === 'captain' ? 'Switch to Calm Mode' : 'Switch to Captain Mode'}
            aria-label="Toggle persona mode"
        >
            <span className={styles.icon}>
                {persona === 'captain' ? '🕶️' : '⚡'}
            </span>
            <span className={styles.label}>
                {persona === 'captain' ? 'Calm' : 'Captain'}
            </span>
        </button>
    );
}
