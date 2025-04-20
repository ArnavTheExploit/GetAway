import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Modal,
  StyleSheet, Image, Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const loadFonts = () => {
  return Font.loadAsync({
    'DancingScript-Regular': require('../../assets/fonts/DancingScript-Regular.ttf'),
  });
};

export default function SignupScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [agree, setAgree] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!fontsLoaded) {
    return <AppLoading startAsync={loadFonts} onFinish={() => setFontsLoaded(true)} onError={console.warn} />;
  }

  const showToast = (type, text1, text2 = '') => {
    Toast.show({
      type,
      text1,
      text2,
      position: 'top',
    });
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      showToast('error', 'Missing Fields', 'Please fill out all fields.');
      return;
    }

    if (password.length < 6) {
      showToast('error', 'Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      showToast('error', 'Password Mismatch', 'Both passwords must match.');
      return;
    }

    if (!agree) {
      showToast('error', 'Terms Not Accepted', 'Please accept the Terms & Conditions.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: serverTimestamp(),
        platform: Platform.OS,
      });

      showToast('success', 'Signup Successful', 'Welcome to GETAWAY!');
      navigation.navigate('Census');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showToast('info', 'Account Exists', 'Redirecting to login...');
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1500);
        } else {
        showToast('error', 'Signup Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/pin.png')} style={styles.logo} />
      <Text style={styles.signupText}>Signup</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter name"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setAgree(!agree)} style={styles.checkbox}>
          {agree ? (
            <AntDesign name="checksquare" size={24} color="#4f8ef7" />
          ) : (
            <AntDesign name="checksquareo" size={24} color="#ccc" />
          )}
        </TouchableOpacity>
        <Text style={styles.agreeText}>I agree to the </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.link}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
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

      <Text style={styles.loginPrompt}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          Log in
        </Text>
      </Text>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
  <View style={styles.modalBackdrop}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Terms & Conditions</Text>
      <ScrollView style={{ maxHeight: 300 }}>
        <Text style={styles.modalText}>
          {/* Update this content before production */}
          Tu ise Isliye padh raha hai kyuki tu maderchood hai aur tuje hamaare app pe bharosa nahi hai toh agar tuje mera app use karna hai toh fuck off from this screen. Iske baad T&C ko ok kar phir life aur app mai aage bad maderchood. Sahi mai thoda sa Bhen ka Loda hai kya tu......🤬
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  signupText: {
    fontSize: 36,
    color: '#fff',
    fontFamily: 'DancingScript-Regular',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#1c1c1c',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  checkbox: {
    marginRight: 10,
    padding: 2,
    borderRadius: 4,
    backgroundColor: '#1a1a1a',
  },
  agreeText: {
    color: '#fff',
  },
  link: {
    color: '#4f8ef7',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  continueText: {
    color: '#aaa',
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  iconButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  loginPrompt: {
    color: '#ccc',
    marginTop: 30,
  },
  loginLink: {
    color: '#4f8ef7',
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1c1c1c',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalText: {
    color: '#ccc',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4f8ef7',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});