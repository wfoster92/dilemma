import React from "react";
import Timer from "./Timer";

function GameTracker(props) {
    
    return (
        <div className="gameTracker">
            <div className="row">
                <div className="gameTrackerLabel col-4">
                    <p>No Change Rounds</p>
                </div>
                <div className="gameTrackerLabel col-4">
                    <p>Time</p>
                </div>
                <div className="gameTrackerLabel col-4">
                    <p>Choices Left</p>
                </div>
            </div>
            <div className="row">
                <div className="gameTrackerBox col-4">
                    <h1>{props.noChangeRounds} of {props.maxNoChangeRounds}</h1>
                </div>
                <div className="gameTrackerBox col-4">
                    <Timer stateDictForTimer={props.stateDictForTimer}/>
                </div>
                <div className="gameTrackerBox col-4">
                    <h1>{props.choicesLeft}</h1>
                </div>
            </div>
            
            <button id="submit" onClick={props.handleEndRoundClick}>End Round</button>
        </div>
    )
}


export default GameTracker;