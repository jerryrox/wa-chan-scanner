import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {getTotalScans, getPoints} from '../../prefs';
import * as globalState from '../../globalState';

export default class TopMenu extends React.Component {

    constructor() {
        super();
        this.state = {
            scans: 0,
            points: 0
        };

        globalState.set_RefreshTopMenu(this.refreshTopMenu);
    }

    componentDidMount() {
        this.refreshTopMenu();
    }

    refreshTopMenu = () => {
        this.setState({
            scans: getTotalScans(),
            points: getPoints()
        });
    };

    drawSection = (name, count) => {
        return (
            <View style={styles.sectionContainer}>
                <View style={styles.section}>
                    <Text style={styles.nameText}>
                        {name}
                    </Text>
                    <Text style={styles.countText}>
                        {count}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        const {scans, points} = this.state;

        return(
            <View style={styles.container}>
                {this.drawSection("Scans", scans)}
                {this.drawSection("Points", points)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",

        borderBottomColor: "#ff9933",
        borderBottomWidth: 2
    },

    sectionContainer: {
        height: "100%",
    },

    section: {
        height: "100%",
        width: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        marginTop: 5
    },

    nameText: {
        textAlign: "center",
        color: "#fff",

        textShadowColor: "#000",
        textShadowRadius: 2,
        textShadowOffset: {
            width: 1,
            height: 1
        }
    },

    countText: {
        textAlign: "center",
        fontWeight: "700",
        color: "#ff9933",
        fontSize: 20,

        textShadowColor: "#000",
        textShadowRadius: 2,
        textShadowOffset: {
            width: 1,
            height: 1
        }
    }
});
