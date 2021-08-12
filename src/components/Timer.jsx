import React, { useState, useEffect } from "react"
import { secondsPerRound } from "../helperFunctions/globals";


function Timer(props) {

    let isLive = props.isLive;
    let triggerNewGame = props.triggerNewGame;

    const [timerIntervalID, setTimerIntervalID] = useState(-1)
    let timerIDs = [];
    let clearedTimerIDs = [];

    useEffect(() => {
        if(isLive) {
            setTimerIntervalID(startTimer()); 
            // timerIntervalID = startTimer(); 
            timerIDs.push(timerIntervalID)
        } else if (!isLive) {
            stopTimer(timerIntervalID);
            clearedTimerIDs.push(timerIntervalID);
        }
        console.log(`timerIDs ${timerIDs} \nclearedTimerIDs ${clearedTimerIDs}`);
    }
    , [isLive])

    useEffect(() => {
        // if a new game is triggered, stop the old one and start a new one
        if (triggerNewGame){
            stopTimer(timerIntervalID);
            clearedTimerIDs.push(timerIntervalID);
            setTimerIntervalID(startTimer()); 
            timerIDs.push(timerIntervalID)    
        }
    }, [triggerNewGame])

    console.log(`top of Timer isLive ${isLive}`);

    function startTimer() {
        let duration = secondsPerRound;
        let display = document.getElementById("timer")
        let start = Date.now()
        let diff, seconds;
        function timer() {
            // get the number of seconds that have elapsed since 
            // startTimer() was called
            diff = duration - Math.round((Date.now() - start) / 1000);
            // console.log(diff);
            // does the same job as parseInt truncates the float
            // minutes = Math.round(diff / 60);
            seconds = Math.round(diff % 60);
    
            // minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            if (display) {
                display.textContent = seconds; 
            }
    
            if (diff <= 0) {
                // add one second so that the count down starts at the full duration
                // example 05:00 not 04:59
                // start = Date.now() + 1000;
                console.log(`diff is negative. Breaking \nintervalID ${intervalID}`);
                clearInterval(intervalID);
                clearedTimerIDs.push(intervalID);
                console.log(`end of timer function isLive ${isLive}`)
                props.flipIsLive();

            }
        };
        // we don't want to wait a full second before the timer starts
        timer();
        let intervalID = setInterval(timer, 1000);
        console.log(`in start timer intervalID ${intervalID}`);
        return intervalID
    }
    
    function stopTimer(id) {
        console.log(`in stopTimer id ${id} isLive ${isLive}`)
        clearInterval(id);
        let display = document.getElementById("timer");
        display.textContent = 0;
    }

    return (
        <div id="timer">{secondsPerRound} </div>
    )
}

export default Timer;