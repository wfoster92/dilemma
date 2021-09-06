import React from "react";

function UpdateColors(props) {
    const {playerArrayHuman, PAMax, updateSingleColor} = props.stateDictForUpdateColors;
    // export function updateColors(playersArray, humanPid, PAMax){
        // let pid = 0;
        let opacityMultiplier = (PAMax > 1) ? (1/(PAMax - 1)) : 0;
        let updateDict= {};
        let singleUpdate;
        playerArrayHuman.forEach((value, idx) => {
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

export default UpdateColors;