import React from "react";


function BotMove(props) {
    const {setPlayerArrayBot, PAMax, difficulty, areaArray, controlArray} = props.stateDictForBotMove;

    export function makeBotMove(difficulty, PAMax) {
        function getrandomIndexMinMax(difficulty, unitsRemaining){
            let randomIndexMin, randomIndexMax;
            switch (difficulty) {
                case 4:
                    randomIndexMin = 0;
                    randomIndexMax = 0;
                    break;
                case 3:
                    randomIndexMin = 0;
                    randomIndexMax = (unitsRemaining < 5) ? 1 : Math.floor(unitsRemaining * 0.25) 
                    break
                case 2:
                    randomIndexMin = 0;
                    randomIndexMax = (unitsRemaining < 5) ? 2 : Math.floor(unitsRemaining * 0.6) 
                    break
                case 1:
                    randomIndexMin = 0;
                    randomIndexMax = unitsRemaining-1;
                    break
                default:
                    break;
            }
            return [randomIndexMin, randomIndexMax]
        }
    
    
        console.log(`area array, no elements filtered out ${areaArray}`);
        // return the areaArray elements that are still available in the controlArray
        let availableAreaArray = areaArray.map((element, idx) =>  (controlArray[idx] < 0) ? [element, idx] : [element, -100]);
        console.log(`unsorted availableAreaArray filtered out control array ${availableAreaArray}`);
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
        console.log(`in bot move choicesLeft = ${choicesLeft}`);
        let unitsLeft = sortedAvailableAreaArray.length;
    
        let [randomIndexMin, randomIndexMax] = getrandomIndexMinMax(difficulty, unitsLeft);
        let maxminDiff = randomIndexMax - randomIndexMin;
        // the elementIDs to add to the bot's player array
        let choices = [];
        let initialSelection, idxChoice;
        // make selections until the bot's player array is complete
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
            console.log(`maxminDiff ${maxminDiff} randomIndexMin ${randomIndexMin} difficulty ${difficulty}`)
            console.log(`choices ${choices} initialSelection ${initialSelection} unitsLeft ${unitsLeft}`)
        }
        setPlayerArrayBot(choices);
        console.log(`at end of make bot move, bot choices -> ${choices}`)
        return null;
    }
}

export default BotMove;