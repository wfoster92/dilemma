import React, {useState} from "react";


function Unit(props) {
    let squareSize = props.squareSize;
    let [width, height, index, color] = props.unit;

    
    let halfWidth = (width * squareSize / 2) + "vmin";
    let fullWidth = (width * squareSize) + "vmin";

    height = height * squareSize + "vmin";

    // index is the id for the unit... elementID is the id for each element in playersArray
    function clickEvent() {
        props.handleClick(index);
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