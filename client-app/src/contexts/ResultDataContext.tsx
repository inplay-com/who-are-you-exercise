import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Player } from '../types/player';
import { getPlayers } from '../api/playersApi';

interface PlayerContextType {
    players: Player[];
    loadPlayers: () => Promise<void>;
}

const ResultDataContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [players, setPlayers] = useState<Player[]>([]);

    const loadPlayers = async () => {
        try {
            const playersData = await getPlayers();
            setPlayers(playersData);
        } catch (error) {
            console.error('Failed to load players:', error);
        }
    }

    return (
        <ResultDataContext.Provider value={{ players, loadPlayers }}>
            {children}
        </ResultDataContext.Provider>
    );
}

export const usePlayerContext = () => {
    const context = useContext(ResultDataContext);
    
    if (!context) {
        throw new Error('usePlayerContext must be used within a PlayerProvider');
    }
    return context;
}
