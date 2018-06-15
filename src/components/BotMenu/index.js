import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import * as globalState from '../../globalState';
import viewIndexes from '../../viewIndexes';

export default class BotMenu extends React.Component {

    navigateToView = (index) => {
        globalState.setViewIndex(index);
    };

    displayMenu = (name, onPressViewInx) => {
        return (
            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={styles.menuTouchable}
                    onPress={() => this.navigateToView(onPressViewInx)}
                >
                    <View style={styles.menu}>
                        <Text>{name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return(
            <View style={styles.container}>
                {this.displayMenu("Home", viewIndexes.Home)}
                {this.displayMenu("Scan", viewIndexes.Scan)}
                {this.displayMenu("Shop", viewIndexes.Shop)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: "rgba(0, 0, 0, 0)",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    menuContainer: {
        height: "100%",
    },

    menuTouchable: {
        height: 50,
        width: 50,
    },

    menu: {
        height: "100%",
        width: "100%",
        borderRadius: 15,
        backgroundColor: "#e27734",
        justifyContent: "center",
        alignItems: "center",

        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: "#eee",
        shadowOffset: {
            width: 0,
            height: 2
        }
    }
});