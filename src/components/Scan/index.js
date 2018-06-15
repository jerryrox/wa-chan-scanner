import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
        justifyContent: "center",
        alignItems: "center"
    },


});