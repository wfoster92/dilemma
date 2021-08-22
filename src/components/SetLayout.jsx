import React, { useEffect, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom"
import SetLayoutForm from "./SetLayoutForm";




function SetLayout(props) {
    // history object allows redirection at the end of submit form
    let history = useHistory();
    let [numRows, numCols, difficulty] = props.layoutSettings;
    console.log(`in setLayout - layoutSettings rows ${numRows} cols ${numCols} difficulty ${difficulty}`)


    // update the rows, columns and difficulty then start a new game
    function submitForm(event) {
        event.preventDefault()
        console.log(`in submit form previous values = row ${numRows} cols ${numCols} dif ${difficulty}`)
        console.log(`in submit form rows ${event.target.rowCount.value} cols ${event.target.colCount.value} dif ${event.target.botDifficulty.value}`);
        let newRows = event.target.rowCount.value;
        let newCols = event.target.colCount.value;
        let newDifficulty = event.target.botDifficulty.value;
        props.layoutChange(newRows, newCols, newDifficulty);
        console.log(`rows ${newRows} numCols ${newCols} difficulty ${newDifficulty}`)
        history.push("/arena");
        props.startNewGame();
    }



    return (
        <div>
            <form className="layoutForm" onSubmit={submitForm} action="./arena">
                <SetLayoutForm layoutSettings = {props.layoutSettings} startNewGame={props.startNewGame}/>
            </form>
        </div>
    )
}

export default SetLayout;