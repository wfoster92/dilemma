import React from "react";
import Racebar from "./Racebar";


function ScoreTracker(props) {

    
    return (
        <div>
            <Racebar stateDictForRacebar={props.stateDictForRacebar} />
            {props.msg}
        </div>
    )
}

export default ScoreTracker;