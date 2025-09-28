/* eslint-disable import/no-unresolved */
import "./App.css";
import React from "react";
import { Home } from "./Pages/Home/Home";
import { BackgroundLines } from "./Components/UI/background-lines";
import { RetroGrid } from "./Components/UI/autocad";
// import RippleGrid from "./Components/UI/RiplleGrid";
// import Squares from "./Components/UI/Squares";
// import Spline from "@splinetool/react-spline";
function App() {
  return (
    <div className="App relative   ">
      {" "}
      {/* Background */}
      {/* <div className="fixed inset-0 bg-zinc-600 -z-10">
        {" "}
        <Squares
          className="pointer-events-auto"
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#120"
          hoverFillColor="#222"
        />
      </div> */}
      <BackgroundLines
        svgOptions={{ duration: 10 }}
        className="flex justify-center w-full h-full flex-col "
      >
        <RetroGrid />
        <div className="relative z-10 items-center ">
          {" "}
          <Home />
        </div>
      </BackgroundLines>{" "}
    </div>
  );
}

export default App;
{
  /* <div className="w-full h-full">
          <RippleGrid
            enableRainbow={false}
            gridColor="#ffffff"
            rippleIntensity={0.03}
            gridSize={10}
            gridThickness={15}
            mouseInteraction={true}
            mouseInteractionRadius={1.2}
            opacity={1.8}
          />
        </div> */
}
