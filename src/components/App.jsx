import React, { useEffect, useState } from "react";
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
    const [PAMax, setPAMax] = useState(
        (numRows*numCols < 12) ? 3 :
        (numRows*numCols < 24) ? 4 :
        (numRows*numCols < 36) ? 5 : 6);
    const [animationTimeouts, setAnimationTimeouts] = useState([]);


    const stateDictForArena = {stateScoreBoard, setStateScoreBoard, isLive, setIsLive,
        currentMessage, setCurrentMessage, triggerNewGame, setTriggerNewGame, 
        isFirstGame, setIsFirstGame, finishedFirstGame, setFinishedFirstGame, isGameOver, setIsGameOver,
        PAMax, setPAMax, animationTimeouts, setAnimationTimeouts};
    
    const stateDictForHeader = {startNewGame, stopGame, setIsGameOver, isGameOver, setIsLive, isLive, animationTimeouts};

    // props for Timer
    const [timerIntervalID, setTimerIntervalID] = useState(-1);
    const [timerIDs, setTimerIDs] = useState([]);
    const [clearedTimerIDs, setClearedTimerIDs] = useState([]);
    

    const stateDictForTimer = {timerIntervalID, setTimerIntervalID, timerIDs, setTimerIDs, 
                                clearedTimerIDs, setClearedTimerIDs, isLive, setIsLive, isGameOver, triggerNewGame};

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
        setIsLive(true);
        setTriggerNewGame(true);
        setIsGameOver(false);
    }

    useEffect(() =>{
        console.log(`from app IsGameOver ${isGameOver}`);
        timerIDs.forEach((timerID) => clearInterval(timerID))

    }, [isGameOver]);

    function stopGame() {
        console.log(`in stop game`)
        // setIsLive(false);
        // setIsGameOver(true);
    }
    
    return (
        <Router>
            <Header stateDictForHeader={stateDictForHeader}/>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/rules">
                    <Rules />
                </Route>
                <Route exact path="/arena">
                    <Arena layoutSettings={[numRows, numCols, difficulty]} stateDictForArena={stateDictForArena} stateDictForTimer={stateDictForTimer}/>
                </Route>
                <Route exact path="/setLayout">
                    <SetLayout layoutChange={layoutChange} startNewGame={startNewGame} layoutSettings={[numRows, numCols, difficulty]}/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;