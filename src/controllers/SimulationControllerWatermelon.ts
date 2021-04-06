import SimulationController from "./SimulationController";
import DatabasesEnum from "../constants/Databases";
import database from "../configs/WatermelonDB";
import SimulationData from "../models/SimulationData";
import SimulationData2 from "../models/SimulationData2";
import SimulationData2Watermelon from "../models/watermelon/SimulationData2Watermelon";
import { Collection } from "@nozbe/watermelondb";
import SimulationDataWatermelon from "../models/watermelon/SimulationDataWatermelon";

class SimulationControllerWatermelon extends SimulationController {
  constructor() {
    super();
  }
  getDatabaseName(): DatabasesEnum {
    return DatabasesEnum.WATERMELON;
  }

  async clearEnvironment(): Promise<void> {
    return await database.action(async () => {
      await database.unsafeResetDatabase();
    });
  }

  async createEnvironment(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async insertAll(data: any[], data2: any[]): Promise<void> {
    let simulationData2 = await database.action(async () => {
      const simulationDataCollection: Collection<SimulationDataWatermelon> = database.collections.get(
        'simulation_data',
      );

      const simulationData2Collection: Collection<SimulationData2Watermelon> = database.collections.get(
        'simulation_data2',
      );
      console.log(simulationData2Collection);
      await simulationData2Collection.create(
        (record: SimulationData2Watermelon) => {
          console.log('RECORD', record);
          record.name = 'Teste';
        },
      );
      let simulationData2Data = data2.map((item: SimulationData2) => {
        return simulationData2Collection.prepareCreate(record => {
          record.name = item.name;
        });

        // return simulationData2Collection.prepareCreate(
        //   simulationData2Record => {
        //     console.log('Prepare Create', simulationData2Record);
        //     simulationData2Record.number = item.name;
        //   },
        // );
      });
      console.log('PREPARE CREATE OK', simulationData2Collection);

      const simulationDataData = data.map((item: SimulationData, index) => {
        return simulationDataCollection.prepareCreate(simulationData => {
          simulationData.number = item.number;
          simulationData.timestamp = item.timestamp;
          simulationData.string = item.string;
          simulationData.simulation2.id = simulationData2Data[0].id;
        });
      });
      await database.batch(...simulationData2Data, ...simulationDataData);
    });
    console.log(simulationData2);
  }

  async selectAll(): Promise<void> {
    let simulationDataCollection = await database.collections.get(
      'simulation_data',
    );
    let simulationData = await simulationDataCollection.query().fetch();
    console.log(simulationData);
    console.log(simulationData.length);
  }

  async selectAllWithJoin(): Promise<void> {
    // TESTES
    let simulationDataCollection = await database.collections.get(
      'simulation_data',
    );
    let simulationData = await simulationDataCollection.query().fetch();
    console.log(simulationData[0]);
    console.log(simulationData.length);
  }
}

export default SimulationControllerWatermelon;
