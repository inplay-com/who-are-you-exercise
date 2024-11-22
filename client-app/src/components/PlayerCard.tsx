import React from 'react';
import { Player } from '../types/player';

interface PlayerCardProps {
    player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    return (
        <div className="player-card">
            <img src={player.imagePath} alt={player.name} />
            <h2>{player.name}</h2>
            <p>Team: {player.team.name}</p>
            <p>Position: {player.position}</p>
        </div>
    );
};

export default PlayerCard;