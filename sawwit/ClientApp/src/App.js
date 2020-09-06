import React, { Component } from "react";
import { Route } from "react-router";
import { Index } from "./views/Index";
import { Register } from "./views/Register";
import { Login } from "./views/Login";
import { NavMenu } from "./components/NavMenu";



import "./App.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div className="main">
        <NavMenu />
        <Route exact path="/" component={Index} />
        <Route exact path="/login" component={Login} />
        <Route path="/register" component={Register} />
     
    
      </div>
    );
  }
}
