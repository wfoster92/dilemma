import { colorArray } from "../components/Arena"
import { playerDesigns } from "./globals";

// as the human player's playerArray updates, color the units selected according 
export function updateColors(playersArray, humanPid, PAMax){
    // let pid = 0;
    let opacityMultiplier = (PAMax > 1) ? (1/(PAMax - 1)) : 0;
    let updateDict= {};
    let singleUpdate;
    playersArray[humanPid].forEach((value, idx) => {
        let backgroundColor = "black";
        let opacity = 1 - opacityMultiplier * idx;
        // console.log(`in updateColors background color ${backgroundColor} opacity ${opacity} opacityMultiplier ${opacityMultiplier}`);
        singleUpdate = updateSingleColor(value, backgroundColor, opacity);
        // merge the two dictionaries together
        updateDict = {...updateDict, ...singleUpdate}
    })
    // console.log("exiting update colors");
    return updateDict;
}

// This is called after a draw and resets color for next round
export function updateSingleColor(elementID, backgroundColor, opacity) {
    console.log(`In update single color. original color ${colorArray[elementID]} new color ${backgroundColor}`);
    // document.getElementById(`${elementID}`).style.backgroundColor = backgroundColor;
    // document.getElementById(`${elementID}`).style.opacity = opacity;
    // document.getElementById(`${elementID}_0`).style.backgroundColor = backgroundColor;
    // document.getElementById(`${elementID}_0`).style.opacity = opacity;
    // document.getElementById(`${elementID}_1`).style.backgroundColor = backgroundColor;
    // document.getElementById(`${elementID}_1`).style.opacity = opacity;
    let outputDict = {}; 
    outputDict[elementID] = {backgroundColor: backgroundColor, opacity: opacity};
    outputDict[`${elementID}_0`] = {backgroundColor: backgroundColor, opacity: opacity};
    outputDict[`${elementID}_1`] = {backgroundColor: backgroundColor, opacity: opacity};
    return outputDict;
}

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

// set the class and opacity of the half unit during the Animation session
export function animateStepUpdateHalfImage(elementID, pid, opacity) {

    let tempStyleDict = {}
    let tempClassNameDict = {}
    tempStyleDict[`${elementID}_${pid}`] = {opacity:opacity}
    tempClassNameDict[`${elementID}_${pid}`] = playerDesigns[pid];
    return [tempStyleDict, tempClassNameDict];
}
