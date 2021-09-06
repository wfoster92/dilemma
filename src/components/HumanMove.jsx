import React from "react";



function HumanMove(props) {
    const {elementID, PAMax, isHumanPAFull, setIsHumanPAFull, playerArrayHuman, setPlayerArrayHuman, setChoicesLeft, colorArray} = props.stateDictForHumanMove;
    const pid = 0;
    // export function updatePlayersArray(elementID, pid, PAMax){

    let elementToRemove = -1;
    let data = playerArrayHuman;
    let idx = playerArrayHuman.findIndex((element) => element === elementID);
    console.log(`in set player array idx ${idx} elementID ${elementID} playerArray[0] ${data}`);

    // the elementID is in the current players list and not in first place -> swap the positions of it's index and the one in front
    if (idx > 0) {
        let temp = data[idx];
        data[idx] = data[idx - 1];
        data[idx - 1] = temp;
    // the elementID is in first place and needs to be dropped from the playersArray
    } else if (idx === 0) {
        elementToRemove = data.shift();
    // the elementID is not on the list, add it to the end kicking out the last element if the array is full
    } else if (idx < 0) {
        if (isHumanPAFull){
            elementToRemove = data.pop();
            // setIsHumanPAFull(false);
        } 
        console.log(`About to push ${elementID}`);
        data[pid].push(elementID);

        if (data.length === PAMax) {
            setIsHumanPAFull(true)
        } 
    }
    console.log(`playersArray after ${data} elementToRemove ${elementToRemove}`);

    let toRemoveDict = {}
    // if there is an element remove from the players list (a positive elementToRemove variable) set its color back to the original
    if(elementToRemove > -1){
        toRemoveDict = updateSingleColor(elementToRemove, colorArray[elementToRemove], 1);
    }
    setPlayerArrayHuman(data);
    setChoicesLeft(PAMax - playerArrayHuman.length);

    return toRemoveDict;
    // }
}


export default HumanMove;