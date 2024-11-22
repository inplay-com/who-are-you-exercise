import { PlayerWithResult } from "../types/player.results";
import ResultCard from "./ResultCard";


interface ResultListProps {
    results: PlayerWithResult[];
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
    return (
        <div className="player-list">
            <h1>Results </h1>
            {results.length === 0 ? (
                <p>Loading results...</p>
            ) : (
                results.map((result,index) => <ResultCard key={index} result={result} />)
            )}
        </div>
    );
};


export default ResultList;