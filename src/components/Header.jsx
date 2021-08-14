import React, { useState } from "react"
import { Link } from "react-router-dom"
import { squareSize } from "../helperFunctions/globals"
// import { hasBegun, setHasBegun } from "./Arena";


function Header (props) {

    // const [lastPage, setLastPage] = useState(window.location.href);

    function endGame() {
        // setLastPage(window.location.href);
        props.setIsGameOver(true);
        props.setIsLive(false);
    }

    // if coming from url other than arena, updateLastPage -> else reset the page for new game, then updateLastPage
    function restart() {
        // setLastPage(window.location.href);

        console.log(`in Header - restart. `);
        // we must end the current game before we start a new one
        endGame();
        props.startNewGame();
    }

    return (
    <div className="row header" style={{height:(100-squareSize)/2+"vh"}}> 
        <div className="col-2"></div>
        <div className="col-2 align-self-center" onClick={endGame}>
            <Link exact to="/rules">
                <h1>How To Play</h1>
            </Link>
        </div>
        <div className="col-2 align-self-center" onClick={endGame}>
            <Link to="/">
                <h1>Dilemma</h1>
            </Link>
        </div>
        <div className="col-2 align-self-center" onClick={endGame}>
            <Link exact to="/setLayout">
                <h1>Set Layout</h1>
            </Link>
        </div>
        <div className="col-2 align-self-center" onClick={restart}>
            <Link exact to="/arena">
                <h1>New Game</h1>
            </Link>
        </div>
        <div className="col-2"></div>
    </div>
    )
}

export default Header;