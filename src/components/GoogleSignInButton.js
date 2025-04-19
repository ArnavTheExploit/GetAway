import React, { useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebaseInit';

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

export default function GoogleSignInButton() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '711661241840-9db9fkfteh2bv041atn9vr8uoftnfc3t.apps.googleusercontent.com',
    iosClientId: '711661241840-p24cl7cdvqrs3mil99ogteh1lluernfu.apps.googleusercontent.com',
    androidClientId: '30717202409-e8ev10nc4a5m3sitqjes9ppvp2j4us1h.apps.googleusercontent.com',
    webClientId: '711661241840-i4pj8sasfufqqljp170n8v0vkalu5neu.apps.googleusercontent.com',
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(userCred => console.log('✅ Google Login:', userCred.user.email))
        .catch(err => console.error('❌ Google Auth Error:', err));
    }
  }, [response]);

  return (
    <TouchableOpacity onPress={() => promptAsync()} disabled={!request}>
      <Image source={require('../../assets/google-icon.png')} style={styles.icon} />
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
