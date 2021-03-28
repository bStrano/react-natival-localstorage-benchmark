import SimulationController from "./SimulationController";
import DatabasesEnum from "../constants/Databases";
import getRealm from "../configs/RealmDB";

class SimulationControllerRealm extends SimulationController {
  constructor() {
    super();
  }

  async clearEnvironment(): Promise<void> {
    const realm = await getRealm();
    realm.beginTransaction();
    await realm.deleteAll();
    realm.commitTransaction();
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
      realm.write(async () => {
        console.log('Write Start');
        data2.forEach(item => {
          realm.create('SimulationData2', item);
        });

        data.forEach(item => {
          realm.create('SimulationData', item);
        });

        console.log('Write End');
        resolve();
      });
    });
  }

  async selectAll(): Promise<void> {
    const realm = await getRealm();

    const data = realm.objects('SimulationData').sorted('number');
    console.log('Realm length', data.length);
  }

  async selectAllWithJoin(): Promise<void> {
    return Promise.resolve(undefined);
  }
}

export default SimulationControllerRealm;
