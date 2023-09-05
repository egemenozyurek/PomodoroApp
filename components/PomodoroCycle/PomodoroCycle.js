import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { styles } from "./PomodoroCycle.style";

const PomodoroCycle = ({
  workDuration,
  shortBreakDuration,
  longBreakDuration,
  onCycleEnd,
}) => {
  const [minutes, setMinutes] = useState(workDuration);
  const [seconds, setSeconds] = useState(0);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [completedWorkSessions, setCompletedWorkSessions] = useState(0);

  useEffect(() => {
    let interval;
    if (minutes !== 0 || seconds !== 0) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0 && minutes === 0) {
          clearInterval(interval);
          //Handle phase transition
          if (isWorkPhase) {
            setCompletedWorkSessions((prevSessions) => prevSessions + 1);
            if (completedWorkSessions + 1 === 4) {
              setMinutes(longBreakDuration);
              setCompletedWorkSessions(0);
            } else {
              setMinutes(shortBreakDuration);
            }
          } else {
            setMinutes(workDuration);
          }
          setIsWorkPhase((prevIsWorkPhase) => !prevIsWorkPhase);
          if (onCycleEnd) {
            onCycleEnd();
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [minutes, seconds, isWorkPhase, completedWorkSessions]);

  return (
    <View style={styles.container}>
      <Text>{isWorkPhase ? "Work Phase" : "Break Phase"}</Text>
      <Text style={styles.timerText}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </Text>
    </View>
  );
};
export default PomodoroCycle;
