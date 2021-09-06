import React from "react";
import { colorBase } from "./globals";
import Gradient from "javascript-color-gradient";



function createSegments(numSegments){
    let segments = [];
    for (let i=0; i < numSegments; i++){
        segments.push(Math.random())
    }
    const reducer = (acc, item) => {
        return acc+item;
    }
    // add the values of the randomly generated array 
    let segmentsSum = segments.reduce(reducer, 0)
    // divide by its sum so that the adjusted array adds to 1
    const adjustedSegments = segments.map((s) => s/segmentsSum);
    
    return adjustedSegments
}


function shuffleArray(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

function makeColorArray(rows, cols, totalUnits){
    // depending on the units in the arena, we will add a number of colors to the colorbase
    let ColorBaseIndices =  (totalUnits < 10) ? 4 :
    (totalUnits < 20) ? 8 :
    (totalUnits < 30) ? 12 :
    (totalUnits < 40) ? 16 : 18;

    // shuffle the order of the imported colorBase so there is a new color pallete each game
    let shuffledColorBase = shuffleArray(colorBase);
    let workingColorBase = [];
    for (let i = 0; i < ColorBaseIndices; i++) {
        workingColorBase.push(shuffledColorBase[i]);
    }
    const colorGradient = new Gradient();

    colorGradient.setMidpoint(totalUnits+1);

    // provides the colors used to make the colorArray
    colorGradient.setGradient(...workingColorBase);
    let startingColorArray = colorGradient.getArray();
    let colorArray = [];
    let rowLength = cols;
    let currentRow;
    for (let idx=0; idx < rows; idx++){
        currentRow = startingColorArray.splice(0, rowLength);
        currentRow = (idx % 2 === 0) ? currentRow : currentRow.reverse();
        colorArray.concat(currentRow);
    }
    return colorArray;
}




function makeContent(numRows, numCols, totalUnits) {
    let tempCompleteArray = [];
    let tempAreaArray = [];
    tempColorArray = makeColorArray(numRows, numCols, totalUnits);

    let tempStyleDict = {}; 
    let tempClassNameDict = {};
    let rows = createSegments(numRows);
    let offset;

    // create the completeArray, tempStyleDict, and tempClassNameDict
    for (let r=0; r < rows.length; r++) {
        let newCol = createSegments(numCols);
        let newRow = [];
        offset = r * numCols;
        let index;
        newCol.forEach((c, idx) => 
        {   
            index = offset+idx;
            // width, height, index, color
            let newElement = [c, rows[r], index, colorArray[index]];
            // let newElement = [offset+idx, {width:c, height: rows[r], backgroundColor:"black"}];
            tempAreaArray.push(c * rows[r]);
            newRow.push(newElement)
            tempStyleDict[index] = {backgroundColor: colorRow[index]};
            tempStyleDict[`${index}_0`] = {backgroundColor: colorRow[index]};
            tempStyleDict[`${index}_1`] = {backgroundColor: colorRow[index]};
            tempClassNameDict[index] = "";
            tempClassNameDict[`${index}_0`] = "";
            tempClassNameDict[`${index}_1`] = "";
        })
        tempCompleteArray.push(newRow);
    }
    // console.log(`areaArray ${areaArray}`)
    return [tempAreaArray, tempColorArray, tempCompleteArray, tempStyleDict, tempClassNameDict];
}

function MakeArenaContent(props){
    const {rows, cols, units} = props.stateDictForMakeArenaContent;
    return makeContent(rows, cols, units);
}

export default MakeArenaContent;