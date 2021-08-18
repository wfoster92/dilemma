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
    const [PAMax, setPAMax] = useState(startingPAMax());
        // (numRows*numCols < 12) ? 3 :
        // (numRows*numCols < 24) ? 4 :
        // (numRows*numCols < 36) ? 5 : 6);
    const [secondsPerRound, setSecondsPerRound] = useState(startingSecondsPerRound(numRows, numCols));
    const [animationTimeouts, setAnimationTimeouts] = useState([]);
    const maxNoChangeRounds = 3;
    const [squareSize, setSquareSize] = useState(checkForWindowResize());
    const [choicesLeft, setChoicesLeft] = useState(PAMax)




    const stateDictForArena = {stateScoreBoard, setStateScoreBoard, isLive, setIsLive,
        currentMessage, setCurrentMessage, triggerNewGame, setTriggerNewGame, 
        isFirstGame, setIsFirstGame, finishedFirstGame, setFinishedFirstGame, isGameOver, setIsGameOver,
        PAMax, setPAMax, animationTimeouts, setAnimationTimeouts, secondsPerRound, setSecondsPerRound, maxNoChangeRounds, 
        squareSize, choicesLeft, setChoicesLeft, startingPAMax};
    
    const stateDictForHeader = {startNewGame, setIsGameOver, isGameOver, isLive, animationTimeouts, maxNoChangeRounds};

    // props for Timer
    const [timerIDs, setTimerIDs] = useState([]);
    const stateDictForTimer = {timerIDs, setTimerIDs, isLive, setIsLive, triggerNewGame, secondsPerRound}; 

    function layoutChange(newRows, newCols, newDifficulty){
        setNumRows(parseInt(newRows));
        setNumCols(parseInt(newCols));
        setDifficulty(parseInt(newDifficulty));
        setSecondsPerRound(startingSecondsPerRound(newRows, newCols));
        setChoicesLeft(startingChoicesLeft(newRows, newCols));
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
        if (isGameOver){
            console.log(`from app IsGameOver ${isGameOver}`);
            timerIDs.forEach((timerID) => clearInterval(timerID))  
            setTimerIDs([]);  
        }
    }, [isGameOver]);



    function startingSecondsPerRound(r, c) {
        let newSecondsPerRound = (r*c < 12) ? 20 :
                                    (r*c < 24) ? 25 :
                                    (r*c < 36) ? 30 : 35;
        return newSecondsPerRound;
    }

    function startingPAMax() {
        let newPAMax = startingChoicesLeft(numRows, numCols);
        // (numRows*numCols < 12) ? 3 :
        //                 (numRows*numCols < 24) ? 4 :
        //                 (numRows*numCols < 36) ? 5 : 6;
        console.log(`PAMax is ${newPAMax}`)
        return newPAMax;
    }

    function startingChoicesLeft(r, c) {
        let newChoicesLeft = (r * c < 12) ? 3 :
                        (r * c < 24) ? 4 :
                        (r * c < 36) ? 5 : 6;
        // console.log(`Choices Left is ${newChoicesLeft}`)
        return newChoicesLeft;
    }

    function updateSquareSize(){
        let newSquareSize = checkForWindowResize()
        if (newSquareSize - squareSize !== 0) {
            setSquareSize(newSquareSize);
        }
    }

    function checkForWindowResize() {
        console.log(`Screen width: ${window.innerWidth}`);
        let tempSquareSize;
        if (window.matchMedia("(orientation: landscape)").matches) {
            tempSquareSize = 80;
        }
        else if (window.matchMedia("(orientation: portrait)").matches){
            tempSquareSize = 60;
        }
        return tempSquareSize;
    }
    
    window.addEventListener('resize', updateSquareSize);

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    
    return (
        <Router>
            <Header stateDictForHeader={stateDictForHeader}/>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/rules">
                    <Rules maxNoChangeRounds={maxNoChangeRounds}/>
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