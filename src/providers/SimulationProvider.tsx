import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SimulationControllerSQLite from "../controllers/SimulationControllerSQLite";
import { ISimulationStatus } from "../models/SimulationData";
import Benchmark from "../models/Benchmark";
import DatabasesEnum from "../constants/Databases";
import SimulationController from "../controllers/SimulationController";
import SimulationControllerRealm from "../controllers/SimulationControllerRealm";

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
  const activeDatabase = useRef<number>(DatabasesEnum.SQLITE);
  const [status, setStatus] = useState(ISimulationStatus.READY);
  const simulationController = useRef<SimulationController>(
    new SimulationControllerSQLite(),
  );
  const currentBenchmark = useRef<Benchmark>(new Benchmark());

  useEffect(() => {
    console.log(status);
  }, [status]);

  function updateBenchmark() {
    let benchmarkDataClone = [...benchmarkData];

    benchmarkDataClone[activeDatabase.current] = currentBenchmark.current;
    setBenchmarkData(benchmarkDataClone);
    console.log(currentBenchmark.current.getInsertPerformance());
    console.log(currentBenchmark.current.getSelectPerformance());
    console.log(currentBenchmark.current.getSelectRelation());
  }

  async function startSimulation() {
    console.log(DatabasesEnum);
    console.log(Object.keys(DatabasesEnum));
    console.log(Object.values(DatabasesEnum));
    for (let value of Object.values(DatabasesEnum)) {
      if (typeof value === 'number') {
        await startSimulationDatabase(value);
      }
    }
  }

  async function startSimulationDatabase(database: DatabasesEnum) {
    try {
      console.log('Iniciando processo', database);
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
        await runSection('selectRelation', async () => {
          await simulationController.current.selectAllWithJoin();
        });
        await runSection('select', async () => {
          await simulationController.current.selectAll();
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
    updateBenchmark();
  }

  async function changeDatabase(database: DatabasesEnum) {
    currentBenchmark.current = new Benchmark();
    switch (database) {
      case DatabasesEnum.REALM:
        simulationController.current = new SimulationControllerRealm();
        break;
      case DatabasesEnum.SQLITE:
        simulationController.current = new SimulationControllerSQLite();
        break;
      default:
        break;
    }
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
