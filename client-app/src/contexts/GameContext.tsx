import React, { createContext, useContext, useState } from 'react';

type GameContextType = {
  game: boolean | undefined;
  hint: boolean | undefined;
  setGame: (game: boolean) => void;
  setHint: (hint: boolean) => void;
};

const GameContext = createContext<GameContextType>({
  game: false,
  setGame: () => { },
  hint: false,
  setHint: () => { },
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [game, setGame] = useState<boolean | undefined>();
  const [hint, setHint] = useState<boolean | undefined>();
  React.useEffect(() => { }, [hint]);
  return (
    <GameContext.Provider value={{ game, setGame, hint, setHint }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
