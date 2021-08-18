import React from "react";
import Unit from "./Unit";
import { createSegments } from "../helperFunctions/creationHelp";


function Row(props) {
    let row = props.row;
    // console.log(`from ROW, row ${row}`);
    return <div>
        {row.map(unit => <Unit unit={unit} squareSize={props.squareSize} handleClick={props.handleClick}/>)}
    </div>
}

export default Row;