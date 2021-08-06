import React from "react";
import { PAMax, playersArray, colorArray, areaArray, controlArray } from "../components/Arena"
import { difficulty } from "./globals"
import { updateSingleColor, updateSingleImage, updateHalfImage, removeClassFromElementHalf } from "./elementModifiers";


export function doAnimation(interval) {
    let tempPA = playersArray.slice();
    let [playerArray0, playerArray1] = tempPA;
    interval = 1000;
    // console.log(`in do animation player0 ${player0} player1 ${player1}`)
    let elementId0, elementId1, delay;
    let setTimeouts = [];
    let claimed = [];
    let longestPA = Math.max(playerArray0.length, playerArray1.length);
    for(let idx=0; idx < longestPA; idx++) {
        delay = interval * (idx+1);
        elementId0 = (playerArray0.length >= idx+1) ? playerArray0[idx] : undefined;
        elementId1 = (playerArray1.length >= idx+1) ? playerArray1[idx] : undefined;
        // elementId0 = playerArray0.shift();
        // elementId1 = playerArray1.shift();
        // console.log(`do animation round ${idx} ele0 ${elementId0} ele1 ${elementId1} current delay ${delay} longestPA ${longestPA}`)
        // if pid0 entered nothing
        if (isNaN(elementId0)) {
            console.log(`elementId0 ${elementId0} is not a number`)
            if (!claimed.includes(elementId1)){
                
                // updateHalfImage(elementId1, 1, 1)
                setTimeouts.push(setTimeout(updateHalfImage, delay, elementId1, 1, 1)) && claimed.push(elementId1);
            }
        // if pid0 entered nothing
        } else if (isNaN(elementId1)) {
            if (!claimed.includes(elementId0)){
                
                // updateHalfImage(elementId0, 0, 1)
                setTimeouts.push(setTimeout(updateHalfImage, delay, elementId0, 0, 1)) && claimed.push(elementId0);
            }
        // if pid0 and pid1 entered the same value
        } else if (!isNaN(elementId0) && !isNaN(elementId1)) {
            if (elementId0===elementId1){
                // show both in half image
                setTimeouts.push(setTimeout(updateHalfImage, delay, elementId0, 0, 1));
                setTimeouts.push(setTimeout(updateHalfImage, delay, elementId1, 1, 1));
            } else {
                // Does claimed array not include element0? if so element will be pushed && set half image full opacity
                !claimed.includes(elementId0) ? 
                    setTimeouts.push(setTimeout(updateHalfImage, delay, elementId0, 0, 1)) && claimed.push(elementId0):
                    // else, set image at 0.2 opacity
                    setTimeouts.push(setTimeout(updateHalfImage, delay, elementId0, 0, 0.2));

                // Does claimed array not include element0? if so element will be pushed && set half image full opacity
                !claimed.includes(elementId1) ? 
                    // updateHalfImage(elementId1, 1, 1) && claimed.push(elementId1):
                    setTimeouts.push(setTimeout(updateHalfImage, delay, elementId1, 1, 1)) && claimed.push(elementId1):
                    // else, set image at 0.2 opacity
                    setTimeouts.push(setTimeout(updateHalfImage, delay, elementId1, 1, 0.2));
            }
        } 
    }
    // this log is to check for any unwanted change in playersArray
    console.log(`end of do animation playersArray ${playersArray}`)
}


