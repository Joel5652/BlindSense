import React, { useState, useContext,useEffect } from 'react';
import { Alert, View, StyleSheet, Dimensions, Text, ScrollView, TouchableHighlight, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons'

import Microphone from '../Components/Microphone';
import SliderComp from '../Components/WelcomeScreenComps/SliderComp';
import AccountAuth from '../Components/WelcomeScreenComps/AccountAuth';
import DeviceListDelete from '../Components/WelcomeScreenComps/DeviceListDelete'
import Device from '../Components/WelcomeScreenComps/Device'
import ConnectedDevice from '../Components/WelcomeScreenComps/ConnectedDevice'
import EmptyListItem from '../Components/WelcomeScreenComps/EmptyListItem';
import Screen from '../Components/Screen';

import dataApi from '../api/getData'
import AuthContext from '../auth/context';

const Sliders = [
    {
        id: 1,
        title: 'About us',
        subTtitle: 'Visit our website',
        bgc: 2,
    },
    {
        id: 2,
        title: 'Support',
        subTtitle: 'Contact us',
        bgc: 1,
    },
    {
        id: 3,
        title: 'About us',
        subTtitle: 'Visit our website',
        bgc: 2,
    },
]

    class DeviceObject {
        constructor(id,name){
            this.DeviceName = name
            this.DeviceID = id
        }
    }

function WelcomeScreen({navigation}) {

    const authContext = useContext(AuthContext)

    console.log(authContext);

    useEffect(() => {
        if(authContext.user){
            loadDevices();
        }
    },[])

    const connectDeviceAlert = () => {
        if(authContext.connectedDevice){
            Alert.alert('Device already connected', 'Disconnect device and try again ', [
                {
                    text: 'Cancel',
                },
                { text: 'Ok'},
                
            ]);
        } else {
            navigation.navigate('ConnectDevice')
        }
    }

    const loadDevices = async () => {
        const response = await dataApi.getDevices(authContext.user);
        if(!response.ok){
            return console.log('No devices found for this user');
        }

        authContext.setDevices(response.data)
        console.log(authContext.devices)
    }
    
    const handleDelete = device => {
        authContext.setDevices(authContext.devices.filter(d => d.DeviceID !== device.DeviceID))
        if(device == authContext.connectedDevice){
            authContext.setConnectedDevice(undefined)
        }
    }
    
    const handleAccountButton = () => {
        if(authContext.user){
            navigation.navigate('Account')
        } else {
            navigation.navigate('Login')
        }
    }

    return (
        <Screen>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                     {/*Screen reader*/}
                    <View style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Feather
                            name='book-open'
                            size={35}
                            color='#292929'
                            style={{ position: 'relative', left: 0 }}
                        />
                    </View>

                     {/*Login/Account button*/}
                    <View style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <AccountAuth icon={authContext.user ? 'user' : 'log-in'} onPress={handleAccountButton}
                        />
                    </View>

                </View>

                 {/*Title*/}
                <Text style={styles.BlindSense}>BlindSense.</Text>

                 {/*Connect a device*/}
                <TouchableHighlight onPress={connectDeviceAlert} underlayColor={'#eee'} style={styles.connectHighlight}>
                    <View style={styles.connectContainer}>
                        <Text style={styles.connectText}>Connect a device</Text>
                         {/*Image*/}
                        <View style={styles.connectImageContainer}>
                            <Feather
                                name='rss'
                                size={25}
                                color='#fff'
                            />
                        </View>
                    </View>
                </TouchableHighlight>

                 {/*Microphone*/}
                <Microphone navigation={navigation}/>

                {/* Connected device */}
                {authContext.connectedDevice &&
                <>
                    <Text style={styles.TitleText}>Connected Device</Text>
                    <View style={{width:'120%', position:'relative', left:-30}}>
                        <ConnectedDevice
                        navigation={navigation}
                        name={authContext.connectedDevice.DeviceName}
                        item={authContext.connectedDevice}
                        renderRight={() => (
                            <DeviceListDelete
                                onPress={() => handleDelete(authContext.connectedDevice)}
                            />
                        )}/>
                    </View>
                </>}

                 {/*Saved devices title*/}
                 <View style={{ display: 'flex', flexDirection: 'row', }}>
                    <Text style={styles.TitleText}>Saved Devices</Text>
                    <Feather style={{ marginLeft: 5 }} name="arrow-down" size={25} />
                </View>

                {/*Saved devices vertical list*/}
                <FlatList
                    style={{ marginTop: 30, marginBottom: 30, position: 'relative', left: -30, width: '120%' }}
                    data={authContext.devices}
                    keyExtractor={device => device.DeviceID.toString()}
                    renderItem={({ item }) =>
                    <Device
                            navigation={navigation}
                            name={item.DeviceName}
                            item={item}
                            renderRight={() => (
                                <DeviceListDelete
                                    onPress={() => handleDelete(item)}
                                />
                            )}
                        />}
                    ItemSeparatorComponent={() =>
                        <View style={{ marginTop: 20 }}></View>
                    }
                    ListEmptyComponent={() =>
                        <EmptyListItem navigation={navigation}/>
                    }
                />  

                 {/*Title for find out more section*/}
               

                 {/*Horizontal list for find out more section*/}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={Sliders}
                    keyExtractor={slider => slider.id.toString()}
                    renderItem={({ item }) =>
                    <SliderComp title={item.title} subTitle={item.subTtitle} bgc={item.bgc} />
                }
                    style={styles.SliderContainer}
                />

                

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({

    container: {
        paddingTop: 5,
        padding: 30,
    },
    header: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
        width: Dimensions.get('window').width - 60,
    },
    BlindSense: {
        marginTop: 20,
        fontSize: 36,
        color: '#292929',
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
    },
    connectHighlight: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#F3F3F3',
        paddingLeft: 20,
        marginTop: 25,
    },
    connectContainer: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative'
    },
    connectText: {
        fontFamily: 'Poppins-Light',
        fontSize: 16,
        color: '#292929'
    },
    connectImageContainer: {
        width: 50,
        height: '100%',
        backgroundColor: '#F66139',
        borderRadius: 10,
        position: 'absolute',
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    connectImage: {
        height: '100%',
        resizeMode: 'contain',
    },
    TitleText: {
        fontSize: 16,
        color: '#292929',
        fontFamily: 'Poppins-Bold'
    },
    SliderContainer: {
        width: Dimensions.get('window').width,
        left: -30,
        position: 'relative',
        paddingLeft: 30,
        marginTop: 30,
        marginBottom: 30,
    },
    DeviceContainer: {
        marginBottom: 30,
        marginTop: 30,
    }

})

export default WelcomeScreen;