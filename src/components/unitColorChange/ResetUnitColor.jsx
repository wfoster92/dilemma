// This is called after a draw and resets color for next round
function ResetUnitColor(props) {
    const {elementID, backgroundColor, opacity} = props.stateDictForResetUnitColor;

    console.log(`In update single color. original color ${colorArray[elementID]} new color ${backgroundColor}`);
    let outputDict = {}; 
    outputDict[elementID] = {backgroundColor: backgroundColor, opacity: opacity};
    outputDict[`${elementID}_0`] = {backgroundColor: backgroundColor, opacity: opacity, display:"inline-block"};
    outputDict[`${elementID}_1`] = {backgroundColor: backgroundColor, opacity: opacity, display:"inline-block"};
    return outputDict;
}

export default ResetUnitColor;