export function updateControlArray() {
    // update the control array
        let data = controlArray;
        let elementId0, elementId1;
        let seen = [];
        let [playerArray0, playerArray1] = playersArray;

        let longestPA = Math.max(playerArray0.length, playerArray1.length);
        for(let i=0; i < longestPA; i++){
            elementId0 = playerArray0.shift();
            elementId1 = playerArray1.shift();
            console.log(`from setControlArray, choices -> pid0 ${elementId0} pid1 ${elementId1}`)
            // if pid0 entered nothing
            if (isNaN(elementId0)) {
                if (!seen.includes(elementId1)){
                    data[elementId1] = 1
                    seen.push(elementId1)
                    updateSingleImage(elementId1, 1);
                }
            // if pid0 entered nothing
            } else if (isNaN(elementId1)) {
                if (!seen.includes(elementId0)){
                    data[elementId0] = 0
                    seen.push(elementId0)
                    updateSingleImage(elementId0, 0);
                }
                // if pid0 and pid1 entered the same value
            } else if (!isNaN(elementId0) && !isNaN(elementId1)) {
                if (elementId0===elementId1){
                    // remove the classes from do animation
                    removeClassFromElementHalf(elementId0, 0) 
                    removeClassFromElementHalf(elementId1, 1)
                    // reset color for next round
                    updateSingleColor(elementId0, colorArray[elementId0], 1);
                } else {
                    if (!seen.includes(elementId0)) {
                        data[elementId0] = 0
                        seen.push(elementId0)
                        updateSingleImage(elementId0, 0);
                    }
                    if (!seen.includes(elementId1)) {
                        data[elementId1] = 1
                        seen.push(elementId1)
                        updateSingleImage(elementId1, 1);
                    } 
                }
            }
        }
        console.log(`from update control array controlArray copy = ${data}`)
        console.log(`end update control array playersArray ${playersArray}`)
        return data;           
}

export function makeBotMove() {
    let randomIndexMin, randomIndexMax;
    switch (difficulty) {
        case 0:
            randomIndexMin = 0;
            randomIndexMax = 2;
            break;
        case 1:
            randomIndexMin = 0;
            randomIndexMax = 4;
            break
        case 2:
            randomIndexMin = 1;
            randomIndexMax = 6;
            break
        case 3:
            randomIndexMin = 2;
            randomIndexMax = 8;
            break
        default:
            break;
    }

    let data = playersArray;
    let tempAreaArray = areaArray;
    console.log(`area array, no elements filtered out ${tempAreaArray}`);
    // return the areaArray elements that are still available in the controlArray
    let availableAreaArray = tempAreaArray.map((element, idx) =>  (controlArray[idx] < 0) ? [element, idx] : [element, -100]);
    console.log(`unsorted availableAreaArray filtered out control array ${availableAreaArray}`);
    // map the areaArray to arrays of [area, index]
    // availableAreaArray = availableAreaArray.map((e, idx) => [e, idx])
    // console.log(`unsorted availableAreaArray each element us array ${availableAreaArray}`);
    // sort in descending order by area
    let sortedAvailableAreaArray = availableAreaArray.sort((a,b) => b[0]-a[0]);
    console.log(`sortedAvailableAreaArray each element array ${sortedAvailableAreaArray}`);
    // filter out the elements that are not in the controlArray 
    sortedAvailableAreaArray = sortedAvailableAreaArray.filter((e) => e[1] > -1);
    // map the sortedAvailableAreaArray back to and array of index values (sorted by area)
    sortedAvailableAreaArray = sortedAvailableAreaArray.map((e) => e[1])
    console.log(`sortedAvailableAreaArray final, no longer array ${sortedAvailableAreaArray}`);
    // This may be where things break, assigning the hook to a variable
    let choicesLeft = PAMax;
    let unitsLeft = sortedAvailableAreaArray.length;
    // the elementIDs to add to the bot's player array
    let choices = [];
    let initialSelection, idxChoice;
    // make selections until the bot's player array is complete
    let maxminDiff = randomIndexMax-randomIndexMin;
    while (choicesLeft > 0) {
        // choose index at random given the results of the above switch statement
        initialSelection = Math.floor((Math.random() * maxminDiff ) + randomIndexMin);
        // make a selection controlling the case in which the initialSelection was out of bounds of the sortedAvailableAreaArray
        idxChoice = Math.min(initialSelection, unitsLeft-1)
        // append the elementid to the choices array
        choices.push(sortedAvailableAreaArray[idxChoice])
        // remove the elementid from the sortedAvailableAreaArray
        sortedAvailableAreaArray.splice(idxChoice, 1);
        unitsLeft--;
        choicesLeft--;
        console.log(`choices ${choices} unitsLeft ${unitsLeft}`)
    }
    data[1] = choices;
    console.log(`at end of make bot move, players array -> ${data}`)
    return data;
}
