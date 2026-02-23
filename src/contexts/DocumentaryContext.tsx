'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface DocumentaryContextType {
    isDocMode: boolean;
    toggleDocMode: () => void;
}

const DocumentaryCtx = createContext<DocumentaryContextType>({
    isDocMode: false,
    toggleDocMode: () => { },
});

export function DocumentaryProvider({ children }: { children: React.ReactNode }) {
    const [isDocMode, setIsDocMode] = useState(false);
    const scrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startAutoScroll = useCallback(() => {
        if (scrollIntervalRef.current) return;
        scrollIntervalRef.current = setInterval(() => {
            window.scrollBy({ top: 1, behavior: 'instant' });
        }, 30); // ~33px/s slow cinematic scroll
    }, []);

    const stopAutoScroll = useCallback(() => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
        }
    }, []);

    const toggleDocMode = useCallback(() => {
        setIsDocMode(prev => {
            const next = !prev;
            if (next) {
                document.documentElement.setAttribute('data-doc-mode', 'true');
                startAutoScroll();
            } else {
                document.documentElement.removeAttribute('data-doc-mode');
                stopAutoScroll();
            }
            return next;
        });
    }, [startAutoScroll, stopAutoScroll]);

    // Stop auto-scroll when user manually scrolls
    useEffect(() => {
        if (!isDocMode) return;
        const onWheel = () => {
            stopAutoScroll();
            // Resume after 3s of no interaction
            setTimeout(startAutoScroll, 3000);
        };
        window.addEventListener('wheel', onWheel, { passive: true });
        return () => window.removeEventListener('wheel', onWheel);
    }, [isDocMode, startAutoScroll, stopAutoScroll]);

    useEffect(() => {
        return () => stopAutoScroll();
    }, [stopAutoScroll]);

    return (
        <DocumentaryCtx.Provider value={{ isDocMode, toggleDocMode }}>
            {children}
        </DocumentaryCtx.Provider>
    );
}

export function useDocumentary() {
    return useContext(DocumentaryCtx);
}
