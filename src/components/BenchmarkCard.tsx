import React, { useContext } from "react";
import { Text, View } from "react-native";
import BenchmarkItem from "./BenchmarkItem";
import { SimulationContext } from "../providers/SimulationProvider";
import DatabasesEnum from "../constants/Databases";

interface IBenchmarkCardProps {
  title: string;
  database: DatabasesEnum;
}

function BenchmarkCard({title, database}: IBenchmarkCardProps) {
  const simulationContext = useContext(SimulationContext);

  return (
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>{title}</Text>
      <BenchmarkItem
        label={'Insert'}
        value={simulationContext!.benchmarkData[
          database
        ].getInsertPerformance()}
      />
      <BenchmarkItem
        label={'Select'}
        value={simulationContext!.benchmarkData[
          database
        ].getSelectPerformance()}
      />
      <BenchmarkItem
        label={'Select 1 Join'}
        value={simulationContext!.benchmarkData[database].getSelectRelation()}
      />
    </View>
  );
}

export default BenchmarkCard;
