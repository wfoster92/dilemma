import React from "react"


function Header (props) {
    // const headerElements = [
    //     {title: "Rules", link:<Rules />},
    //     {title: "Dilemma"},
    //     {title: "New Game"}
    // ]

    return (
    <div className="header" style={{width: "100vw", height: props.height}}>
        
        <h1>Rules</h1>
        <h1>Dilemma</h1>
        <h1>New Game</h1>
        {/* <li><a href="about.asp">About</a></li> */}
    </div>
    )
}


export default Header;