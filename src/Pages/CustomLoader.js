import React from "react";
import ReactDOM from "react-dom";
import "../styles/cusStyle.css";

import { Loader } from "rsuite";

const CustomLoader = () => (
  <>
    <Loader className="loader btn btn-primary" content="Loading..." />
  </>
);

export default CustomLoader