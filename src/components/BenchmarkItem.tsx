import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface IBenchmarkItemProps {
  label: string;
  value: number;
}

function BenchmarkItem({label, value}: IBenchmarkItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text>{value / 1000} s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
});

export default BenchmarkItem;
