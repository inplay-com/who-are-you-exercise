import React, { useEffect } from 'react';
import { getPlayerOfTheDay, resetTheSession } from '../api/playersApi';
import Button from '@mui/material/Button';
import { usePlayerContext } from '../contexts/PlayerContext';
import AutocompletePlayer from './AutocompletePlayer';


const PlayerOfTheDay: React.FC = () => {
    const { player, setPlayer } = usePlayerContext();

    const resetTheGame = async () => {
        console.log("I'm about to rest the game")
        await resetTheSession()

        setTimeout(async () => {
            try {
                const data = await getPlayerOfTheDay();
                setPlayer(data);
                console.log('Session reset successfully.');
            } catch (error) {
                console.error('Error resetting session:', error);
            }
        }, 1000); // 1000ms = 1 second delay

    }

    React.useEffect(() => {
        if (player) {
            if (player.isFinished === true) {
                console.log("Player is Correctly guesed")
            }
        }
    }, [player]);

    useEffect(() => {
        const fetchPlayerOfTheDay = async () => {
            try {
                const data = await getPlayerOfTheDay();
                setPlayer(data);
            } catch (error) {
                console.error('Failed to fetch teams:', error);
            }
        };
        fetchPlayerOfTheDay();
    }, []);

    return (
        <div className="player-of-the-day">
            <h2>Player of The day</h2>
            <img alt='Player Photo' width="300" src={player?.imagePath} />
            <br></br>
            <div>
                <AutocompletePlayer />
                {player?.isFinished ? (
                    <div>
                        <div className='result-text'>Yes, Thats correct<br></br>
                            {player?.name}
                        </div>
                        <Button variant="contained" onClick={resetTheGame}>Start again</Button>
                    </div>


                ) : (<div></div>)}
            </div>
        </div>
    );
}

export default PlayerOfTheDay;
