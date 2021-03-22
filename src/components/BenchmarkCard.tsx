import React from "react";
import { Text, View } from "react-native";
import BenchmarkItem from "./BenchmarkItem";

interface IBenchmarkCardProps {
  title: string;
}

function BenchmarkCard({title}: IBenchmarkCardProps) {
  return (
    <View>
      <Text>{title}</Text>
      <BenchmarkItem label={'Preparação'} value={''} />
      <BenchmarkItem label={'Insert'} value={''} />
      <BenchmarkItem label={'Select'} value={''} />
      <BenchmarkItem label={'Select 1 Join'} value={''} />
    </View>
  );
}

export default BenchmarkCard;
