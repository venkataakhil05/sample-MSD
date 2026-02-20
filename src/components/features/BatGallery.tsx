'use client';

import React from 'react';
import styles from './BatGallery.module.css';
import Image from 'next/image';

// Placeholder data for Bat collection
// In a real app, these would be imported assets or CMS data
const batCollection = [
    {
        id: 1,
        name: 'Reebok RBK',
        year: '2011',
        image1: 'https://media.newindianexpress.com/TNIE%2Fimport%2Fuploads%2Fuser%2Fimagelibrary%2F2015%2F3%2F23%2F17%2Foriginal%2FDHONI%20BAT%201.jpg?w=640&auto=format%2Ccompress',
        image2: '/MS-Dhoni-website/images/dhoni-new.jpg',
        description: 'The World Cup Winning Blade'
    },
    {
        id: 2,
        name: 'Spartan MSD 7',
        year: '2015',
        image1: 'https://m.media-amazon.com/images/I/611PDekWPnL._AC_UF894,1000_QL80_.jpg',
        image2: '/MS-Dhoni-website/images/dhoni-wall-2.jpg',
        description: 'Limited Edition English Willow'
    },
    {
        id: 3,
        name: 'SS Ton Gladiator',
        year: '2008',
        image1: '/MS-Dhoni-website/images/dhoni-wall-2.jpg',
        image2: '/MS-Dhoni-website/images/dhoni-new.jpg',
        description: 'Early Career Power Hitter'
    },
];

const BatGallery = () => {
    return (
        <section className={styles.gallerySection}>
            <h2 className={styles.heading}>LEGENDARY <span className={styles.goldText}>ARSENAL</span></h2>
            <p className={styles.subHeading}>Hover to inspect the blades of glory</p>

            <div className={styles.galleryGrid}>
                {batCollection.map((bat) => (
                    <div key={bat.id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            {/* Image 1: Default View */}
                            <div className={styles.imageWrapper} data-view="front">
                                <Image
                                    src={bat.image1}
                                    alt={`${bat.name} Front`}
                                    fill
                                    className={styles.batImage}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>

                            {/* Image 2: Hover View (Reveals with crossfade) */}
                            <div className={styles.imageWrapper} data-view="side">
                                <Image
                                    src={bat.image2}
                                    alt={`${bat.name} Side`}
                                    fill
                                    className={styles.batImage}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        </div>

                        <div className={styles.info}>
                            <h3 className={styles.batName}>{bat.name}</h3>
                            <span className={styles.batYear}>{bat.year}</span>
                            <p className={styles.batDesc}>{bat.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BatGallery;
