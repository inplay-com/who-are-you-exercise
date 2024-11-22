import React from 'react';
import { Player } from '../types/player';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

interface PlayerCardProps {
    player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    return (
        <div className="player-card">
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={player.imagePath}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {player.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            <p>Team: {player.team.name}</p>
                            <p>Nationality: {player.nationality.name}</p>
                            <p>Position: {player.position}</p>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    );
};

export default PlayerCard;
