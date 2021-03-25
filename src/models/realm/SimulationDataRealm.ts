import SimulationData from "../SimulationData";
import Realm from "realm";

class SimulationDataRealm extends SimulationData {
  public static schema: Realm.ObjectSchema = {
    name: 'Simulation',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      number: 'float',
      string: 'string',
      timestamp: 'date',
    },
  };
}

export default SimulationDataRealm;
