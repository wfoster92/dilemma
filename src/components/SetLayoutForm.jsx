import React from "react"
// import { Link } from "react-router-dom"


function SetLayoutForm(props) {

    let [numRows, numCols, difficulty] = props.layoutSettings;
    let rowArray = [2,3,4,5,6,7];
    let colArray = [2,3,4,5,6,7];
    let difficultyArray = [1,2,3,4];




    return(<div>

        <span className="radioRow">
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
        </span>

        <span className="radioColumn">
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
        </span>

        <div className="radioBot">
            <p>Bot Difficulty (4 is The Hardest)</p>
            
            {difficultyArray.map((num) => {
                if (num === difficulty) {
                    return (<span>
                                <label htmlFor={"bot".concat(num.toString())}>{num}<br/>
                                <input type="radio" id={"bot".concat(num.toString())} name="botDifficulty" value={num.toString()} defaultChecked/>
                                </label>
                            </span>)           
                } else {
                    return (<span>
                                <label htmlFor={"bot".concat(num.toString())}>{num}<br/>
                                <input type="radio" id={"bot".concat(num.toString())} name="botDifficulty" value={num.toString()}/>
                                </label>
                            </span>)
                }
            })}
        </div>
        <input type="submit" value="Submit"></input> 

    </div>
    )
}

export default SetLayoutForm;