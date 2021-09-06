import { playerDesigns } from "./globals";
// import { updateSingleColor } from "./elementModifiers"
import ResetUnitColor from "../components/unitColorChange/ResetUnitColor";

export function resetColorsHelp(colorArray) {
    let tempClassNameDict = {};
    let tempStyleDict = {};
    colorArray.forEach((color, idx) => {
        // check that the element exists, if yes, run restoreUnit, 
        // else (there are more elements than before) you can skip it as there's nothing to color over
        if (document.body.contains(document.getElementById(idx))){
            const [unitClassNameDict, unitStyleDict] = restoreUnit(color, idx);
            tempClassNameDict = {...tempClassNameDict, ...unitClassNameDict};
            tempStyleDict = {...tempStyleDict, ...unitStyleDict};
        }
    })
    return [tempClassNameDict, tempStyleDict];

} 

function restoreUnit(color, elementID) {

    // document.getElementById(elementID).classList.remove(...playerDesigns);
    // document.getElementById(`${elementID}_0`).classList.remove(...playerDesigns);
    // document.getElementById(`${elementID}_1`).classList.remove(...playerDesigns);
    // document.getElementById(`${elementID}_0`).style.display = "inline-block";
    // document.getElementById(`${elementID}_1`).style.display = "inline-block";

    let unitStyleDict = {};
    let unitClassNameDict = {};
    unitClassNameDict[`${elementID}`] = "";
    unitClassNameDict[`${elementID}_0`] = "";
    unitClassNameDict[`${elementID}_1`] = "";

    stateDictForResetUnitColor = {elementID:elementID, backgroundColor:color, opacity:1}
    // ResetUnitColor sets style.display to "inline-block" for the half elements
    unitStyleDict = ResetUnitColor({stateDictForResetUnitColor:stateDictForResetUnitColor})


    return [unitClassNameDict, unitStyleDict];
    // updateSingleColor(elementID, color, 1);
}


function ResetColors(props){
    const { colorArray, setStyleDict, setClassNameDict } = props.stateDictForResetColors;
    const [tempClassNameDict, tempStyleDict] = resetColorsHelp(colorArray);
    setClassNameDict(prevState => {
        return {...prevState, ...tempClassNameDict}
    })
    setStyleDict(prevState => {
        return {...prevState, ...tempStyleDict}
    })

    return null;
}

export default ResetColors;