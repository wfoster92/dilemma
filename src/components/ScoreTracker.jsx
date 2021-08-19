import React from "react";
import { roundNumber } from "../helperFunctions/mathHelp";
import { playerDesigns } from "../helperFunctions/globals";

function ScoreTracker(props) {

    const {stateScoreBoard, currentMessage, difficulty, squareSize, orientation} = props.stateDictForRacebar;
    console.log(`from racebar stateScoreBoard ${stateScoreBoard}`)
    let p0 = roundNumber(stateScoreBoard[0] * 100, 2);
    let p1 = roundNumber(stateScoreBoard[1] * 100, 2);

    if (orientation === "landscape") {
        return (
            <div className="raceBar">
    
                <div className="row raceBarHeader">
                        <div className="col-2"></div>
                        <div className="col-3 raceBarAvatar">
                            <img src={`/images/avatar.png`}/>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-3 raceBarAvatar">
                            <img src={`/images/robot${difficulty}.png`} />
                        </div>
                        <div className="col-2"></div>
                </div>
                <div className="row raceBarScore">
                        <div className="col-2"></div>
                        <div className="col-3 raceBarAvatar">
                            <p>{p0}</p>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-3 raceBarAvatar">
                            <p>{p1}</p>
                        </div>
                        <div className="col-2"></div>
                </div>
    
                <div className="raceChart">
                    <div className="row" style={{height:50 * 0.8+"vmin"}}>
                        <div className="col-2"></div>
                        <div className={`col-3 ${playerDesigns[0]}`} style={{height:Math.min(p0, 53) * 0.8+"vmin"}}></div>
                        <div className="col-1"></div>
                        <div className="col-1"></div>
                        <div className={`col-3 ${playerDesigns[1]}`} style={{height:Math.min(p1, 53) * 0.8+"vmin"}}></div>
                        <div className="col-2"></div>
                    </div>
                    <div className="row" style={{height:3 * .8+"vmin"}}>
                        <div className="col-1"></div>
                        {/* zIndex of -1 so the player can cross the finish line */}
                        <div className="col-10 finishLine" style={{zIndex:-1}} ></div>
                        <div className="col-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-6"></div>
                        <div className="col-6"></div>
                    </div>
                </div>
            </div>
        )
    } else if (orientation === "portrait") {
        return (
            <div className="raceBar">
                <div className="row raceBarHeader">
                        <div className="col-2"></div>
                        <div className="col-3 raceBarAvatar">
                            <img src={`/images/avatar.png`}/>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-3 raceBarAvatar">
                            <img src={`/images/robot${difficulty}.png`} />
                        </div>
                        <div className="col-2"></div>
                </div>
                <div className="row raceBarScore">
                        <div className="col-2"></div>
                        <div className="col-3 raceBarAvatar">
                            <p>{p0}</p>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-3 raceBarAvatar">
                            <p>{p1}</p>
                        </div>
                        <div className="col-2"></div>
                </div>
    
                <div className="raceChart">
                    <div className="row" style={{height:50 * 0.8+"vmin"}}>
                        <div className="col-2"></div>
                        <div className={`col-3 ${playerDesigns[0]}`} style={{height:Math.min(p0, 53) * 0.8+"vmin"}}></div>
                        <div className="col-1"></div>
                        <div className="col-1"></div>
                        <div className={`col-3 ${playerDesigns[1]}`} style={{height:Math.min(p1, 53) * 0.8+"vmin"}}></div>
                        <div className="col-2"></div>
                    </div>
                    <div className="row" style={{height:3 * .8+"vmin"}}>
                        <div className="col-1"></div>
                        {/* zIndex of -1 so the player can cross the finish line */}
                        <div className="col-10 finishLine" style={{zIndex:-1}} ></div>
                        <div className="col-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-6"></div>
                        <div className="col-6"></div>
                    </div>
                </div>
            </div>
        )
    }        
}

export default ScoreTracker;