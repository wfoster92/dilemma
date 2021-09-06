import { playerDesigns } from "./globals";
// import { updateSingleColor } from "./elementModifiers"
import ResetUnitColor from "../components/unitColorChange/ResetUnitColor";

export function resetColors(colorArray) {
    colorArray.forEach((color, idx) => {
        // check that the element exists, if run restoreUnit, 
        // else (there are more elements than before) you can skip it as there's nothing to color over
        if (document.body.contains(document.getElementById(idx))){
            restoreUnit(color, idx);
        }
    })
} 

function restoreUnit(color, elementID) {

    document.getElementById(elementID).classList.remove(...playerDesigns);
    document.getElementById(`${elementID}_0`).classList.remove(...playerDesigns);
    document.getElementById(`${elementID}_1`).classList.remove(...playerDesigns);
    document.getElementById(`${elementID}_0`).style.display = "inline-block";
    document.getElementById(`${elementID}_1`).style.display = "inline-block";

    stateDictForResetUnitColor = {elementID:e, backgroundColor:colorArray[e], opacity:1}
    ResetUnitColor({stateDictForResetUnitColor:stateDictForResetUnitColor})
    // updateSingleColor(elementID, color, 1);

}