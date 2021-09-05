import React from "react";


export function MakeNewControlArray(numUnits){
    return new Array(numUnits).fill(-1);
}

export function UpdateControlArray(props) {
    const {controlArray, setControlArray, playerArrayHuman, playerArrayBot} = props.stateDictForUpdateControlArray;

    // update the control array
        let data = controlArray;
        let elementId0, elementId1;
        let seen = [];

        let longestPA = Math.max(playerArrayHuman.length, playerArrayBot.length);
        for(let i=0; i < longestPA; i++){
            // if the index i is in the array return the element, else return undefined which is NaN
            elementId0 = (i < playerArrayHuman.length) ? playerArrayHuman[i] : undefined;
            elementId1 = (i < playerArrayBot.length) ? playerArrayBot[i] : undefined;

            // if pid0 entered nothing
            if (isNaN(elementId0)) {
                if (!seen.includes(elementId1)){
                    data[elementId1] = 1
                    seen.push(elementId1)
                }
            // if pid0 entered nothing
            } else if (isNaN(elementId1)) {
                if (!seen.includes(elementId0)){
                    data[elementId0] = 0
                    seen.push(elementId0)
                }
                // if pid0 and pid1 entered the same value
            } else if (!isNaN(elementId0) && !isNaN(elementId1)) {
                if (elementId0===elementId1){

                } else {
                    if (!seen.includes(elementId0)) {
                        data[elementId0] = 0
                        seen.push(elementId0)
                    }
                    if (!seen.includes(elementId1)) {
                        data[elementId1] = 1
                        seen.push(elementId1)
                    } 
                }
            }
            console.log(`end rounds ${i} update control array playersArray ${playersArray}`)
        }
    console.log(`from update control array controlArray copy = ${data}`)
    setControlArray(data);
    return null;           
}