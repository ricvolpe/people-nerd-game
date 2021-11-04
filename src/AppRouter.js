import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Player from "./screens/Player";
import Difficulty from "./screens/Difficulty";
import Question from "./screens/Question";

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/player">
            <Player />
          </Route>
          <Route path="/difficulty">
            <Difficulty />
          </Route>
          <Route path="/question/:number">
            <Question />
          </Route>
          <Route path="/">
            <Player />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}