import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import SetLayoutForm from "./SetLayoutForm";




function SetLayout(props) {
    console.log(`in setLayout - layoutSettings ${props.layoutSettings}`)
    let [numRows, numCols, difficulty] = props.layoutSettings;
    console.log(`in setLayout - layoutSettings rows ${numRows} cols ${numCols} difficulty ${difficulty}`)
    const [formSubmitted, setFormSubmitted] = useState(false);


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
        // setFormSubmitted(true);
    }

    // useEffect(() => {
    //     if(formSubmitted) {
    //         setFormSubmitted(false);
    //         props.startNewGame();
    //         window.location.href = "./Arena";
    //         <Link exact to="/arena"></Link>;
    //     }
    // },[formSubmitted])



    // function startNextGame() {
    //     props.startNewGame();

    //     // <Link exact to="/arena"> </Link>
    //     // <Redirect exact to="/arena>"></Redirect>
    //     // return false;
    // }


    return (
        <div>
            <h1>Select Your Board Layout</h1>
            <form onSubmit={submitForm}>
                <SetLayoutForm layoutSettings = {props.layoutSettings} />
            </form>
            <Link exact to="/arena" onClick={props.startNewGame}>
                <button>Start New Game</button>
            </Link>;
        </div>
    )
}

export default SetLayout;