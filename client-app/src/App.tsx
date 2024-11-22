import React from 'react';
import './App.css';
import { PlayerProvider } from './contexts/PlayerContext';
import { GameProvider } from './contexts/GameContext';
import PlayerOfTheDay from './components/PlayerOfTheDay';
import PlayerList from './components/PlayerList';

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
