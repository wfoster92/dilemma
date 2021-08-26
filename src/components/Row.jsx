import React from "react";
import Unit from "./Unit";
import { createSegments } from "../helperFunctions/creationHelp";


function Row(props) {
    let row = props.row;
    // let styleDict = props.styleDict;
    // console.log(`from ROW, row ${row} styleDict ${styleDict}`);
    // styleDict.forEach((element, idx) => console.log(`styleDict element ${element}, idx ${idx}`))
    return <div>
        {row.map(unit => <Unit unit={unit} styleDict={props.styleDict} classNameDict={props.classNameDict} squareSize={props.squareSize} handleClick={props.handleClick}/>)}
    </div>
}

export default Row;