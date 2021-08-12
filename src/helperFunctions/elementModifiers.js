import { PAMax, colorArray } from "../components/Arena"
import { playerDesigns } from "./globals";

export function updateColors(playersArray, humanPid){
    console.log("In update colors");
    // let pid = 0;
    let opacityMultiplier = (PAMax > 1) ? (1/(PAMax - 1)) : 0;
    playersArray[humanPid].forEach((value, idx) => {
        let backgroundColor = "black";
        let opacity = 1 - opacityMultiplier * idx;
        console.log(`in updateColors background color ${backgroundColor} opacity ${opacity} opacityMultiplier ${opacityMultiplier}`);
        updateSingleColor(value, backgroundColor, opacity);
    })
    console.log("exiting update colors");
}

export function updateSingleColor(elementID, backgroundColor, opacity) {
    console.log(`In update single color. original color ${colorArray[elementID]} new color ${backgroundColor}`);
    document.getElementById(`${elementID}`).style.backgroundColor = backgroundColor;
    document.getElementById(`${elementID}`).style.opacity = opacity;
    document.getElementById(`${elementID}_0`).style.backgroundColor = backgroundColor;
    document.getElementById(`${elementID}_0`).style.opacity = opacity;
    document.getElementById(`${elementID}_1`).style.backgroundColor = backgroundColor;
    document.getElementById(`${elementID}_1`).style.opacity = opacity;
}

export function updateSingleImage(elementID, pid) {
    console.log(`In update single IMAGE elementID ${elementID}`);
    const e = document.getElementById(elementID).style;
    const e0 = document.getElementById(`${elementID}_0`).style;
    const e1 = document.getElementById(`${elementID}_1`).style;
    removeAttribuesFromElement(e, ["background-color", "opacity"]);
    removeAttribuesFromElement(e0, ["background-color", "opacity"]);
    removeAttribuesFromElement(e1, ["background-color", "opacity"]);

    document.getElementById(`${elementID}_${pid}`).classList.remove(playerDesigns[pid]);
    e0.display = "none";
    e1.display = "none";

    document.getElementById(`${elementID}`).className = (pid === 0) ? playerDesigns[0] : playerDesigns[1];
}


export function animateStepUpdateHalfImage(elementID, pid, opacity) {
    console.log(`In update half IMAGE elementID ${elementID}`);
    const e = document.getElementById(`${elementID}_${pid}`);
    e.style.removeProperty("background-color");
    e.className = playerDesigns[pid];
    e.style.opacity = opacity;
}

export function removeClassFromElementHalf(elementID, pid) {
    document.getElementById(`${elementID}_${pid}`).classList.remove(playerDesigns[pid]);
}

export function removeAttribuesFromElement(element, attributeList) {
    console.log(`in removeAttribuesFromElement ${element}`);
    attributeList.forEach((attribute) => {
        element.removeProperty(attribute);
    })
}