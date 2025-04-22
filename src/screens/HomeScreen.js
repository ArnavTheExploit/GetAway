import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await AsyncStorage.getItem('userProfile');
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (e) {
        console.log('Error fetching profile data:', e);
      }
    };

    fetchUser();
  }, []);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={openDrawer}>
          <Ionicons name="menu" size={30} color="#000" />
        </TouchableOpacity>

        <View style={styles.greetingSection}>
          <Ionicons name="person-circle-outline" size={28} color="#000" />
          <Text style={styles.greetingText}>
            Greetings, {userData?.fullName || 'User'}
          </Text>
        </View>

        <TouchableOpacity style={styles.emergencyButton}>
          <Image
            source={require('../../assets/emergency.png')}
            style={{ width: 60, height: 40, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>

      {/* City and AQI */}
      <View style={styles.cityAqiRow}>
        <View style={styles.cityBox}>
          <Text style={styles.cityLabel}>CITY:</Text>
        </View>
        <View style={styles.aqiBox}>
          <Text style={styles.cityLabel}>AIR QUALITY Index</Text>
        </View>
      </View>

      {/* Cards */}
      <View style={styles.card}>
        <Image
          source={require('../../assets/travel-coin.png')}
          style={styles.cardImage}
        />
        <Text style={styles.cardText}>TRAVEL COIN</Text>
      </View>

      <View style={styles.card}>
        <Image
          source={require('../../assets/ticket-card.png')}
          style={styles.cardImage}
        />
      </View>

      <View style={styles.card}>
        <Image
          source={require('../../assets/self-travel.png')}
          style={styles.cardImage}
        />
        <Text style={styles.cardText}>SELF TRAVEL</Text>
      </View>

      <View style={styles.card}>
        <Image
          source={require('../../assets/ai-travel-planner.png')}
          style={styles.cardImage}
        />
        <Text style={styles.aiLabel}>TRAVEL PLANNER</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DFF6FF',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greetingSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    marginLeft: 8,
    fontSize: 18,
    fontFamily: 'BungeeSpice_400Regular', // BungeeSpice font for title
    color: '#000',
  },
  emergencyButton: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 8,
  },
  cityAqiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  cityBox: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  aqiBox: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cityLabel: {
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  cardText: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontStyle: 'italic',
  },
  aiLabel: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
