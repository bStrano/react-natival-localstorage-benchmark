import Realm from "realm";

import SimulationData2Realm from "../models/realm/SimulationData2Realm";
import SimulationDataRealm from "../models/realm/SimulationDataRealm";

export default function getRealm() {
  return Realm.open({
    schema: [SimulationData2Realm, SimulationDataRealm],
  });
}
