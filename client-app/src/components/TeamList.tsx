import React, { useEffect, useState } from 'react';
import { getTeams } from '../api/teamsApi';
import { Team } from '../types/team';

const TeamList: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await getTeams();
                setTeams(data);
            } catch (error) {
                console.error('Failed to fetch teams:', error);
            }
        };
        fetchTeams();
    }, []);

    const handleClick = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        alert('Link click prevented!');
    };

    return (
        <div className="team-list">
            <h1>Teams</h1>
            {teams.length === 0 ? (<p>Loading teams...</p>) :
                (
                    <ul>
                        {teams.map((team, index) => (
                            <><li key={index}>{team.name}</li>
                                <a href="https://example.com" onClick={handleClick}>
                                    Click Me
                                </a></>
                        ))}
                    </ul>
                )}
        </div>
    );
}

export default TeamList;