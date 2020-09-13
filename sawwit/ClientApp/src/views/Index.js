import React, { Component } from "react";
import axios from "axios";
import store from "../redux/store";

export class Index extends Component {
  static displayName = Index.name;

  componentDidMount() {
    console.log(Object.keys(store.getState().user.user).length !== 0);

    return axios({
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      method: "post",
      url: `api/user/valid`,
      body: {
        email: localStorage.getItem("email"),
      },
    }).then((results) => {
      console.log(results);
    });
  }

  render() {
    return <h1>INDEX</h1>;
  }
}
