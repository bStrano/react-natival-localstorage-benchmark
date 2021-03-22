import SimulationData2 from "./SimulationData2";

export enum ISimulationStatus {
  READY,
  PREPARATION,
  PROGRESS,
}

interface ISimulationConstructor {
  id?: number;
  number: number;
  string: string;
  timestamp: Date;
  simulation2: SimulationData2;
}

class SimulationData {
  _id?: number;
  number: number;
  string: string;
  timestamp: Date;
  simulation2: SimulationData2;

  constructor({
    id,
    number,
    string,
    timestamp,
    simulation2,
  }: ISimulationConstructor) {
    this._id = id;
    this.number = number;
    this.string = string;
    this.timestamp = timestamp;
    this.simulation2 = simulation2;
  }
}

export default SimulationData;
