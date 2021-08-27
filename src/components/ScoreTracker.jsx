import React from "react";
import { roundNumber } from "../helperFunctions/mathHelp";
import { playerDesigns } from "../helperFunctions/globals";

function ScoreTracker(props) {

    const {stateScoreBoard, currentMessage, difficulty, squareSize, isLandscape} = props.stateDictForScoreTracker;
    // const {stateScoreBoard, currentMessage, difficulty, viewportProperties} = props.stateDictForScoreTracker;
    // const [squareSize, isLandscape] = viewportProperties;

    console.log(`from scoreTracker stateScoreBoard ${stateScoreBoard}`)
    let score0 = roundNumber(stateScoreBoard[0] * 100, 2);
    let score1 = roundNumber(stateScoreBoard[1] * 100, 2);

    let finishLineSpace = 3;

    if (isLandscape) {
        let squareSizePercentage = squareSize/100;
        return (
            <div>
                <div className="raceBar" style={{height: squareSize+"vh"}}>
                    <div className="row raceBarHeader">
                            <div className="col-6 raceBarAvatarLandscape">
                                <img src={`/images/avatar.png`}/>
                                <p className="landscapeScore">{score0}</p>
                            </div>
                            <div className="col-6 raceBarAvatarLandscape">
                                <img src={`/images/robot${difficulty}.png`} />
                                <p className="landscapeScore">{score1}</p>
                            </div>
                    </div>

        
                    <div className="raceChart">
                        <div className="row" style={{height:50 * squareSizePercentage +"vh"}}>
                            <div className={`col-6 d-flex justify-content-center`}>
                                <div className ={`${playerDesigns[0]} raceBarWidthLandscape`} style={{height:Math.min(score0, 50+finishLineSpace) * squareSizePercentage+"vh", zIndex:1, position:"absolute"}}></div>
                            </div>
                            <div className={`col-6 d-flex justify-content-center`}>
                                <div className ={`${playerDesigns[1]} raceBarWidthLandscape`} style={{height:Math.min(score1, 50+finishLineSpace) * squareSizePercentage+"vh", zIndex:1, position:"absolute"}}></div>
                            </div>
                        </div>
                        
                        <div className="row" style={{height:finishLineSpace * squareSizePercentage +"vh"}}>
                            <div className="col-1"></div>
                            {/* gave element a lower zIndex so the racebar can cross the finish line */}
                            <div className="col-10 finishLine" style={{zIndex:0}} ></div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                    <div className="row align-items-center endGameMessage">
                        <div className="col-12">
                            <p>{currentMessage}</p>
                        </div>
                </div>
                </div>
            </div>
        )
    } else if (!isLandscape) {
        let totalHeight = 15;
        let verticalMargin = 1;
        let totalWidth = 90;
        let iconSide = (totalHeight*(0.6)) / 2+"vh";
        let iconSpacing = "1vw";
        let scoreHeight = (totalHeight*(0.25)) / 2+"vh";

        let raceBarStyle0 = {width: "calc((" + Math.min(score0, 50 + finishLineSpace) + "*(" + totalWidth + "vw - " + iconSide + " - " + iconSpacing + ")) / (50 + " + finishLineSpace + "))", 
                height: iconSide, zIndex:1, position:"absolute"};
        let raceBarStyle1 = {width: "calc((" + Math.min(score1, 50 + finishLineSpace) + "*(" + totalWidth + "vw - " + iconSide + " - " + iconSpacing + ")) / (50 + " + finishLineSpace + "))",
                height: iconSide, zIndex:1, position:"absolute"};

        let stWrapperStyle = {width: totalWidth + "vw", height: totalHeight + verticalMargin + "vh"};
        let stPlayerStyle = {width: "calc(" + (50 / (50 + finishLineSpace)) + "*(" + totalWidth + "vw - " + iconSide + " - " + iconSpacing + ") + " + iconSide + " + " + iconSpacing + ")", 
                height:(totalHeight / 2) +"vh"};
        let stBothPlayersStyle = {width: "calc(" + (50 / (50 + finishLineSpace)) + "*(" + totalWidth + "vw - " + iconSide + " - " + iconSpacing + ") + " + iconSide + " + " + iconSpacing + ")", 
                height: totalHeight + verticalMargin+"vh"};
        let finishLineStyle = {width: "calc(" + (finishLineSpace / (50 + finishLineSpace)) + "*(" + totalWidth + "vw - " + iconSide + " - " + iconSpacing + "))", 
                height:totalHeight+verticalMargin+"vh", zIndex:0, position:"absolute"}
        

        return (
            //  move style to css when done 
            <div className="stWrapperPortrait" style={stWrapperStyle}>
                <div className="stBothPlayers" style={stBothPlayersStyle}>
                    <div className="stPlayerPortrait" style={stPlayerStyle}>
                        <div style={{width: iconSide, height: totalHeight/2 + "vh"}} >
                            <img style={{width: iconSide, height: iconSide}} src="/images/avatar.png"/>
                            <p className="portraitScore" style={{width: iconSide, height: scoreHeight}}>{score0}</p>
                        </div>
                        <div className="raceBarStyle">
                            <span className={playerDesigns[0]} style={raceBarStyle0}>
                            </span>
                        </div>
                    </div>
                    <div className="stPlayerPortrait stPlayerPortrait-bottom" style={stPlayerStyle}>
                        <div style={{width: iconSide}}> 
                            <img style={{width: iconSide, height: iconSide}} src={`/images/robot${difficulty}.png`}/>
                            <p className="portraitScore" style={{width: iconSide, height: scoreHeight}} >{score1}</p>
                        </div>
                        <div className="raceBarStyle">
                            <span className={playerDesigns[1]} style={raceBarStyle1}>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="finishLine finishLinePortrait stPlayerPortrait" style={finishLineStyle}></div>
            </div>
        )


    }        
}

export default ScoreTracker;