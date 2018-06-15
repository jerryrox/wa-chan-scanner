import React from 'react';
import {Text, View, StyleSheet, Image, Alert, FlatList, TouchableOpacity} from 'react-native';

import CharItemCell from './CharItemCell';
import BgItemCell from './BgItemCell';

import {audioClips, audioTypes} from '../../audioSource';
import {characterItems, backgroundItems} from '../../shopItems';
import * as assets from '../../assets';

import * as prefs from '../../prefs';
import * as globalState from '../../globalState';

export default class Shop extends React.Component {

    constructor() {
        super();
        this.state = {
            shouldDisplayChars: true,

            listRedrawer: 0
        };
    }

    componentDidMount() {
        audioClips.playAudio(audioTypes.BGM.getKeyAt(1));
    }

    componentWillUnmount() {
        audioClips.playAudio(audioTypes.BGM.getKeyAt(0));
    }

    toggleDisplayMode = (isDisplayChars) => {
        this.setState({
            shouldDisplayChars: isDisplayChars
        });
    };

    refreshList = () => {
        this.setState({listRedrawer: Math.random()});
    };

    purchaseChar = (item) => {
        Alert.alert(
            `Purchase skin (${item.getName()})`,
            `Would you like to purchase this skin for ${item.getCost()} points?`,
            [
                {
                    text: "Yes", onPress: () => {
                        prefs.setPoints(prefs.getPoints() - item.getCost());
                        item.setPurchase();
                        globalState.refreshTopMenu();
                        this.refreshList();
                    }
                },
                { text: "No" }
            ],
            {
                cancelable: true
            }
        );
    };

    purchaseBg = (item) => {
        Alert.alert(
            `Purchase background (${item.getName()})`,
            `Would you like to purchase this background for ${item.getCost()} points?`,
            [
                {
                    text: "Yes", onPress: () => {
                        prefs.setPoints(prefs.getPoints() - item.getCost());
                        item.setPurchase();
                        globalState.refreshTopMenu();
                        this.refreshList();
                    }
                },
                { text: "No" }
            ],
            {
                cancelable: true
            }
        );
    };

    onSelectChar = (charItem) => {
        if(!charItem.getIsPurchased()) {
            if(prefs.getPoints() < charItem.getCost()) {
                alert("You don't have enough points!");
                return;
            }
            this.purchaseChar(charItem);
            return;
        }

        if(charItem.getIsUsing())
            return;

        prefs.setCurCharIndex(charItem.getCharIndex());
        this.refreshList();
        alert("Changed skin.");
    };

    onSelectBg = (bgItem) => {
        if(!bgItem.getIsPurchased()) {
            if(prefs.getPoints() < bgItem.getCost()) {
                alert("You don't have enough points!");
                return;
            }
            this.purchaseBg(bgItem);
            return;
        }

        if(bgItem.getIsUsing())
            return;

        prefs.setCurBgIndex(bgItem.getBgIndex());
        this.refreshList();
        alert("Changed background.");
    };

    displayChars = () => {
        return (
            <View style={styles.contentSection}>
                <Text style={styles.contentTitle}>Skins</Text>
                <FlatList
                    horizontal = {true}
                    style = {styles.contentScroll}
                    data = {characterItems}
                    extraData = {this.state.listRedrawer}
                    keyExtractor = {(item, index) => String(item.charIndex)}
                    renderItem = {({item}) => {
                        return <CharItemCell item={item} onTouchCell={this.onSelectChar}/>;
                    }}
                />
            </View>
        );
    };

    displayBgs = () => {
        return (
            <View style={styles.contentSection}>
                <Text style={styles.contentTitle}>Backgrounds</Text>
                <FlatList
                    horizontal = {true}
                    style = {styles.contentScroll}
                    data = {backgroundItems}
                    extraData = {this.state.listRedrawer}
                    keyExtractor = {(item, index) => String(item.bgIndex)}
                    renderItem = {({item}) => {
                        return <BgItemCell item={item} onTouchCell={this.onSelectBg}/>;
                    }}
                />
            </View>
        );
    };

    render() {
        return(
            <View style={StyleSheet.absoluteFill}>
                <View style={StyleSheet.absoluteFill}>
                    <Image
                        style = {styles.bgImage}
                        resizeMode = "cover"
                        source = {assets.shopBackground}
                    />
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.modesContainer}>
                        <TouchableOpacity style={styles.modesButton} onPress={() => this.toggleDisplayMode(true)}>
                            <Text style={styles.modesText}>Skins</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modesButton} onPress={() => this.toggleDisplayMode(false)}>
                            <Text style={styles.modesText}>Backgrounds</Text>
                        </TouchableOpacity>
                    </View>

                    { this.state.shouldDisplayChars && this.displayChars() }
                    { !this.state.shouldDisplayChars && this.displayBgs() }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bgImage: {
        height: "100%",
        width: "100%"
    },

    contentContainer: {
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        bottom: 90,
    },

    modesContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 40,
        flex: 1,
        flexDirection: "row"
    },

    modesButton: {
        width: "50%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#314f89"
    },

    modesText: {
        textAlign: "center",
        color: "#fff",
    },

    contentSection: {
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },

    contentTitle: {
        marginLeft: 20,
        marginTop: 20,
        color: "#fff",
        fontWeight: "700",
        fontSize: 22
    },

    contentScroll: {
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute",
        top: 70,
        bottom: 20,
        left: 0,
        right: 0,
    }
});