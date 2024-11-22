import React, { useEffect } from 'react';
import { getPlayerOfTheDay, resetTheSession } from '../api/playersApi';
import Button from '@mui/material/Button';
import { usePlayerContext } from '../contexts/PlayerContext';
import AutocompletePlayer from './AutocompletePlayer';
import { Player } from '../types/player';
import { useGameContext } from '../contexts/GameContext';


const PlayerOfTheDay: React.FC = () => {
    const { player, setPlayer } = usePlayerContext();
    const { game, setGame } = useGameContext();

    const resetTheGame = async () => {
        console.log("I'm about to rest the game")
        await resetTheSession()
        setGame(true)
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
    }, [setPlayer]);

    const getImage = (player: Player): string => {
        return !player.isFinished ? player.imagePathBase64 : player.imagePath
    }

    return (
        <div className="player-of-the-day">
            <h2>Player of The day</h2>
            {player ? (<img alt='Player of the day' width="300" src={getImage(player)} />) : (<div></div>)}
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
