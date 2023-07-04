import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'
import Screen from '../Components/Screen';
import ListItem from '../Components/ListItems/ListItem';
import Microphone from '../Components/Microphone';
import AppButton from '../Components/AppButton';

function LayoutScreen({ Button, buttonFunction, Scroll, Title, Data, SubTitle, navigation}) {

    const ListItems = Data.map((Data) => <ListItem Title={Data.title} key={Data.id} Icon={Data.icon} Content={Data.content} />) 

    if (Scroll == false) {

        return (
            <Screen>
                <View style={styles.Container}>
                    <View style={styles.Header}>
                        <Feather
                            style={styles.Arrow}
                            name='arrow-left'
                            color='#292929'
                            size={35}
                        />
                        <View style={styles.IconContainer}>
                            <Feather
                                name='edit-2'
                                color='#fff'
                                size={16}
                            />
                        </View>
                    </View>
                    <View style={styles.MainTitleContainer}>
                        <Text style={styles.MainTitle}>{Title}</Text>
                        <Text style={styles.SubTitle}>{SubTitle}</Text>
                    </View>
                    <Microphone />
                    {ListItems}
                    {Button && <AppButton title={Button.title} onPress={press}/>}

                </View>
            </Screen>
        );
    } else {
        return (
            <Screen>
                <ScrollView style={styles.Container}>
                    <View style={styles.Header}>
                        <Feather
                            style={styles.Arrow}
                            name='arrow-left'
                            color='#292929'
                            size={35}
                            onPress={()=>navigation.navigate('Home')}
                        />
                        <View style={styles.IconContainer}>
                            <Feather
                                name='edit-2'
                                color='#fff'
                                size={16}
                            />
                        </View>
                    </View>
                    <View style={styles.MainTitleContainer}>
                        <Text style={styles.MainTitle}>{Title}</Text>
                        <Text style={styles.SubTitle}>{SubTitle}</Text>
                    </View>
                    <Microphone/>
                    {ListItems}
                    {Button && <AppButton title={Button.title} onPress={buttonFunction}/>}
                </ScrollView>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        paddingTop: 0,
        padding: 40,
        height: '100%',
    },
    Header: {
        marginTop: 10,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height:50
    },
    IconContainer: {
        position: 'absolute',
        right: 0,
        width: 42,
        height: 42,
        backgroundColor: '#F66139',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Arrow: {
        position: 'absolute',
        left: 0,
    },
    MainTitleContainer: {
        width: '100%',
        marginTop: 60,
    },
    MainTitle: {
        fontSize: 32,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10,
    },
    SubTitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular'
    }

})

export default LayoutScreen;