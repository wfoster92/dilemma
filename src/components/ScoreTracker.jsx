import React from "react";
import { roundNumber } from "../helperFunctions/mathHelp";
import { playerDesigns } from "../helperFunctions/globals";

function ScoreTracker(props) {

    const {stateScoreBoard, currentMessage, difficulty, squareSize, orientation} = props.stateDictForScoreTracker;
    console.log(`from racebar stateScoreBoard ${stateScoreBoard}`)
    let score0 = roundNumber(stateScoreBoard[0] * 100, 2);
    let score1 = roundNumber(stateScoreBoard[1] * 100, 2);

    let finishLineSpace = 3;

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
                            <p>{score0}</p>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-3 raceBarAvatar">
                            <p>{score1}</p>
                        </div>
                        <div className="col-2"></div>
                </div>
    
                <div className="raceChart">
                    <div className="row" style={{height:50 * 0.8+"vh"}}>
                        <div className="col-2"></div>
                        <div className={`col-3 ${playerDesigns[0]}`} style={{height:Math.min(score0, 50+finishLineSpace) * 0.8+"vh"}}></div>
                        <div className="col-1"></div>
                        <div className="col-1"></div>
                        <div className={`col-3 ${playerDesigns[1]}`} style={{height:Math.min(score1, 50+finishLineSpace) * 0.8+"vh"}}></div>
                        <div className="col-2"></div>
                    </div>
                    <div className="row" style={{height:finishLineSpace * .8+"vh"}}>
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
                {currentMessage}
            </div>
        )
    } else if (orientation === "portrait") {
        let totalHeight = 15;
        let verticalMargin = 1;
        let totalWidth = 90;
        let iconSide = (totalHeight*(0.7)) / 2+"vh";
        let iconSpacing = "1vw";
        let scoreHeight = (totalHeight*0.3) / 2+"vh";

        let raceBarStyle0 = {width: "calc((" + Math.min(score0, 50 + finishLineSpace) + "*(" + totalWidth + "vw - " + iconSide + " - " + iconSpacing + ")) / (50 + " + finishLineSpace + "))", 
                height: iconSide, zIndex:1};
        let raceBarStyle1 = {width: "calc((" + Math.min(score1, 50 + finishLineSpace) + "*(" + totalWidth + "vw - " + iconSide + " - " + iconSpacing + ")) / (50 + " + finishLineSpace + "))",
                height: iconSide, zIndex:1};

        let stWrapperStyle = {width: totalWidth + "vw", height: totalHeight + verticalMargin + "vh"};
        let stPlayerStyle = {width: "calc(" + (50 / (50 + finishLineSpace)) + "*(" + totalWidth + "vw - " + iconSide + " - " + iconSpacing + ") + " + iconSide + " + " + iconSpacing + ")", 
                height:(totalHeight / 2) +"vh"};
        let stBothPlayersStyle = {width: "calc(" + (50 / (50 + finishLineSpace)) + "*(" + totalWidth + "vw - " + iconSide + " - " + iconSpacing + ") + " + iconSide + " + " + iconSpacing + ")", 
                height: totalHeight + verticalMargin+"vh"};
        // let stBothPlayersStyle = {width: "calc(" + (50 / (50 + finishLineSpace)) + "*(" + totalWidth + "vw - " + iconSide + ") + " + iconSide +")" , height:((totalHeight*0.9)) +"vh"};
        let finishLineStyle = {width: "calc(" + (finishLineSpace / (50 + finishLineSpace)) + "*(" + totalWidth + "vw - " + iconSide + " - " + iconSpacing + "))", 
                height:totalHeight+verticalMargin+"vh", zIndex:-1, position:"absolute"}

        return (
            //  move style to css when done 
            <div className="stWrapperPortrait" style={stWrapperStyle}>
                <div className="stBothPlayers" style={stBothPlayersStyle}>
                    <div className="stPlayerPortrait" style={stPlayerStyle}>
                        {/* <span> */}
                            <div style={{width: iconSide, height: totalHeight/2 + "vh"}} >
                                <img style={{width: iconSide, height: iconSide}} src="/images/avatar.png"/>
                                <p style={{width: iconSide, heigh: scoreHeight}}>{score0}</p>
                            </div>
                        {/* </span> */}
                        <div className="raceBarStyle">
                            <span className={playerDesigns[1]} style={raceBarStyle0}>
                            </span>
                        </div>
                    </div>
                    <div className="stPlayerPortrait stPlayerPortrait-bottom" style={stPlayerStyle}>
                        {/* <span> */}
                            <div style={{width: iconSide}}> 
                                <img style={{width: iconSide, height: iconSide}} src={`/images/robot${difficulty}.png`}/>
                                <p style={{width: iconSide, height: scoreHeight}} >{score1}</p>
                            </div>
                        {/* </span> */}
                        <div className="raceBarStyle">
                            <span className={playerDesigns[1]} style={raceBarStyle1}>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="finishLine finishLinePortrait stPlayerPortrait" style={finishLineStyle}></div>
            </div>
        )


        // return (
            // <div className="raceBar">
            //     <div className="row raceBarHeader">
            //             <div className="col-2"></div>
            //             <div className="col-3 raceBarAvatar">
            //                 <img src={`/images/avatar.png`}/>
            //             </div>
            //             <div className="col-2"></div>
            //             <div className="col-3 raceBarAvatar">
            //                 <img src={`/images/robot${difficulty}.png`} />
            //             </div>
            //             <div className="col-2"></div>
            //     </div>
            //     <div className="row raceBarScore">
            //             <div className="col-2"></div>
            //             <div className="col-3 raceBarAvatar">
            //                 <p>{score0}</p>
            //             </div>
            //             <div className="col-2"></div>
            //             <div className="col-3 raceBarAvatar">
            //                 <p>{score1}</p>
            //             </div>
            //             <div className="col-2"></div>
            //     </div>
    
            //     <div className="raceChart">
            //         <div className="row" style={{height:50 * 0.8+"vmin"}}>
            //             <div className="col-2"></div>
            //             <div className={`col-3 ${playerDesigns[0]}`} style={{height:Math.min(score0, 53) * 0.8+"vmin"}}></div>
            //             <div className="col-1"></div>
            //             <div className="col-1"></div>
            //             <div className={`col-3 ${playerDesigns[1]}`} style={{height:Math.min(score1, 53) * 0.8+"vmin"}}></div>
            //             <div className="col-2"></div>
            //         </div>
            //         <div className="row" style={{height:3 * .8+"vmin"}}>
            //             <div className="col-1"></div>
            //             {/* zIndex of -1 so the player can cross the finish line */}
            //             <div className="col-10 finishLine" style={{zIndex:-1}} ></div>
            //             <div className="col-1"></div>
            //         </div>
            //         <div className="row">
            //             <div className="col-6"></div>
            //             <div className="col-6"></div>
            //         </div>
            //     </div>
            // </div>
        // )


    }        
}

export default ScoreTracker;