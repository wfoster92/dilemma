import React, { useState } from "react";
import Row from "./Row"
import { createSegments, makeCompleteArray } from "../helperFunctions/mathHelp";
import useWindowDimensions from "../helperFunctions/windowDimensions";

function Arena () {

    let arenaObject = [];
    let [minRows, maxRows, minCols, maxCols] = [4,4,4,4];
    // the size of the square grid relative to the vmin of the user's viewport... (80 -> 80%)
    let squareSize = 80;
    let rows = createSegments(minRows,maxRows);
    let totalUnits = 0;
    let colorBase = ["#0000ff", "#ff0000", "#00ff00", "#6442bd"];




    // create the arenaObject list
    for (let r=0; r < rows.length; r++) {
        let newCol = createSegments(minCols, maxCols);
        let newRow = [];
        newCol.forEach((c, idx) => 
            {console.log(c);
            let newElement = [c, rows[r], totalUnits+idx];
            newRow.push(newElement)}
        )
        arenaObject.push(newRow);
        totalUnits += newCol.length;
    }
    let initialIsClaimed = new Array(totalUnits).fill(false);

    const [PAMax, setPAMax] = useState(5);
    const [isPAFull, setIsPAFull] = useState([false, false])
    const [playersArray, setPlayersArray] = useState([[],[]])
    const [isLive, setIsLive] = useState(true)
    const [isClaimed, setIsClaimed] = useState(initialIsClaimed)
    const [isGameOver, setIsGameOver] = useState(false)
    const [isBetweenRounds, setIsBetweenRounds] = useState(false)
    // const [paIndex, ]

    let [completeArray, colorArray] = makeCompleteArray(colorBase = colorBase, totalUnits, arenaObject = arenaObject);
    console.log(`from Arena, completeArray ${completeArray}\ncolorArray ${colorArray}`);

    function updateIsPAFull(pid, aBoolean) {
        setIsPAFull((prevState) => {
            let currentState = prevState;
            currentState[pid] = aBoolean;
            return currentState
        })
    }
    function updatePlayersArray(elementID, pid){
        console.log("in set player array " + pid);
        console.log(`playersArray before ${playersArray} pa0 ${playersArray[0]} pa1 ${playersArray[1]}`);
        
        let idxA = playersArray[pid].findIndex((element) => element === elementID);
        console.log(`idxA ${idxA}`)
        let elementToRemove = -1;

    
        setPlayersArray((prevState) => {
            // console.log("prevState before " + prevState);
            let data = prevState;
            let idx = data[pid].findIndex((element) => element === elementID);
            console.log(`in set player array idx ${idx} elementID ${elementID}`);

            if (idx > 0) {
                let temp = data[pid][idx];
                data[pid][idx] = data[pid][idx - 1];
                data[pid][idx - 1] = temp;
            } else if (idx === 0) {
                // follow up on this one
                elementToRemove = data[pid].shift();
            } else if (idx < 0) {
                console.log(`isPAFull[${pid}] ${isPAFull[pid]} data[${pid}] ${data[pid]} elementID ${elementID}`)
                if (isPAFull[pid]){
                    elementToRemove = data[pid].pop()
                    updateIsPAFull(pid, false);
                } 
                console.log(`About to push ${elementID}`);
                data[pid].push(elementID);
                console.log(data[0], data[1]);
                (data[pid].length === PAMax) && updateIsPAFull(pid, true)
            }
            console.log(`playersArray after ${data} elementToRemove ${elementToRemove}`);
            return data; 
        });

        console.log(`elementToRemove ${elementToRemove}`);
        (elementToRemove > -1) && updateSingleColor(elementToRemove);
        console.log("exiting update players array");
        return true
    }

    function updateColors(){
        console.log("We are in update colors");
        let pid = 0;
        playersArray[pid].forEach((value, idx) => {
            let backgroundColor = "black";
            let opacity = 1 - .2 * idx;
            console.log(`background color ${backgroundColor} opacity ${opacity}`)
            document.getElementById(`${value}`).style.backgroundColor = backgroundColor;
            document.getElementById(`${value}_0`).style.backgroundColor = backgroundColor;
            document.getElementById(`${value}_1`).style.backgroundColor = backgroundColor;
            document.getElementById(`${value}`).style.opacity = opacity;
            document.getElementById(`${value}_0`).style.opacity = opacity;
            document.getElementById(`${value}_1`).style.opacity = opacity;
        })
    }

    function updateSingleColor(elementID) {
        console.log(`In update single color. color ${colorArray[elementID]}`);
        document.getElementById(`${elementID}`).style.backgroundColor = colorArray[elementID];
        document.getElementById(`${elementID}`).style.opacity = 1;
        document.getElementById(`${elementID}_0`).style.backgroundColor = colorArray[elementID];
        document.getElementById(`${elementID}_0`).style.opacity = 1;
        document.getElementById(`${elementID}_1`).style.backgroundColor = colorArray[elementID];
        document.getElementById(`${elementID}_1`).style.opacity = 1;
    }



    function handleClick(id){
        console.log(`in handle click index = ${id} is claimed ${isClaimed[id]}`);
        // console.log(`${isLive}  ${!(isClaimed[id])}`)
        isLive&&!isClaimed[id]&&updatePlayersArray(id, 0)&&updateColors();
        return console.log("exited handleClick!")
    }

    // const {width, height} = useWindowDimensions();
    // console.log(`w ${width} h ${height}`);
    // const arenaWidth = Math.ceil(Math.min(width, height) * (squareSize/100));
    // const paddingBottom = Math.ceil(Math.min(width, height) * (((100-squareSize)/100) / 4));
    // console.log(`arenaWidth ${arenaWidth}`);
    const {minSide, maxSide} = useWindowDimensions();
    // set the width to 80% of the smallest side of the viewport
    const arenaWidth = Math.ceil(minSide * (squareSize/100));
    const paddingBottom = Math.ceil(minSide * (((100-squareSize)/100) / 4));
    console.log(`arenaWidth ${arenaWidth}`);
    

    return (<div style={{width:arenaWidth, paddingBottom:paddingBottom}} id="spacer">
            {completeArray.map(row => {
                return <Row row={row} squareSize={squareSize} handleClick={handleClick}/>
            })}
        </div>)
        // rows.map((r, idx) =>
        //     <Row height={r} rowIdx={idx}/>
        // )
    
    
}

export default Arena;