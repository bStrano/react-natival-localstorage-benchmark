import SimulationDataSQLite from "../models/SQLite/SimulationDataSQLite";
import DatabasesEnum from "../constants/Databases";
import RandomUtil from "../utils/RandomUtil";
import SimulationDataRealm from "../models/realm/SimulationDataRealm";

import { BSON } from "realm";

import SimulationData from "../models/SimulationData";
import SimulationData2 from "../models/SimulationData2";

interface ISimulationBuilder {
  produceSQLite(): SimulationDataSQLite;
  produceRealm(): SimulationDataRealm;
  produceWatermelon(): SimulationData;
  build(): SimulationDataSQLite | SimulationDataRealm | SimulationData;
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
      simulation2: new SimulationData2({
        id: Math.floor(Math.random() * (this.samplingAmount - 1 + 1) + 1),
        name: '...',
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
    return new SimulationDataRealm({
      ...this.data,
      id: new BSON.ObjectID(),
    });
  }

  build(): SimulationDataSQLite | SimulationDataRealm {
    switch (this.database) {
      case DatabasesEnum.REALM:
        return this.produceRealm();
      case DatabasesEnum.SQLITE:
        return this.produceSQLite();
      case DatabasesEnum.WATERMELON:
        return this.produceWatermelon();
    }
  }

  produceWatermelon() {
    return new SimulationData({
      ...this.data,
      id: Math.random(),
    });
  }
}
export default SimulationDataBuilder;
