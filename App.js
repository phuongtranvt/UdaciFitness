import React, { Component } from "react";
import { StyleSheet, Text, View, AppRegistry } from "react-native";

class FlexboxExamples extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start"
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: "#e76e63",
    margin: 10
  }
});

export default FlexboxExamples;

/*
import React from "react";
import { View } from "react-native";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import devToolsEnhancer from "remote-redux-devtools";
import { Provider } from "react-redux";
import reducer from "./reducers";

export default class App extends React.Component {
  render() {
    const store = createStore(reducer, devToolsEnhancer());

    return (
      <Provider store={store}>
        <View>
          <AddEntry />
        </View>
      </Provider>
    );
  }
}

*/
