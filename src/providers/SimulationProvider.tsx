import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SimulationControllerSQLite from "../controllers/SimulationControllerSQLite";
import { ISimulationStatus } from "../models/SimulationData";

interface ISimulationProviderProps {
  children: JSX.Element;
}

interface ISimulationContext {
  sampling: string;
  setSampling: Dispatch<SetStateAction<string>>;
  status: ISimulationStatus;
  setStatus: Dispatch<SetStateAction<ISimulationStatus>>;
  startSimulation: () => void;
}

export const SimulationContext = React.createContext<ISimulationContext | null>(
  null,
);
function SimulationProvider(props: ISimulationProviderProps) {
  const [sampling, setSampling] = useState('');
  const [status, setStatus] = useState(ISimulationStatus.READY);
  const simulationControllerSQLite = useRef(new SimulationControllerSQLite());

  useEffect(() => {
    console.log(status);
  }, [status]);

  function startSimulation() {
    console.log('Iniciando processo');
    simulationControllerSQLite.current.createEnvironment();
    if (status === ISimulationStatus.READY) {
      simulationControllerSQLite.current.createEnvironment();
      console.log('Iniciando Preparação');
      setStatus(ISimulationStatus.PREPARATION);
      const {data, data2} = simulationControllerSQLite.current.generateData(
        Number(sampling),
      );
      console.log('DATA LENGTH', data.length, data2.length);
      simulationControllerSQLite.current.insertAll([...data], [...data2]);

      setStatus(ISimulationStatus.PROGRESS);
      console.log('DATA LENGTH', data.length);
      setStatus(ISimulationStatus.READY);
    }
  }

  return (
    <SimulationContext.Provider
      value={{sampling, setSampling, status, setStatus, startSimulation}}>
      {props.children}
    </SimulationContext.Provider>
  );
}

export default SimulationProvider;
