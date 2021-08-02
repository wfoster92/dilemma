import React from "react"
import { Link } from "react-router-dom"
import { squareSize } from "../helperFunctions/globals"


function Header (props) {
    return (
    <div className="row header" style={{height:(100-squareSize)/2+"vh"}}> 
        <div className="col-2"></div>
        <div className="col-2 align-self-center">
            <Link exact to="/rules">
                <h1>How To Play</h1>
            </Link>
        </div>
        <div className="col-4 align-self-center">
            <Link to="/">
                <h1>Dilemma</h1>
            </Link>
        </div>
        <div className="col-2 align-self-center">
            <Link exact to="/arena">
                <h1>New Game</h1>
            </Link>
        </div>
        <div className="col-2"></div>
    </div>
    )
}

export default Header;