import React from "react";
import Timer from "./Timer";

function GamePlay(props) {
    
    return (
        <div>
            <span>
                <Timer stateDictForTimer={props.stateDictForTimer}/>
            </span>
            <span>
                <div className="GameTrackerBox">
                    <p>Choices Left</p>
                    <h1>{props.choicesLeft}</h1>
                </div>
            </span>

            
            <button id="submit" onClick={props.handleEndRoundClick}>End Round</button>
        </div>
    )
}


export default GamePlay;