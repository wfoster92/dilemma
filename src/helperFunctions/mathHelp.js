import Gradient from "javascript-color-gradient";

export function createSegments(minSegments, maxSegments){
    let segments = [];
    // get a random number of elements to output between the min and max
    let numSegments =  minSegments + Math.floor(Math.random() * ((maxSegments + 1) - minSegments));
    for (let i=0; i < numSegments; i++){
        segments.push(Math.random())
    }

    const reducer = (acc, item) => {
        return acc+item;
    }
    // add the values of the randomly generated array 
    let segmentsSum = segments.reduce(reducer, 0)
    // console.log(segmentsSum)
    // divide by its sum so that the adjusted array adds to 1
    const adjustedSegments = segments.map((s) => s/segmentsSum);
    

    return adjustedSegments
}

export function makeColorArray(colorBase, outputLength, arenaObject){
    const colorGradient = new Gradient();
        
    colorGradient.setMidpoint(outputLength);
    // colorGradient.setGradient(color1, color2, color3, color4) PREVIOUS

    colorGradient.setGradient(...colorBase);
    const colorArray = colorGradient.getArray();
    // console.log(`arenaObject ${arenaObject}`)
    // arenaObject.forEach(row => 
    //     {console.log("row");
    //     console.log(row);
            // console.log(`in color array arena object row ${row}`)
        // row.forEach(element => 
        //     console.log(`element arena object ${element}`))});
    const outputArray = arenaObject.map((row, idx) => {    
        // console.log(`row ${row} \nrow length ${row.length}`);
        let rowLength = row.length;
        // reverse the list if the row is of an odd index
        // console.log(`colorArray length ${colorArray.length} to subtract ${rowLength}`)
        let colorRow = (idx % 2 === 0) ? colorArray.splice(0, rowLength) : colorArray.splice(0, rowLength).reverse();  
        // console.log(`color row = ${colorRow}`);
        // append a color onto each element in the row
        row.forEach((element, i) => element.push(colorRow[i]))
        return row;
    })

    console.log(outputArray);
    return outputArray
}