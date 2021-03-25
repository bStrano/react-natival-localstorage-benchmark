import SimulationDataSQLite from "../models/SQLite/SimulationDataSQLite";
import DatabasesEnum from "../constants/Databases";
import RandomUtil from "../utils/RandomUtil";
import SimulationDataRealm from "../models/realm/SimulationDataRealm";
import SimulationData2Realm from "../models/realm/SimulationData2Realm";

interface ISimulationBuilder {
  produceSQLite(): SimulationDataSQLite;
  produceRealm(): SimulationDataRealm;
  build(): SimulationDataSQLite | SimulationDataRealm;
}

interface ISimulationBuilderConstructor {
  samplingAmount: number;
  database: DatabasesEnum;
}

class SimulationDataBuilder implements ISimulationBuilder {
  private readonly samplingAmount: number;
  private readonly database: DatabasesEnum;
  private readonly data: any;
  constructor({samplingAmount, database}: ISimulationBuilderConstructor) {
    this.samplingAmount = samplingAmount;
    this.database = database;
    this.data = {
      simulation2: new SimulationData2Realm({
        id: Math.floor(Math.random() * (this.samplingAmount - 1 + 1) + 1),
        name: '',
      }),
      timestamp: new Date(),
      string: RandomUtil.getRandomString(),
      number: Math.random(),
    };
  }

  produceSQLite(): SimulationDataSQLite {
    return new SimulationDataSQLite(this.data);
  }

  produceRealm(): SimulationDataRealm {
    return new SimulationDataRealm(this.data);
  }

  build(): SimulationDataSQLite | SimulationDataRealm {
    switch (this.database) {
      case DatabasesEnum.REALM:
        return this.produceRealm();
      case DatabasesEnum.SQLITE:
        return this.produceSQLite();
    }
  }
}
export default SimulationDataBuilder;
