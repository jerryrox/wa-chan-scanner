import React from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Linking} from 'react-native';

import * as globalState from '../../globalState';
import * as prefs from '../../prefs';
import {audioClips, audioTypes} from '../../audioSource';
import viewIndexes from '../../viewIndexes';

export default class ScanResult extends React.Component {

    constructor() {
        super();
        this.state = {
            type: null,
            data: null,
            isSuccess: false,
            rewardsEarned: 0,

            canOpenURI: false,
        };
    }

    componentDidMount() {
        const {type, data} = globalState.getScanResult();
        const isSuccess = type !== null && data !== null;
        this.setState({
            type,
            data,
            isSuccess: isSuccess
        });

        if(isSuccess) {
            audioClips.playAudio(audioTypes.Success.getRandomKey());
            this.addRewards(type, data);
            this.checkUriOpenable(data);
        }
        else {
            audioClips.playAudio(audioTypes.Fail.getRandomKey());
        }
    }

    /**
     * Adds rewards with specified code type and data.
     * @param {string} type 
     * @param {string} data 
     */
    addRewards(type, data) {
        let pointsEarned = this.getPointAmount(type) + this.getPointAmount(data);
        let newPoints = prefs.getPoints() + pointsEarned;
        let newScans = prefs.getTotalScans() + 1;

        prefs.setPoints(newPoints);
        prefs.setTotalScans(newScans);
        globalState.refreshTopMenu();

        this.setState({
            rewardsEarned: pointsEarned
        });
    }

    /**
     * Checks whether specified code data can be opened as URI.
     */
    checkUriOpenable = (data) => {
        Linking.canOpenURL(data)
            .then(canOpen => {
                this.setState({
                    canOpenURI: canOpen
                });
            })
            .catch(err => {
                console.log(`ScanResult.checkUriOpenable - Can't upen as URI: ${data}`);
            });
    };

    /**
     * Calculates and returns the amount of points earned from specifeid text value.
     * @param {string} val 
     */
    getPointAmount(val) {
        let amount = 0;
        for(let i=0; i<val.length; i++) {
            let add = val[i].charCodeAt(0);
            amount += (add === NaN ? 0 : Math.floor(Math.sqrt(add)));
        }
        return amount;
    }

    /**
     * Opens the data URI via system.
     */
    onBrowserOpenAction = () => {
        Linking.openURL(this.state.data);
    };
    
    /**
     * Navigates back to home view.
     */
    onToHomeAction = () => {
        globalState.setViewIndex(viewIndexes.Home);
    };

    displaySuccess = () => {
        return (
            <View style={[StyleSheet.absoluteFill, styles.displayContainer]}>
                <ScrollView
                    style={styles.scrollView}
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <View style={styles.bodyContainer}>
                        <Text style={styles.headerText}>Rewards</Text>
                        <Text style={styles.contentText}>{this.state.rewardsEarned} Points</Text>
                    </View>
                    <View style={styles.bodyContainer}>
                        <Text style={styles.headerText}>Code Type</Text>
                        <Text style={styles.contentText}>{this.state.type}</Text>
                    </View>
                    <View style={styles.bodyContainer}>
                        <Text style={styles.headerText}>Code Data</Text>
                        <Text style={styles.contentText}>{this.state.data}</Text>
                    </View>
                    <View style={styles.bodyContainer}>
                        <Text style={styles.headerText}>Actions</Text>
                        <View style={styles.actionsContainer}>
                            {
                                this.state.canOpenURI &&
                                <TouchableOpacity onPress={this.onBrowserOpenAction} style={styles.actionsTouchable}>
                                    <View style={styles.actionButton}>
                                        <Text style={styles.actionText}>Open in browser</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            <TouchableOpacity onPress={this.onToHomeAction} style={styles.actionsTouchable}>
                                <View style={styles.actionButton}>
                                    <Text style={styles.actionText}>Back to Home</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    };

    displayFail = () => {
        return (
            <View style={[StyleSheet.absoluteFill, styles.failContainer]}>
                <Text style={styles.failText}>Scan cancelled... :(</Text>
            </View>
        );
    };

    render() {
        const {isSuccess} = this.state;

        return(
            <View style={[StyleSheet.absoluteFill, styles.baseContainer]}>
                {isSuccess && this.displaySuccess()}
                {!isSuccess && this.displayFail()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseContainer: {
        backgroundColor: "#324768",
    },

    displayContainer: {
        flex: 1
    },

    failContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    failText: {
        fontWeight: "700",
        fontSize: 22,
        color: "#fff",
    },

    scrollView: {
        position: "absolute",
        flex: 1,
        top: 50,
        bottom: 90,
        left: 0,
        right: 0
    },

    bodyContainer: {
        justifyContent: "center",
        width: "90%",
        marginTop: 15,
        marginBottom: 15,
        marginLeft: "auto",
        marginRight: "auto"
    },

    headerText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#ffb168",
        textAlign: "center"
    },

    contentText:{
        color: "#fff",
        fontSize: 18,
        textAlign: "center"
    },

    actionsContainer: {
        width: 200,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },

    actionsTouchable: {
        width: "100%",
        height: 36,
        marginBottom: 5,
        marginTop: 5,
        marginLeft: "auto",
        marginRight: "auto",
    },

    actionButton: {
        backgroundColor: "#ffc691",
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    actionText:{
        color: "#333",
        textAlign: "center",
    },
});