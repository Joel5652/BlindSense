import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import SvgComponent from './SvgComponent';


function SliderComp({ title, subTitle, bgc }) {

    var slideID;

    if (bgc === 1) {
        slideID = 1
    } else {
        slideID = 2
    }

    return (
        <View style={styles.container}>
            <SvgComponent slideID={slideID} style={styles.S} />
            <View style={styles.TxtContainer}>
                <Text numberOfLines={1} style={styles.title}>{title}</Text>
                <Text style={styles.SubTitle}>{subTitle}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        width: 170,
        height: 240,
        borderRadius: 30,
        marginRight: 25,
    },
    S: {
        position: 'absolute',
    },
    TxtContainer: {
        margin: 25,
        marginTop: 30
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#292929'
    },
    SubTitle: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        color: '#292929'
    }
})

export default SliderComp;