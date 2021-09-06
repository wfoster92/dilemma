export function animateStepUpdateHalfImage(elementID, pid, opacity) {
    
    let tempStyleDict = {}
    let tempClassNameDict = {}
    tempStyleDict[`${elementID}_${pid}`] = {opacity:opacity}
    tempClassNameDict[`${elementID}_${pid}`] = playerDesigns[pid];
    return [tempStyleDict, tempClassNameDict];
}