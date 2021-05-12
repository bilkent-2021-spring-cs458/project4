import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "~/pages/SignIn";
import SignUp from "~/pages/SignUp";
import Info from "~/pages/Info";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/signup" component={SignUp} />
                <Route exact path="/info" component={Info} />
                <Route path="/signin" component={SignIn} />
            </Switch>
        </Router>
    );
}
