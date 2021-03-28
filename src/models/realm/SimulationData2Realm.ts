import Realm from "realm";
import SimulationData2 from "../SimulationData2";

class SimulationData2Realm extends SimulationData2 {
  public static schema: Realm.ObjectSchema = {
    name: 'SimulationData2',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', indexed: true},
      name: 'string',
    },
  };
}

export default SimulationData2Realm;
