'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './page.module.css';

export default function Contact() {
    const formRef = useRef(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(formRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.2
            });
        });
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            // Reset form logic would go here
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Get in Touch</h1>
                <p className={styles.subtitle}>For Brand Endorsements & Press Enquiries</p>
            </header>

            <div className={styles.content}>
                <section className={styles.info}>
                    <div className={styles.infoItem}>
                        <h3>Management</h3>
                        <p>Rhiti Sports Management</p>
                        <p>inquiry@rhitisports.com</p>
                    </div>
                    <div className={styles.infoItem}>
                        <h3>Press</h3>
                        <p>press@msdhoni.com</p>
                    </div>
                    <div className={styles.infoItem}>
                        <h3>Location</h3>
                        <p>Ranchi, Jharkhand</p>
                        <p>India</p>
                    </div>
                </section>

                <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" required placeholder="Your Name" />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required placeholder="your.email@example.com" />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="subject">Subject</label>
                        <select id="subject" required>
                            <option value="">Select a topic</option>
                            <option value="press">Press Enquiry</option>
                            <option value="business">Business Proposal</option>
                            <option value="fan">Fan Mail</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" rows={5} required placeholder="Your Message..."></textarea>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={status === 'submitting' || status === 'success'}>
                        {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                    </button>

                    {status === 'success' && <p className={styles.successMsg}>Thank you! Your message has been received.</p>}
                </form>
            </div>
        </div>
    );
}
