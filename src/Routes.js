import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import { Home as HomeView } from "./views";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeView}></Route>
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
