import { minRows, maxRows, minCols, maxCols } from "./globals";

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


export function makeArenaObject() {
    let arenaObject = [];
    let areaArray = [];
    let rows = createSegments(minRows,maxRows);
    let totalUnits = 0;

    // create the arenaObject list
    for (let r=0; r < rows.length; r++) {
        let newCol = createSegments(minCols, maxCols);
        let newRow = [];
        newCol.forEach((c, idx) => 
            {console.log(c);
            let newElement = [c, rows[r], totalUnits+idx];
            areaArray.push(c * rows[r]);
            newRow.push(newElement)}
        )
        arenaObject.push(newRow);
        totalUnits += newCol.length;
    }
    return [arenaObject, totalUnits, areaArray];
}
