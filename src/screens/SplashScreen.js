import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>WELCOME TO</Text>
      <Image
        source={require('../../assets/getaway-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.bottomText}>from{"\n"}CODENEST</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
  },
  logo: {
    width: 250,
    height: 250,
    marginVertical: 30,
  },
  bottomText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',
    bottom: 30,
  },
});

export default SplashScreen;
