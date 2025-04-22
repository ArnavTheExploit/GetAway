// src/screens/SelfTravelScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SelfTravelScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Self Travel Screen</Text>
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