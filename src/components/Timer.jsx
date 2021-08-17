import React, { useState, useEffect } from "react"
import { secondsPerRound } from "../helperFunctions/globals";


function Timer(props) {

    const {timerIntervalID, setTimerIntervalID, timerIDs, setTimerIDs, 
        clearedTimerIDs, setClearedTimerIDs, isLive, setIsLive, isGameOver, triggerNewGame} = props.stateDictForTimer;

    useEffect(() => {
        if(isLive) {
            timerIDs.forEach((timerID) => clearInterval(timerID))
            startTimer();
            console.log(`from isLive = true useEffect timerIntervalID is ${timerIntervalID}`)
        } else if (!isLive) {
            timerIDs.forEach((timerID) => clearInterval(timerID))
            stopTimer(timerIntervalID);
            console.log(`from isLive = false useEffect timerIntervalID is ${timerIntervalID}`)
        }
        console.log(`timerIDs ${timerIDs} \nclearedTimerIDs ${clearedTimerIDs}`);
    }
    , [isLive])

    useEffect(() => {
        if(isGameOver) {
            console.log(`isGameOver ${isGameOver} from Timer useEffects`)
            timerIDs.forEach((timerID) => clearInterval(timerID))
        }
    }, [isGameOver])

    useEffect(() => {
        // if a new game is triggered, stop the old one and start a new one
        if (triggerNewGame){
            console.log(`from triggerNewGame useEffect timerIntervalID is ${timerIntervalID}`)
            timerIDs.forEach((timerID) => clearInterval(timerID))
            stopTimer(timerIntervalID);
            startTimer();
        }
    }, [triggerNewGame])

    console.log(`top of Timer isLive ${isLive}`);

    function startTimer() {
        let duration = secondsPerRound;
        let display = document.getElementById("timer");
        let start = Date.now();
        let diff, seconds;
        display.textContent = duration; 

        function timer() {
            // get the number of seconds that have elapsed since 
            // startTimer() was called
            diff = duration - Math.round((Date.now() - start) / 1000);
            // console.log(diff);
            seconds = Math.round(diff % 60);
    
            // minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            if (display) {
                display.textContent = seconds; 
                console.log(`in timer ${seconds}`);
            }
    
            if (diff <= 0) {
                console.log(`diff is negative. Breaking \ntimerIntervalID ${intervalID}`);
                clearInterval(intervalID);

                // console.log(`end of timer function isLive ${isLive}`)
                setIsLive(false);

            }
        };
        // we don't want to wait a full second before the timer starts
        timer();
        let intervalID = setInterval(timer, 1000);
        // setting IntervalID here 
        setTimerIntervalID(intervalID);
        setTimerIDs((prevState) => [...prevState, intervalID]);
        console.log(`in start timer intervalID ${intervalID}`);
        // return intervalID;
    }
    
    function stopTimer(id) {
        clearInterval(id);
        setClearedTimerIDs((prevState) => [...prevState, id])
        timerIDs.forEach((timerID) => clearInterval(timerID))
        let display = document.getElementById("timer");
        display.textContent = "00";
        console.log(`in stopTimer id ${id} isLive ${isLive} clearedTimerIDs ${clearedTimerIDs}`)
    }

    return (
        <div>
            <p>Time</p>
            <h1 id="timer">{secondsPerRound} </h1>
        </div>
    )
}

export default Timer;