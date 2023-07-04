import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';


function Screen({ children }) {
    return (
        <SafeAreaView style={styles.Screen}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Screen: {
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 0,
    },
})

export default Screen;