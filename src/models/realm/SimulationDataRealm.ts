import SimulationData from "../SimulationData";
import Realm from "realm";

class SimulationDataRealm extends SimulationData {
  public static schema: Realm.ObjectSchema = {
    name: 'SimulationData',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', indexed: true},
      number: 'float',
      string: 'string',
      timestamp: 'date',
    },
  };
}

export default SimulationDataRealm;
