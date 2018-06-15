import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Main from './src/components/Main';

export default class App extends React.Component {

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <View style={styles.container}>
        <Main/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: "100%",
    height: "100%"
  },
});
