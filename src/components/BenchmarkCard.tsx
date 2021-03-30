import React, { useContext } from "react";
import { Text, View } from "react-native";
import BenchmarkItem from "./BenchmarkItem";
import { SimulationContext } from "../providers/SimulationProvider";
import DatabasesEnum from "../constants/Databases";

interface IBenchmarkCardProps {
  title: string;
  database: DatabasesEnum;
  color?: string;
}

function BenchmarkCard({title, database, color}: IBenchmarkCardProps) {
  const simulationContext = useContext(SimulationContext);

  return (
    <View style={{paddingVertical: 20}}>
      <Text style={{color, fontWeight: 'bold', fontSize: 16}}>{title}</Text>
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
