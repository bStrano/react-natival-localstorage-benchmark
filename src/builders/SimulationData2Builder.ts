import SimulationData2SQLite from "../models/SQLite/SimulationData2SQLite";
import DatabasesEnum from "../constants/Databases";
import RandomUtil from "../utils/RandomUtil";

interface ISimulationBuilder {
  build(): SimulationData2SQLite;
  produceSQLite(): SimulationData2SQLite;
}

interface ISimulationBuilderConstructor {
  samplingAmount: number;
  database: DatabasesEnum;
}

class SimulationDataBuilder implements ISimulationBuilder {
  private readonly simulation: SimulationData2SQLite;
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

  produceSQLite(): SimulationData2SQLite {
    return new SimulationData2SQLite({
      name: RandomUtil.getRandomString(),
    });
  }

  build(): SimulationData2SQLite {
    return this.simulation;
  }
}
export default SimulationDataBuilder;
