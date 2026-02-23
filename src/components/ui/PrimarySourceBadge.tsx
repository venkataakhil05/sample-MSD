'use client';

import React from 'react';
import styles from './PrimarySourceBadge.module.css';

export default function PrimarySourceBadge() {
    return (
        <div className={styles.badge} title="Verified Primary Source Evidence">
            <span className={styles.check}>✓</span>
            <span>Primary Source Evidence</span>
        </div>
    );
}
