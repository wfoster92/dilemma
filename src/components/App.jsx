import React, { useEffect, useState } from "react";
import Arena from "./Arena"
import Header from "./Header";
import Home from "./Home";
import Rules from "./Rules";
import Timer from "./Timer";
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
    const [currentMessage, setCurrentMessage] = useState("");
    const [triggerNewGame, setTriggerNewGame] = useState(false);
    const [isFirstGame, setIsFirstGame] = useState(true);
    const [finishedFirstGame, setFinishedFirstGame] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [PAMax, setPAMax] = useState(startingPAMax());
    const [secondsPerRound, setSecondsPerRound] = useState(startingSecondsPerRound(numRows, numCols));
    const [timeLeft, setTimeLeft] = useState(startingSecondsPerRound(numRows, numCols));
    const [animationTimeouts, setAnimationTimeouts] = useState([]);
    const maxNoChangeRounds = 3;
    const initClassification = checkForWindowResize();
    const [classification, setClassification] = useState(initClassification);
    const [squareSize, setSquareSize] = useState((initClassification % 2 === 0) ? 60 :
                                                    (initClassification === 1) ? 80 : 100);
    const [isLandscape, setIsLandscape] = useState((initClassification < 2) ? true : false);
    // const [initSquareSize, initIsLandscape] = checkForWindowResize();
    // const [viewportProperties, setViewportProperties] = useState(checkForWindowResize())
    // const [squareSize, setSquareSize] = useState(initSquareSize);
    // const [isLandscape, setIsLandscape] = useState(initIsLandscape);
    const [choicesLeft, setChoicesLeft] = useState(PAMax)
    const [currentRound, setCurrentRound] = useState(1);





    const stateDictForArena = {stateScoreBoard, setStateScoreBoard, isLive, setIsLive,
        currentMessage, setCurrentMessage, triggerNewGame, setTriggerNewGame, 
        isFirstGame, setIsFirstGame, finishedFirstGame, setFinishedFirstGame, isGameOver, setIsGameOver,
        PAMax, setPAMax, animationTimeouts, setAnimationTimeouts, secondsPerRound, setSecondsPerRound, maxNoChangeRounds, 
        choicesLeft, setChoicesLeft, startingPAMax, currentRound, setCurrentRound, timeLeft, isLandscape, squareSize};
        // choicesLeft, setChoicesLeft, startingPAMax, currentRound, setCurrentRound, timeLeft, viewportProperties};
    
    const stateDictForHeader = {startNewGame, setIsGameOver, isGameOver, isLive, animationTimeouts, maxNoChangeRounds};

    // props for Timer
    const [timerIDs, setTimerIDs] = useState([]);
    const stateDictForTimer = {timerIDs, setTimerIDs, isLive, setIsLive, triggerNewGame, secondsPerRound, setTimeLeft}; 

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
        setCurrentMessage("Round 1");
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

    useEffect(() => {
        setSquareSize((classification % 2 === 0) ? 60 :
                        (classification === 1) ? 80 : 100);
        setIsLandscape((classification < 2) ? true : false);
    }, [classification])


    function startingSecondsPerRound(r, c) {
        let newSecondsPerRound = (r*c < 12) ? 20 :
                                    (r*c < 24) ? 25 :
                                    (r*c < 36) ? 30 : 35;
        return newSecondsPerRound;
    }

    function startingPAMax() {
        let newPAMax = startingChoicesLeft(numRows, numCols);
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

    function updateViewportProperties(){
        let newClassification = checkForWindowResize();
        setClassification(newClassification);
        // let [newSquareSize, newIsLandscape] = checkForWindowResize();
        // console.log(`newSquareSize ${newSquareSize} newIsLandscape ${newIsLandscape}`);
        // setIsLandscape(newIsLandscape);
        // setSquareSize(newSquareSize);
    }

    // return the new orientation as well as the new squareSize
    function checkForWindowResize() {
        let tempSquareSize, tempIsLandscape, classification;


        let w = window.visualViewport.width;
        let h = window.visualViewport.height;
        
        let portraitIsClose = (w < h) && (w * 1.7 > h);
        let landscapeIsClose = (w > h) && (h * 1.4 > w);
        let isEven = (w === h);
        let isClose = (portraitIsClose || landscapeIsClose || isEven);

        // first check if the screen dimensions are within 20% of one another
        if (isClose) {
            tempSquareSize = 60;
            // close and landscape or even
            if (w >= h){
                tempIsLandscape = true;
                classification = 0;
            // close and portrait
            } else if (h > w) {
                tempIsLandscape = false;
                classification = 2;
            }
        }
        // else if (window.matchMedia("(orientation: landscape)").matches) {
            else if (w > h) {
            tempSquareSize = 80;
            tempIsLandscape = true;
            classification = 1
        }
        // else if (window.matchMedia("(orientation: portrait)").matches){
            else if (w < h) {
            tempSquareSize = 100;
            tempIsLandscape = false;
            classification = 3
        }

        console.log(`exit check window resize, width = ${w} height = ${h} isClose = ${isClose} \nsquareSize = ${tempSquareSize} tempIsLandscape ${tempIsLandscape}`)
        return classification;
        // return [tempSquareSize, tempIsLandscape];
    }
    
    
    // const [resizeID, setResizeID] = useState(-1);
    // // $(window).resize(()=>{
    // //     clearTimeout(resizeID);
    // //     resizeID = setTimeout(updateViewportProperties, 50);
    // // })

    window.addEventListener('resize', updateViewportProperties);
    // window.addEventListener('resize', ()=> {
    //     clearTimeout(resizeID);
    //     resizeID = setTimeout(updateViewportProperties, 50);
    // });



    // // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    // let vh = window.innerHeight * 0.01;
    // // Then we set the value in the --vh custom property to the root of the document
    // document.documentElement.style.setProperty('--vh', `${vh}px`);

    // // We listen to the resize event
    // window.addEventListener('resize', () => {
    //     // We execute the same script as before
    //     let vh = window.innerHeight * 0.01;
    //     document.documentElement.style.setProperty('--vh', `${vh}px`);
    // });
    
    return (
        <Router>
            <Header stateDictForHeader={stateDictForHeader}/>
            <Timer stateDictForTimer={stateDictForTimer}/>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/rules">
                    <Rules maxNoChangeRounds={maxNoChangeRounds}/>
                </Route>
                <Route exact path="/arena">
                    <Arena layoutSettings={[numRows, numCols, difficulty]} stateDictForArena={stateDictForArena} stateDictForTimer={stateDictForTimer}/>
                    {/* <Arena layoutSettings={[numRows, numCols, difficulty]} stateDictForArena={stateDictForArena} stateDictForTimer={stateDictForTimer}/> */}
                </Route>
                <Route exact path="/setLayout">
                    <SetLayout layoutChange={layoutChange} startNewGame={startNewGame} layoutSettings={[numRows, numCols, difficulty]}/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;