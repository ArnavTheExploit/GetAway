// src/screens/TravelPlannerScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TravelPlannerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Travel Planner Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});