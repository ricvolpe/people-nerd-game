import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import User from "./screens/User";
import Scoreboard from "./screens/Scoreboard";
import Question from "./screens/Question"

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/scoreboard">
            <Scoreboard />
          </Route>
          <Route path="/question/:number">
            <Question />
          </Route>
          <Route path="/">
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}