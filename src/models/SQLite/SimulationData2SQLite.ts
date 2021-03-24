import ISimulationDataSQLite from "../../interfaces/ISimulationDataSQLite";
import SimulationData2 from "../SimulationData2";

class SimulationDataSQLite
  extends SimulationData2
  implements ISimulationDataSQLite {
  getValues() {
    return `
      ('${this.name}')
    `;
  }
}

export default SimulationDataSQLite;
