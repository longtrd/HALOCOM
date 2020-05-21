import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import { PrivateRoute } from "./components";
import {
  Home as HomeView,
  Article as ArticleView,
  Author as AuthorView,
  Authenticate as AuthenticateView,
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={HomeView} />
      <Route path="/login" component={AuthenticateView} />
      <PrivateRoute path="/item/:item_id" component={ArticleView} />
      <PrivateRoute path="/user/:user_id" component={AuthorView} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
