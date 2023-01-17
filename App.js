import * as React from "react";
import * as Battery from "expo-battery";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default class App extends React.Component {
  state = {
    batteryLevel: null,
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async _subscribe() {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    const valor = Math.round(batteryLevel * 10000) / 100;
    this.setState({ valor });
    this._subscription = Battery.addBatteryLevelListener(({ valor }) => {
      this.setState({ valor });
      console.log("batteryLevel changed!", valor);
    });
  }

  _unsubscribe() {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Nível atual da bateria</Text>

        <Text>
          {this.state.valor}%{" "}
          <FontAwesome name="battery-4" size={16} color="black" />
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
