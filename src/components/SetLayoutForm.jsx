import React from "react"
import { Link } from "react-router-dom"
import RadioBot from "./RadioBot"


function SetLayoutForm(props) {

    let [numRows, numCols, difficulty] = props.layoutSettings;
    let rowArray = [2,3,4,5,6,7];
    let colArray = [2,3,4,5,6,7];
    let difficultyArray = [1,2,3,4];




    return(<div>
                <h1>Select Your Board Layout</h1>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-3 radioRow">
                        <p>Rows</p>
                        {rowArray.map((num) => {
                            if (num === numRows) {
                                return (<span>
                                            <label htmlFor={"row".concat(num.toString())}>{num}<br/>
                                            <input type="radio" id={"row".concat(num.toString())} name="rowCount" value={num.toString()} defaultChecked/>
                                            </label>
                                        </span>)
                            } else {
                                return (<span>
                                            <label htmlFor={"row".concat(num.toString())}>{num}<br/>
                                            <input type="radio" id={"row".concat(num.toString())} name="rowCount" value={num.toString()}/>
                                            </label>
                                        </span>)
                            }
                        })}
                    </div>

                    <div className="col-3 radioColumn">
                        <p>Columns</p>
                        {colArray.map((num) => {
                            if (num === numCols) {
                                return (<span>
                                            <label htmlFor={"col".concat(num.toString())}>{num}<br/>
                                            <input type="radio" id={"col".concat(num.toString())} name="colCount" value={num.toString()} defaultChecked/>
                                            </label>
                                        </span>)
                            } else {
                                return (<span>
                                            <label htmlFor={"col".concat(num.toString())}>{num}<br />
                                            <input type="radio" id={"col".concat(num.toString())} name="colCount" value={num.toString()}/>
                                            </label>
                                        </span>)
                            }
                        })}
                    </div>
                    <div className="col-3"></div>

                </div>
                <h1>Bot Difficulty</h1>
                <div>
                    <div className="radioBot align-self-center row">
                        {/* <p>Bot Difficulty (4 is The Hardest)</p> */}
                        
                        {difficultyArray.map((num) => {
                            if (num === difficulty) {
                                return (
                                    <span className="col-3">
                                        <RadioBot defaultChecked={true} num={num}/>
                                    </span> 
                                )
    
                            } else {
                                return (<span className="col-3">

                                <RadioBot defaultChecked={false} num={num}/>
                                </span>)
                                {/* (<span>
                                            <label htmlFor={"bot".concat(num.toString())}>{num}<br/>
                                            <input type="radio" id={"bot".concat(num.toString())} name="botDifficulty" value={num}/>
                                            </label>
                                        </span>) */}
                            }
                        })}
                    </div>
                </div>
                <input type="submit" value="Submit"></input>       



    </div>
    )
}

export default SetLayoutForm;