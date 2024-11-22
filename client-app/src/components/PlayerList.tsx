import React, { useEffect } from 'react';
import { usePlayerContext } from '../contexts/PlayerContext';
import PlayerCard from './PlayerCard';
import { useGameContext } from '../contexts/GameContext';

const PlayerList: React.FC = () => {
    const { players, loadPlayers } = usePlayerContext();
    const { hint } = useGameContext();

    useEffect(() => { loadPlayers() }, [loadPlayers]);


    return (
        <div className="player-list">
            {hint && <div>
                <h1>Players</h1>
                {players.length === 0 ? (
                    <p>Loading players...</p>
                ) : (
                    players.map((player) => <PlayerCard key={player.id} player={player} />)
                )}
            </div>}
        </div>
    );
}

export default PlayerList;
