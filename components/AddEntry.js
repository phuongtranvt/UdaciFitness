import React, { Component } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue
} from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";
import { submitEntry, removeEntry } from "../utils/api";
import { connect } from "react-redux";
import { addEntry } from "../actions";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  );
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState(preState => {
      const count = preState[metric] + step;

      return {
        ...preState,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    this.setState(preState => {
      const count = preState[metric] - getMetricMetaInfo(metric).step;

      return {
        ...preState,
        [metric]: count < 0 ? 0 : count
      };
    });
  };

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }));
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    // Update Redux
    this.props.addEntry({
      [key]: entry
    });
    console.log("submit", { [key]: entry });

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    }));

    // Navigate to Home

    // Write to DB
    submitEntry({ key, entry });

    // Clean local notification
  };

  reset = () => {
    const key = timeToString();

    // Update Redux
    this.props.addEntry({
      [key]: getDailyReminderValue()
    });

    // Route to Home

    // Write to DB
    removeEntry(key);
  };

  render() {
    const metaInfo = getMetricMetaInfo();
    console.log("AddEntry", this.props);
    console.log("Redux", this.props);
    debugger;

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="ios-happy-outline" size={100} />
          <Text>You already logged your info for today</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      );
    }

    return (
      <ScrollView>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
              {getIcon()}
              {type === "slider" ? (
                <UdaciSlider
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <UdaciSteppers
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <SubmitBtn onPress={this.submit} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined"
  };
};

const mapDispatchToProps = { addEntry };

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);
