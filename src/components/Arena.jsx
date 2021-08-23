import React, { useEffect, useState } from "react";
import Row from "./Row"
import GameTracker from "./GameTracker";
import SideContent from "./SideContent";
import { roundNumber } from "../helperFunctions/mathHelp";
import { makeArenaObject } from "../helperFunctions/creationHelp";
import { makeCompleteArray } from "../helperFunctions/makeCompleteArray";
import { doAnimation, updateControlArray, makeBotMove, updatePlayersArray} from "../helperFunctions/endRoundHelpers"
import { updateColors } from "../helperFunctions/elementModifiers";
import { resetColors } from "../helperFunctions/resetGameHelp";
import ScoreTracker from "./ScoreTracker";

export let controlArray = 0; // new Array(totalUnits).fill(-1);
export let playersArray = [[],[]]; //keeping variable outside Arena
export let isPAFull = [false, false]; // is used in updatePlayersArray fn 
export let [arenaObject, totalUnits, areaArray] = [0,0,0];
export let [completeArray, colorArray] = [0,0]; 





function Arena (props) {
    console.log("in arena")
    const [noChangeRounds, setNoChangeRounds] = useState(0);

    const [numRows, numCols, difficulty] = props.layoutSettings;

    const {stateScoreBoard, setStateScoreBoard, isLive, setIsLive, 
        currentMessage, setCurrentMessage, triggerNewGame, setTriggerNewGame, 
        isFirstGame, setIsFirstGame, finishedFirstGame, setFinishedFirstGame,
        isGameOver, setIsGameOver, PAMax, setPAMax, animationTimeouts, setAnimationTimeouts, 
        maxNoChangeRounds, squareSize, orientation, choicesLeft, setChoicesLeft, startingPAMax, 
        currentRound, setCurrentRound} = props.stateDictForArena;
    
    const stateDictForScoreTracker = {stateScoreBoard, currentMessage, difficulty, squareSize, orientation};
    const stateDictForGameTracker = {choicesLeft, noChangeRounds, maxNoChangeRounds, handleEndRoundClick, squareSize, orientation};
    
    // set a useState for noChangeRound to pass as a prop and a local variable to keep an accurate endGame calculation
    const humanPid = 0;
    const botGame = true;
    let scoreBoard = [0,0];



    // isFirstGame is necessary since we need to create the completeArray before render is called
    if (isFirstGame) {
        startNextGame();
        setIsFirstGame(false);
    }
    
    useEffect(() =>{
        if(finishedFirstGame && triggerNewGame) {
            console.log(`new game triggered animationTimeouts ${animationTimeouts} animationTimeouts length ${animationTimeouts.length}`)
            // if a new game is triggered, clear out the animation timeouts
            animationTimeouts.forEach(timeout => clearTimeout(timeout));
            startNextGame();
        }
    }, [triggerNewGame])

    useEffect(() => {
        console.log(`outside useEffectArena isLive ${isLive} isGameOver ${isGameOver}`)
        if(!isLive && !isGameOver) {
            console.log(`inside useEffectArena isLive ${isLive} isGameOver ${isGameOver} PAMax ${PAMax}`)
            endRoundA();
        }
    }, [isLive])

    useEffect(() => {
        setPAMax(startingPAMax());
    }, [numRows, numCols])

    useEffect(() => {
        // this will catch a draw scenario that the endOfGameRoutine will miss since the noChangeRounds state variable updates late.
        if ((noChangeRounds === maxNoChangeRounds) && !isGameOver) {
            endGameRoutine();
        }
    }, [noChangeRounds])

    useEffect(()=>{
        setCurrentMessage(`Round ${currentRound}`);
    }, [currentRound])


    function startNextGame() {
        console.log(`inside startNewGame finishedFirstGame ${finishedFirstGame}`);
        [arenaObject, totalUnits, areaArray] = makeArenaObject(numRows, numCols);
        [completeArray, colorArray] = makeCompleteArray(arenaObject, totalUnits);
        if (finishedFirstGame){
            resetColors(colorArray);
        }
        controlArray = makeNewControlArray(totalUnits);
        resetTopLevelVariables();
        if (animationTimeouts.length > 0){
            setAnimationTimeouts([]);
        }
        setTriggerNewGame(false);
    }


    function resetTopLevelVariables() {
        playersArray = [[],[]];
        let newPAMax = startingPAMax();
        setPAMax(newPAMax);
        if (!isFirstGame){
            setChoicesLeft(newPAMax);
            setNoChangeRounds(0);
        }
        isPAFull = [false, false];
    }

    function makeNewControlArray(totalUnits){
        return new Array(totalUnits).fill(-1);
    }
    

    function updateScoreBoard() {
        let sb = [0,0];
        controlArray.forEach((id, idx) => {
            switch (id) {
                case 1:
                    sb[1] += areaArray[idx];
                    break;
                case 0:
                    sb[0] += areaArray[idx];
                    break;
                default:
                    break;
            }
        })
        console.log(`in update scoreboard score board ${sb}`)
        scoreBoard = sb
        setStateScoreBoard(sb);
    }

    function handleEndRoundClick() {
        console.log(`inside endRound submit button isGameOver ${isGameOver} isLive ${isLive}`);
        if(!isGameOver && isLive) {
            console.log(`inside endRound isGameOver ${isGameOver} isLive ${isLive}`);
            setIsLive(false);
        } 
    }

    function endRoundA() {

        if (botGame) {
            playersArray = makeBotMove(difficulty, PAMax);
        } 

        let interval = 1500;
        let [totalDelay, outputAnimationTimeouts] = doAnimation(interval);
        setAnimationTimeouts([...outputAnimationTimeouts]);

        console.log(`about to runRest, interval ${interval} playersArray ${playersArray}`)
        let roundBTimeoutID = setTimeout(endRoundB, totalDelay);
        setAnimationTimeouts((prevState) => [...prevState, roundBTimeoutID]);
    }


    function endRoundB(){
        controlArray = updateControlArray();
        console.log(`after updateControl Array, playersArray ${playersArray}`);
        
        updateScoreBoard();


        (noScoreChange()) ? setNoChangeRounds((prevState) => prevState + 1) : setNoChangeRounds(0);
        console.log(`noScoreChange ${noScoreChange()} noChangeRounds ${noChangeRounds} endroundB scoreboard ${scoreBoard}`)

        // set isGameOver with the boolean output of updateIsGameOver
        let isGameOverBool = updateIsGameOver()
        
        console.log(`endRound isGameOver ${isGameOver}`);
        isGameOverBool ?  endGameRoutine() : continueGameRoutine();
    }

    function continueGameRoutine() {
        setPAMax(updatePAMax());
        playersArray = resetPlayersArray(); 
        setIsLive(true);
        setIsGameOver(false);
        setChoicesLeft(PAMax);
        setAnimationTimeouts([]);
        setCurrentRound((prevState) => prevState + 1);
    }

    // check for a round with no score change
    function noScoreChange() {
        let [a, b] = playersArray;
        console.log(`in score change, p1 ${a} p2 ${b}`)
        let result = (a.length === b.length) && a.every((e, idx) => e === b[idx]);
        console.log(`score change are lengths equal ${(a.length === b.length)} are the values equal ${a.every((e, idx) => e === b[idx])}`)
        return result;
    }

    // check to see if the game is over, return bool
    function updateIsGameOver() {
        let winner = (Math.max(...scoreBoard) > 0.5); 
        // count how many open spaces are left on the board
        let openSpaces = controlArray.filter((e) => (e===-1));
        // the game is a draw if the max no change rounds is met OR there is one or fewer openSpaces with no winner
        let draw = (noChangeRounds === maxNoChangeRounds) || ((openSpaces <= 1) && !winner)
        console.log(`in updateIsGameOver control array ${controlArray} winner ${winner} draw ${draw} scoreboard ${scoreBoard} \nmax scoreboard ${Math.max(...scoreBoard)}`);

        return (winner || draw);
    }

    function endGameRoutine () {
        setFinishedFirstGame(true);
        console.log(`in endGameRoutine max = ${Math.max(...scoreBoard)}`)
        let msg;
        if (Math.max(...scoreBoard) > 0.5) {
            let winner = (scoreBoard[0] > scoreBoard[1]) ? 1 : 2;
            console.log(`The winner is player ${winner}`)
            msg = (winner === 1)? "Wow! You Win" : "The Bot Wins!"
        } else {
            console.log(`It's a draw!`)
            msg = "It's a draw"
        }
        console.log(`omg it's all over\nFinal Score \nPlayer 1 ${roundNumber(100*scoreBoard[0], 2)} Player 2 ${roundNumber(100*scoreBoard[1], 2)}`);
        setCurrentMessage(msg)
        setIsLive(false); 
        setIsGameOver(true);   
    }


    // sets the players array max to the minimum of the previous paMax and the unclaimed units left
    function updatePAMax() {
        let unitsLeft = 0;
        for(let i = 0; i < controlArray.length; i++) {
            if (controlArray[i] === -1) {
                unitsLeft+=1;
            }
        }
        return Math.min(unitsLeft, startingPAMax());
    }

    function resetPlayersArray() {
        console.log(`in resetPlayersArray before pa = ${playersArray}`);
        return [[],[]]
    }


    // When a Unit component is clicked, make update the players array and colors or do nothing
    function handleClick(id){
        console.log(`in handle click index = ${id} is element id ${id} claimed? -> ${!(controlArray[id] === -1)} isGameOver ${isGameOver}`);

        if (isLive && (controlArray[id] === -1)) {
            console.log(`inside handleClick if statement id = ${id}`);
            playersArray = updatePlayersArray(id, humanPid, PAMax) 
            setChoicesLeft(PAMax - playersArray[humanPid].length);
            updateColors(playersArray, humanPid, PAMax);
        }
        return console.log("exited handleClick!")
    }

    if (orientation === "landscape"){
        let headerHeight = 10+"vh";
        let landscapeSpacerStyle = {width: "calc((100vmax - " + squareSize + "vh)/2)", height:squareSize+"vh"};
        let verticalMargin = {height: "calc((100vh - " + squareSize + "vh - " + headerHeight + ") / 2)"};
        return (
            <div>
                <div className="verticalMargin" style={verticalMargin}></div>
                <span className="spacerLandscape" style={landscapeSpacerStyle}>
                    <GameTracker stateDictForTimer={props.stateDictForTimer} stateDictForGameTracker={stateDictForGameTracker} />
                </span>
                <span id="gameboard">
                    {completeArray.map(row => {
                            return <Row row={row} squareSize={squareSize} handleClick={handleClick}/>
                    })}
                </span>
                <span className="spacerLandscape" style={landscapeSpacerStyle}>
                    <ScoreTracker stateDictForScoreTracker={stateDictForScoreTracker}/>
                </span>
                <div className="verticalMargin" style={verticalMargin}></div>
            </div>
        )
    } else if (orientation === "portrait" && squareSize === 100){ 
        return (
            <div>
                <div className="trackerStyle100">
                    <ScoreTracker stateDictForScoreTracker={stateDictForScoreTracker} />
                </div>
                <div className="endGameMessage row align-items-center endGameStyle100">
                    <div className="col-12">
                        <p>
                            {currentMessage}
                        </p>
                    </div>
                </div>
                <div className="trackerStyle100">
                    <GameTracker stateDictForTimer={props.stateDictForTimer} stateDictForGameTracker={stateDictForGameTracker}/> 
                </div>
                <div className="gameboardWrapperPortrait">
                    <span id="gameboard">
                        {completeArray.map(row => {
                                return <Row row={row} squareSize={squareSize} handleClick={handleClick}/>
                        })}
                    </span>
                </div>
            </div>
        )
    } else if (orientation === "portrait" && squareSize < 100){
        const stateDictForSideContent = {squareSize, currentMessage, handleEndRoundClick};
        return (
        <div>
            <div >
                <div className="trackerStyle60P row align-items-center">
                    <ScoreTracker stateDictForScoreTracker={stateDictForScoreTracker} />
                </div>
            </div>

            <div className="trackerStyle60P row align-items-center">
                <GameTracker stateDictForTimer={props.stateDictForTimer} stateDictForGameTracker={stateDictForGameTracker}/> 
            </div>
            <div className="gameboardWrapperPortraitWithSide">
                <span id="gameboard">
                    {completeArray.map(row => {
                            return <Row row={row} squareSize={squareSize} handleClick={handleClick}/>
                    })}
                </span>
                <span>
                    <SideContent stateDictForSideContent={stateDictForSideContent}/>
                </span>
            </div>
        </div>
        )
    } else {
        console.log(`No orientation match... orientation = ${orientation}`);
        return (<div></div>)
    }

    
}

export default Arena;