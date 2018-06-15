import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Loader extends React.Component {

    render() {
        return(
            <View style={styles.container}>
                <Text>Loader</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
});