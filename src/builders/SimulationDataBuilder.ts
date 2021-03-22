import SimulationDataSQLite from "../models/SQLite/SimulationDataSQLite";
import SimulationData2SQLite from "../models/SQLite/SimulationData2SQLite";
import DatabasesEnum from "../constants/Databases";
import RandomUtil from "../utils/RandomUtil";

interface ISimulationBuilder {
  build(): SimulationDataSQLite;
  produceSQLite(): SimulationDataSQLite;
}

interface ISimulationBuilderConstructor {
  samplingAmount: number;
  database: DatabasesEnum;
}

class SimulationDataBuilder implements ISimulationBuilder {
  private readonly simulation: SimulationDataSQLite;
  private readonly samplingAmount: number;

  constructor({samplingAmount, database}: ISimulationBuilderConstructor) {
    this.samplingAmount = samplingAmount;
    switch (database) {
      case DatabasesEnum.SQLITE:
        this.simulation = this.produceSQLite();
        break;
      default:
        throw Error('Database invalid');
    }
  }

  produceSQLite(): SimulationDataSQLite {
    return new SimulationDataSQLite({
      simulation2: new SimulationData2SQLite({
        id: Math.floor(Math.random() * (this.samplingAmount - 1 + 1) + 1),
        name: '',
      }),
      timestamp: new Date(),
      string: RandomUtil.getRandomString(),
      number: Math.random(),
    });
  }

  build(): SimulationDataSQLite {
    return this.simulation;
  }
}
export default SimulationDataBuilder;
