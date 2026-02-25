'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import to ensure it is client-only
const Preloader = dynamic(() => import('./Preloader'), { ssr: false });

export default function PreloaderWrapper() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Only show on first visit per session
        const seen = sessionStorage.getItem('msd_preloader_shown');
        if (!seen) {
            setShow(true);
        }
    }, []);

    if (!show) return null;

    return (
        <Preloader
            onComplete={() => {
                setShow(false);
                sessionStorage.setItem('msd_preloader_shown', '1');
            }}
        />
    );
}
