import SimulationData2SQLite from "../models/SQLite/SimulationData2SQLite";
import DatabasesEnum from "../constants/Databases";
import RandomUtil from "../utils/RandomUtil";
import SimulationData2Realm from "../models/realm/SimulationData2Realm";
import { BSON } from "realm";
import SimulationData2 from "../models/SimulationData2";

interface ISimulationBuilder {
  produceSQLite(): SimulationData2SQLite;
  produceRealm(): SimulationData2Realm;
  produceWatermelon(): SimulationData2;
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
    return new SimulationData2Realm({
      ...this.data,
      id: new BSON.ObjectID(),
    });
  }

  build(): SimulationData2SQLite | SimulationData2Realm {
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
    return new SimulationData2({
      ...this.data,
      id: Math.random(),
    });
  }
}
export default SimulationDataBuilder;
