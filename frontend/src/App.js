import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "~/pages/Landing/Landing";
import SignIn from "~/pages/SignIn";
import SignUp from "~/pages/SignUp/SignUp";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
            </Switch>
        </Router>
    );
}
