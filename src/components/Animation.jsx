import React from "react";
import { playersArray, colorArray} from "./Arena"
import { updateSingleColor, updateSingleImage, animateStepUpdateHalfImage } from "../helperFunctions/elementModifiers";

function Animation(props){
    const {classNameDict, setClassNameDict,  styleDict, setStyleDict, animationTimeouts, setAnimationTimeouts, interval} = props.stateDictForAnimation ;

    console.log(`88888 in Animation`);
    function callAnimateStepUpdateHalfImage(elementID, pid, opacity){
        // let tempStyleDict;
        // let tempClassNameDict;
        console.log(`in callAnimateStepUpdateHalfImage elementID ${elementID} pid ${pid} opacity ${opacity}`)
        // first delete the backgroundColor property before applying the className... but this may happen when making the tempStyle Dict
        // setStyleDict(prevState => ({...prevState, }))
        let [tempStyleDict, tempClassNameDict] = animateStepUpdateHalfImage(elementID, pid, opacity);
        // console.log(`in callAnimateStepUpdateHalfImage  
        setStyleDict(prevState => ({...prevState, ...tempStyleDict}));
        setClassNameDict(prevState => ({...prevState, ...tempClassNameDict}));
    }


    let [playersArray0, playersArray1] = playersArray;
    let resetDict = {}
    let singleReset;
    // reset playersArray colors to their original color
    playersArray0.forEach((e) => {
        singleReset = updateSingleColor(e, colorArray[e], 1);
        resetDict = {...resetDict, ...singleReset}
    })
    playersArray1.forEach((e) => {
        updateSingleColor(e, colorArray[e], 1)
        singleReset = updateSingleColor(e, colorArray[e], 1);
        resetDict = {...resetDict, ...singleReset}
    })
    setStyleDict(prevState => ({...prevState, ...resetDict}));

    let elementId0, elementId1, delay;
    let setTimeouts = [];
    let claimed = [];
    let longestPA = Math.max(playersArray0.length, playersArray1.length);
    // start with one 
    let delaySegments = 1
    for(let idx=0; idx < longestPA; idx++) {
        // make the delay 1 interval unit + the index of the current playersArray
        delay = interval * (delaySegments);
        elementId0 = (playersArray0.length >= idx+1) ? playersArray0[idx] : undefined;
        elementId1 = (playersArray1.length >= idx+1) ? playersArray1[idx] : undefined;
        // console.log(`do animation round ${idx} ele0 ${elementId0} ele1 ${elementId1} current delay ${delay} longestPA ${longestPA}`)
        // if pid0 entered nothing
        if (isNaN(elementId0)) {
            console.log(`elementId0 ${elementId0} is not a number`)
            if (!claimed.includes(elementId1)){
                
                setTimeouts.push(
                    setTimeout(callAnimateStepUpdateHalfImage, delay, elementId1, 1, 1)
                    ) && claimed.push(elementId1);
            }
        // if pid0 entered nothing
        } else if (isNaN(elementId1)) {
            if (!claimed.includes(elementId0)){
                setTimeouts.push(setTimeout(callAnimateStepUpdateHalfImage, delay, elementId0, 0, 1)) && claimed.push(elementId0);
            }
        // if pid0 and pid1 entered the same value
        } else if (!isNaN(elementId0) && !isNaN(elementId1)) {
            if (elementId0===elementId1){
                // show both in half image
                setTimeouts.push(setTimeout(callAnimateStepUpdateHalfImage, delay, elementId0, 0, 1));
                setTimeouts.push(setTimeout(callAnimateStepUpdateHalfImage, delay, elementId1, 1, 1));
            } else {
                // Does claimed array not include element0? if so element will be pushed && set half image full opacity
                !claimed.includes(elementId0) ? 
                    setTimeouts.push(setTimeout(callAnimateStepUpdateHalfImage, delay, elementId0, 0, 1)) && claimed.push(elementId0):
                    // else, set image at 0.2 opacity
                    setTimeouts.push(setTimeout(callAnimateStepUpdateHalfImage, delay, elementId0, 0, 0.2));

                // Does claimed array not include element0? if so element will be pushed && set half image full opacity
                !claimed.includes(elementId1) ? 

                setTimeouts.push(setTimeout(callAnimateStepUpdateHalfImage, delay, elementId1, 1, 1)) && claimed.push(elementId1):
                    // else, set image at 0.2 opacity
                setTimeouts.push(setTimeout(callAnimateStepUpdateHalfImage, delay, elementId1, 1, 0.2));
            }
        } 
        delaySegments++;
    }
    
    console.log(`end of do animation playersArray ${playersArray}`)
    return(null);
  
}
export default Animation;