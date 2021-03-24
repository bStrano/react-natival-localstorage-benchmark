import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SimulationControllerSQLite from "../controllers/SimulationControllerSQLite";
import { ISimulationStatus } from "../models/SimulationData";
import Benchmark from "../models/Benchmark";
import DatabasesEnum from "../constants/Databases";

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
  const simulationControllerSQLite = useRef(new SimulationControllerSQLite());
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
    console.log('Iniciando processo');
    await simulationControllerSQLite.current.createEnvironment();
    if (status === ISimulationStatus.READY) {
      await simulationControllerSQLite.current.createEnvironment();
      console.log('Iniciando Preparação');
      setStatus(ISimulationStatus.PREPARATION);

      const {data, data2} = simulationControllerSQLite.current.generateData(
        Number(sampling),
      );
      console.log('DATA LENGTH', data.length, data2.length);

      console.log('INSERT');
      currentBenchmark!.current!.insert!.start = new Date().getTime();
      await simulationControllerSQLite.current.insertAll([...data], [...data2]);
      currentBenchmark!.current!.insert!.final = new Date().getTime();
      updateBenchmark();
      currentBenchmark!.current!.selectRelation!.start = new Date().getTime();
      await simulationControllerSQLite.current.selectAllWithJoin();
      currentBenchmark!.current!.selectRelation!.final = new Date().getTime();
      updateBenchmark();
      console.log('SELECT');
      currentBenchmark!.current!.select!.start = new Date().getTime();
      await simulationControllerSQLite.current.selectAll();
      currentBenchmark!.current!.select!.final = new Date().getTime();
      updateBenchmark();
      console.log('SELECT JOIN');

      console.log('END');
      setStatus(ISimulationStatus.PROGRESS);
      console.log('DATA LENGTH', data.length);
      setStatus(ISimulationStatus.READY);
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
