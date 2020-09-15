import React, { Component } from "react";
import { Route } from "react-router";
import { Index } from "./views/Index";
import { Register } from "./views/Register";
import { Login } from "./views/Login";
import NavMenu from "./components/NavMenu";
import store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore } from "./redux/store";

import "./App.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={"..Loading"} persistor={persistedStore}>
          <div className="main">
            <NavMenu />
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}
