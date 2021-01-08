import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StoreProvider from "components/Store/Provider";
import Users from "./Users/Users";
import Login from "./Login/Login";
import Register from "./Register/Register"

const PagesRoot = () => (
  <Router>
    <StoreProvider>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </StoreProvider>
  </Router>
);

export default PagesRoot;
