import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "~/pages/Home";
import SignIn from "~/pages/SignIn";
import SignUp from "~/pages/SignUp";
import Info from "~/pages/Info";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/info" component={Info} />
                <Route exact path="/" component={Home} />
                <Route exact path="/signin" component={SignIn} />
            </Switch>
        </Router>
    );
}
