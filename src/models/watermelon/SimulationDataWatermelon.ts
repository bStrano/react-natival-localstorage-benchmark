import SimulationData from "../SimulationData";
import { Model } from "@nozbe/watermelondb";
import { date, field, relation } from "@nozbe/watermelondb/decorators";
import SimulationData2Watermelon from "./SimulationData2Watermelon";

class SimulationDataWatermelon extends Model implements SimulationData {
  static table = 'simulation_data';
  static associations = {
    simulation_data2: {type: 'has_many', foreignKey: 'simulation2_id'},
  } as const;

  @field('test')
  _id!: number;
  @field('number')
  number!: number;
  @relation('simulation_data2', 'simulation2_id')
  simulation2!: SimulationData2Watermelon;
  @field('string')
  string!: string;
  @date('timestamp')
  timestamp!: Date;

  toJSON(): {
    number: number;
    string: string;
    simulation2: SimulationData2Watermelon;
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
}

export default SimulationDataWatermelon;
