let settings = {
  fps: 150,
  width: 180,
  height: 96,
  cageSize: 5,
  mutationsRate: 0.25,
  energyLevels: {
    0: 10,
    8: 9,
    16: 8,
    24: 7,
    32: 6,
    40: 5,
    48: 4,
    56: 3,
    64: 2,
    72: 1,
    80: 0,
    88: 0,
  },
  mineralLevels: {
    72: 1,
    80: 2,
    88: 3,
  },
  startEnergy: 200,
  maxIter: 50,
  actionsPrice: {
    photosynthesis: 0,
    move: 1,
    eat: 77,
    reproduce: 300,
  },
  minEnergyToReproduce: 500,
  viewmode: "normal",
};
export default settings;
