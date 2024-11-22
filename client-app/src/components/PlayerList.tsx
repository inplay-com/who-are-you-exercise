import React, { useEffect } from 'react';
import { usePlayerContext } from '../contexts/PlayerContext';
import PlayerCard from './PlayerCard';

const PlayerList: React.FC = () => {
    const { players, loadPlayers } = usePlayerContext();

    useEffect(() => { loadPlayers() }, [loadPlayers]);

    return (
        <div className="player-list">
            <h1>Players</h1>
            {players.length === 0 ? (
                <p>Loading players...</p>
            ) : (
                players.map((player) => <PlayerCard key={player.id} player={player} />)
            )}
        </div>
    );
}

export default PlayerList;