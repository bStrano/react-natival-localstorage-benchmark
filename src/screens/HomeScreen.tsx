import React, { useContext } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SimulationContext } from "../providers/SimulationProvider";
import BenchmarkCard from "../components/BenchmarkCard";

interface IHomeScreenProps {}

function HomeScreen(props: IHomeScreenProps) {
  const simulationContext = useContext(SimulationContext);
  return (
    <View>
      <Text>Home Screen</Text>
      <View style={{margin: 10}}>
        <TextInput
          value={simulationContext?.sampling}
          keyboardType={'number-pad'}
          onChangeText={text => simulationContext?.setSampling(text)}
          placeholder={'Numero de dados'}
        />

        <Button
          onPress={() => simulationContext?.startSimulation()}
          title="Iniciar simulação"
          color="#841584"
        />
        <BenchmarkCard title={'SQLite'} />
        {/*<Text>*/}
        {/*  {SimulationController.getStatusName(simulationContext?.status)}*/}
        {/*</Text>*/}
      </View>
    </View>
  );
}

export default HomeScreen;
