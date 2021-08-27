import React from "react";

function Rules(props) {

    return (
        <div className="rules">
            <h1>Rules of Dilemma</h1>
            <ul>
                <li>To win the game you need to claim more than 50% of the arena's space</li>
                <li>Each round is timed. If you don't click the End Round button before time is up your choices will be collected</li>
                <li>To claim a unit, your choice of that unit must be higher than your opponent</li>
                <li>If a unit is selected in the same order by both players, no one will claim the unit that round</li>
                <li>If neither player gets 50% of the area, the game is a draw</li>
                <li>If there is only one unit left unclaimed after a round and no player has won - the game is a draw. </li>
                <li>If the round ends and no player scores, this counts as a strike. {props.maxNoChangeRounds} strikes in a row lead to a draw</li>
            </ul>
            <h1>The Arena</h1>
            <ul>
                <li>The arena is a square made up of rectangles, called units</li>
                <li>The dimensions of the units are randomly generated at the start of each game</li>
                <li>You get to select the number of rows and columns for the board in Set Layout</li>
                <li>As you opt for more units in your arena, you will get more selections per round and time</li>
            </ul>
        </div>
    )
}

export default Rules;