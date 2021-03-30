import SimulationController from "./SimulationController";
import DatabasesEnum from "../constants/Databases";
import database from "../configs/WatermelonDB";

class SimulationControllerSQLite extends SimulationController {
  constructor() {
    super();
  }
  getDatabaseName(): DatabasesEnum {
    return DatabasesEnum.WATERMELON;
  }

  async clearEnvironment(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async createEnvironment(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async insertAll(data: any[], data2: any[]): Promise<void> {
    const simulationDataCollection = database.collections.get(
      'simulation_data',
    );
    const simulationData2Collection = database.collections.get(
      'simulation_data2',
    );
    await database.batch(
      simulationDataCollection.prepareCreate(simulationData => {

      }),
    );

    return Promise.resolve(undefined);
  }

  async selectAll(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async selectAllWithJoin(): Promise<void> {
    return Promise.resolve(undefined);
  }
}

export default SimulationControllerSQLite;
