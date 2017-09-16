import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name} !</Text>
    );
  }
}

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};

    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      })
    }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

export default class LotsOfGreetings extends Component {
  render() {
    return(
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Blink text='blinking' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
