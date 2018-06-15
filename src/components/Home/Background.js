import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import {backgrounds} from '../../assets';
import {getCurBgIndex} from '../../prefs';

export default class Background extends React.Component {

    getBackgroundAsset = () => {
        return backgrounds[getCurBgIndex()];
    };

    render() {
        return(
            <View style={styles.container}>
                <Image
                    style = {styles.bgImage}
                    resizeMode = "cover"
                    source = {this.getBackgroundAsset()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%"
    },

    bgImage: {
        height: "100%",
        width: "100%"
    },
});