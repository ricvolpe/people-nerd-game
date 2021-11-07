import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import User from "./screens/User";
import Friendsboard from "./screens/Friendsboard";

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/friendsboard">
            <Friendsboard />
          </Route>
          <Route path="/">
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}