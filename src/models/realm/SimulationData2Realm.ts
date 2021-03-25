import Realm from "realm";
import SimulationData2 from "../SimulationData2";

class SimulationData2Realm extends SimulationData2 {
  public static schema: Realm.ObjectSchema = {
    name: 'SimulationData2Realm',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      name: 'string',
    },
  };
}

export default SimulationData2Realm;
