import Simulation from "..";
export default interface IBot {
  x: number;
  y: number;
  genome?: number[];
  color?: string;
  simulation: Simulation;
  speciesColor?: string;
}
