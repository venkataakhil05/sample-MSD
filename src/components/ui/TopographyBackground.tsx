'use client';

import React from 'react';
import styles from './TopographyBackground.module.css';

const TopographyBackground = () => {
    return (
        <div className={styles.container}>
            <div className={styles.layer1}></div>
            <div className={styles.layer2}></div>
            <div className={styles.vignette}></div>
        </div>
    );
};

export default TopographyBackground;
