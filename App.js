import React, { useState, useEffect, useRef } from 'react';
import Header from './app/components/Header/Header';
import List from './app/components/List/List';
import NotificationService from './app/services/NotificationService';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
} from 'react-native';

const App = () => {

  const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  useEffect(() => {
    NotificationService.registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header />
        <List />
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await NotificationService.sendPushNotification(expoPushToken);
          }}
        />
      </ScrollView >
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'black'
  },
  scrollView: {
    backgroundColor: 'black',
  },
});


export default App;
