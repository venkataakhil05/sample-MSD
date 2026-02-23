'use client';

import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

type SoundType = 'bat-hit' | 'crowd' | 'ambience' | 'shutter';

interface AudioContextType {
    isAudioEnabled: boolean;
    toggleAudio: () => void;
    playSound: (type: SoundType) => void;
}

const AudioCtx = createContext<AudioContextType>({
    isAudioEnabled: false,
    toggleAudio: () => { },
    playSound: () => { },
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isAudioEnabled, setIsAudioEnabled] = useState(false);
    const acRef = useRef<AudioContext | null>(null);
    const masterGainRef = useRef<GainNode | null>(null);
    const ambienceNodeRef = useRef<AudioBufferSourceNode | null>(null);

    const getAC = useCallback((): AudioContext | null => {
        if (typeof window === 'undefined') return null;
        if (!acRef.current) {
            acRef.current = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
            masterGainRef.current = acRef.current.createGain();
            masterGainRef.current.connect(acRef.current.destination);
        }
        if (acRef.current.state === 'suspended') {
            acRef.current.resume();
        }
        return acRef.current;
    }, []);

    const playBatHit = useCallback((ac: AudioContext) => {
        if (!masterGainRef.current) return;
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(masterGainRef.current);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ac.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ac.currentTime + 0.08);
        gain.gain.setValueAtTime(0.6, ac.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12);
        osc.start(ac.currentTime);
        osc.stop(ac.currentTime + 0.15);
    }, []);

    const playCrowd = useCallback((ac: AudioContext) => {
        if (!masterGainRef.current) return;
        const bufferSize = ac.sampleRate * 2.5;
        const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const source = ac.createBufferSource();
        source.buffer = buffer;
        const filter = ac.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 600;
        filter.Q.value = 0.5;
        const gain = ac.createGain();
        gain.gain.setValueAtTime(0, ac.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, ac.currentTime + 0.5);
        gain.gain.linearRampToValueAtTime(0, ac.currentTime + 2.4);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current);
        source.start(ac.currentTime);
        source.stop(ac.currentTime + 2.5);
    }, []);

    const playAmbience = useCallback((ac: AudioContext) => {
        if (!masterGainRef.current) return;
        // Stop previous ambience
        if (ambienceNodeRef.current) {
            try { ambienceNodeRef.current.stop(); } catch { }
            ambienceNodeRef.current = null;
        }
        const bufferSize = ac.sampleRate * 4;
        const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const source = ac.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const filter = ac.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 300;
        const gain = ac.createGain();
        gain.gain.setValueAtTime(0, ac.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ac.currentTime + 2);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current);
        source.start(ac.currentTime);
        ambienceNodeRef.current = source;
    }, []);

    const playShutter = useCallback((ac: AudioContext) => {
        if (!masterGainRef.current) return;
        const bufferSize = ac.sampleRate * 0.1;
        const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const source = ac.createBufferSource();
        source.buffer = buffer;
        const filter = ac.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 2000;
        const gain = ac.createGain();
        gain.gain.setValueAtTime(0.5, ac.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ac.currentTime + 0.08);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current);
        source.start(ac.currentTime);
    }, []);

    const playSound = useCallback((type: SoundType) => {
        if (!isAudioEnabled) return;
        const ac = getAC();
        if (!ac) return;
        switch (type) {
            case 'bat-hit': playBatHit(ac); break;
            case 'crowd': playCrowd(ac); break;
            case 'ambience': playAmbience(ac); break;
            case 'shutter': playShutter(ac); break;
        }
    }, [isAudioEnabled, getAC, playBatHit, playCrowd, playAmbience, playShutter]);

    const toggleAudio = useCallback(() => {
        setIsAudioEnabled((prev) => {
            const next = !prev;
            if (next) {
                const ac = getAC();
                if (ac) ac.resume();
            } else {
                if (ambienceNodeRef.current) {
                    try { ambienceNodeRef.current.stop(); } catch { }
                    ambienceNodeRef.current = null;
                }
            }
            return next;
        });
    }, [getAC]);

    return (
        <AudioCtx.Provider value={{ isAudioEnabled, toggleAudio, playSound }}>
            {children}
        </AudioCtx.Provider>
    );
}

export function useAudio() {
    return useContext(AudioCtx);
}
