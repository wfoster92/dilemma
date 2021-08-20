import React from "react";
import Timer from "./Timer";

function GameTracker(props) {
    const {choicesLeft, noChangeRounds, maxNoChangeRounds, handleEndRoundClick, orientation} = props.stateDictForGameTracker 
    
    if (orientation === "landscape") {
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
                        <h1>{noChangeRounds} of {maxNoChangeRounds}</h1>
                    </div>
                    <div className="gameTrackerBox col-4">
                        <Timer stateDictForTimer={props.stateDictForTimer}/>
                    </div>
                    <div className="gameTrackerBox col-4">
                        <h1>{choicesLeft}</h1>
                    </div>
                </div>
                
                <button id="submit" className="submitLandscape" onClick={handleEndRoundClick}>End Round</button>
            </div>
        )
    } else if (orientation === "portrait") {
        let gameTrackerStyle = {height: 20+"vh"}
        return (
            <div className="gameTracker gameTrackerPortrait">
                <div className="row" style={gameTrackerStyle}>
                    <div className="col-2" style={gameTrackerStyle}>
                        <div className="gameTrackerContent">
                            <p>No Change Rounds</p>
                            <h1>{noChangeRounds} of {maxNoChangeRounds}</h1>
                        </div>
                    </div>
                    <div className="gameTrackerLabel col-2" style={gameTrackerStyle}>
                        <div className="gameTrackerContent">
                            <p>Time</p>
                            <Timer stateDictForTimer={props.stateDictForTimer}/>
                        </div>
                    </div>
                    <div className="gameTrackerLabel col-2" style={gameTrackerStyle}>
                        <div className="gameTrackerContent">
                            <p>Choices Left</p>
                            <h1>{choicesLeft}</h1>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="">
                            <button id="submit" className="submitPortrait" onClick={handleEndRoundClick}>End Round</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    } else {
        console.log(`from gametracker component orientation = ${orientation}`);
        return <div>Error from orientation = ${orientation}</div>
    }

}


export default GameTracker;