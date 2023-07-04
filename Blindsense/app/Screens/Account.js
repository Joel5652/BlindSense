import React, {useContext, useState} from 'react';
import { Alert,Modal,Dimensions, TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'
import Screen from '../Components/Screen';
import Microphone from '../Components/Microphone';
import AppButton from '../Components/AppButton';
import SmallAppButton from '../Components/SmallAppButton';
import jwtDecode from 'jwt-decode'

import AuthContext from '../auth/context';
import ListItem from '../Components/ListItems/ListItem';
import dataApi from '../api/alterData';
import getData from '../api/getData';

const { width } = Dimensions.get("window");

function Account({navigation}) {

    const authContext = useContext(AuthContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [changeUserUsername, setChangeUserUsername] = useState(undefined);
    const [changeUserPassword, setChangeUserPassword] = useState(undefined);
    const [failed, setFailed] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModalVisibility2 = () => {
        setModalVisible2(!isModalVisible2);
    };

    const onModalSubmit = () => {
        toggleModalVisibility()
        handleUsername(changeUserUsername)
    };
    const onModalSubmit2 = () => {
        toggleModalVisibility2()
        handlePassword(changeUserPassword)
    };

    const loadDevices = async (user) => {
        const response = await getData.getDevices(user);
        if(!response.ok){
            return console.log('No devices found for this user');
        }
        authContext.setDevices(response.data)
    }

    const handlePassword = async (newPassword) => {

        setChangeUserPassword(undefined)
        if(newPassword === undefined){
            handleFailEmpty();
        }
        const response = await dataApi.alterData(authContext.user.username, newPassword, false, undefined, undefined)
        if(response.ok){
            console.log('Password updated');
        }
    }

    const handleUsername = async (newUsername) => {

        setChangeUserUsername(undefined)
        if(newUsername === undefined){
            handleFailEmpty()
        } else if (newUsername === authContext.user.username){
            handleFailEqual()
        } else {
            const response = await dataApi.alterData(undefined, newUsername, true, authContext.user.ID, authContext.user.password)

            if(!response.ok) {
                setFailed(true)
                handleFail()
                return console.log(response.status);
            }

            const user = jwtDecode(response.data)
            authContext.setUser(user)
            loadDevices(user)
        }
    }

    const AccountData = [
        {
            id: 0,
            icon: 'user',
            content: authContext.user.username,
            title: 'YOUR USERNAME'
        },
    ]

    const handleLogOut = ()=>{
        navigation.navigate('Home')
        authContext.setUser(undefined)
        authContext.setDevices(undefined)
        authContext.setConnectedDevice(undefined)
    }
    const handleLogOutAlert = ()=>{
        Alert.alert('Logging out?', 'All devices will be disconnected if you wish to log out', [
            {
                text: 'No thanks',
            },
            { text: 'Logout', onPress: handleLogOut},            
        ]);
    }
    const handleFail = ()=>{
        Alert.alert('Error', 'This username already exists', [
            {
                text: 'Ok',
            },
        ]);
    }
    const handleFailEmpty = ()=>{
        Alert.alert('Error', 'Please enter a value', [
            {
                text: 'Ok',
            },
        ]);
    }
    const handleFailEqual = ()=>{
        Alert.alert('Error', 'This is already your username', [
            {
                text: 'Ok',
            },
        ]);
    }

    const ListItems = AccountData.map((Data) => <ListItem Title={Data.title} key={Data.id} Icon={Data.icon} Content={Data.content} />) 

    return(
        <Screen>
                <View style={styles.Container}>
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
                        <Text style={styles.MainTitle}>Account</Text>
                        <Text style={styles.SubTitle}>Your account details</Text>
                    </View>
                    <Microphone/>
                    {ListItems}
                    <Modal animationType="fade" 
                        transparent visible={isModalVisible} 
                        presentationStyle="overFullScreen" 
                        onDismiss={null}>
                        <View style={styles.viewWrapper}>
                            <View style={styles.modalView}>
                                <TextInput onChangeText={(a)=>setChangeUserUsername(a)} style={styles.textInput} placeholder="New username" placeholderTextColor={'#bbb'}/>
                                {/** This button is responsible to close the modal */}
                                <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                    <SmallAppButton Styles={{marginRight: 15}} title="Submit" onPress={onModalSubmit} />
                                    <SmallAppButton Styles={{marginLeft: 0}}  title="Cancel" onPress={toggleModalVisibility} />
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* {{{{{{{//password modal}}}}}}} */}

                    <Modal animationType="fade" 
                        transparent visible={isModalVisible2} 
                        presentationStyle="overFullScreen" 
                        onDismiss={null}>
                        <View style={styles.viewWrapper}>
                            <View style={styles.modalView}>
                                <TextInput onChangeText={(a)=>setChangeUserPassword(a)} style={styles.textInput} placeholder="New password" placeholderTextColor={'#bbb'}/>
                                {/** This button is responsible to close the modal */}
                                <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                    <SmallAppButton Styles={{marginRight: 15}} title="Submit" onPress={onModalSubmit2} />
                                    <SmallAppButton Styles={{marginLeft: 0}}  title="Cancel" onPress={toggleModalVisibility2} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <AppButton title='Change username' onPress={toggleModalVisibility}/>
                    <AppButton title='Change password' onPress={toggleModalVisibility2}/>
                    <AppButton title='Logout' onPress={handleLogOutAlert}/>
                </View>
            </Screen>
    )

}
const styles = StyleSheet.create({
    Container: {
        paddingTop: 0,
        padding: 40,
        height: '100%',
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },

    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height: 200,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
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
        marginTop:25,
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

export default Account;