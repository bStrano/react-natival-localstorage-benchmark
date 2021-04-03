import SimulationData from "../SimulationData";
import ISimulationDataSQLite from "../../interfaces/ISimulationDataSQLite";

class SimulationDataSQLite
  extends SimulationData
  implements ISimulationDataSQLite {
  getValues() {
    return `
      (${this.number}, '${this.string}', '${this.timestamp}', ${this.simulation2._id})
    `;
  }
}

export default SimulationDataSQLite;
