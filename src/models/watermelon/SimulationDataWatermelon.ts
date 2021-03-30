import SimulationData from "../SimulationData";
import { Model } from "@nozbe/watermelondb";
import SimulationData2 from "../SimulationData2";
import { date, field, relation } from "@nozbe/watermelondb/decorators";

class SimulationDataWatermelon extends Model implements SimulationData {
  static table = 'simulation_data';
  @field('id')
  _id: number;
  @field('number')
  number: number;
  @relation('simulation_data2', 'simulation2_id')
  simulation2: SimulationData2;
  @field('string')
  string: string;
  @date('timestamp')
  timestamp: Date;

  toJSON(): {
    number: number;
    string: string;
    simulation2: SimulationData2;
    id: number | undefined;
    timestamp: Date;
  } {
    return {
      number: this.number,
      string: this.string,
      simulation2: this.simulation2,
      id: this._id,
      timestamp: this.timestamp,
    };
  }

  constructor(
    id: number,
    number: number,
    simulation2: SimulationData2,
    string: string,
    timestamp: Date,
  ) {
    super();
    this._id = id;
    this.number = number;
    this.simulation2 = simulation2;
    this.string = string;
    this.timestamp = timestamp;
  }
}

export default SimulationDataWatermelon;
