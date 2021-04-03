import { Model } from "@nozbe/watermelondb";
import SimulationData2 from "../SimulationData2";
import { field } from "@nozbe/watermelondb/decorators";

class SimulationData2Watermelon extends Model implements SimulationData2 {
  static table = 'simulation_data2';
  static associations = {
    simulation_data: {type: 'belongs_to', key: 'simulation2_id'},
  } as const;

  @field('test')
  _id!: number | ObjectId;
  @field('name')
  name!: string;
  toJSON(): {name: string | undefined; _id: number | ObjectId | undefined} {
    return {
      name: this.name,
      _id: this._id,
    };
  }
}

export default SimulationData2Watermelon;
