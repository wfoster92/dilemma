import React, { useEffect, useState } from "react";
import Row from "./Row"
import GameTracker from "./GameTracker";
import Timer from "./Timer";
import { maxSelections, maxNoChangeRounds } from "../helperFunctions/globals";
import { roundNumber } from "../helperFunctions/mathHelp";
import { makeArenaObject } from "../helperFunctions/creationHelp";
import { makeCompleteArray } from "../helperFunctions/makeCompleteArray";
import { doAnimation, updateControlArray, makeBotMove, updatePlayersArray} from "../helperFunctions/endRoundHelpers"
import { updateColors } from "../helperFunctions/elementModifiers";
import { resetColors } from "../helperFunctions/resetGameHelp";

export let controlArray = 0; // new Array(totalUnits).fill(-1);
export let playersArray = [[],[]]; //keeping variable outside Arena
export let PAMax = maxSelections; //keeping variable outside Arena
export let isPAFull = [false, false];
export let noChangeRounds = 0;
export let [arenaObject, totalUnits, areaArray] = [0,0,0];
export let [completeArray, colorArray] = [0,0]; 





function Arena (props) {
    console.log("in arena")
    let [numRows, numCols, difficulty] = props.layoutSettings;

    let [stateScoreBoard, setStateScoreBoard, isLive, setIsLive, 
        currentMessage, setCurrentMessage, triggerNewGame, setTriggerNewGame, 
        isFirstGame, setIsFirstGame, finishedFirstGame, setFinishedFirstGame,
        isGameOver, setIsGameOver] = props.stateArrayForArena;

    if (isFirstGame) {
        startNextGame();
        setIsFirstGame(false);
    }
    

    const humanPid = 0;
    const botGame = true;
    let scoreBoard = [0,0]
    // let isGameOver = false;
    let animationTimeouts = [];
 

    useEffect(() =>{
        if(triggerNewGame) {
            console.log(`new game triggered animationTimeouts ${animationTimeouts} animationTimeouts length ${animationTimeouts.length}`)
            animationTimeouts.forEach(timeout => clearTimeout(timeout));
            startNextGame();
        }
    }, [triggerNewGame])

    function startNextGame() {
        console.log(`inside startNewGame finishedFirstGame ${finishedFirstGame}`);
        // props.startNewGame()
        [arenaObject, totalUnits, areaArray] = makeArenaObject(numRows, numCols);
        [completeArray, colorArray] = makeCompleteArray(arenaObject, totalUnits);
        if (finishedFirstGame){
            resetColors(colorArray);
        }
        controlArray = makeNewControlArray(totalUnits);
        resetTopLevelVariables()
        setTriggerNewGame(false);
    }

    function resetTopLevelVariables() {
        playersArray = [[],[]];
        PAMax = maxSelections; 
        isPAFull = [false, false];
        noChangeRounds = 0;
    }

    function makeNewControlArray(totalUnits){
        return new Array(totalUnits).fill(-1);
    }
    
    useEffect(() => {
        if(!isLive && !isGameOver) {
            console.log(`inside useEffectArena isLive ${isLive} isGameOver ${isGameOver}`)
            endRoundA();
        }
    }, [isLive])


    // function flipIsLive(aBoolean) {
    //     setIsLive(prevState => !prevState);
    // }

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
            playersArray = makeBotMove(difficulty);
        } 
        // console.log(`after bot move, playersArray ${playersArray}`)
        let interval = 1500;
        let [totalDelay, outputAnimationTimeouts] = doAnimation(interval);
        animationTimeouts = outputAnimationTimeouts;
        console.log(`inside endRoundA, animationTimeouts ${animationTimeouts} outputAnimationTimeouts ${outputAnimationTimeouts}`)

        noChangeRounds = scoreChange() ? 0 : noChangeRounds++;

        console.log(`about to runRest, interval ${interval} playersArray ${playersArray}`)
        let roundBTimeout = setTimeout(endRoundB, totalDelay);
        animationTimeouts.push(roundBTimeout);
    }


    function endRoundB(){
        controlArray = updateControlArray();
        
        updateScoreBoard()
        endRoundC();
    }


    function endRoundC(){
        console.log(`noChangeRounds ${noChangeRounds} endroundB scoreboard ${scoreBoard}`)

        // set isGameOver with the boolean output of updateIsGameOver
        let isGameOverBool = updateIsGameOver()
        
        console.log(`endRoundC isGameOver ${isGameOver}`);
        isGameOverBool ?  endGameRoutine() : continueGameRoutine();
    }

    function continueGameRoutine() {
        PAMax = updatePAMax();
        playersArray = resetPlayersArray(); 
        setIsLive(true);
        setIsGameOver(false);
    }

    // check for a round with no score change
    function scoreChange() {
        let [a, b] = playersArray;
        let result = (a.length === b.length) && a.every((e, idx) => e === b[idx]);
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
        let first;
        if (Math.max(...scoreBoard) > 0.5) {
            let winner = (scoreBoard[0] > scoreBoard[1]) ? 1 : 2;
            console.log(`The winner is player ${winner}`)
            first = <h1>The winner is player {winner}</h1>
        } else {
            console.log(`It's a draw!`)
            first = <h1>It's a draw</h1>
        }
        console.log(`omg it's all over\nFinal Score \nPlayer 1 ${roundNumber(100*scoreBoard[0], 2)} Player 2 ${roundNumber(100*scoreBoard[1], 2)}`);
        let summary = <p>omg it's all over <br/>Final Score <br/>Player 1 {roundNumber(100*scoreBoard[0], 2)} <br/>Player 2 {roundNumber(100*scoreBoard[1], 2)}</p>
        setCurrentMessage(<div>{first}{summary}</div>)
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
        return Math.min(unitsLeft, PAMax);
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
            playersArray = updatePlayersArray(id, humanPid) 
            updateColors(playersArray, humanPid);
        }
        return console.log("exited handleClick!")
    }

    return (
        <div>
            <span className="spacer" >
                <Timer isLive={isLive} setIsLive={setIsLive} triggerNewGame={triggerNewGame}/>
                <button id="submit" onClick={handleEndRoundClick}>Submit</button>
            </span>
            <span id="gameboard">
            {/* <span style={{width:arenaWidth}} id="gameboard"> */}
            {completeArray.map(row => {
                    return <Row row={row} handleClick={handleClick}/>
                })}
            </span>
            {/* <span className="spacer" style={{width:spacerWidth, height:arenaWidth}}> */}
            <span className="spacer">
                <GameTracker sb={stateScoreBoard} msg={currentMessage}/>
            </span>

        </div>
    )
    
}

export default Arena;