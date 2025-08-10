/* eslint-disable import/no-unresolved */
import "./App.css";
import React from "react";
import { Home } from "./Pages/Home/Home";
// import Spline from "@splinetool/react-spline";
function App() {
  return (
    <div className="App">
      {/* <Spline scene="https://prod.spline.design/3JGOOm5wlMnvEdZq/scene.splinecode" />{" "} */}
      <Home />
    </div>
  );
}

export default App;
