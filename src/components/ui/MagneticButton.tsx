'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    strength?: number;
}

/**
 * MagneticButton — wraps any child element and adds a magnetic
 * GSAP hover effect that pulls the element towards the cursor.
 * On mouse leave, it snaps back with elastic easing.
 */
export default function MagneticButton({ children, strength = 0.35 }: MagneticButtonProps) {
    const wrapRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
        const el = wrapRef.current;
        if (!el) return;
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    };

    return (
        <div
            ref={wrapRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-block' }}
        >
            {children}
        </div>
    );
}
