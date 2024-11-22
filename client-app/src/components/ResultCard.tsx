import { Avatar } from "@mui/material";
import { PlayerWithResult } from "../types/player.results";
import { green, red } from '@mui/material/colors';
import ArrowIcon from "./ArrowIcon";
import React from "react";

interface ResultCardProps {
    result: PlayerWithResult;
}

const getResultColor = (correct: boolean) => {
    return correct ? green[500] : red[500]
};


const ResultCard: React.FC<ResultCardProps> = ({ result }) => {

    React.useEffect(() => {
        if (result) {
            console.log("result is ", result)
            return;
        }

    }, [result,]);

    return (
        <div className='result-info'>
            <div className="result-circle-holder">
                <Avatar src={result.nationality.nationalityImagePath} sx={{ width: 50, height: 50, bgcolor: getResultColor(result.result.nationalityIsCorrect), padding: '10px' }}></Avatar>
                <span className="result-text" >NAT</span>
            </div>
            <div className="result-circle-holder">
                <Avatar src={result.team.imagePath} sx={{ width: 50, height: 50, bgcolor: getResultColor(result.result.isTeamCorrect), padding: '10px' }}></Avatar>
                <span className="result-text" >TEAM</span>
            </div>
            <div className="result-circle-holder">
                <Avatar sx={{ width: 50, height: 50, bgcolor: getResultColor(result.result.isPositionCorrect), padding: '10px' }}>{result.position}</Avatar>
                <span className="result-text" >POS</span>
            </div>
            <div className="result-circle-holder">
                <Avatar sx={{ width: 50, height: 50, bgcolor: getResultColor(result.result.yearIsCorrect === 0), padding: '10px' }}>
                    {result.age}
                    {result.result.yearIsCorrect !== 0 ? (<ArrowIcon isUp={result.result.yearIsCorrect > 0}></ArrowIcon>) : (<div></div>)}
                </Avatar>
                <span className="result-text" >AGE</span>
            </div>
        </div>
    );
};

export default ResultCard


