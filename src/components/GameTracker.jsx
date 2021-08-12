import React from "react";
import Timer from "./Timer";
import Racebar from "./Racebar";


function GameTracker(props) {
    return (
        <div>
            <Racebar sb={props.sb} />
            {props.msg}
        </div>
    )
}

export default GameTracker;