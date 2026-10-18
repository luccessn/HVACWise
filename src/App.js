/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import "./App.css";
import React, { useEffect, useState } from "react";
import { Home } from "./Pages/Home/Home";
import { BackgroundLines } from "./Components/UI/background-lines";
import { RetroGrid } from "./Components/UI/autocad";
import animation from "./gf/dogloveGIF.gif";
import FuzzyText from "./Components/UI/FuzzyText";
// import RippleGrid from "./Components/UI/RiplleGrid";
// import Squares from "./Components/UI/Squares";
// import Spline from "@splinetool/react-spline";
function App() {
  /* eslint-disable prettier/prettier */
  const [openBlock, setOpenBlock] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 950) {
      setOpenBlock(true);
    } else {
      setOpenBlock(false);
    }
  }, []);
  return (
    <>
      {openBlock ? (
        <div className="bg-black min-h-screen overflow-hidden flex flex-col  gap-10">
          <div className=" justify-center mx-auto ">
            <img src={animation} alt="Animation" className="rounded-full" />
          </div>
          <div className="items-center flex-col gap-5 flex justify-center relative">
            <FuzzyText
              colorSplit={0}
              trigger="hover"
              direction="horizontal"
              baseIntensity={0.2}
              hoverIntensity={0.5}
              fuzzRange={30}
              sliceSize={1}
              fps={60}
              transitionDuration={0}
              intro
              introDuration={1400}
              letterSpacing={0}
              enableHover
              clickEffect={false}
              glitchMode={false}
              glitchInterval={2000}
              glitchDuration={200}
            >
              404 ER.LOG
            </FuzzyText>
            <FuzzyText
              colorSplit={0}
              trigger="hover"
              direction="horizontal"
              baseIntensity={0.2}
              hoverIntensity={0.5}
              fuzzRange={30}
              sliceSize={1}
              fps={60}
              transitionDuration={0}
              intro
              introDuration={1400}
              letterSpacing={0}
              enableHover
              clickEffect={false}
              glitchMode={false}
              glitchInterval={2000}
              glitchDuration={200}
            >
              NoT Found
            </FuzzyText>
          </div>
        </div>
      ) : (
        <div className="relative min-h-screen overflow-hidden ">
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
            className="flex justify-center w-full h-full flex-col bg-black " //bg-black
          >
            <RetroGrid />
            <div className="relative z-10 items-center ">
              {" "}
              <Home />
            </div>
          </BackgroundLines>{" "}
        </div>
      )}
    </>
  );
}

export default App;
