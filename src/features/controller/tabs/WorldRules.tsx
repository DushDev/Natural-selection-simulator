import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCageSize,
  changeWorldHeight,
  changeWorldWidth,
} from "../controllerSlice";
import simulation from "../../../simulation";
import ISimulationRefProps from "../../../simulation/iSimulationRefProps";

const WorldRulesTab = ({ simulationRef }: ISimulationRefProps) => {
  const { worldWidth, worldHeight, cageSize } = useSelector(
    (state: any) => state.controller
  );
  const dispatch = useDispatch();
  const simulation = simulationRef.current;
  const confirmChange = (callback: () => void) => {
    if (simulation.active) {
      if (
        window.confirm(
          "Сhanging this property will clear the simulation and stop. Continue?"
        )
      ) {
        simulation.clear();
        simulation.stop();
        callback();
      }
    } else {
      simulation.world.refreshGrid();
      callback();
    }
  };
  return (
    <div className="tab">
      <Form.Label>World width: {worldWidth}</Form.Label>
      <Form.Range
        min="1"
        max="250"
        step="1"
        value={worldWidth}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          confirmChange(() =>
            dispatch(changeWorldWidth(Number(event.target.value)))
          )
        }
      />
      <Form.Label>World height: {worldHeight}</Form.Label>
      <Form.Range
        min="1"
        max="250"
        step="1"
        value={worldHeight}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          confirmChange(() =>
            dispatch(changeWorldHeight(Number(event.target.value)))
          )
        }
      />
      <Form.Label>Cage size: {cageSize}</Form.Label>
      <Form.Range
        min="1"
        max="20"
        step="1"
        value={cageSize}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(changeCageSize(Number(event.target.value)))
        }
      />
    </div>
  );
};

export default WorldRulesTab;
