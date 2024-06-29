import React from "react";
import ReactDOM from "react-dom";
import "../styles/cusStyle.css";

import { Loader } from "rsuite";

const CustomLoader = (props) => (
  <>
    <Loader className="loader btn btn-primary" content={props.content} />
  </>
);

export default CustomLoader