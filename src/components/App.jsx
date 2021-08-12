import React, { useState } from "react";
import Arena from "./Arena"
import Header from "./Header";
import Home from "./Home";
import Rules from "./Rules";
import {
    BrowserRouter as Router, Switch, Route,
    Link
  } from "react-router-dom";
import SetLayout from "./SetLayout";

function App() {
    const [numRows, setNumRows] = useState(3);
    const [numCols, setNumCols] = useState(3);
    const [difficulty, setDifficulty] = useState(4);

    const [stateScoreBoard, setStateScoreBoard] = useState([0,0]);
    const [isLive, setIsLive] = useState(true);
    const [currentMessage, setCurrentMessage] = useState(<div></div>);
    const [triggerNewGame, setTriggerNewGame] = useState(false);
    const [isFirstGame, setIsFirstGame] = useState(true);
    const [finishedFirstGame, setFinishedFirstGame] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);


    const stateArrayForArena = [stateScoreBoard, setStateScoreBoard, isLive, setIsLive,
        currentMessage, setCurrentMessage, triggerNewGame, setTriggerNewGame, 
        isFirstGame, setIsFirstGame, finishedFirstGame, setFinishedFirstGame, isGameOver, setIsGameOver];

    function layoutChange(newRows, newCols, newDifficulty){
        setNumRows(parseInt(newRows));
        setNumCols(parseInt(newCols));
        setDifficulty(parseInt(newDifficulty));
    }

    // resets App level state variables then sets Arena level resets with resetArenaTrigger
    function startNewGame(){
        console.log(`in startNewGame in APP, finishedFirstGame ${finishedFirstGame} numRows, numCols, difficulty ${numRows, numCols, difficulty}`);
        if (!isFirstGame){
            setFinishedFirstGame(true);
        }
        setStateScoreBoard([0,0]);

        setCurrentMessage(<div></div>);
        setTriggerNewGame(true);
        setIsLive(true);
        setIsGameOver(false);
    }
    
    return (
        <Router>
            <Header startNewGame={startNewGame} setIsGameOver={setIsGameOver}/>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/rules">
                    <Rules />
                </Route>
                <Route exact path="/arena">
                    <Arena layoutSettings={[numRows, numCols, difficulty]} stateArrayForArena={stateArrayForArena} />
                </Route>
                <Route exact path="/setLayout">
                    <SetLayout layoutChange={layoutChange} layoutSettings={[numRows, numCols, difficulty]} startNewGame={startNewGame}/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;