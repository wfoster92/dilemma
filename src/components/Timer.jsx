import React, { useEffect } from "react"
import { secondsPerRound } from "../helperFunctions/globals";


function Timer(props) {

    const {timerIDs, setTimerIDs, isLive, setIsLive, triggerNewGame} = props.stateDictForTimer;
    
    // let display = document.getElementById("timer");
    

    useEffect(() => {
        if(isLive && !triggerNewGame) {
            timerIDs.forEach((timerID) => clearInterval(timerID))
            startTimer();
        } else if (!isLive) {
            stopTimer(); 
        }
        console.log(`timerIDs ${timerIDs}`);
    }
    , [isLive])


    useEffect(() => {
        // if a new game is triggered, stop the old one and start a new one
        if (triggerNewGame){
            stopTimer(); 
            startTimer();
        }
    }, [triggerNewGame])

    console.log(`top of Timer isLive ${isLive}`);

    function startTimer() {
        let duration = secondsPerRound;
        let start = Date.now();
        let diff, seconds;
        let display = document.getElementById("timer");

        display.textContent = duration; 

        function timer() {
            // get the number of seconds that have elapsed since 
            // startTimer() was called
            diff = duration - Math.round((Date.now() - start) / 1000);
            // console.log(diff);
            seconds = Math.round(diff % 60);
    
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            if (display) {
                display.textContent = seconds; 
                console.log(`in timer ${seconds}`);
            }
    
            if (diff <= 0) {
                console.log(`diff is negative. Breaking \ntimerIntervalID ${intervalID}`);
                clearInterval(intervalID);

                setIsLive(false);

            }
        };
        // we don't want to wait a full second before the timer starts
        timer();
        let intervalID = setInterval(timer, 1000);
        setTimerIDs((prevState) => [...prevState, intervalID]);
        console.log(`in start timer intervalID ${intervalID}`);
    }
    
    // function stopTimer(id) {
    function stopTimer() {
        timerIDs.forEach((timerID) => clearInterval(timerID))
        let display = document.getElementById("timer");

        display.textContent = "00";
        console.log(`in stopTimer isLive ${isLive}`);
    }

    return (
        <div>
            <p>Time</p>
            <h1 id="timer">{secondsPerRound}</h1>
        </div>
    )
}

export default Timer;