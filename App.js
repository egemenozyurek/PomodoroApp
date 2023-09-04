import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    } else if (minutes === 0 && seconds === 0) {
      Alert.alert("Time's up!", "Take a break.");
      resetTimer();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStartPause} onPress={toggleTimer}>
          <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReset} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  timerText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#FF6347",
    textAlign: "center",
    borderWidth: 3,
    borderColor: "#FF6347",
    borderRadius: 10,
    width: 250,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  buttonStartPause: {
    backgroundColor: "#FF6347",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonReset: {
    backgroundColor: "#333",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 5,
  },
});

export default PomodoroTimer;
