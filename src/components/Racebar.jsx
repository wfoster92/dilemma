import React from "react";
import { roundNumber } from "../helperFunctions/mathHelp";
import { scoreBoard } from "./Arena"

function Racebar(props) {

    let sb = props.sb;
    console.log(`from racebar sb ${sb}`)
    let p1 = roundNumber(sb[0] * 100, 2);
    let p2 = roundNumber(sb[1] * 100, 2);

    return (
        <div>
            <table className="table">
                <tr>
                    <th>Player 1</th>
                    <th>Player 2</th>
                </tr>
                <tr>
                    <td>{p1}</td>
                    <td>{p2}</td>
                </tr>
            </table>
            <div className="row">

            </div>
            <div className="row">
                <div className="col-12 finishLine"></div>
            </div>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-4"></div>
                <div className="col-1"></div>
                <div className="col-1"></div>
                <div className="col-4"></div>
                <div className="col-1"></div>
            </div>
            <div className="row">
                <div className="col-12 startLine"></div>
            </div>
            <div className="row">
                <div className="col-6">You</div>
                <div className="col-6">Bot</div>
            </div>
        </div>
    )
        
}

export default Racebar;