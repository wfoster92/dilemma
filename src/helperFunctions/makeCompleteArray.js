import Gradient from "javascript-color-gradient";

export function makeCompleteArray(colorBase, outputLength, arenaObject){
    const colorGradient = new Gradient();
        
    colorGradient.setMidpoint(outputLength);
    // colorGradient.setGradient(color1, color2, color3, color4) PREVIOUS

    colorGradient.setGradient(...colorBase);
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

    return [outputArray, colorArray]
}