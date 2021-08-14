import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import SetLayoutForm from "./SetLayoutForm";




function SetLayout(props) {
    console.log(`in setLayout - layoutSettings ${props.layoutSettings}`)
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
    }



    return (
        <div>
            <h1>Select Your Board Layout</h1>
            <form className="layoutForm" onSubmit={submitForm}>
                <SetLayoutForm layoutSettings = {props.layoutSettings} />
            </form>
            <Link exact to="/arena" onClick={props.startNewGame}>
                <button>Start New Game</button>
            </Link>;
        </div>
    )
}

export default SetLayout;