import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons'

function InputComponent({ style, icon, ...props }) {
    return (
        <View style={[styles.container, style]}>
            <TextInput style={styles.textInput} {...props} />
            {icon && <Feather style={styles.icon} size={15} name={icon} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f3f3',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical:4,
        marginVertical: 10,
        position: 'relative',
        borderRadius: 10
    },
    textInput: {
        fontSize: 14,
        height:40,
        fontFamily: 'Poppins-Regular',
        color: '#292929',
        width: Dimensions.get('window').width - 120,
    },
    icon: {
        position: 'absolute',
        right: 15,
    }
})

export default InputComponent;