import React from "react";
import Arena from "./Arena"
import Header from "./Header";
import Home from "./Home";
import Rules from "./Rules";
import {
    BrowserRouter as Router, Switch, Route,
    Link
  } from "react-router-dom";

function App() {
    
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/rules">
                    <Rules />
                </Route>
                <Route exact path="/arena">
                    <Arena />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;