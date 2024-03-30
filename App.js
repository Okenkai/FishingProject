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
          <NavBar />
        </NavigationContainer>
      </SocketProvider>
    </SafeAreaView>
  );
};

const NavBar = () => {
  const navigation = useNavigation(); // Récupérer l'objet de navigation

  return (
    <View style={styles.navBarContainer}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Tide')}>
          <Image style={[styles.icon, styles.iconLeft]} source={waveIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
          <Image style={[styles.icon, styles.iconRight]} source={cloudIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  navBarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navBar: {
    height: 80,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  iconLeft: {
    marginRight: 'auto', // Push the left icon to the left edge
  },
  iconRight: {
    marginLeft: 'auto', // Push the right icon to the right edge
  }
});

export default App;
