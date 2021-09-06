import React from "react";
import Unit from "./Unit";


function Row(props) {
    let row = props.row;

    return <div>
        {row.map(unit => <Unit unit={unit} styleDict={props.styleDict} classNameDict={props.classNameDict} squareSize={props.squareSize} handleClick={props.handleClick}/>)}
    </div>
}

export default Row;