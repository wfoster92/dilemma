import React from "react";
import Timer from "./Timer";
import EndRoundButton from "./EndRoundButton";

function GameTracker(props) {
    const {choicesLeft, noChangeRounds, maxNoChangeRounds, handleEndRoundClick, orientation, squareSize} = props.stateDictForGameTracker 
    console.log(`from gametracker orientation ${orientation} squareSize ${squareSize}`)
    if (orientation === "landscape") {
        let rowHeight = (squareSize === 80) ? {height: "calc(" + squareSize + "vh /3)"} : {height: "calc(" + squareSize + "vh /4)"};
        return (
            <div className="gameTracker">
                <div>
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
                    <EndRoundButton classNames={"endRoundSubmitLandscape endRoundSubmit col-10"} handleEndRoundClick={handleEndRoundClick}/>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    } else if (orientation === "portrait") {
        if (squareSize === 60){
            return(
            <div className="col-12">
                <div className="row gameTrackerPortrait align-items-center" style={{height: 4+"vh"}}>
                    <div className="col-4">
                        <p>Strikes</p>
                    </div>
                    <div className="col-4">
                        <p>Time</p>
                    </div>
                    <div className="col-4">
                        <p>Choices Left</p>
                    </div>
                </div>
                <div className="row gameTrackerPortrait align-items-top" style={{height: 8+"vh"}}>
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
            </div>)
        } else if (squareSize === 100){
            let textContentStyle = {width: 90 +"vw", height: 12+"vh"}
            let endRoundButtonStyle = {height: 12+"vh", width: 12+"vh"}
            return (
                <div className="row gameTrackerPortrait gameTrackerPortraitWrapper" style={textContentStyle}>
                    <div className="col-9">
                        <div className="row gameTrackerPortrait align-items-center" style={{height: 4+"vh"}}>
                            <div className="col-4">
                                <p>Strikes</p>
                            </div>
                            <div className="col-4">
                                <p>Time</p>
                            </div>
                            <div className="col-4">
                                <p>Choices Left</p>
                            </div>
                        </div>
                        <div className="row gameTrackerPortrait align-items-center" style={{height: 8+"vh"}}>
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
                    <div className="col-3 gameTrackerPortrait" style={{display:"inline-block"}}>
                        <EndRoundButton classNames={"endRoundSubmitPortrait endRoundSubmit"} style={endRoundButtonStyle} handleEndRoundClick={handleEndRoundClick} />
                    </div>
                </div>
            )
        }
    } else {
        console.log(`ERROR from gametracker component orientation = ${orientation} squareSize${squareSize}`);
        return <div>Error from orientation = ${orientation}</div>
    }
}


export default GameTracker;