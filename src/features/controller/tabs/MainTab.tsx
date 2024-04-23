import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  changeGameSpeed,
  changeMutations,
  changeRenderMode,
} from "../controllerSlice";
import ISimulationRefProps from "../../../simulation/iSimulationRefProps";
import Player from "../../../player/player";

const MainTab = ({ simulationRef }: ISimulationRefProps) => {
  const { gameSpeed, mutations, renderMode } = useSelector(
    (state: any) => state.controller
  );
  const dispatch = useDispatch();

  const simulation = simulationRef.current;
  const [steps, setSteps] = useState(0);
  const [stepsSpeed, setStepsSpeed] = useState(0);
  const [simulationActive, setSimulationActive] = useState(simulation.active);
  const [recording, setRecording] = useState(false);
  const [recordedSteps, setRecordedSteps] = useState(0);

  useEffect(() => {
    simulationRef.current.STATE.steps = [steps, setSteps];
    simulationRef.current.STATE.stepsSpeed = [stepsSpeed, setStepsSpeed];
    simulationRef.current.STATE.simulationActive = [
      simulationActive,
      setSimulationActive,
    ];
    simulationRef.current.STATE.recording = [recording, setRecording];
    simulationRef.current.STATE.recordedSteps = [
      recordedSteps,
      setRecordedSteps,
    ];
  });

  return (
    <div className="tab">
      <ButtonGroup aria-label="control">
        <Button disabled={simulationActive} onClick={() => simulation.start()}>
          Start
        </Button>
        <Button disabled={!simulationActive} onClick={() => simulation.stop()}>
          Stop
        </Button>
      </ButtonGroup>
      <Button onClick={() => simulation.clear()} variant={"danger"}>
        Clear
      </Button>
      <Button onClick={() => simulation.world.spawnBots(30)}>Spawn Bots</Button>
      <br />
      <p>
        Steps: {steps}{" "}
        <span style={{ color: "gray" }}>
          +{Math.round(stepsSpeed * simulation.ups)}
        </span>
      </p>
      <Form.Label>
        Game Speed: {gameSpeed}{" "}
        {gameSpeed > 200 ? (
          <span
            style={{
              backgroundColor: "#632DE9",
              color: "white",
              borderRadius: "10px",
              fontWeight: 900,
              padding: "4px",
            }}
          >
            TURBO
          </span>
        ) : (
          ""
        )}
      </Form.Label>
      <Form.Range
        min="1"
        max="250"
        step="1"
        value={gameSpeed}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(changeGameSpeed(Number(event.target.value)))
        }
      />
      <Form.Label>Mutations rate: {Math.round(mutations * 100)}%</Form.Label>
      <Form.Range
        min="0"
        max="1"
        step="0.01"
        value={mutations}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(changeMutations(Number(event.target.value)))
        }
      />
      <Form.Label>Render mode</Form.Label>
      <br />
      <ButtonGroup aria-label="render mode">
        <Button
          variant={renderMode === "none" ? "primary" : "secondary"}
          onClick={() => dispatch(changeRenderMode("none"))}
        >
          None
        </Button>
        <Button
          variant={renderMode === "normal" ? "primary" : "secondary"}
          onClick={() => dispatch(changeRenderMode("normal"))}
        >
          Normal
        </Button>
        <Button
          variant={renderMode === "energy" ? "primary" : "secondary"}
          onClick={() => dispatch(changeRenderMode("energy"))}
        >
          Energy
        </Button>
        <Button
          variant={renderMode === "species" ? "primary" : "secondary"}
          onClick={() => dispatch(changeRenderMode("species"))}
        >
          Colors
        </Button>
      </ButtonGroup>

      <div className={"record"}>
        <h3>Recording</h3>
        <div className="recording">
          <ButtonGroup aria-label="recording">
            <Button
              onClick={() => {
                if (!recording) {
                  simulation.recorder.startRecord();
                  setRecording(true);
                } else {
                  simulation.recorder.endRecord();
                  setRecording(false);
                }
              }}
            >
              {recording ? "End" : "Start"} record
            </Button>
          </ButtonGroup>
          <div className="rec-stats">
            <p>Recorded steps: {recordedSteps}</p>
          </div>
        </div>
        <div className="playing">
          <Form.Label htmlFor="loadRecord">Load Record</Form.Label>
          <input
            onChange={(event) => {
              const file = event.target.files![0];
              const reader = new FileReader();

              reader.onload = (event) => {
                const fileContent = event.target!.result;
                const jsonData = JSON.parse(fileContent as string);
                // console.log("JSON data:", jsonData);
                // Обробка отриманих даних
                simulation.player.loadRecord(jsonData);
              };

              reader.readAsText(file);
            }}
            type="file"
            name="record"
            id="loadRecord"
          />
          <Button>Play record</Button>
          <Form.Label>Current step in record:</Form.Label>
          <Form.Range
            min="0"
            max="1"
            step="0.01"
            value={mutations}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(changeMutations(Number(event.target.value)))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MainTab;
