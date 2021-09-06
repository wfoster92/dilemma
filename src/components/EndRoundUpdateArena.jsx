import React from "react";
import { playersArray, colorArray } from "./Arena"
import { updateSingleColor, updateSingleImage} from "../helperFunctions/elementModifiers";
import ResetUnitColor from "./unitColorChange/ResetUnitColor";

function EndRoundUpdateArena(props){

    const {setClassNameDict, setStyleDict} = props.stateDictForEndRoundUpdateArena;

    // This is called after a unit is claimed - giving the whole unit one class, and hiding the half units
    function callUpdateSingleImage(elementID, pid){
        let tempClassNameDict, tempStyleDict;
        [tempClassNameDict, tempStyleDict] = updateSingleImage(elementID, pid);
        setClassNameDict(prevState => ({...prevState, ...tempClassNameDict}))
        setStyleDict(prevState => ({...prevState, ...tempStyleDict}))   
    }

    // This takes out the class given to half of a unit in the case of a draw
    function callRemoveClassFromElementHalf(elementID, pid){
        let tempClassNameDict = {};
        tempClassNameDict[`${elementID}_${pid}`] = "";
        console.log(`tempClassNameDict  ${tempClassNameDict}`)
        setClassNameDict(prevState => ({...prevState, ...tempClassNameDict}))
    }

    // This is called after a draw and resets color for next round
    function callUpdateSingleColor(elementID, backgroundColor, opacity){
        let tempStyleDict = {};
        tempStyleDict = ResetUnitColor({elementID, backgroundColor, opacity});
        // tempStyleDict = updateSingleColor(elementID, backgroundColor, opacity);
        setStyleDict(prevState => ({...prevState, ...tempStyleDict}))   
    }

    let elementId0, elementId1;
    let seen = [];
    let [playerArray0, playerArray1] = playersArray;

    let longestPA = Math.max(playerArray0.length, playerArray1.length);
    for(let i=0; i < longestPA; i++){
        // if the index i is in the array return the element, else return undefined which is NaN
        elementId0 = (i < playerArray0.length) ? playerArray0[i] : undefined;
        elementId1 = (i < playerArray1.length) ? playerArray1[i] : undefined;
        console.log(`from setControlArray, choices -> pid0 ${elementId0} pid1 ${elementId1}`)
        // if pid0 entered nothing
        if (isNaN(elementId0)) {
            if (!seen.includes(elementId1)){
                seen.push(elementId1);
                callUpdateSingleImage(elementId1, 1);
            }
        // if pid0 entered nothing
        } else if (isNaN(elementId1)) {
            if (!seen.includes(elementId0)){
                seen.push(elementId0);
                callUpdateSingleImage(elementId0, 0);
            }
            // if pid0 and pid1 entered the same value
        } else if (!isNaN(elementId0) && !isNaN(elementId1)) {
            if (elementId0===elementId1){
                // remove the classes from do animation
                callRemoveClassFromElementHalf(elementId0, 0);
                callRemoveClassFromElementHalf(elementId1, 1);
                // reset color for next round
                callUpdateSingleColor(elementId0, colorArray[elementId0], 1);
            } else {
                if (!seen.includes(elementId0)) {
                    seen.push(elementId0);
                    callUpdateSingleImage(elementId0, 0);
                }
                if (!seen.includes(elementId1)) {
                    seen.push(elementId1);
                    callUpdateSingleImage(elementId1, 1);
                } 
            }
        }

    }
    return null;          
}

export default EndRoundUpdateArena;