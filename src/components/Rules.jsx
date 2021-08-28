import React from "react";

function Rules(props) {

    return (
        <div className="rules">
            <h1>What is Dilemma</h1>
            <ul>
                <li>Dilemma is a game where you and a bot compete for control over a board, made up of units</li>
                <li>In each round until the game is over players choose a group of units to grow their control of the board</li>
                <li>The units each player select are also in order of importance</li>
                <li>Dilemma is a click based game. When you select an unclaimed unit its color will switch to grayscale</li>
                <li>The higher valued units in your selection are darker</li>
            </ul>
            <h1>Rules of Dilemma</h1>
            <ul>
                <li>To win the game a player must claim more than 50% of the arena's space - else the game is a draw</li>
                <li>Each round is timed. If you don't click the End Round button before time is up your choices will be collected</li>
                <li>To claim a unit, your choice of that unit must be higher than your opponent</li>
                <li>If a unit is selected in the same order by both players, no one will claim the unit that round</li>
                <li>If there is only one unit left unclaimed after a round and no player has won - the game is a draw. </li>
                <li>If the round ends and no player scores, this counts as a strike. {props.maxNoChangeRounds} strikes in a row lead to a draw</li>
            </ul>
            <h1>The Arena</h1>
            <ul>
                <li>The arena is a square made up of clickable units</li>
                <li>The dimensions of the units are randomly generated at the start of each game</li>
                <li>You get to select the number of rows and columns for the board, as well as your bot opponent, in Set Layout</li>
                <li>As you opt for more units in the arena, you will get more choices per round and more time to select units</li>
            </ul>
        </div>
    )
}

export default Rules;