import React from "react";
// import { createSegments } from "../functions/mathHelp";

function Unit(props) {
    let squareSize = props.squareSize;
    let [width, height, index, color] = props.unit;
    let originalColor = color;
    let halfWidth = (width * squareSize / 2) + "vmin";
    height = height * squareSize + "vmin";
    console.log(`in unit w ${width} h ${height} index ${index} color ${color}`)
    // let colorArray=["blue", "red", "black", "yellow", "green", "teal"]
    // let colorArray=["#0066cc","#0057bd","#0042a8","#003399", "#001f85", "#000a70"]
    // let colorArray = ["#f5fdfd", "#ecfcfa", "#e2faf8", "#d9f9f6", "#cff7f3", "#c6f6f1", "#bcf4ef"]

    function clickEvent() {
        props.handleClick(index);
    }

    return (
            <span onClick={clickEvent}> 
                <span 
                    style={{width:halfWidth, height:height, display:"inline-block", backgroundColor:color}} >
                </span>
                <span 
                    style={{width:halfWidth, height:height, display:"inline-block", backgroundColor:color}} >
                </span>
            </span>

    )
}

export default Unit