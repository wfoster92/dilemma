import React from "react";

function Rules(props) {

    return (
        <div className="rules">
            <h1>Rules of Dilemma</h1>
            <ul>
                <li>To win the game you need to claim more than 50% of the arena's space</li>
                <li>Each round is timed. If you don't click the End Round button before time is up your choices will be taken</li>
                <li>To claim a space, your choice of the space must be higher than your opponents</li>
                <li>If a space is selected in the same order by both players, no one will claim the space that round</li>
                <li>If neither player gets to 50%, the game is a draw</li>
                <li>If there is one space left unclaimed after a round and no player has won- the game is a draw. </li>
                <li>As you opt for more spaces in your arena, you will get more selections per round and time</li>
            </ul>
            <h1>About the Arena</h1>
            <ul>
                <li>The arena is a square made up of colored rectangles, called spaces</li>
                <li>You get to select the number of rows and columns for the board in Set Layout page</li>
                <li>The width and height of the rows and columns will change with each game</li>
                <li>If the round ends and no player scores, this counts as a no-score round. {props.maxNoChangeRounds} of these in a row lead to a draw</li>
            </ul>
        </div>
    )
}

export default Rules;