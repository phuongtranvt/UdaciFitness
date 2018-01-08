import React from "react";
import {
  View,
  Slider,
  Text,
  Switch,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import AddEntry from "./components/AddEntry";
import getReviews from "./reviews";

function Review({ name, text, avatar }) {
  return (
    <View>
      <Image source={{ uri: avatar }} style={{ width: 20, height: 20 }} />
      <View>
        <Text>{name}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
}

export default class App extends React.Component {
  state = {
    input: "@phuong",
    showInput: false
  };

  handleToggleSwitch = () => {
    this.setState(state => ({
      showInput: !state.showInput
    }));
  };

  handleTextChange = input => {
    this.setState({ input });
  };

  renderItem = ({ item }) => {
    return <Review {...item}/>
  }

  render() {
    const reviews = getReviews();


    return (
      <View style={styles.container}>
        <FlatList
          data={reviews}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
