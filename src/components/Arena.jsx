import React, { useState } from "react";
import Row from "./Row"
import { squareSize, minRows, maxRows, minCols, maxCols, maxSelections, colorBase } from "../helperFunctions/globals";
import { createSegments } from "../helperFunctions/mathHelp";
import { makeCompleteArray } from "../helperFunctions/makeCompleteArray";
import {useWindowDimensions, getWindowMinMax} from "../helperFunctions/windowDimensions";
// import { playerImgs } from "../helperFunctions/globals"


function Arena () {


    const pid = 0;
    let kelly = "../images/kelly.jpg"

    function makeArenaObject() {
        let arenaObject = [];
        let rows = createSegments(minRows,maxRows);
        let totalUnits = 0;
        let areaArray = [];


        // create the arenaObject list
        for (let r=0; r < rows.length; r++) {
            let newCol = createSegments(minCols, maxCols);
            let newRow = [];
            newCol.forEach((c, idx) => 
                {console.log(c);
                let newElement = [c, rows[r], totalUnits+idx];
                areaArray.push(c * rows[r]);
                newRow.push(newElement)}
            )
            arenaObject.push(newRow);
            totalUnits += newCol.length;
        }
        return [arenaObject, totalUnits, areaArray];
    }

    const [arenaObject, totalUnits, areaArray] = makeArenaObject();

    console.log(`areaArray ${areaArray}`)

    // everything is set to -1 showing nothing is claimed
    let initialControlArray = new Array(totalUnits).fill(-1);

    const [PAMax, setPAMax] = useState(maxSelections);
    const [isPAFull, setIsPAFull] = useState([false, false])
    const [playersArray, setPlayersArray] = useState([[],[]])
    const [isLive, setIsLive] = useState(true)
    const [controlArray, setControlArray] = useState(initialControlArray)
    const [scoreBoard, setScoreBoard] = useState([0,0])
    const [isGameOver, setIsGameOver] = useState(false)
    const [isBetweenRounds, setIsBetweenRounds] = useState(false)

    let [completeArray, colorArray] = makeCompleteArray(colorBase, totalUnits, arenaObject);
    // console.log(`from Arena, completeArray ${completeArray}\ncolorArray ${colorArray}`);

    function updateIsPAFull(pid, aBoolean) {
        setIsPAFull((prevState) => {
            let currentState = prevState;
            currentState[pid] = aBoolean;
            return currentState
        })
    }

    function updateScoreBoard() {
        // update the score board
        setScoreBoard(prevState =>{
            let sb = prevState;
            sb[0] = 0;
            sb[1] = 0;
            controlArray.forEach((id, idx) => {
                switch (id) {
                    case 1:
                        sb[1] += areaArray[idx];
                        break;
                    case 0:
                        sb[0] += areaArray[idx];
                        break;
                    default:
                        break;
                }
            })
            console.log(`score board ${sb}`)
            return sb;
        })
    }

    function endRound() {
        console.log(`in endRound a total units ${totalUnits}`)
        // this one doesn't break 
        updateControlArray();
        console.log(`in endRound b total units ${totalUnits}`)
        updateScoreBoard();
        console.log(`in endRound c total units ${totalUnits}`)
        resetPlayersArray();
        console.log(`in endRound d total units ${totalUnits}`)
    }

    function updateControlArray() {
        // update the control array
        setControlArray(prevState => {
            let data = prevState;
            let tempPA = playersArray;
            let longestPA = Math.max(tempPA[0].length, tempPA[1].length);
            let pid0, pid1, val0, val1;
            let seen = [];
            for(let i=0; i < longestPA; i++){
                val0 = tempPA[0].shift();
                val1 = tempPA[1].shift();
                if (isNaN(val0)) {
                    if (!seen.includes(val1)){
                        data[val1] = 1
                        seen.push(pid1)
                        updateSingleImage(val1, kelly, 1);
                    }
                } else if (isNaN(val1)) {
                    if (!seen.includes(val0)){
                        data[val0] = 0
                        seen.push(pid0)
                        updateSingleImage(val0, kelly, 1);

                    }
                } else if (!isNaN(val0) && !isNaN(val1)) {
                    if (val0===val1){
                        // do nothing
                    } else {
                        if (!seen.includes(val0)) {
                            data[val0] = 0
                            seen.push(pid0)
                            updateSingleImage(val0, kelly, 1);
                        }
                        if (!seen.includes(val1)) {
                            data[val1] = 1
                            seen.push(pid1)
                            updateSingleImage(val1, kelly, 1);
                        } 
                    }
                }

            }

            console.log(`from update control array controlArray ${controlArray}`)
            return data;            
        })

    }

    

    function resetPlayersArray() {
        console.log(`in resetPlayersArray before pa = ${playersArray}`);
        setPlayersArray(prevState => {
            let data = prevState;
            data[0] = [];
            data[1] = [];
            return data;
        })
    }


    function updatePlayersArray(elementID, pid){
        // console.log("in set player array " + pid);
        // console.log(`playersArray before ${playersArray} pa0 ${playersArray[0]} pa1 ${playersArray[1]}`);
        
        // let idxA = playersArray[pid].findIndex((element) => element === elementID);
        // console.log(`idxA ${idxA}`)
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
                // console.log(`isPAFull[${pid}] ${isPAFull[pid]} data[${pid}] ${data[pid]} elementID ${elementID}`)
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

        // console.log(`elementToRemove ${elementToRemove}`);
        (elementToRemove > -1) && updateSingleColor(elementToRemove, colorArray[elementToRemove], 1);
        // console.log("exiting update players array");
        return true
    }

    function updateColors(){
        console.log("In update colors");
        // let pid = 0;
        let opacityMultiplier = (PAMax > 1) ? (1/(PAMax - 1)) : 0;
        playersArray[pid].forEach((value, idx) => {
            let backgroundColor = "black";
            let opacity = 1 - opacityMultiplier * idx;
            console.log(`in updateColors background color ${backgroundColor} opacity ${opacity} opacityMultiplier ${opacityMultiplier}`);
            updateSingleColor(value, backgroundColor, opacity);
        })
        console.log("exiting update colors");
    }

    function updateSingleColor(elementID, backgroundColor, opacity) {
        console.log(`In update single color. original color ${colorArray[elementID]} new color ${backgroundColor}`);
        document.getElementById(`${elementID}`).style.backgroundColor = backgroundColor;
        document.getElementById(`${elementID}`).style.opacity = opacity;
        document.getElementById(`${elementID}_0`).style.backgroundColor = backgroundColor;
        document.getElementById(`${elementID}_0`).style.opacity = opacity;
        document.getElementById(`${elementID}_1`).style.backgroundColor = backgroundColor;
        document.getElementById(`${elementID}_1`).style.opacity = opacity;
    }

    function updateSingleImage(elementID, backgroundImg, opacity) {
        console.log(`In update single IMAGE elementID ${elementID}`);
        const e = document.getElementById(elementID).style;
        const e0 = document.getElementById(`${elementID}_0`).style;
        const e1 = document.getElementById(`${elementID}_1`).style;
        removeAttribuesFromElement(e, ["background-color", "opacity"]);
        removeAttribuesFromElement(e0, ["background-color", "opacity"]);
        removeAttribuesFromElement(e1, ["background-color", "opacity"]);


        document.getElementById(`${elementID}`).className = "bricks";
        document.getElementById(`${elementID}_0`).className = "bricks";
        document.getElementById(`${elementID}_1`).className = "bricks";
        // document.getElementById(`${elementID}_0`).className = "kelly";
        // document.getElementById(`${elementID}_1`).className = "kelly";
        // document.getElementById(`${elementID}`).style.opacity = opacity;
        // document.getElementById(`${elementID}_0`).style.opacity = opacity;
        // document.getElementById(`${elementID}_1`).style.opacity = opacity;
    }

    function removeAttribuesFromElement(element, attributeList) {
        console.log(`in removeAttribuesFromElement ${element}`);
        attributeList.forEach((attribute) => {
            element.removeProperty(attribute);
        })
    }




    function handleClick(id){
        console.log(`in handle click index = ${id} is element id ${id} claimed? -> ${!(controlArray[id] === -1)}`);
        // console.log(`${isLive}  ${!(isClaimed[id])}`)
        isLive && (controlArray[id] === -1) && updatePlayersArray(id, pid) && updateColors();
        return console.log("exited handleClick!")
    }

    

    // const {minSide, maxSide} = getWindowMinMax();
    // // const {width, height} = useWindowDimensions();
    // // set the width to 80% of the smallest side of the viewport
    // const arenaWidth = Math.ceil(minSide * (squareSize/100));


    return (
        <div>
                {/* <Header /> */}
            {/* <span className="spacer" style={{width:spacerWidth, height:arenaWidth}} onClick={updateControlArray}> */}
            <span className="spacer" onClick={endRound}>

            </span>
            <span id="gameboard">
            {/* <span style={{width:arenaWidth}} id="gameboard"> */}
            {completeArray.map(row => {
                    return <Row row={row} handleClick={handleClick}/>
                })}
            </span>
            {/* <span className="spacer" style={{width:spacerWidth, height:arenaWidth}}> */}
            <span className="spacer">

            </span>

        </div>
            )
    
}

export default Arena;