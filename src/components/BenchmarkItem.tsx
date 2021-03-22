import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface IBenchmarkItemProps {
  label: string;
  value: string;
}

function BenchmarkItem({label, value}: IBenchmarkItemProps) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default BenchmarkItem;
