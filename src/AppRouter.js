import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Player from "./screens/config/Player";
import Difficulty from "./screens/config/Difficulty";

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
          <Route path="/">
            <Player />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}