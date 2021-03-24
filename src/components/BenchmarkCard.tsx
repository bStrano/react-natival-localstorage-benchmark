import React from "react";
import { Text, View } from "react-native";
import BenchmarkItem from "./BenchmarkItem";

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
