import React from "react"

function EndRoundButton(props){

    return(
        <button id="submit" className={props.classNames} style={props.style} 
            onClick={props.handleEndRoundClick}>End Round</button>
    )

}

export default EndRoundButton;