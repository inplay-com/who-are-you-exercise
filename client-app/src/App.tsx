import React from 'react';
import './App.css';
import { PlayerProvider } from './contexts/PlayerContext';
import { GameProvider } from './contexts/GameContext';
import PlayerOfTheDay from './components/PlayerOfTheDay';
import PlayerList from './components/PlayerList';
import { Typography } from '@mui/material';

const App: React.FC = () => {
    return (
        <GameProvider>
            <PlayerProvider>
                <div className="App parent">
                    <div className="child">
                        <Typography variant="h4" component="div">
                            Who Are You
                        </Typography>
                        <PlayerOfTheDay />
                        <br></br>
                    </div>
                </div>
                <PlayerList />
            </PlayerProvider>
        </GameProvider >
    );
}

export default App;
