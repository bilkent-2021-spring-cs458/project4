import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Landing from "~/pages/Landing/Landing";
import Home from "~/pages/Home"
import SignIn from "~/pages/SignIn";
import SignUp from "~/pages/SignUp/SignUp";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
            </Switch>
        </Router>
    );
}
