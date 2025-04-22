import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawer from '../components/CustomDrawer';

// Screens
import HomeScreen from '../screens/HomeScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import TravelCoinScreen from '../screens/TravelCoinScreen';
import TicketsScreen from '../screens/TicketsScreen';
import SelfTravelScreen from '../screens/SelfTravelScreen';
import TravelPlannerScreen from '../screens/TravelPlannerScreen';
import TermsScreen from '../screens/TermsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#aaa',
        drawerStyle: {
          backgroundColor: '#111',
        },
        drawerLabelStyle: {
          marginLeft: -15,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Trips"
        component={MyTripsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="airplane-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Travel Coin"
        component={TravelCoinScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="cash-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Tickets"
        component={TicketsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="ticket-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Self Travel"
        component={SelfTravelScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="car-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Travel Planner"
        component={TravelPlannerScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="map-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={TermsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
