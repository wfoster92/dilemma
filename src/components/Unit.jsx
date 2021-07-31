import React, {useState} from "react";
// import { createSegments } from "../functions/mathHelp";

function Unit(props) {

    let squareSize = props.squareSize;
    let [width, height, index, color] = props.unit;
    let playerID = 0

    // let playersArrayIndex = playersArray[playerID].findIndex((elementID) => index === elementID);
    // let bgColor = (playersArrayIndex >= 0) ? "black" : originalColor;
    let opacity = 1; 
    let halfWidth = (width * squareSize / 2) + "vmin";
    // const [playersArrayIndex, setCurrentPlayersArrayIndex] = useState(-1);

    height = height * squareSize + "vmin";
    console.log(`in unit w ${width} h ${height} index ${index} color ${color}`)

    // index is the id for the unit... elementID is the id for each element in playersArray

    function clickEvent() {
        props.handleClick(index);
        // updatePlayersArrayIndex();
    }

    // function updatePlayersArrayIndex() {
    //     setPlayersArrayIndex((prevState) => {
    //         return playersArray[playerID].findIndex((elementID) => index === elementID);
    //     })
    //     console.log(`in UNIT playersArrayIndex ${playersArrayIndex}`);
    // }

    // let playersArrayIndex = playersArray[playerID].findIndex((elementID) => index === elementID);
    // let bgColor = (playersArrayIndex >= 0) ? "black" : originalColor;
    // let opacity = (playersArrayIndex >= 0) ? 1 - .2 * playersArrayIndex : 1; 

    return (
            // <span onClick={clickEvent} id={index} style={colorStyle}> 
            <span onClick={clickEvent} id={index} style={{backgroundColor:color, opacity:opacity}}>
                <span id={index+"_0"}
                    style={{width:halfWidth, height:height, display:"inline-block", backgroundColor:color, opacity:opacity}} >
                </span>
                <span id={index+"_1"}
                    style={{width:halfWidth, height:height, display:"inline-block", backgroundColor:color, opacity:opacity}} >
                    
                </span>
            </span>

    )
}

export default Unit