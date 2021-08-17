import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { squareSize } from "../helperFunctions/globals"


function Header (props) {
    const {startNewGame, setIsGameOver, isGameOver, isLive, animationTimeouts} = props.stateDictForHeader

    function endGame() {

        setIsGameOver(true);
        animationTimeouts.forEach((timeout) => {
            clearTimeout(timeout);
        });
        console.log(`from header isGameOver ${isGameOver} isLive ${isLive}`);
    }

    // we must end the current game before we start a new one
    function restart() {
        console.log(`in Header - restart. `);
        endGame();
        startNewGame();
    }

    return (
    <div className="row header" style={{height:(100-squareSize)/2+"vh"}}> 
        <div className="col-1"></div>
        <div className="col-2 align-self-center" onClick={endGame}>
            <Link exact to="/rules">
                <h1>Rules</h1>
            </Link>
        </div>
        <div className="col-3 align-self-center" onClick={endGame}>
            <Link to="/">
                <h1>Dilemma</h1>
            </Link>
        </div>
        <div className="col-3 align-self-center" onClick={endGame}>
            <Link exact to="/setLayout">
                <h1>Set Layout</h1>
            </Link>
        </div>
        <div className="col-2 align-self-center" onClick={restart}>
            <Link exact to="/arena">
                <h1>New Game</h1>
            </Link>
        </div>
        <div className="col-1"></div>
    </div>
    )
}

export default Header;