import Gradient from "javascript-color-gradient";
import { colorBase } from "./globals";
// import { arenaObject, totalUnits } from "../components/Arena";

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

export function makeCompleteArray(arenaObject, totalUnits){
    // depending on the units in the arena, we will add a number of colors to the colorbase
    let ColorBaseIndices =  (totalUnits < 10) ? 4 :
                            (totalUnits < 20) ? 8 :
                            (totalUnits < 30) ? 12 :
                            (totalUnits < 40) ? 16 : 18;

    let shuffledColorBase = shuffleArray(colorBase);
    let workingColorBase = [];
    for (let i = 0; i < ColorBaseIndices; i++) {
        workingColorBase.push(shuffledColorBase[i]);
    }
    // once we add the colors to the base array, shuffle the order
    
    const colorGradient = new Gradient();
    console.log(`in makeCompleteArray, totalUnits ${totalUnits}`);
    colorGradient.setMidpoint(totalUnits+1);
    // colorGradient.setGradient(color1, color2, color3, color4) PREVIOUS

    colorGradient.setGradient(...workingColorBase);
    const completeArray = colorGradient.getArray();
    let colorArray = [];

    let tempStyleDict = {}; 
    let tempClassNameDict = {};


    // append a color onto each element in arena object
    const outputArray = arenaObject.map((row, idx) => {    
        let rowLength = row.length;
        // reverse the list if the row is of an odd index
        let currentRow = completeArray.splice(0, rowLength);
        let colorRow = (idx % 2 === 0) ? currentRow : currentRow.reverse();
        colorArray = colorArray.concat(colorRow);
        // append a color onto each element in the row
        // row.forEach((element, i) => element.push(colorRow[i]))
        // add the color into the element's styleDictionary
        let tempIdx, tempDict;                           
        row.forEach((element, i) =>{
          element.push(colorRow[i])
          
          tempIdx = element[2];
          tempDict={backgroundColor: colorRow[i]}
          tempStyleDict[tempIdx] = tempDict;
          tempStyleDict[`${tempIdx}_0`] = tempDict;
          tempStyleDict[`${tempIdx}_1`] = tempDict;
          tempClassNameDict[tempIdx] = "";
          tempClassNameDict[`${tempIdx}_0`] = "";
          tempClassNameDict[`${tempIdx}_1`] = "";
        });
        return row;
    })

    console.log(`colorArray 48th idx ${colorArray[48]}`);
    return [outputArray, colorArray, tempStyleDict, tempClassNameDict]
}