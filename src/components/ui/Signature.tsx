'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Signature = () => {
    const pathRef = useRef<SVGPathElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!pathRef.current || !svgRef.current) return;

        const path = pathRef.current;
        const length = path.getTotalLength();

        // Set up initial state for animation
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1
        });

        const ctx = gsap.context(() => {
            gsap.to(path, {
                scrollTrigger: {
                    trigger: svgRef.current,
                    start: "top 90%", // Start drawing as soon as it enters viewport
                    end: "center center", // Finish by the time it's centered
                    scrub: 1, // Smoother scrubbing
                    markers: false // Set to true if you need to debug positions
                },
                strokeDashoffset: 0,
                ease: "power2.out" // Slightly distinctive ease
            });
        }, svgRef);

        return () => ctx.revert();
    }, []);

    return (
        <svg
            ref={svgRef}
            width="600"
            height="300"
            viewBox="0 0 600 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxWidth: '100%', height: 'auto', filter: 'drop-shadow(0 0 5px #F2CD1E)' }}
        >
            {/* 
                PLACEHOLDER PATH: This is a generic signature loop. 
                TO USE YOUR IMAGE: 
                1. Go to an online "Image to SVG" converter (e.g., https://picsvg.com/)
                2. Upload your signature image.
                3. Copy the 'd' attribute from the <path> tag of the generated SVG.
                4. Paste it below in the 'd' prop.
            */}
            <path
                ref={pathRef}
                d="M150 200 C150 150, 180 100, 200 80 C210 70, 230 50, 240 80 C250 110, 220 180, 200 220 C180 260, 140 280, 140 240 C140 200, 200 120, 250 100 C300 80, 350 150, 320 200 C300 230, 250 250, 280 200 C310 150, 400 50, 450 50 C480 50, 420 250, 400 280 C390 295, 380 250, 420 200 C450 160, 500 100, 550 50 L300 280"
                stroke="#F2CD1E"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Signature;
