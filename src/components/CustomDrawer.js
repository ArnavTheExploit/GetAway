import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawer(props) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userProfile');
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.log('Error fetching drawer user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    props.navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#111' }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#111' }}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={
              userData?.profileImage
                ? { uri: userData.profileImage }
                : require('../../assets/profile-placeholder.png')
            }
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{userData?.fullName || 'Guest User'}</Text>
        </View>

        {/* Drawer Items */}
        <View style={{ flex: 1, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    alignItems: 'center',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopColor: '#333',
    borderTopWidth: 1,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
});
