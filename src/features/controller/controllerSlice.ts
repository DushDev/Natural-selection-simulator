import { createSlice } from "@reduxjs/toolkit";
import simulation from "../../simulation";

const initialState = {
  gameSpeed: 350,
  mutations: 0.25,
  renderMode: "normal",
  worldWidth: 180,
  worldHeight: 96,
  cageSize: 5,
  genomeLength: 64,
  maxIter: 50,
  simulationActive: false,
  renderActive: true,
};

export const controllerSlice = createSlice({
  name: "controller",
  initialState,
  reducers: {
    changeGameSpeed(state, action) {
      state.gameSpeed = action.payload;
    },
    changeMutations(state, action) {
      state.mutations = action.payload;
    },
    changeRenderMode(state, action) {
      state.renderMode = action.payload;
    },
    changeWorldWidth(state, action) {
      state.worldWidth = action.payload;
    },
    changeWorldHeight(state, action) {
      state.worldHeight = action.payload;
    },
    changeCageSize(state, action) {
      state.cageSize = action.payload;
    },
    changeGenomeLength(state, action) {
      state.genomeLength = action.payload;
    },
    changeMaxIter(state, action) {
      state.maxIter = action.payload;
    },
    changeSimulationActive(state, action) {
      state.simulationActive = action.payload;
    },
    changeRenderActive(state, action) {
      state.renderActive = action.payload;
    },
  },
});

export const {
  changeGameSpeed,
  changeMutations,
  changeRenderMode,
  changeWorldWidth,
  changeWorldHeight,
  changeCageSize,
  changeGenomeLength,
  changeMaxIter,
  changeSimulationActive,
  changeRenderActive,
} = controllerSlice.actions;
export default controllerSlice.reducer;
