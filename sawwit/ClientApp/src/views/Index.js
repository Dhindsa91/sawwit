import React, { Component } from "react";
import axios from "axios";
import store from "../redux/store";

export class Index extends Component {
  static displayName = Index.name;

  componentDidMount() {
    return axios({
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      method: "get",
      url: `api/user/valid`,

    }).then((results) => {
      console.log(results);
    });
  }

  render() {
    return <h1 className="jumbotron">INDEX</h1>;
  }
}
