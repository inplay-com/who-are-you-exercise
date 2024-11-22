import React, { createContext, useContext, useState } from 'react';

type GameContextType = {
  game: boolean | undefined;
  setGame: (game: boolean) => void;
};

const GameContext = createContext<GameContextType>({
  game: false,
  setGame: () => { },
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [game, setGame] = useState<boolean | undefined>();
  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
