'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Persona = 'captain' | 'calm';

interface PersonaContextType {
    persona: Persona;
    togglePersona: () => void;
}

const PersonaContext = createContext<PersonaContextType>({
    persona: 'captain',
    togglePersona: () => { },
});

export function PersonaProvider({ children }: { children: React.ReactNode }) {
    const [persona, setPersona] = useState<Persona>('captain');

    useEffect(() => {
        document.documentElement.dataset.persona = persona;
    }, [persona]);

    const togglePersona = () => {
        setPersona((prev) => (prev === 'captain' ? 'calm' : 'captain'));
    };

    return (
        <PersonaContext.Provider value={{ persona, togglePersona }}>
            {children}
        </PersonaContext.Provider>
    );
}

export function usePersona() {
    return useContext(PersonaContext);
}
