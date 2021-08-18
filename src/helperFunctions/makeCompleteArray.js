import Gradient from "javascript-color-gradient";
import { colorBase } from "./globals";
// import { arenaObject, totalUnits } from "../components/Arena";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function makeCompleteArray(arenaObject, totalUnits){
    // depending on the units in the arena, we will add a number of colors to the colorbase
    let ColorBaseIndices =  (totalUnits < 10) ? 4 :
                            (totalUnits < 20) ? 6 :
                            (totalUnits < 30) ? 8 :
                            (totalUnits < 40) ? 10 : 12;
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

    // append a color onto each element in arena object
    const outputArray = arenaObject.map((row, idx) => {    
        let rowLength = row.length;
        // reverse the list if the row is of an odd index
        let currentRow = completeArray.splice(0, rowLength);
        let colorRow = (idx % 2 === 0) ? currentRow : currentRow.reverse();  
        colorArray = colorArray.concat(colorRow);
        // append a color onto each element in the row
        row.forEach((element, i) => element.push(colorRow[i]))
        return row;
    })

    console.log(`colorArray 48th idx ${colorArray[48]}`);

    return [outputArray, colorArray]
}