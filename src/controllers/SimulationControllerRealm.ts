import SimulationController from "./SimulationController";
import DatabasesEnum from "../constants/Databases";
import getRealm from "../configs/RealmDB";

class SimulationControllerRealm extends SimulationController {
  constructor() {
    super();
  }

  async clearEnvironment(): Promise<void> {
    const realm = await getRealm();
    await realm.deleteAll();
  }

  async createEnvironment(): Promise<void> {
    return Promise.resolve(undefined);
  }

  getDatabaseName(): DatabasesEnum {
    return DatabasesEnum.REALM;
  }

  async insertAll(data: any[], data2: any[]): Promise<void> {
    const realm = await getRealm();
    return new Promise((resolve, reject) => {
      realm.write(() => {
        data2.forEach(item => {
          realm.create('SimulationData2Realm', item);
        });

        data.forEach(item => {
          realm.create('SimulationDataRealm', item);
        });

        resolve();
      });
    });
  }

  async selectAll(): Promise<void> {
    const realm = await getRealm();

    const data = realm.objects('SimulationDataRealm').sorted('number');
    console.log(data.length);
  }

  async selectAllWithJoin(): Promise<void> {
    return Promise.resolve(undefined);
  }
}

export default SimulationControllerRealm;
