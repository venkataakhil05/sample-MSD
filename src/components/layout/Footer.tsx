import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>

                {/* Brand */}
                <div className={styles.brand}>
                    <div className={styles.logo}>MSD<span>7</span></div>
                    <p className={styles.tagline}>
                        Captain Cool. Legend. Leader. The architect of calm in chaos.
                    </p>
                </div>

                {/* Quick Links */}
                <div className={styles.links}>
                    <p className={styles.colTitle}>Explore</p>
                    <Link href="/about">About</Link>
                    <Link href="/career">Career Stats</Link>
                    <Link href="/media">Media</Link>
                    <Link href="/decision-room">Decision Room</Link>
                    <Link href="/contact">Contact</Link>
                </div>

                {/* Social */}
                <div className={styles.social}>
                    <p className={styles.colTitle}>Follow MSD</p>
                    <div className={styles.socialIcons}>
                        <a href="https://twitter.com/msdhoni" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.socialLink}><FaTwitter /></a>
                        <a href="https://www.instagram.com/mahi7781" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}><FaInstagram /></a>
                        <a href="https://www.facebook.com/MSDhoni" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialLink}><FaFacebookF /></a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialLink}><FaYoutube /></a>
                    </div>
                    <p style={{ fontSize: '0.71rem', color: 'rgba(255,255,255,0.2)', lineHeight: '1.5', marginTop: '0.5rem' }}>
                        📚 Data from ICC archives,<br />match records & historical footage.
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className={styles.bottom}>
                <p className={styles.copy}>© {new Date().getFullYear()} MS Dhoni Fan Portfolio. All Rights Reserved.</p>
                <p className={styles.madeWith}>Made with <span className={styles.heartGold}>♥</span> &amp; GSAP</p>
            </div>
        </footer>
    );
};

export default Footer;
