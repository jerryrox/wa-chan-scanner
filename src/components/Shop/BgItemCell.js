import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {backgrounds} from '../../assets';

const BgItemCell = ({item, onTouchCell}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={[styles.fullSizer, styles.touchableView]} onPress={() => onTouchCell(item)}>
                <Image
                    style = {styles.imageView}
                    resizeMode = "cover"
                    opacity = {item.getIsPurchased() ? 1 : 0.3}
                    source = {backgrounds[item.getBgIndex()]}
                />

                <View style={styles.nameBgView}>
                    <Text style={styles.nameText}>
                        {
                            item.getName() + (item.getIsUsing() ? " (사용중)" : "")
                        }
                    </Text>
                </View>

                {
                    !item.getIsPurchased() &&
                    <View style={styles.unpurchasedView}>
                        <Text>Purchase for {item.getCost()} points</Text>
                    </View>
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        aspectRatio: 1
    },

    fullSizer: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },

    touchableView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    imageView: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },

    nameBgView: {
        backgroundColor: "#5ea3ff",
        position: "absolute",
        bottom: 5,
        height: 40,
        width: "auto",
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },

    nameText: {
        fontWeight: "700",
        fontSize: 18
    },

    unpurchasedView: {
        position: "absolute",
        width: "100%",
        height: 45,
        backgroundColor: "#ffeb5b",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default BgItemCell;