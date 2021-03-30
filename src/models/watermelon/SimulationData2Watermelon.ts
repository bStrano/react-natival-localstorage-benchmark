import { Model } from "@nozbe/watermelondb";
import SimulationData2 from "../SimulationData2";
import { field } from "@nozbe/watermelondb/decorators";

class SimulationData2Watermelon extends Model implements SimulationData2 {
  static table = 'simulation_data2';
  @field('id')
  _id: number | ObjectId;
  @field('name')
  name: string;

  toJSON(): {name: string | undefined; _id: number | ObjectId | undefined} {
    return {
      name: this.name,
      _id: this._id,
    };
  }

  constructor(id: number | ObjectId, name: string) {
    super();
    this._id = id;
    this.name = name;
  }
}

export default SimulationData2Watermelon;
