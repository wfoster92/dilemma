import React from "react"
import { Link } from "react-router-dom"
import RadioBot from "./RadioBot"


function SetLayoutForm(props) {

    let [numRows, numCols, difficulty] = props.layoutSettings;
    let rowArray = [2,3,4,5,6,7];
    let colArray = [2,3,4,5,6,7];
    let difficultyArray = [1,2,3,4];




    return(
        <div>
            <div className="layoutSegment layoutSegmentGrid align-items-center">
                {/* <div > */}
                    <h1 className="layoutLabel">Select Your Board Layout</h1>
                {/* </div> */}
                <div className="row">
                    <div className="col-5 radioRow">
                        <p className="radioLabel">Rows</p>
                        {rowArray.map((num) => {
                            if (num === numRows) {
                                return (<span className="radioSpan">
                                            <label htmlFor={"row".concat(num.toString())}>{num}<br/>
                                            <input type="radio" id={"row".concat(num.toString())} name="rowCount" value={num.toString()} defaultChecked/>
                                            </label>
                                        </span>)
                            } else {
                                return (<span className="radioSpan">
                                            <label htmlFor={"row".concat(num.toString())}>{num}<br/>
                                            <input type="radio" id={"row".concat(num.toString())} name="rowCount" value={num.toString()}/>
                                            </label>
                                        </span>)
                            }
                        })}
                    </div>
                    <div className="col-2"></div>
                    <div className="col-5 radioColumn">
                        <p className="radioLabel">Columns</p>
                        {colArray.map((num) => {
                            if (num === numCols) {
                                return (<span className="radioSpan">
                                            <label htmlFor={"col".concat(num.toString())}>{num}<br/>
                                            <input type="radio" id={"col".concat(num.toString())} name="colCount" value={num.toString()} defaultChecked/>
                                            </label>
                                        </span>)
                            } else {
                                return (<span className="radioSpan">
                                            <label htmlFor={"col".concat(num.toString())}>{num}<br />
                                            <input type="radio" id={"col".concat(num.toString())} name="colCount" value={num.toString()}/>
                                            </label>
                                        </span>)
                            }
                        })}
                    </div>
                </div>
            </div>

            <div className="layoutSegment layoutSegmentBots align-items-center">
                {/* <div className="layoutLabel"> */}
                    <h1 className="layoutLabel">Bot Difficulty</h1>
                {/* </div> */}
                <div className="radioBot align-self-center row"> 
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
                        }
                    })}
                </div>
            </div>
            <div className="layoutSubmit">
                <input type="submit" value="Submit"></input> 
            </div>      
        </div>
    )
}

export default SetLayoutForm;