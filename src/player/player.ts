import IRecord from "../recorder/irecord";
import Simulation from "../simulation";
import Bot from "../simulation/bot/bot";

export default class Player {
  currentRecord: IRecord | null = null;
  active = false;
  currentStep = 0;
  constructor(public simulation: Simulation) {}
  loadRecord(dataJSON: any) {
    this.currentRecord = this.decodeRecord(JSON.parse(dataJSON));
    // console.log(this.currentRecord);
  }

  start() {
    this.active = true;
  }
  decodeRecord(data: any) {
    let codedRecord = data.record;
    let worldWidth = data.worldWidth;
    let worldHeight = data.worldHeight;
    let decodedRecord: (Partial<Bot> | undefined)[][][] = [];
    for (let i in codedRecord) {
      decodedRecord[+i] = [];
      let thisStep = decodedRecord[+i];
      for (let x = 0; x <= worldWidth; x++) {
        thisStep[x] = [];
        for (let y = 0; y <= worldHeight; y++) {
          thisStep[x][y] = undefined;
        }
      }
      for (let j in codedRecord[i]) {
        let cage = codedRecord[i][j];
        decodedRecord[+i][cage[4]][cage[5]] = {
          type: cage[0],
          energy: cage[1],
          speciesColor: cage[2],
          color: cage[3],
          x: cage[4],
          y: cage[5],
        };
      }
    }
    return {
      worldWidth,
      worldHeight,
      gridRecord: decodedRecord,
    };
  }
}
