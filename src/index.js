// @flow strict

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Shop from "./Shop";

const root = document.getElementById("root");

if (root !== null) {
  ReactDOM.render(<Shop />, root);
}
