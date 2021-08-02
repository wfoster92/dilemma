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
