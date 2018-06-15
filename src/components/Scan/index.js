import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

import * as globalState from '../../globalState';
import viewIndexes from '../../viewIndexes';

export default class Scan extends React.Component {

    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
        };
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted'
        });
    }

    onBarcodeRead = ({type, data}) => {
        globalState.setScanResult(type, data);
        globalState.setViewIndex(viewIndexes.ScanResult);
    };

    render() {
        return (
            <View style={styles.container}>
                {this.displayView()}
                <TouchableOpacity style={styles.touchable} onPress={() => this.onBarcodeRead({type: null, data: null})}>
                    <View style={styles.touchableInner}>
                        <Text style={styles.touchableText}>Cancel</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    displayView = () => {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null)
            return <Text>Requesting for camera permission ...</Text>;
        else if (hasCameraPermission === false) {
            alert("You must grant access to this application to function properly.");
            this.onBarcodeRead(null, null);
            return <Text>No access to camera!</Text>;
        }
        return (
            <BarCodeScanner
                rotation = {false}
                onBarCodeRead = {this.onBarcodeRead}
                style = {StyleSheet.absoluteFill}
            />
        );
    };
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    touchable: {
        position: "absolute",
        bottom: 30,
        left: "auto",
        right: "auto",
        width: 200,
        height: 40
    },

    touchableInner: {
        borderRadius: 10,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    touchableText: {
        
    },
});