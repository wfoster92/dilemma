import React, { useState } from "react";
import Row from "./Row"
import { createSegments, makeColorArray } from "../helperFunctions/mathHelp";
import useWindowDimensions from "../helperFunctions/windowDimensions";

function Arena () {

    let arenaObject = [];
    let [minRows, maxRows, minCols, maxCols] = [4,4,4,4];
    // the size of the square grid relative to the vmin of the user's viewport... (80 -> 80%)
    let squareSize = 80;
    let rows = createSegments(minRows,maxRows);
    let totalUnits = 0;
    let colorBase = ["#0000ff", "#ff0000", "#00ff00", "#6442bd"];

    // create a 2d arenaObject list
    for (let r=0; r < rows.length; r++) {
        let newCol = createSegments(minCols, maxCols);
        totalUnits += newCol.length;
        let newRow = [];
        newCol.forEach((c) => 
            {console.log(c);
            // console.log(`rows ${rows} col ${c}`);
            let newElement = [c, rows[r]];
            // console.log(`new element ${newElement}`);
            // console.log(`arenaObject ${r} ${c} ${Array.isArray(arenaObject)}`)
            newRow.push(newElement)}
        )
        arenaObject.push(newRow);
    }



    const [PAMax, setPAMax] = useState(5);
    const [isPAFull, setIsPAFull] = useState([false, false])
    const [playersArray, setPlayersArray] = useState([[],[]])
    const [isLive, setIsLive] = useState(false)
    const [isClaimed, setIsClaimed] = useState(Array(totalUnits).fill(false))
    const [isGameOver, setIsGameOver] = useState(false)
    const [isBetweenRounds, setIsBetweenRounds] = useState(false)

    function clickEvent(id){
        isLive()&&!isClaimed(id)&&setPlayersArray(id);

    }







    let colorArray = makeColorArray(colorBase = colorBase, totalUnits, arenaObject = arenaObject);
    console.log(`from Arena, colorArray ${colorArray}`);




    
    const {width, height} = useWindowDimensions();
    console.log(`w ${width} h ${height}`);
    // set the width to 80% of the smallest side of the viewport
    const arenaWidth = Math.ceil(Math.min(width, height) * (squareSize/100));
    const paddingBottom = Math.ceil(Math.min(width, height) * (((100-squareSize)/100) / 4));
    console.log(`arenaWidth ${arenaWidth}`);
    



    return (<div style={{width:arenaWidth, paddingBottom:paddingBottom}} id="spacer">
            {colorArray.map(row => {
                return <Row row={row} squareSize={squareSize}/>
            })}
        </div>)
        // rows.map((r, idx) =>
        //     <Row height={r} rowIdx={idx}/>
        // )
    
    
}

export default Arena;