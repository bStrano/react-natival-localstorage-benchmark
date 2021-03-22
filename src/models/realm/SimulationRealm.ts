import SimulationData from "../SimulationData";
import * as Realm from "realm";

class SimulationRealm extends SimulationData {
  public static schema: Realm.ObjectSchema = {
    name: 'Simulation',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      number: 'number',
      string: 'string',
      timestamp: 'Date',
    },
  };
}

export default SimulationRealm;
