import { PlayerWithResult } from '../types/player.results';
import ResultCard from "./ResultCard";


interface ResultListProps {
    resultData: readonly PlayerWithResult[];
}

const ResultList: React.FC<ResultListProps> = ({ resultData }) => {
    return (
        <div className="player-list">
            <h1>Results </h1>
            {resultData.length === 0 ? (
                <p></p>
            ) : (
                resultData.map((result, index) => <ResultCard key={index} result={result} />)
            )}
        </div>
    );
};


export default ResultList;
