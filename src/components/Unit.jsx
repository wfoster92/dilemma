import React, {useState} from "react";
import { squareSize } from "../helperFunctions/globals";

function Unit(props) {

    let [width, height, index, color] = props.unit;
    // let playerID = 0

    // let opacity = 1; 
    let halfWidth = (width * squareSize / 2) + "vmin";
    let fullWidth = (width * squareSize) + "vmin";

    height = height * squareSize + "vmin";
    // console.log(`in unit w ${width} h ${height} index ${index} color ${color}`)

    // index is the id for the unit... elementID is the id for each element in playersArray
    function clickEvent() {
        props.handleClick(index);
        // updatePlayersArrayIndex();
    }


    return (
            // <span onClick={clickEvent} id={index} style={colorStyle}> 
            <span id={index} style={{width:fullWidth, height:height, display:"inline-block", backgroundColor:color}}>
                <span id={index+"_0"} onClick={clickEvent}
                    style={{width:halfWidth, height:height, display:"inline-block", backgroundColor:color}} >
                </span>
                <span id={index+"_1"} onClick={clickEvent}
                    style={{width:halfWidth, height:height, display:"inline-block", backgroundColor:color}} >
                    
                </span>
            </span>

    )
}

export default Unit