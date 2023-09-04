import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TimerSettings from "./components/TimerSettings/TimerSettings";
import { styles } from "./AppStyles";

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isWorkPhase, setIsWorkPhase] = useState(true);

  // ... Timer logic ...
  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0 && minutes === 0) {
          clearInterval(interval);
          setIsActive(false);
          // Here, you can transition to the next phase (work/break)
          if (isWorkPhase) {
            setMinutes(breakDuration);
          } else {
            setMinutes(workDuration);
          }
          setIsWorkPhase(!isWorkPhase);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // This clears the interval when the component is unmounted or if isActive changes
  }, [isActive, minutes, seconds]);

  if (minutes === 0 && seconds === 0) {
    if (isWorkPhase) {
      setMinutes(breakDuration);
    } else {
      setMinutes(workDuration);
    }
    setIsWorkPhase(!isWorkPhase);
  }

  const handleDurationChange = (newWorkDuration, newBreakDuration) => {
    setWorkDuration(newWorkDuration);
    setBreakDuration(newBreakDuration);
    if (isWorkPhase) {
      setMinutes(newWorkDuration);
    } else {
      setMinutes(newBreakDuration);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (isWorkPhase) {
      setMinutes(workDuration);
    } else {
      setMinutes(breakDuration);
    }
    setSeconds(0);
  };

  return (
    <View style={styles.container}>
      <Text>{isWorkPhase ? "Work Phase" : "Break Phase"}</Text>
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

      <TimerSettings
        workDuration={workDuration}
        breakDuration={breakDuration}
        onDurationChange={handleDurationChange}
      />
    </View>
  );
};

export default PomodoroTimer;
