import React, { useContext } from "react";
import { Text, View } from "react-native";
import BenchmarkItem from "./BenchmarkItem";
import { SimulationContext } from "../providers/SimulationProvider";
import Databases from "../constants/Databases";

interface IBenchmarkCardProps {
  title: string;
}

function BenchmarkCard({title}: IBenchmarkCardProps) {
  const simulationContext = useContext(SimulationContext);

  return (
    <View>
      <Text>{title}</Text>
      <BenchmarkItem
        label={'Insert'}
        value={simulationContext!.benchmarkData[
          Databases.SQLITE
        ].getInsertPerformance()}
      />
      <BenchmarkItem
        label={'Select'}
        value={simulationContext!.benchmarkData[
          Databases.SQLITE
        ].getSelectPerformance()}
      />
      <BenchmarkItem
        label={'Select 1 Join'}
        value={simulationContext!.benchmarkData[
          Databases.SQLITE
        ].getSelectRelation()}
      />
    </View>
  );
}

export default BenchmarkCard;
