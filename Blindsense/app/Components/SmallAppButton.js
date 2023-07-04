import React from 'react';
import { TouchableHighlight, StyleSheet, Text } from 'react-native'

function SmallAppButton({ title, onPress, Styles }) {
    return (
        <TouchableHighlight onPress={onPress} style={[styles.button, Styles]}>
            <Text style={styles.text}>{title}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#292929',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '40%',
        marginVertical: 10,
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins-Bold'
    }
})

export default SmallAppButton;