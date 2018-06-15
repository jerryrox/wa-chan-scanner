import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Character from './Character';
import Background from './Background';
import {audioClips, audioTypes} from '../../audioSource';

export default class Home extends React.Component {

    componentDidMount() {
        // audioClips.playAudio(
        //     audioTypes.BGM.getKeyAt(0)
        // );
    }

    render() {
        return(
            <View style={styles.container}>
                <Background />
                <Character />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    }
});