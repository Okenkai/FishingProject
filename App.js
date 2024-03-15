import React from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header />
        <List />
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
