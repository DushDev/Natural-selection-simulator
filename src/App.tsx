import { useEffect, useRef, useState } from "react";
import Controller from "./features/controller/Controller";
import "./styles/main.scss";
import Render from "./render/render";
import { useSelector } from "react-redux";
import Simulation from "./simulation";

function App() {
  const renderStartedRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let simulationRef = useRef<Simulation>(new Simulation());
  const { worldWidth, worldHeight, cageSize, renderMode } = useSelector(
    (state: any) => state.controller
  );

  useEffect(() => {
    const renderManager = new Render(canvasRef.current!);
    if (!renderStartedRef.current) {
      renderStartedRef.current = true;
      setInterval(() => {
        simulationRef.current.updateState();
        if (renderMode !== "none") renderManager.render(simulationRef.current!);
      }, 1000 / 30);
    }
  }, []);
  return (
    <>
      <div className="content">
        <canvas
          ref={canvasRef}
          id="myCanvas"
          width={worldWidth * cageSize}
          height={worldHeight * cageSize}
        ></canvas>
      </div>
      <Controller simulationRef={simulationRef}></Controller>
    </>
  );
}

export default App;
