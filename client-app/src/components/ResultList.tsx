import { Fab } from '@mui/material';
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
            <div>
                <h1>Results </h1>
                {<Fab onClick={displayPlayers} sx={{ width: 50, height: 50 }} color="primary" >
                    {!hint ? 'Help' : 'Close'}
                </Fab>}
            </div>
            {resultData.length === 0 ? (
                <p></p>
            ) : (
                resultData.map((result, index) => <ResultCard key={index} result={result} />)
            )}
        </div>
    );
};


export default ResultList;
