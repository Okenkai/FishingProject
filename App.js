import React, { useState, useEffect, useRef } from 'react';
import Home from './app/components/Home/Home';
import List from './app/components/List/List';
import NotificationService from './app/services/NotificationService';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';


const Stack = createNativeStackNavigator();


const App = () => {

  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    NotificationService.registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="List" component={List} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'black'
  },
});


export default App;
