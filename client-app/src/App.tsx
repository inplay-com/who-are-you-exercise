import React, { useState } from 'react';
import './App.css';
import { PlayerProvider } from './contexts/PlayerContext';
import { GameProvider, useGameContext } from './contexts/GameContext';
import PlayerOfTheDay from './components/PlayerOfTheDay';
import PlayerList from './components/PlayerList';
import TeamList from './components/TeamList';

const App: React.FC = () => {
    return (
        <GameProvider>
            <PlayerProvider>
                <div className="App parent">
                    <div className="child">
                        <h1>Who Are You</h1>
                        <br></br>
                        <PlayerOfTheDay />
                        <br></br>
                    </div>
                </div>
                <PlayerList />
            </PlayerProvider>
        </GameProvider>
    );
}

export default App;
