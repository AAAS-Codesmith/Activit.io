import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import "./styles.css";

// Deal with this later
// import { createRoot } from "react-dom/client";
// New way to render at root. Alex:Self - Look into this
// const container = document.getElementbyId("root");
// const root = createRoot(container);
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Depracated version
// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );
