import "./index.css";

import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
