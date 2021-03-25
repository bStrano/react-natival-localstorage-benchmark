import SimulationData, { ISimulationStatus } from "../models/SimulationData";

import DatabasesEnum from "../constants/Databases";
import SimulationData2Builder from "../builders/SimulationData2Builder";
import SimulationDataBuilder from "../builders/SimulationDataBuilder";

export interface ISimulationController {
  generateData: () => SimulationData[];
  getStatusName: () => string;
  createEnvironment: () => void;
  getDatabaseName: () => DatabasesEnum;
}

abstract class SimulationController {
  abstract async createEnvironment(): Promise<void>;
  abstract getDatabaseName(): DatabasesEnum;
  abstract async insertAll(data: any[], data2: any[]): Promise<void>;
  abstract async selectAll(): Promise<void>;
  abstract async selectAllWithJoin(): Promise<void>;
  abstract async clearEnvironment(): Promise<void>;
  /**
   * Gera uma lista contendo os objetos que serão utilizados no teste de performance.
   * @param samplingAmount - Quantidade de dados que serão utilizados no teste
   * @param database
   */
  generateData(samplingAmount: number) {
    let simulationBuilder;
    let simulationBuilder2;
    let data = [];
    let data2 = [];
    let auxTableAmount = samplingAmount * 0.2;
    console.log('DATABASE NAME', this.getDatabaseName());
    for (let i = 0; i <= samplingAmount; i++) {
      simulationBuilder = new SimulationDataBuilder({
        samplingAmount,
        database: this.getDatabaseName(),
      });
      data.push(simulationBuilder.build());
      if (i <= auxTableAmount) {
        simulationBuilder2 = new SimulationData2Builder({
          samplingAmount,
          database: this.getDatabaseName(),
        });
        data2.push(simulationBuilder2.build());
      }
    }

    return {data, data2};
  }

  getStatusName(status: ISimulationStatus) {
    switch (status) {
      case ISimulationStatus.READY:
        return 'X';
      case ISimulationStatus.PREPARATION:
        return 'Simulação em andamento: Preparação dos dados';
      case ISimulationStatus.PROGRESS:
        return 'Simulação em andamento: Preparação Concluida';
    }
  }
}

export default SimulationController;
