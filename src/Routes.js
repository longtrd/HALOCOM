import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import {
  Home as HomeView,
  Article as ArticleView,
  Author as AuthorView,
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeView}></Route>
      <Route exact path="/item/:item_id" component={ArticleView}></Route>
      <Route exact path="/user/:user_id" component={AuthorView}></Route>
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
