import React from "react";
import Footer from "./Footer";

function Home() {
    return (
        <div className="align-items-center home">
            <h1> Dilemma</h1>
            {/* <div className="align-items-center"> */}
            <img src={`/images/arena.png`} id="homeImg"/>
            {/* </div> */}
            <Footer />
        </div>
        
    )
}

export default Home;