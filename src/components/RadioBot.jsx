import React from "react";




function RadioBot(props) {
    let num = props.num 
    let botDescriptions = {
        1: "Selects at Random",
        2: "A Better Random Bot",
        3: "The Best Random Bot",
        4: "Greedy, Not Random"
    }

    if (props.defaultChecked){
        return ((<span>
                    <label htmlFor={`bot${num}`} className="botLabel"><br/>
                        <input type="radio" id={`bot${num}`} name="botDifficulty" value={num} defaultChecked/>
                        <div className="botProfile">
                            <span>{botDescriptions[num]}</span><br/>
                            <img src={`/images/robot${num}.png`} /><br/>
                        </div>
                    </label>
                </span>))
    } else if (!props.defaultChecked){
        return (<span>
                    <label htmlFor={`bot${num}`} className="botLabel"><br/>
                        <input type="radio" id={`bot${num}`} name="botDifficulty" value={num}/>
                        <div className="botProfile">
                            <span>{botDescriptions[num]}</span><br/>
                            <img src={`/images/robot${num}.png`}/><br/>
                        </div>
                    </label>
                </span>)
    }
}


export default RadioBot;