import Bot from "../simulation/bot/bot";

export default interface IRecord {
  worldWidth: number;
  worldHeight: number;
  gridRecord: (Partial<Bot> | undefined)[][][];
}
