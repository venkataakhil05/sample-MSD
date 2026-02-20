'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
    { name: 'Home', path: '/', num: '01' },
    { name: 'About', path: '/about', num: '02' },
    { name: 'Career', path: '/career', num: '03' },
    { name: 'Media', path: '/media', num: '04' },
    { name: 'Contact', path: '/contact', num: '05' },
];

const Header = () => {
    const headerRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Entrance animation for orbital nav dots
    useEffect(() => {
        gsap.from(`.${styles.orbitalItem}`, {
            x: 60,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.8,
        });
        gsap.from(`.${styles.topBar}`, {
            y: -40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
        });
    }, []);

    return (
        <>
            {/* Top Bar — Logo + Store only */}
            <header ref={headerRef} className={styles.topBar}>
                <div className={styles.logo}>
                    <Link href="/">MSD<span className={styles.seven}>7</span></Link>
                </div>
                <div className={styles.rightActions}>
                    <button className={styles.menuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </header>

            {/* Vertical Orbital Nav — right side */}
            <nav className={styles.orbitalNav} aria-label="Main Navigation">
                <div className={styles.orbitalTrack}>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <div key={link.name} className={styles.orbitalItem}>
                                <Link href={link.path} className={`${styles.orbitalLink} ${isActive ? styles.orbitalActive : ''}`}>
                                    {/* Sliding label */}
                                    <span className={styles.navLabel}>
                                        <span className={styles.navNum}>{link.num}</span>
                                        <span className={styles.navName}>{link.name}</span>
                                    </span>
                                    {/* The dot */}
                                    <span className={styles.navDot}>
                                        <span className={styles.dotInner} />
                                    </span>
                                </Link>
                            </div>
                        );
                    })}
                    {/* Vertical line connecting dots */}
                    <div className={styles.orbitalLine} />
                </div>
            </nav>

            {/* Mobile fullscreen overlay */}
            <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
                <button className={styles.mobileClose} onClick={() => setIsMenuOpen(false)}>
                    <FaTimes />
                </button>
                <ul>
                    {navLinks.map((link, i) => (
                        <li key={link.name} style={{ '--i': i } as React.CSSProperties}>
                            <Link href={link.path} onClick={() => setIsMenuOpen(false)}>
                                <span className={styles.mobileNum}>{link.num}</span>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Header;
