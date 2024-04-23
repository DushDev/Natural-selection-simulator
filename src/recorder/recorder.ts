import Simulation from "../simulation";
import downloadJSON from "../utils/downloadJSON";
import Record from "./record";

export default class Recorder {
  recordEveryStep = 500; //record every time
  currentRecord: Record | undefined = undefined;
  recording = false;
  constructor(public simulation: Simulation) {}
  startRecord() {
    this.recordEveryStep = +(
      window.prompt(
        "every how many steps to record? (1 - every step, 500 - every 500 steps, etc.) (>500 recomended)"
      ) || 500
    );
    this.recording = true;
    this.currentRecord = new Record(this.simulation);
  }
  endRecord() {
    this.recording = false;
    this.saveRecord();
  }
  recordStep() {
    if (this.simulation.steps % this.recordEveryStep === 0 && this.recording)
      this.currentRecord?.addStep();
  }

  saveRecord() {
    downloadJSON(JSON.stringify(this.formatRecord()), "recording");
  }
  formatRecord() {
    let rec = this.currentRecord?.record;
    let gridRecord = rec?.gridRecord;
    let newRecord: any[][] = [];
    for (let s in gridRecord) {
      for (let i in gridRecord[+s]) {
        for (let j in gridRecord[+s][i]) {
          let cage = gridRecord[+s][i][j];
          if (cage) {
            if (!newRecord[+s]) newRecord[+s] = [];
            newRecord[+s].push([
              cage.type,
              cage.energy,
              cage.speciesColor,
              cage.color,
              cage.x,
              cage.y,
            ]);
            // newRecord[+s].push({
            //   type: cage.type,
            //   energy: cage.energy,
            //   speciesColor: cage.speciesColor,
            //   color: cage.color,
            // });
          }
        }
      }
    }
    const newRec = {
      record: newRecord,
      worldWidth: rec?.worldWidth,
      worldHeight: rec?.worldHeight,
    };
    console.log(newRec);
    return newRec;
  }
}
