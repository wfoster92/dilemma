import React, { useState } from "react"
import { Link } from "react-router-dom"
import { squareSize } from "../helperFunctions/globals"
// import { hasBegun, setHasBegun } from "./Arena";


function Header (props) {

    const [lastPage, setLastPage] = useState(window.location.href);

    function updateLastPage() {
        setLastPage(window.location.href);
    }

    // if coming from url other than arena, updateLastPage -> else reset the page for new game, then updateLastPage
    function restart() {
        console.log(`current location ${window.location.href} lastPage ${lastPage}`);
        console.log(window.location.href === "http://localhost:3000/arena");


        console.log(`in Header - restart. `);
        // we must end the current game before we start a new one
        props.setIsGameOver(true);
        props.startNewGame();
        updateLastPage();
    }

    return (
    <div className="row header" style={{height:(100-squareSize)/2+"vh"}}> 
        <div className="col-2"></div>
        <div className="col-2 align-self-center" onClick={updateLastPage}>
            <Link exact to="/rules">
                <h1>How To Play</h1>
            </Link>
        </div>
        <div className="col-2 align-self-center" onClick={updateLastPage}>
            <Link to="/">
                <h1>Dilemma</h1>
            </Link>
        </div>
        <div className="col-2 align-self-center" onClick={updateLastPage}>
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