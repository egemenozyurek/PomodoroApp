import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./TimerSettings.style";

const TimerSettings = ({ workDuration, breakDuration, onDurationChange }) => {
  const [localWorkDuration, setLocalWorkDuration] = useState(workDuration);
  const [localBreakDuration, setLocalBreakDuration] = useState(breakDuration);

  useEffect(() => {
    loadDurations();
  }, []);

  useEffect(() => {
    storeDurations();
    if (onDurationChange) {
      onDurationChange(localWorkDuration, localBreakDuration);
    }
  }, [localWorkDuration, localBreakDuration]);

  const storeDurations = async () => {
    try {
      await AsyncStorage.setItem("@workDuration", String(localWorkDuration));
      await AsyncStorage.setItem("@breakDuration", String(localBreakDuration));
    } catch (error) {
      console.error("Error saving durations:", error);
    }
  };

  const loadDurations = async () => {
    try {
      const storedWorkDuration = await AsyncStorage.getItem("@workDuration");
      const storedBreakDuration = await AsyncStorage.getItem("@breakDuration");

      if (storedWorkDuration !== null)
        setLocalWorkDuration(Number(storedWorkDuration));
      if (storedBreakDuration !== null)
        setLocalBreakDuration(Number(storedBreakDuration));
    } catch (error) {
      console.error("Error loading durations:", error);
    }
  };

  return (
    <View style={styles.settingsContainer}>
      <Text>Work Duration (minutes):</Text>
      <TextInput
        keyboardType="numeric"
        value={String(localWorkDuration)}
        onChangeText={(text) => setLocalWorkDuration(Number(text))}
        style={styles.durationInput}
      />
      <Text>Break Duration (minutes):</Text>
      <TextInput
        keyboardType="numeric"
        value={String(localBreakDuration)}
        onChangeText={(text) => setLocalBreakDuration(Number(text))}
        style={styles.durationInput}
      />
    </View>
  );
};

export default TimerSettings;
