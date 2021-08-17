import React, { useEffect, useState } from "react";
import Row from "./Row"
import GameTracker from "./GameTracker";
// import Timer from "./Timer";
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
    const [numRows, numCols, difficulty] = props.layoutSettings;

    const {stateScoreBoard, setStateScoreBoard, isLive, setIsLive, 
        currentMessage, setCurrentMessage, triggerNewGame, setTriggerNewGame, 
        isFirstGame, setIsFirstGame, finishedFirstGame, setFinishedFirstGame,
        isGameOver, setIsGameOver, PAMax, setPAMax, animationTimeouts, setAnimationTimeouts, maxNoChangeRounds} = props.stateDictForArena;
    
    const stateDictForRacebar = {stateScoreBoard, currentMessage, difficulty}
    

    const [choicesLeft, setChoicesLeft] = useState(PAMax)

    // set a useState for noChangeRound to pass as a prop and a local variable to keep an accurate endGame calculation
    const [noChangeRounds, setNoChangeRounds] = useState(0);
    // let tempNoChangeRounds = 0;
    // console.log(`init tempNoChangeRounds ${tempNoChangeRounds}`)
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

    function startingPAMax() {
        let newPAMax = (numRows*numCols < 12) ? 3 :
                        (numRows*numCols < 24) ? 4 :
                        (numRows*numCols < 36) ? 5 : 6;
        console.log(`PAMax is ${newPAMax}`)
        return newPAMax;
    }


    function resetTopLevelVariables() {
        playersArray = [[],[]];
        setPAMax(startingPAMax());
        if (!isFirstGame){
            setChoicesLeft(PAMax);
            setNoChangeRounds(0);
            // tempNoChangeRounds = 0;
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
        // console.log(`inside endRoundA, animationTimeouts ${animationTimeouts} outputAnimationTimeouts ${outputAnimationTimeouts}`)

        console.log(`about to runRest, interval ${interval} playersArray ${playersArray}`)
        let roundBTimeoutID = setTimeout(endRoundB, totalDelay);
        setAnimationTimeouts((prevState) => [...prevState, roundBTimeoutID]);
    }


    function endRoundB(){
        controlArray = updateControlArray();
        console.log(`after updateControl Array, playersArray ${playersArray}`);
        
        updateScoreBoard();


        (noScoreChange()) ? setNoChangeRounds((prevState) => prevState+1) : setNoChangeRounds(0);
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
        let first;
        if (Math.max(...scoreBoard) > 0.5) {
            let winner = (scoreBoard[0] > scoreBoard[1]) ? 1 : 2;
            console.log(`The winner is player ${winner}`)
            first = (winner === 1)? <h1>Wow! You Win</h1> : <h1>The Bot Wins!</h1>
        } else {
            console.log(`It's a draw!`)
            first = <h1>It's a draw</h1>
        }
        console.log(`omg it's all over\nFinal Score \nPlayer 1 ${roundNumber(100*scoreBoard[0], 2)} Player 2 ${roundNumber(100*scoreBoard[1], 2)}`);
        let summary = <p>omg it's all over</p>
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

    return (
        <div>
            <span className="spacer">
                <GameTracker stateDictForTimer={props.stateDictForTimer} choicesLeft={choicesLeft} noChangeRounds={noChangeRounds} 
                maxNoChangeRounds={maxNoChangeRounds} handleEndRoundClick={handleEndRoundClick}/>
            </span>
            <span id="gameboard">
                {completeArray.map(row => {
                        return <Row row={row} handleClick={handleClick}/>
                })}
            </span>
            <span className="spacer">
                <ScoreTracker stateDictForRacebar={stateDictForRacebar} msg={currentMessage}/>
            </span>

        </div>
    )
    
}

export default Arena;