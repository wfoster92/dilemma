import React, { useEffect } from "react"


function Timer(props) {

    const {timerIDs, setTimerIDs, isLive, setIsLive, triggerNewGame, secondsPerRound, setTimeLeft} = props.stateDictForTimer;
        

    useEffect(() => {
        console.log(`in isLive use effect in timer isLive ${isLive} triggerNewGame ${triggerNewGame}`)

        if(isLive && !triggerNewGame) {
            console.log("in isLive use effect in timer start")
            timerIDs.forEach((timerID) => clearInterval(timerID))
            startTimer();
        } else if (!isLive) {
            console.log("in isLive use effect in timer stop")
            stopTimer(); 
            }   
        }
    , [isLive])


    useEffect(() => {
        // if a new game is triggered, stop the old one and start a new one
        if (triggerNewGame){
            console.log("in triggerNewGame use effect in timer")
            stopTimer(); 
            startTimer();
        }
    }, [triggerNewGame])

    console.log(`top of Timer isLive ${isLive}`);

    function startTimer() {
        let duration = secondsPerRound;
        let start = Date.now();
        let diff, seconds;

        setTimeLeft(duration);

        function timer() {
            // get the number of seconds that have elapsed since 
            // startTimer() was called
            diff = duration - Math.round((Date.now() - start) / 1000);
            // console.log(diff);
            seconds = Math.round(diff % 60);
    
            seconds = seconds < 10 ? "0" + seconds : seconds;

            setTimeLeft(seconds);
            console.log(`in timer ${seconds}`);
    
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

        setTimeLeft("00");
        console.log(`in stopTimer isLive ${isLive}`);
    }

    return (null);
        // <div>
        //     <h1>{secondsPerRound}</h1>
        // </div>
    // )
}

export default Timer;