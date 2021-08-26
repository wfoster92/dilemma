import React, { useEffect } from "react";


function Unit(props) {
    console.log(`props.unit ${props.unit}`)
    let squareSize = props.squareSize;
    let styleDict = props.styleDict;
    let classNameDict = props.classNameDict;

    let [width, height, index, backgroundColor] = props.unit;
    // console.log(`unpacking props.unit width ${width} height ${height} index ${index} backgroundColor ${backgroundColor} squareSize ${squareSize}`)

    // let indexKey = index.toString();
    // console.log(`props.styleDict index ${index} ${styleDict[index]}`)

    // let width = styleDict[index][width];
    
    let halfWidth = (width * squareSize / 2) + "vmin";
    let fullWidth = (width * squareSize) + "vmin";

    height = height * squareSize + "vmin";

    // index is the id for the unit... elementID is the id for each element in playersArray
    function clickEvent() {
        props.handleClick(index);
    }

    // useEffect(() => {
    //     if (styleDict!=undefined) {
    //         let numkeys = Object.keys(styleDict).length;
    //         console.log(`in useEffect Unit numkeys ${numkeys}`);
    //     } else {
    //         console.log(`in useEffect Unit styleDict numkeys undefined`);
    //     }
    // }, [styleDict])

    if (styleDict===undefined || (Object.keys(styleDict).length === 0)){
        console.log(`Style dict is undefined index ${index} width ${fullWidth} height ${height} backgroundColor ${backgroundColor}`)
        return (
            <span id={index} style={{width: fullWidth, height: height, backgroundColor: backgroundColor}}>
                <span id={index+"_0"} onClick={clickEvent}
                    style={{width: halfWidth, height: height, backgroundColor: backgroundColor}} >
                </span>
                <span id={index+"_1"} onClick={clickEvent}
                    style={{width: halfWidth, height: height, backgroundColor: backgroundColor}} >
                </span>
            </span>
        )
    } else {
        console.log(`Style dict is real index ${index in styleDict} ${styleDict[index]}`)
        return (
            <span id={index} 
            className={classNameDict[index]} 
            style={{...styleDict[index], width: fullWidth, height: height}}>
                <span id={index+"_0"} onClick={clickEvent} 
                className={classNameDict[`${index}_0`]}
                    style={{...styleDict[`${index}_0`], width: halfWidth, height: height}} >
                </span>
                <span id={index+"_1"} onClick={clickEvent} className={classNameDict[`${index}_1`]}
                    style={{...styleDict[`${index}_1`], width: halfWidth, height: height}} >
                </span>
            </span>
        )
    }

            // <span id={index} style={{width:fullWidth, height:height, backgroundColor:color}}>
            //     <span id={index+"_0"} onClick={clickEvent}
            //         style={{width:halfWidth, height:height, backgroundColor:color}} >
            //     </span>
            //     <span id={index+"_1"} onClick={clickEvent}
            //         style={{width:halfWidth, height:height, backgroundColor:color}} >
            //     </span>
            // </span>

}

export default Unit;