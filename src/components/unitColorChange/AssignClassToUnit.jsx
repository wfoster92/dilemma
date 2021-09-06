// This is called after a unit is claimed - giving the whole unit one class, and hiding the half units
export function updateSingleImage(elementID, pid) {
    console.log(`In update single IMAGE elementID ${elementID}`);

    let tempClassNameDict = {};
    let tempStyleDict = {};
    tempStyleDict[`${elementID}_0`] = {display: "none"};
    tempStyleDict[`${elementID}_1`] = {display: "none"};
    // remove the background-color from the styleDict by replacing its value with only opacity
    tempStyleDict[elementID] = {opacity: 1};
    tempClassNameDict[`${elementID}_0`] = "";
    tempClassNameDict[`${elementID}_1`] = "";
    tempClassNameDict[elementID] = (pid === 0) ? playerDesigns[0] : playerDesigns[1];

    return [tempClassNameDict, tempStyleDict];
}