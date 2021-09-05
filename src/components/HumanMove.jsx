import React from "react";



function HumanMove(props) {
    const {elementID, PAMax, isHumanPAFull, setIsHumanPAFull, playerArrayHuman, setPlayerArrayHuman, setChoicesLeft} = props.stateDictForHumanMove;
    const pid = 0;
    // export function updatePlayersArray(elementID, pid, PAMax){
        function updateIsPAFull(pid, aBoolean) {
            isPAFull[pid] = aBoolean
        }

        let elementToRemove = -1;
        let data = playersArray;
        let idx = playerArrayHuman.findIndex((element) => element === elementID);
        console.log(`in set player array idx ${idx} elementID ${elementID} playerArray[0] ${data[pid]}`);
    
        // the elementID is in the current players list and not in first place -> swap the positions of it's index and the one in front
        if (idx > 0) {
            let temp = data[pid][idx];
            data[pid][idx] = data[pid][idx - 1];
            data[pid][idx - 1] = temp;
        // the elementID is in first place and needs to be dropped from the playersArray
        } else if (idx === 0) {
            elementToRemove = data[pid].shift();
        // the elementID is not on the list, add it to the end kicking out the last element if the array is full
        } else if (idx < 0) {
            if (isPAFull[pid]){
                elementToRemove = data[pid].pop()
                // updateIsPAFull(pid, false);
                setIsHumanPAFull(false);
            } 
            console.log(`About to push ${elementID}`);
            data[pid].push(elementID);
            console.log(data[0], data[1]);
            if (data[pid].length === PAMax) {
                setIsPAFull(prevState => [true, prevState[1]])

            }
            (data[pid].length === PAMax) && setIsHumanPAFull(true)
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