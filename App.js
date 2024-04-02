import React from 'react';
import Home from './app/components/Home/HomeComponent';
import Tide from './app/components/Tide/TideComponent';
import Weather from './app/components/Weather/WeatherComponent';
import { SocketProvider } from './app/context/Socket';
import { NavigationContainer, useNavigation } from '@react-navigation/native'; // Importer useNavigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import waveIcon from './app/assets/icons/wave2.png'
import cloudIcon from './app/assets/icons/cloud2.png'
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';


const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SocketProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Tide" component={Tide} />
            <Stack.Screen name="Weather" component={Weather} />
          </Stack.Navigator>
        </NavigationContainer>
      </SocketProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
});

export default App;
