import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import User from "./screens/User";
import Friendboard from "./screens/Friendboard";

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/friendsboard">
            <Friendboard />
          </Route>
          <Route path="/">
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}