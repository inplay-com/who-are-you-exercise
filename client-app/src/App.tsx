import React from 'react';
import './App.css';
import { PlayerProvider } from './contexts/PlayerContext';
import PlayerOfTheDay from './components/PlayerOfTheDay';

const App: React.FC = () => {
    return (
        <PlayerProvider>
            <div className="App parent">
                <div className="child">
                    <h1>Who Are You</h1>
                    {/* <TeamList />
                    <PlayerList /> */}
                    <br></br>
                    <PlayerOfTheDay />
                    <br></br>
                </div>
            </div>
        </PlayerProvider>
    );
}

export default App;
