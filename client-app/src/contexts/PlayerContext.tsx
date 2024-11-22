import React, { createContext, useContext, useState } from 'react';
import { Player } from '../types/player';

type PlayerContextType = {
  player: Player | undefined;
  setPlayer: (player: Player) => void;
  players: Player[];
  loadPlayers: () => void;
};

const PlayerContext = createContext<PlayerContextType>({
  player: undefined,
  setPlayer: () => {},
  players: [],
  loadPlayers: () => {},
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<Player | undefined>();
  const [players, setPlayers] = useState<Player[]>([]);

  const loadPlayers = async () => {
    // Fetch or populate players logic here
    setPlayers([]); // Replace with actual logic
  };

  return (
    <PlayerContext.Provider value={{ player, setPlayer, players, loadPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);