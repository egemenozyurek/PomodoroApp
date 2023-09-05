import React, { useState, useEffect } from "react";
import { Alert, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TimerSettings from "./components/TimerSettings/TimerSettings";
import PomodoroCycle from "./components/PomodoroCycle/PomodoroCycle";
import { styles } from "./AppStyles";

const PomodoroTimer = () => {
  //Timer related states
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [workDuration, setWorkDuration] = useState(25);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [completedWorkSessions, setCompletedWorkSessions] = useState(0);

  //Duration related states
  const [isActive, setIsActive] = useState(false);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);

  const handleCycleEnd = () => {
    if (isWorkPhase) {
      // If it was a work phase, we're now entering break.
      alert("Work session completed! Time for a break.");
    } else {
      // If it was a break phase, we're now entering work.
      alert("Break is over! Time to get back to work.");
    }
  };

  // ... Timer logic ...
  useEffect(() => {
    let interval;
    if (isActive && (minutes !== 0 || seconds !== 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0 && minutes === 0) {
          clearInterval(interval);
          setIsActive(false);
          // Here, you can transition to the next phase (work/break)
          if (isWorkPhase) {
            setMinutes(shortBreakDuration);
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
  }, [isActive, minutes, seconds, isWorkPhase]);

  if (minutes === 0 && seconds === 0) {
    if (isWorkPhase) {
      setMinutes(shortBreakDuration);
    } else {
      setMinutes(workDuration);
    }
    setIsWorkPhase(!isWorkPhase);
  }

  const handleDurationChange = (
    newWorkDuration,
    newShortBreakDuration,
    newLongBreakDuration
  ) => {
    setWorkDuration(newWorkDuration);
    setShortBreakDuration(newShortBreakDuration);
    setLongBreakDuration(newLongBreakDuration);
    if (isWorkPhase) {
      setMinutes(newWorkDuration);
    } else {
      setMinutes(newShortBreakDuration);
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
      setMinutes(shortBreakDuration);
    }
    setSeconds(0);
  };

  return (
    <View style={styles.container}>
      <PomodoroCycle
        minutes={minutes}
        seconds={seconds}
        isWorkPhase={isWorkPhase}
        workDuration={workDuration}
        shortBreakDuration={shortBreakDuration}
        longBreakDuration={longBreakDuration}
        onCycleEnd={handleCycleEnd}
      />
      <Text>{isWorkPhase ? "Work Phase" : "Break Phase"}</Text>
      <Text style={styles.timerText}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStartPause}
          onPress={() => setIsActive(!isActive)}
        >
          <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReset} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <TimerSettings
        workDuration={workDuration}
        breakDuration={shortBreakDuration}
        onDurationChange={handleDurationChange}
      />
    </View>
  );
};

export default PomodoroTimer;
