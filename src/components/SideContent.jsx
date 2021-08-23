import React from "react"
import EndRoundButton from "./EndRoundButton"


function SideContent(props){
    const {squareSize, currentMessage, handleEndRoundClick} = props.stateDictForSideContent;
    let sideContentWrapperStyle = {width:30+"vw", height: 56+"vw"}
    let rowStyle = {width:30+"vw", height: 28+"vw"}

    return(
        <div className="sideContentWrapper" style={sideContentWrapperStyle}>
            <div className="endGameMessage row align-items-center" style={rowStyle}>
                <p className="col-12">
                    {currentMessage}
                </p>
            </div>
            <div style={rowStyle}>
                <EndRoundButton classNames={"endRoundSubmitPortrait endRoundSubmit"} handleEndRoundClick={handleEndRoundClick}
                style={rowStyle} />
            </div>
        </div>
    )
}

export default SideContent;