import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { auth } from '../firebaseConfig';
import Toast from 'react-native-toast-message'; // Toast import

const loadFonts = () => {
  return Font.loadAsync({
    'DancingScript-Regular': require('../../assets/fonts/DancingScript-Regular.ttf'),
  });
};

export default function LoginScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!fontsLoaded) {
    return <AppLoading startAsync={loadFonts} onFinish={() => setFontsLoaded(true)} onError={console.warn} />;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter both email and password.',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: 'success',
        text1: 'Login Successful!',
      });
      navigation.replace('Drawer');
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid email or password.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Error',
          text2: error.message,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/pin.png')} style={styles.logo} />
      <Text style={styles.loginText}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgotten password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.continueText}>Continue With</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../../assets/google-icon.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../../assets/facebook-icon.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../../assets/apple-icon.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.signupPrompt}>
        Don’t have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
          Create Account
        </Text>
      </Text>

      <Toast /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 36,
    fontFamily: 'DancingScript-Regular',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  forgotText: {
    alignSelf: 'flex-end',
    color: '#aaa',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueText: {
    color: '#fff',
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 20,
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signupPrompt: {
    color: '#aaa',
    marginTop: 20,
  },
  signupLink: {
    color: '#00f',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
