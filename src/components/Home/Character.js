import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {characters} from '../../assets';
import {audioClips, audioTypes} from '../../audioSource';
import {getCurCharIndex} from '../../prefs';

export default class Character extends React.Component {

    onTapCharacter = () => {
        audioClips.playAudio(
            audioTypes.Dialogue.getRandomKey()
        );
    };

    getCharacterAsset = () => {
        return characters[getCurCharIndex()];
    };

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    style = {styles.touchable}
                    onPress = {this.onTapCharacter}
                    activeOpacity = {0.75}
                >
                    <Image
                        style = {styles.charImage}
                        resizeMode = "cover"
                        source = {this.getCharacterAsset()}

                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },

    touchable: {
        width: "100%",
        height: "100%"
    },

    charImage: {
        marginTop: 100,
        width: "100%",
        height: "100%"
    },
});
