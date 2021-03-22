import { v4 as uuidv4 } from "uuid";

export enum ISimulationStatus {
  READY,
  PREPARATION,
  PROGRESS,
}

interface ISimulationConstructor {
  id: number;
}

class SimulationData {
  _id: number;
  number: number;
  string: string;
  timestamp: Date;

  constructor({id}: ISimulationConstructor) {
    this._id = id;
    this.number = Math.random();
    this.string = uuidv4();
    this.timestamp = new Date();
  }

  getValues() {
    return `
      (${this._id},${this.number}, '${this.string}', '${this.timestamp}')
    `;
  }
}

export default SimulationData;
