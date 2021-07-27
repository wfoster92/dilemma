import React from "react";
// import { createSegments } from "../functions/mathHelp";

function Unit(props) {
    let squareSize = props.squareSize;
    let [width, height, color] = props.unit;
    width = width * squareSize + "vmin";
    height = height * squareSize + "vmin";
    console.log(`in unit w ${width} h ${height} color ${color}`)
    // let colorArray=["blue", "red", "black", "yellow", "green", "teal"]
    // let colorArray=["#0066cc","#0057bd","#0042a8","#003399", "#001f85", "#000a70"]
    // let colorArray = ["#f5fdfd", "#ecfcfa", "#e2faf8", "#d9f9f6", "#cff7f3", "#c6f6f1", "#bcf4ef"]


    return (
        // <div>
        //     {cols.map((c, idx) =>
                
                // <span style={{height:width+"vh", width:c + "vw", display:"inline-block", backgroundColor:colorArray[idx]}} >
                <span 
                    style={{width:width, height:height, display:"inline-block", backgroundColor:color}} >
                    {/* style={{width:width, height:height, display:"inline-block", backgroundColor:colorArray[props.idx]}} > */}
                </span>
        //     )}
        // </div>
    )
}

export default Unit