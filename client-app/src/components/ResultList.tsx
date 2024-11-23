import { Fab, Typography } from '@mui/material';
import { PlayerWithResult } from '../types/player.results';
import ResultCard from "./ResultCard";
import { useGameContext } from '../contexts/GameContext';


interface ResultListProps {
    resultData: readonly PlayerWithResult[];
}

const ResultList: React.FC<ResultListProps> = ({ resultData }) => {
    const { hint, setHint } = useGameContext();

    const displayPlayers = () => {
        setHint(!hint)
    }

    return (
        <div className="result-list">
            {
                !!resultData.length &&
                <div>
                    <Typography gutterBottom variant="h6" component="div">
                        {resultData.length} Result{resultData.length > 1 && 's'}
                    </Typography>

                    <Fab onClick={displayPlayers} sx={{ width: 50, height: 50 }} color="primary" >
                        {!hint ? 'Help' : 'Close'}
                    </Fab>
                </div>
            }
            {
                !!resultData.length && resultData.map((result, index) => <ResultCard key={index} result={result} />)
            }
        </div>
    );
};


export default ResultList;
