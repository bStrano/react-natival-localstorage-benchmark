import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SimulationControllerSQLite from "../controllers/SimulationControllerSQLite";
import { ISimulationStatus } from "../models/SimulationData";
import Benchmark from "../models/Benchmark";
import DatabasesEnum from "../constants/Databases";
import SimulationController from "../controllers/SimulationController";
import SimulationControllerRealm from "../controllers/SimulationControllerRealm";
import lodash from "lodash";
import SimulationControllerWatermelon from "../controllers/SimulationControllerWatermelon";

interface ISimulationProviderProps {
  children: JSX.Element;
}

interface ISimulationContext {
  sampling: string;
  status: ISimulationStatus;
  benchmarkData: Benchmark[];
  setSampling: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<ISimulationStatus>>;
  startSimulation: () => void;
}

const currentBenchmark = {current: new Benchmark()};
export const SimulationContext = React.createContext<ISimulationContext | null>(
  null,
);
function SimulationProvider(props: ISimulationProviderProps) {
  const [sampling, setSampling] = useState('');
  const [benchmarkData, setBenchmarkData] = useState([
    new Benchmark(),
    new Benchmark(),
    new Benchmark(),
  ]);
  const benchmarks = useRef<Benchmark[]>([
    new Benchmark(),
    new Benchmark(),
    new Benchmark(),
  ]);
  const activeDatabase = useRef<number>(DatabasesEnum.SQLITE);
  const [status, setStatus] = useState(ISimulationStatus.READY);
  const simulationController = useRef<SimulationController>(
    new SimulationControllerSQLite(),
  );

  useEffect(() => {
    console.log(status);
  }, [status]);

  function updateBenchmark() {
    // let benchmarkDataClone = [...benchmarkData];
    // benchmarkDataClone[activeDatabase.current] = lodash.cloneDeep(
    //   currentBenchmark.current,
    // );
    // setBenchmarkData(benchmarkDataClone);
    benchmarks.current[activeDatabase.current] = lodash.cloneDeep(
      currentBenchmark.current,
    );
    setBenchmarkData(benchmarks.current);
  }

  async function startSimulation() {
    for (let value of Object.values(DatabasesEnum)) {
      if (typeof value === 'number') {
        await startSimulationDatabase(value);
      }
    }
  }

  async function startSimulationDatabase(database: DatabasesEnum) {
    try {
      await changeDatabase(database);
      await simulationController.current.createEnvironment();
      if (status === ISimulationStatus.READY) {
        await simulationController.current.createEnvironment();
        setStatus(ISimulationStatus.PREPARATION);

        const {data, data2} = simulationController.current.generateData(
          Number(sampling),
        );

        await runSection('insert', async () => {
          await simulationController.current.insertAll([...data], [...data2]);
        });
        await runSection('select', async () => {
          await simulationController.current.selectAll();
        });
        await runSection('selectRelation', async () => {
          await simulationController.current.selectAllWithJoin();
        });

        await simulationController.current.clearEnvironment();
        // setStatus(ISimulationStatus.PROGRESS);
        // setStatus(ISimulationStatus.READY);
      }
    } catch (e) {
      console.error(e);
    }
  }
  async function runSection(
    name: 'select' | 'insert' | 'selectRelation',
    commandCB: () => Promise<void>,
  ) {
    console.log(`[${name}] Start`);
    currentBenchmark!.current[name].start = new Date().getTime();
    await commandCB();
    currentBenchmark!.current[name].final = new Date().getTime();
    console.log(`[${name}] End`);

    switch (name) {
      case 'insert':
        setStatus(ISimulationStatus.INSERTING);
        break;
      case 'select':
        setStatus(ISimulationStatus.SELECTING);
        break;
      case 'selectRelation':
        setStatus(ISimulationStatus.SELECTING_JOIN);
        break;
    }
    updateBenchmark();
  }

  async function changeDatabase(database: DatabasesEnum) {
    switch (database) {
      case DatabasesEnum.REALM:
        simulationController.current = new SimulationControllerRealm();
        activeDatabase.current = DatabasesEnum.REALM;
        break;
      case DatabasesEnum.SQLITE:
        activeDatabase.current = DatabasesEnum.SQLITE;
        simulationController.current = new SimulationControllerSQLite();
        break;
      case DatabasesEnum.WATERMELON:
        activeDatabase.current = DatabasesEnum.WATERMELON;
        simulationController.current = new SimulationControllerWatermelon();
        break;
      default:
        break;
    }
    currentBenchmark.current = new Benchmark();
  }

  return (
    <SimulationContext.Provider
      value={{
        sampling,
        setSampling,
        status,
        setStatus,
        startSimulation,
        benchmarkData,
      }}>
      {props.children}
    </SimulationContext.Provider>
  );
}

export default SimulationProvider;
