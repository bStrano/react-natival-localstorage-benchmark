import SimulationData2 from "./SimulationData2";

export enum ISimulationStatus {
  READY,
  PREPARATION,
  PROGRESS,
  INSERTING,
  SELECTING,
  SELECTING_JOIN,
  FINISHED = 3,
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

  toJSON() {
    return {
      id: this._id,
      number: this.number,
      string: this.string,
      timestamp: this.timestamp,
      simulation2: this.simulation2,
    };
  }
}

export default SimulationData;
