import React from "react";
import Racebar from "./Racebar";


function ScoreTracker(props) {
    return (
        <div>
            <Racebar sb={props.sb} />
            {props.msg}
        </div>
    )
}

export default ScoreTracker;