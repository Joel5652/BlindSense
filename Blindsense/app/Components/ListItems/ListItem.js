import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';


function ListItem({ Key, Content, Title, Icon }) {
    return (
        <View style={styles.container}>
            <Text style={styles.Title}>{Title}</Text>
            <View style={styles.ContentContainer}>
                <Text style={styles.ContentText}>{Content}</Text>
                <Feather
                    style={styles.ContentIcon}
                    name={Icon}
                    size={20}
                    color='#292929'
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 30
    },
    Title: {
        fontSize: 12,
        color: '#292929',
        fontFamily: 'Poppins-Regular'
    },
    ContentContainer: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#CECECE',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ContentText: {
        fontSize: 14,
        color: '#292929',
        fontFamily: 'Poppins-Regular',
    },
    ContentIcon: {
        marginLeft: 'auto',
        paddingRight: 15
    },

})

export default ListItem;
