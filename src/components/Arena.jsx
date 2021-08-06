import React, { useState } from "react";
import Row from "./Row"
import { squareSize, minRows, maxRows, minCols, maxCols, maxSelections, colorBase, playerDesigns, difficulty } from "../helperFunctions/globals";
import { createSegments, makeArenaObject } from "../helperFunctions/creationHelp";
import { makeCompleteArray } from "../helperFunctions/makeCompleteArray";
import {useWindowDimensions, getWindowMinMax} from "../helperFunctions/windowDimensions";
import { doAnimation, updateControlArray, makeBotMove} from "../helperFunctions/endRoundHelpers"
import { updateColors, updateSingleColor, updateSingleImage, updateHalfImage, removeClassFromElementHalf, removeAttribuesFromElement } from "../helperFunctions/elementModifiers";

// import { playerImgs } from "../helperFunctions/globals"

export const [arenaObject, totalUnits, areaArray] = makeArenaObject();
export let controlArray = new Array(totalUnits).fill(-1);
export let playersArray = [[],[]];
export let PAMax = maxSelections;
export let [completeArray, colorArray] = makeCompleteArray();



function Arena () {


    const humanPid = 0;
    const botGame = true;
    // the strength of the bot from 0-2 with 0 being the hardest
    // export let PAMax = maxSelections;

    // function makeArenaObject() {
    //     let arenaObject = [];
    //     let rows = createSegments(minRows,maxRows);
    //     let totalUnits = 0;
    //     export let areaArray = [];


    //     // create the arenaObject list
    //     for (let r=0; r < rows.length; r++) {
    //         let newCol = createSegments(minCols, maxCols);
    //         let newRow = [];
    //         newCol.forEach((c, idx) => 
    //             {console.log(c);
    //             let newElement = [c, rows[r], totalUnits+idx];
    //             areaArray.push(c * rows[r]);
    //             newRow.push(newElement)}
    //         )
    //         arenaObject.push(newRow);
    //         totalUnits += newCol.length;
    //     }
    //     return [arenaObject, totalUnits, areaArray];
    // }

    // const [arenaObject, totalUnits, tempAreaArray] = makeArenaObject();

    // export let areaArray = tempAreaArray;

    console.log(`areaArray ${areaArray}`)

    // everything is set to -1 showing nothing is claimed
    // let initialControlArray = new Array(totalUnits).fill(-1);
    // export let controlArray = new Array(totalUnits).fill(-1);
    // export let playersArray = [[],[]];
    let isPAFull = [false, false];

    // const [PAMax, setPAMax] = useState(3);
    // const [isPAFull, setIsPAFull] = useState([false, false])
    // const [playersArray, setPlayersArray] = useState([[],[]])
    const [isLive, setIsLive] = useState(true)
    // const [controlArray, setControlArray] = useState(initialControlArray)
    const [scoreBoard, setScoreBoard] = useState([0,0])
    const [isGameOver, setIsGameOver] = useState(false)
    const [isBetweenRounds, setIsBetweenRounds] = useState(false)

    // let [completeArray, colorArray] = makeCompleteArray(colorBase, totalUnits, arenaObject);
    // console.log(`from Arena, completeArray ${completeArray}\ncolorArray ${colorArray}`);

    function updateIsPAFull(pid, aBoolean) {
        isPAFull[pid] = aBoolean
        // setIsPAFull((prevState) => {
        //     let currentState = prevState;
        //     currentState[pid] = aBoolean;
        //     return currentState
        // })
    }

    function updateScoreBoard() {
        // update the score board
        // setScoreBoard(prevState =>{
        //     let sb = prevState;
        //     sb[0] = 0;
        //     sb[1] = 0;
        let sb = [0,0];
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
        // })
    }


    function endRound() {
        console.log(`in endRound a total units ${totalUnits}`)
        if (botGame) {
            playersArray = makeBotMove();
            // playersArray = makeBotMove(playersArray, areaArray, controlArray, PAMax);
        } 
        // console.log(`after bot move, playersArray ${playersArray}`)
        let interval = 2000;
        doAnimation(interval);
        // doAnimation(interval, playersArray);
        let longestPA = Math.max(playersArray[0].length, playersArray[1].length);
        // runRest();
        console.log(`about to runRest, interval ${interval} longestPA ${longestPA} playersArray ${playersArray}`)
        setTimeout(runRest, interval * longestPA);
    }
    
    function runRest(){
        // this one doesn't break 
        controlArray = updateControlArray();
        // controlArray = updateControlArray(playersArray, controlArray, colorArray);
        console.log(`in endRound b total units ${totalUnits}`)
        PAMax = updatePAMax();
        updateScoreBoard();
        console.log(`in endRound c total units ${totalUnits}`)
        
        resetPlayersArray();
        console.log(`in endRound d total units ${totalUnits}`)
    }

    // function doAnimation(interval) {
    //     let data = playersArray;
    //     console.log(`start of do animation playersArray ${playersArray}`)

    //     let [playerArray0, playerArray1] = data;
    //     interval = 1000;
    //     // console.log(`in do animation player0 ${player0} player1 ${player1}`)
    //     let elementId0, elementId1, delay;
    //     let claimed = [];
    //     let setTimeouts = [];
    //     let longestPA = Math.max(playerArray0.length, playerArray1.length);
    //     for(let idx=0; idx < longestPA; idx++) {
    //         delay = interval * (idx+1);
    //         elementId0 = (playerArray0.length >= idx+1) ? playerArray0[idx] : undefined;
    //         elementId1 = (playerArray1.length >= idx+1) ? playerArray1[idx] : undefined;
    //         console.log(`do animation round ${idx} ele0 ${elementId0} ele1 ${elementId1} current delay ${delay} longestPA ${longestPA}`)
    //         // elementId1 = playerArray1.shift();
    //         // if pid0 entered nothing
    //         if (isNaN(elementId0)) {
    //             console.log(`elementId0 ${elementId0} is not a number`)
    //             if (!claimed.includes(elementId1)){
                    
    //                 // updateHalfImage(elementId1, 1, 1)
    //                 setTimeouts.push(setTimeout(updateHalfImage, delay, elementId1, 1, 1)) && claimed.push(elementId1);
    //             }
    //         // if pid0 entered nothing
    //         } else if (isNaN(elementId1)) {
    //             if (!claimed.includes(elementId0)){
                    
    //                 // updateHalfImage(elementId0, 0, 1)
    //                 setTimeouts.push(setTimeout(updateHalfImage, delay, elementId0, 0, 1)) && claimed.push(elementId0);
    //             }
    //         // if pid0 and pid1 entered the same value
    //         } else if (!isNaN(elementId0) && !isNaN(elementId1)) {
    //             if (elementId0===elementId1){
    //                 // show both in half image
    //                 setTimeouts.push(setTimeout(updateHalfImage, delay, elementId0, 0, 1));
    //                 setTimeouts.push(setTimeout(updateHalfImage, delay, elementId1, 1, 1));
    //             } else {
    //                 // Does claimed array not include element0? if so element will be pushed && set half image full opacity
    //                 !claimed.includes(elementId0) ? 
    //                     setTimeouts.push(setTimeout(updateHalfImage, delay, elementId0, 0, 1)) && claimed.push(elementId0):
    //                     // else, set image at 0.2 opacity
    //                     setTimeouts.push(setTimeout(updateHalfImage, delay, elementId0, 0, 0.2));

    //                 // Does claimed array not include element0? if so element will be pushed && set half image full opacity
    //                 !claimed.includes(elementId1) ? 
    //                     // updateHalfImage(elementId1, 1, 1) && claimed.push(elementId1):
    //                     setTimeouts.push(setTimeout(updateHalfImage, delay, elementId1, 1, 1)) && claimed.push(elementId1):
    //                     // else, set image at 0.2 opacity
    //                     setTimeouts.push(setTimeout(updateHalfImage, delay, elementId1, 1, 0.2));
    //             }
    //         } 
    //     }
    //     console.log(`end of do animation playersArray ${playersArray}`)
    // }


    // function updateControlArray() {
    //     // update the control array
    //     let data = controlArray;
    //     console.log(`from setControlArray, playersArray ${playersArray}`)
    //     let tempPA = playersArray;
    //     let longestPA = Math.max(tempPA[0].length, tempPA[1].length);
    //     let elementId0, elementId1;
    //     let seen = [];
    //     for(let i=0; i < longestPA; i++){
    //         elementId0 = tempPA[0].shift();
    //         elementId1 = tempPA[1].shift();
    //         console.log(`from setControlArray, choices -> pid0 ${elementId0} pid1 ${elementId1}`)
    //         // if pid0 entered nothing
    //         if (isNaN(elementId0)) {
    //             if (!seen.includes(elementId1)){
    //                 data[elementId1] = 1
    //                 seen.push(elementId1)
    //                 updateSingleImage(elementId1, 1);
    //             }
    //         // if pid0 entered nothing
    //         } else if (isNaN(elementId1)) {
    //             if (!seen.includes(elementId0)){
    //                 data[elementId0] = 0
    //                 seen.push(elementId0)
    //                 updateSingleImage(elementId0, 0);
    //             }
    //             // if pid0 and pid1 entered the same value
    //         } else if (!isNaN(elementId0) && !isNaN(elementId1)) {
    //             if (elementId0===elementId1){
    //                 // remove the classes from do animation
    //                 removeClassFromElementHalf(elementId0, 0) 
    //                 removeClassFromElementHalf(elementId1, 1)
    //                 // reset color for next round
    //                 updateSingleColor(elementId0, colorArray[elementId0], 1, colorArray);
    //             } else {
    //                 if (!seen.includes(elementId0)) {
    //                     data[elementId0] = 0
    //                     seen.push(elementId0)
    //                     updateSingleImage(elementId0, 0);
    //                 }
    //                 if (!seen.includes(elementId1)) {
    //                     data[elementId1] = 1
    //                     seen.push(elementId1)
    //                     updateSingleImage(elementId1, 1);
    //                 } 
    //             }
    //         }
    //     }
    //     console.log(`from update control array controlArray ${controlArray}`)
    //     console.log(`end update control array playersArray ${playersArray}`)

    //     return data;            
    // }

    // sets the players array max to the minimum of the previous paMax and the unclaimed units left
    function updatePAMax() {
        let data = PAMax;
        let unitsLeft = 0;
        for(let i = 0; i < controlArray.length; i++) {
            if (controlArray[i] === -1) {
                unitsLeft+=1;
            }
        }
        let result = Math.min(unitsLeft, data);
        console.log(`in paMAX unitsLeft ${unitsLeft} current PAMax ${data} returning ${result}`)
        // setPAMax(result);
        console.log(`NEW PA MAX ${PAMax}`)
        return Math.min(unitsLeft, data);

    }

    function resetPlayersArray() {
        console.log(`in resetPlayersArray before pa = ${playersArray}`);
        return [[],[]]
    }


    function updatePlayersArray(elementID, pid){
        // console.log("in set player array " + pid);
        // console.log(`playersArray before ${playersArray} pa0 ${playersArray[0]} pa1 ${playersArray[1]}`);
        
        // let idxA = playersArray[pid].findIndex((element) => element === elementID);
        // console.log(`idxA ${idxA}`)

    
        // setPlayersArray((prevState) => {
            // console.log("prevState before " + prevState);
        let elementToRemove = -1;
        let data = playersArray;
        let idx = data[pid].findIndex((element) => element === elementID);
        console.log(`in set player array idx ${idx} elementID ${elementID} playerArray[0] ${data[pid]}`);

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
        playersArray = data; 
        // });

        // console.log(`elementToRemove ${elementToRemove}`);
        (elementToRemove > -1) && updateSingleColor(elementToRemove, colorArray[elementToRemove], 1);
        // console.log("exiting update players array");
        return true
    }

    // function updateColors(){
    //     console.log("In update colors");
    //     // let pid = 0;
    //     let opacityMultiplier = (PAMax > 1) ? (1/(PAMax - 1)) : 0;
    //     playersArray[humanPid].forEach((value, idx) => {
    //         let backgroundColor = "black";
    //         let opacity = 1 - opacityMultiplier * idx;
    //         console.log(`in updateColors background color ${backgroundColor} opacity ${opacity} opacityMultiplier ${opacityMultiplier}`);
    //         updateSingleColor(value, backgroundColor, opacity);
    //     })
    //     console.log("exiting update colors");
    // }

    // function updateSingleColor(elementID, backgroundColor, opacity) {
    //     console.log(`In update single color. original color ${colorArray[elementID]} new color ${backgroundColor}`);
    //     document.getElementById(`${elementID}`).style.backgroundColor = backgroundColor;
    //     document.getElementById(`${elementID}`).style.opacity = opacity;
    //     document.getElementById(`${elementID}_0`).style.backgroundColor = backgroundColor;
    //     document.getElementById(`${elementID}_0`).style.opacity = opacity;
    //     document.getElementById(`${elementID}_1`).style.backgroundColor = backgroundColor;
    //     document.getElementById(`${elementID}_1`).style.opacity = opacity;
    // }

    // function updateSingleImage(elementID, pid) {
    //     console.log(`In update single IMAGE elementID ${elementID}`);
    //     const e = document.getElementById(elementID).style;
    //     const e0 = document.getElementById(`${elementID}_0`).style;
    //     const e1 = document.getElementById(`${elementID}_1`).style;
    //     removeAttribuesFromElement(e, ["background-color", "opacity"]);
    //     removeAttribuesFromElement(e0, ["background-color", "opacity"]);
    //     removeAttribuesFromElement(e1, ["background-color", "opacity"]);

    //     document.getElementById(`${elementID}_${pid}`).classList.remove(playerDesigns[pid]);
    //     e0.display = "none";
    //     e1.display = "none";

    //     document.getElementById(`${elementID}`).className = (pid === 0) ? playerDesigns[0] : playerDesigns[1];
    // }

    // function updateHalfImage(elementID, pid, opacity) {
    //     console.log(`In update half IMAGE elementID ${elementID}`);
    //     const e = document.getElementById(`${elementID}_${pid}`);
    //     e.style.removeProperty("background-color");
    //     e.className = playerDesigns[pid];
    //     e.style.opacity = opacity;
    // }

    // function removeClassFromElementHalf(elementID, pid) {
    //     document.getElementById(`${elementID}_${pid}`).classList.remove(playerDesigns[pid]);
    // }

    // function removeAttribuesFromElement(element, attributeList) {
    //     console.log(`in removeAttribuesFromElement ${element}`);
    //     attributeList.forEach((attribute) => {
    //         element.removeProperty(attribute);
    //     })
    // }




    function handleClick(id){
        console.log(`in handle click index = ${id} is element id ${id} claimed? -> ${!(controlArray[id] === -1)}`);
        // original below
        // isLive && (controlArray[id] === -1) && updatePlayersArray(id, humanPid) && updateColors(PAMax, playersArray, humanPid, colo);
        isLive && (controlArray[id] === -1) && updatePlayersArray(id, humanPid) && updateColors(humanPid);
        return console.log("exited handleClick!")
    }

    

    // const {minSide, maxSide} = getWindowMinMax();
    // // const {width, height} = useWindowDimensions();
    // // set the width to 80% of the smallest side of the viewport
    // const arenaWidth = Math.ceil(minSide * (squareSize/100));


    return (
        <div>
                {/* <Header /> */}
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