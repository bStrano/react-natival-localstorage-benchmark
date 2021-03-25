import SimulationData2SQLite from "../models/SQLite/SimulationData2SQLite";
import DatabasesEnum from "../constants/Databases";
import RandomUtil from "../utils/RandomUtil";
import SimulationData2Realm from "../models/realm/SimulationData2Realm";

interface ISimulationBuilder {
  produceSQLite(): SimulationData2SQLite;
  produceRealm(): SimulationData2Realm;
  build(): SimulationData2SQLite | SimulationData2Realm;
}

interface ISimulationBuilderConstructor {
  samplingAmount: number;
  database: DatabasesEnum;
}

class SimulationDataBuilder<T> implements ISimulationBuilder {
  private readonly samplingAmount: number;
  private readonly database: DatabasesEnum;
  protected readonly data;

  constructor({samplingAmount, database}: ISimulationBuilderConstructor) {
    this.samplingAmount = samplingAmount;
    this.database = database;
    this.data = {
      name: RandomUtil.getRandomString(),
    };
  }

  produceSQLite(): SimulationData2SQLite {
    return new SimulationData2SQLite(this.data);
  }

  produceRealm(): SimulationData2Realm {
    return new SimulationData2Realm(this.data);
  }

  build(): SimulationData2SQLite | SimulationData2Realm {
    switch (this.database) {
      case DatabasesEnum.REALM:
        return this.produceRealm();
      case DatabasesEnum.SQLITE:
        return this.produceSQLite();
    }
  }
}
export default SimulationDataBuilder;
