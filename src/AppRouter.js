import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Player from "./screens/config/Player";
import Group from "./screens/config/Group";
import Difficulty from "./screens/config/Difficulty";

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/player">
            <Player />
          </Route>
          <Route path="/group">
            <Group />
          </Route>
          <Route path="/difficulty">
            <Difficulty />
          </Route>
          <Route path="/">
            <Default />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Default() {
  return <h2>Default</h2>;
}