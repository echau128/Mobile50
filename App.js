import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {vibrate} from './utils'
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  timer: {
    fontSize: 90,
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  }
});

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      timerMinutes: '00',
      timerSeconds: '00',
      isStarted: false,
      isTimerDone: true,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.decrement, 1000)
  }
    
  decrement = () => {
    if (this.state.isStarted & !this.state.isTimerDone) {
      // Decrement seconds by 1
      if (this.state.timerSeconds > 0) {
        this.setState(prevState => ({ timerSeconds : String(parseInt(prevState.timerSeconds) - 1) }))
        // Format seconds if single digit
        if (parseInt(this.state.timerSeconds) < 10) {
          this.setState({ timerSeconds: '0' + String(this.state.timerSeconds) })
        }
      }
      else {
        // Updates seconds and decrement 1 minute
        this.setState(prevState => ({ 
          timerMinutes: String(parseInt(prevState.timerMinutes)) - 1,
          timerSeconds: '59',
        }))
      } 
      if (this.state.timerMinutes == '00' && this.state.timerSeconds == '00') {
        this.setState({
          isStarted: false,
          isTimerDone: true,
        })
        vibrate()
      }
    }
  }

  // Sets pomodoro timer for 25 minutes
  setPomodoroTimer = () => {
    this.setState({
      timerMinutes: '25',
      timerSeconds: '00',
      isStarted: false,
      isTimerDone: false,
    })
  }

  // Sets break timer for 5 minutes
  setBreakTimer = () => {
    this.setState({
      timerMinutes: '5',
      timerSeconds: '00',
      isStarted: false,
      isTimerDone: false,
    })
  }
  
  // Start timer
  start = () => {
    this.setState({
      isStarted: true,
    })
  }
  
  // Pause timer
  pause = () => {
    this.setState({
      isStarted: false,
    })
  }

  // Reset timer to 00:00
  reset = () => {
    this.setState({
      timerMinutes: '00',
      timerSeconds: '00',
      isStarted: false,
      isTimerDone: true,
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button title="Start" onPress={this.start} />
          <Button title="Stop" onPress={this.pause} />
          <Button title="Reset Timer" onPress={this.reset} />
        </View>
          <Text style={styles.timer}>{this.state.timerMinutes}:{this.state.timerSeconds}</Text>
        <View style={styles.button}>
          <Button title="Pomodoro" onPress={this.setPomodoroTimer} />
          <Button title="Break" onPress={this.setBreakTimer} />
        </View>
      </View>
    );
  }
}



