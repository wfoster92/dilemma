import React from "react";
import Unit from "./Unit";
import { createSegments } from "../helperFunctions/mathHelp";


function Row(props) {
    // let cols = createSegments(3,5);
    let row = props.row;
    console.log(`from ROW, row ${row}`);
    return <div>
        {row.map(unit => <Unit unit={unit} squareSize={props.squareSize} handleClick={props.handleClick}/>)}
        {/* {cols.map((c, idx) => <Unit height={props.height} width={c} idx={idx}/>)} */}
    </div>
}

export default Row;