import React from "react";
import Timer from "./Timer";

function GameTracker(props) {
    const {choicesLeft, noChangeRounds, maxNoChangeRounds, handleEndRoundClick, orientation, squareSize} = props.stateDictForGameTracker 
    
    if (orientation === "landscape") {
        let rowHeight = (squareSize === 80) ? {height: "calc(" + squareSize + "vh /3)"} : {height: "calc(" + squareSize + "vh /4)"};
        return (
            <div className="gameTracker">
            <div>
                {/* <div className="row align-items-top" style={rowHeight}> */}
                    {/* <div className="gameTrackerLabel col-6">
                        <p className="gameTrackerLandscapeText" >Strikes</p>
                        <h1 className="gameTrackerLandscapeText">{noChangeRounds} of {maxNoChangeRounds}</h1>
                    </div> */}
                    {/* <div className="gameTrackerLabel col-6">
                        <p className="gameTrackerLandscapeText">Time</p>
                        <div className="gameTrackerLandscapeText">
                            <Timer stateDictForTimer={props.stateDictForTimer}/>
                        </div>
                    </div> */}
                    {(squareSize === 60)? 
                        <div>
                            <div className="row align-items-top" style={rowHeight}>
                                <div className="gameTrackerLabel col-12">
                                    <p className="gameTrackerLandscapeText" >Strikes</p>
                                    <h1 className="gameTrackerLandscapeText">{noChangeRounds} of {maxNoChangeRounds}</h1>
                                </div>
                            </div>
                            <div className="row align-items-center" style={rowHeight}>
                                <div className="gameTrackerLabel col-12">
                                    <p className="gameTrackerLandscapeText">Time</p>
                                    <div className="gameTrackerLandscapeText">
                                        <Timer stateDictForTimer={props.stateDictForTimer}/>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div className="row align-items-top" style={rowHeight}>
                            <div className="gameTrackerLabel col-6">
                                <p className="gameTrackerLandscapeText" >Strikes</p>
                                <h1 className="gameTrackerLandscapeText">{noChangeRounds} of {maxNoChangeRounds}</h1>
                            </div>
                            <div className="gameTrackerLabel col-6">
                                <p className="gameTrackerLandscapeText">Time</p>
                                <div className="gameTrackerLandscapeText">
                                    <Timer stateDictForTimer={props.stateDictForTimer}/>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="row align-items-center" style={rowHeight}>
                    <div className="gameTrackerLabel col-12">
                        <p className="gameTrackerLandscapeText">Choices Left</p>
                        <h1 className="gameTrackerLandscapeText">{choicesLeft}</h1>
                    </div>
                </div>
                <div className="row" style={rowHeight}>
                    <div className="col-1"></div>
                    <button id="submit" className="submitLandscape col-10" onClick={handleEndRoundClick}>End Round</button>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    } else if (orientation === "portrait") {
        let textContentStyle = {width: "calc(90vw - 12vh)", height: 12+"vh"}
        return (
            <div style={{textAlign:"start"}}>
                <div style={{display:"inline-block"}}>
                    <div className="row" style={textContentStyle}>
                        <div className="col-12">
                            <div className="row gameTrackerPortrait" style={{height: 4+"vh"}}>
                                <div className="col-4">
                                    <p>No Change Rounds</p>
                                </div>
                                <div className="col-4">
                                    <p>Time</p>
                                </div>
                                <div className="col-4">
                                    <p>Choices Left</p>
                                </div>
                            </div>
                            <div className="row gameTrackerPortrait" style={{height: 8+"vh"}}>
                                <div className="col-4">
                                    <h1>{noChangeRounds} of {maxNoChangeRounds}</h1>
                                </div>
                                <div className="col-4">
                                    <Timer stateDictForTimer={props.stateDictForTimer}/>
                                </div>
                                <div className="col-4">
                                    <h1>{choicesLeft}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display:"inline-block"}}>
                    <button id="submit" className="submitPortrait" style={{height: 12+"vh", width: 12+"vh"}} onClick={handleEndRoundClick}>End Round</button>
                </div>
            </div>
           
        )
    } else {
        console.log(`from gametracker component orientation = ${orientation}`);
        return <div>Error from orientation = ${orientation}</div>
    }

}


export default GameTracker;