import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Constants from "expo-constants";

import { vibrate } from './utils'

let interval;

export default function App() {
  const [running, setRunning] = useState(false);
  const [inSession, setInSession] = useState(true);
  const [session, setSession] = useState(25);
  const [rest, setRest] = useState(5);
  const [time, setTime] = useState(session * 60);

  useEffect(() => { }, [])

  useEffect(() => {
    console.log('pressed')
    if (running) {
      interval = setInterval(() => {
        setTime(time => time - 1)
      }, 1000);
    } else {
      clearInterval(interval)
    }
  }, [running]);

  useEffect(() => {
    console.log(time)
    if (time === 0) {
      setTime(() => inSession ? rest * 60 : session * 60);
      setInSession(() => !inSession);
      vibrate();
    }
  }, [time])

  const secondsToMinutes = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    function str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }
    let finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);

    return finalTime;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{secondsToMinutes(time)}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => setRunning(!running)}
        style={styles.Button}>
        <Text>{running ? 'Detener' : 'Iniciar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          clearInterval(interval);
          setRunning(false);
          setInSession(true);
          setTime(time => session * 60)
        }}
        style={styles.Button}>
        <Text>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  Button: {
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: '#000',
    backgroundColor: 'green',
    color: '#fff',
    borderRadius: 5,
    margin: 50,
    padding: 10,
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});
