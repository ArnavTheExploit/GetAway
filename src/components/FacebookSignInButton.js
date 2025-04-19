import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
// import * as Facebook from 'expo-facebook';
// import { FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
// import { auth } from '../firebaseInit';

export default function FacebookSignInButton() {
  const handleFacebookLogin = async () => {
    console.log('📦 Facebook login temporarily disabled for build.');
    // try {
    //   await Facebook.initializeAsync({
    //     appId: '1221072743069600',
    //   });

    //   const result = await Facebook.logInWithReadPermissionsAsync({
    //     permissions: ['public_profile', 'email'],
    //   });

    //   if (result.type === 'success') {
    //     const { token } = result;
    //     const credential = FacebookAuthProvider.credential(token);

    //     signInWithCredential(auth, credential)
    //       .then(userCred => console.log('✅ Facebook Login:', userCred.user.email))
    //       .catch(err => console.error('❌ Facebook Auth Error:', err));
    //   } else {
    //     console.log('❌ Facebook login cancelled');
    //   }
    // } catch (error) {
    //   console.error('❌ Facebook login error:', error);
    // }
  };

  return (
    <TouchableOpacity onPress={handleFacebookLogin}>
      <Image source={require('../../assets/facebook-icon.png')} style={styles.icon} />
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
