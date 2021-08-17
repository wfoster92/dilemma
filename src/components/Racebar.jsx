import React from "react";
import { roundNumber } from "../helperFunctions/mathHelp";
import { playerDesigns } from "../helperFunctions/globals";
function Racebar(props) {

    const {stateScoreBoard, difficulty} = props.stateDictForRacebar
    console.log(`from racebar stateScoreBoard ${stateScoreBoard}`)
    let p0 = roundNumber(stateScoreBoard[0] * 100, 2);
    let p1 = roundNumber(stateScoreBoard[1] * 100, 2);

    return (
        <div>

            <div className="row raceBarHeader">
                    <div className="col-1"></div>
                    <div className="col-4">
                        <img src={`/images/avatar.png`}/>
                        <p>{p0}</p>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-1"></div>
                    <div className="col-4">
                        <img src={`/images/robot${difficulty}.png`} />
                        <p>{p1}</p>
                    </div>
                    <div className="col-1"></div>
            </div>


            <div className="row">

            </div>
            <div className="raceChart">
                <div className="row">
                    <div className="col-12 finishLine"></div>
                </div>
                <div className="row bars">
                    <div className="col-1"></div>
                    <div className={`col-4 ${playerDesigns[0]}`} style={{height:Math.min(p0, 50)+"vh"}}></div>
                    <div className="col-1"></div>
                    <div className="col-1"></div>
                    <div className={`col-4 ${playerDesigns[1]}`} style={{height:Math.min(p1, 50)+"vh"}}></div>
                    <div className="col-1"></div>
                </div>
                <div className="row">
                    <div className="col-12 startLine"></div>
                </div>
                <div className="row">
                    <div className="col-6"></div>
                    <div className="col-6"></div>
                </div>
            </div>

        </div>
    )
        
}

export default Racebar;