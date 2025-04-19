// AppleSignInButton.js
import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { OAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebaseInit';

export default function AppleSignInButton() {
  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const provider = new OAuthProvider('apple.com');
      const firebaseCredential = provider.credential({
        idToken: credential.identityToken,
      });

      signInWithCredential(auth, firebaseCredential)
        .then(userCred => console.log('✅ Apple Login:', userCred.user.email))
        .catch(err => console.error('❌ Apple Auth Error:', err));
    } catch (error) {
      console.error('❌ Apple Login Error:', error);
    }
  };

  if (Platform.OS !== 'ios') return null;

  return (
    <TouchableOpacity onPress={handleAppleLogin}>
      <Image source={require('../../assets/apple-icon.png')} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});
