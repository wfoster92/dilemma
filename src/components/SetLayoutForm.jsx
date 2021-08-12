import React from "react"
import { Link } from "react-router-dom"


function SetLayoutForm(props) {

    let [numRows, numCols, difficulty] = props.layoutSettings;
    let rowArray = [2,3,4,5,6,7];
    let colArray = [2,3,4,5,6,7];
    let difficultyArray = [1,2,3,4];




    return(<div>
        <p>Number of Rows</p>
        <div>
        {rowArray.map((num) => {
            if (num === numRows) {
                {console.log(`num ${num} numRows ${numRows} true`)}
                return (<span>
                            <input type="radio" id={"row".concat(num.toString())} name="rowCount" value={num.toString()} defaultChecked/>
                            <label htmlFor={"row".concat(num.toString())}>{num}</label>
                        </span>)
            } else {
                {console.log(`num ${num} numRows ${numRows} false`)}
                return (<span>
                            <input type="radio" id={"row".concat(num.toString())} name="rowCount" value={num.toString()}/>
                            <label htmlFor={"row".concat(num.toString())}>{num}</label>
                        </span>)
            }
        })}
        </div>

        <p>Number of Columns</p>
        {colArray.map((num) => {

            if (num === numCols) {
                {console.log(`num ${num} numCols ${numCols} true`)}

                return (<span>
                    <input type="radio" id={"col".concat(num.toString())} name="colCount" value={num.toString()} defaultChecked/>
                    <label htmlFor={"col".concat(num.toString())}>{num}</label>
                </span>)
            } else {
                {console.log(`num ${num} numCols ${numCols} false`)}
                return (<span>
                            <input type="radio" id={"col".concat(num.toString())} name="colCount" value={num.toString()}/>
                            <label htmlFor={"col".concat(num.toString())}>{num}</label>
                        </span>)
            }
        })}

        <p>Bot Difficulty (4 is Most Difficult)</p>
        
        {difficultyArray.map((num) => {
            if (num === difficulty) {
                {console.log(`num ${num} difficulty ${difficulty} true`)}

                return (<span>
                            <input type="radio" id={"bot".concat(num.toString())} name="botDifficulty" value={num.toString()} defaultChecked/>
                            <label htmlFor={"bot".concat(num.toString())}>{num}</label>)
                        </span>)           
            } else {
                {console.log(`num ${num} difficulty ${difficulty} false`)}
                return (<span>
                            <input type="radio" id={"bot".concat(num.toString())} name="botDifficulty" value={num.toString()}/>
                            <label htmlFor={"bot".concat(num.toString())}>{num}</label>
                        </span>)
            }
        })}
        <input type="submit" value="Submit"></input> 

    </div>
    )
}

export default SetLayoutForm;