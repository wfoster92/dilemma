export function createSegments(numSegments){
    let segments = [];
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


export function makeArenaObject(numRows, numCols) {
    let arenaObject = [];
    let areaArray = [];
    let rows = createSegments(numRows);
    let offset = 0;

    // create the arenaObject list
    for (let r=0; r < rows.length; r++) {
        let newCol = createSegments(numCols);
        let newRow = [];
        newCol.forEach((c, idx) => 
        {   
            // width, height, index
            let newElement = [c, rows[r], offset+idx];
            // idx, styleDict
            // let newElement = [offset+idx, {width:c, height: rows[r], backgroundColor:"black"}];
            areaArray.push(c * rows[r]);
            newRow.push(newElement)}

        )
        arenaObject.push(newRow);
        offset += newCol.length;
    }
    console.log(`areaArray ${areaArray}`)
    return [arenaObject, areaArray];
}
