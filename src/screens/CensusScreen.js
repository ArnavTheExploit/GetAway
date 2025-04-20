import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CensusScreen({ navigation }) {
  console.log("CensusScreen rendered");

  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleProfilePicturePress = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!pickerResult.canceled && pickerResult.assets.length > 0) {
      setProfileImage(pickerResult.assets[0].uri);
    }
  };

  const handleConfirmDate = (date) => {
    const formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    setDob(formatted);
    setDatePickerVisibility(false);
  };

  const handleSave = async () => {
    if (!fullName || !dob || !gender || !city) {
      Alert.alert("Missing Info", "Please fill in all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, 'censusData'), {
        profileImage,
        fullName,
        dob,
        gender,
        city,
        occupation,
        emergencyName,
        emergencyPhone,
        emergencyRelation,
        vehicleNumber,
        createdAt: serverTimestamp(),
      });
      console.log("Census data saved");
      navigation.replace('Home');
    } catch (error) {
      console.log('Error saving census data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace('Home')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Complete Your Profile</Text>

        <TouchableOpacity style={styles.profileImageContainer} onPress={handleProfilePicturePress}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/default-profile.png')}
            style={styles.profileImage}
          />
          <View style={styles.editIcon}>
            <Ionicons name="camera" size={20} color="#000" />
          </View>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#ccc"
          value={fullName}
          onChangeText={setFullName}
        />

        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (DD/MM/YYYY)"
            placeholderTextColor="#ccc"
            value={dob}
            editable={false}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={() => setDatePickerVisibility(false)}
        />

        {/* Gender Picker */}
        <View style={styles.pickerWrapper}>
          <RNPickerSelect
            onValueChange={(value) => setGender(value)}
            placeholder={{ label: 'Select Gender', value: null }}
            items={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
              { label: 'Other', value: 'Other' },
            ]}
            style={pickerSelectStyles}
            value={gender}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <TextInput style={styles.input} placeholder="City" placeholderTextColor="#ccc" value={city} onChangeText={setCity} />
        <TextInput style={styles.input} placeholder="Occupation" placeholderTextColor="#ccc" value={occupation} onChangeText={setOccupation} />

        <Text style={styles.sectionTitle}>Emergency Contact</Text>
        <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#ccc" value={emergencyName} onChangeText={setEmergencyName} />
        <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#ccc" value={emergencyPhone} onChangeText={setEmergencyPhone} keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Relationship" placeholderTextColor="#ccc" value={emergencyRelation} onChangeText={setEmergencyRelation} />

        <Text style={styles.sectionTitle}>Vehicle Details</Text>
        <TextInput style={styles.input} placeholder="Vehicle Number" placeholderTextColor="#ccc" value={vehicleNumber} onChangeText={setVehicleNumber} />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save & Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const pickerSelectStyles = {
  inputIOS: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  inputAndroid: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    padding: 20,
    backgroundColor: '#000',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  skipText: {
    color: '#aaa',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'DancingScript-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  pickerWrapper: {
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

