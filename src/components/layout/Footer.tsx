import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.logoSection}>
                    <h2>MS Dhoni</h2>
                    <p>Captain Cool. Legend. Leader.</p>
                </div>

                <div className={styles.linksSection}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/career">Career Stats</Link></li>
                        <li><Link href="/media">Media</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className={styles.socialSection}>
                    <h3>Follow MSD</h3>
                    <div className={styles.socialIcons}>
                        <a href="https://twitter.com/msdhoni" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                        <a href="https://www.instagram.com/mahi7781" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://www.facebook.com/MSDhoni" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} MS Dhoni. All Rights Reserved.</p>
                <p>Designed & Developed with Passion.</p>
            </div>
        </footer>
    );
};

export default Footer;
