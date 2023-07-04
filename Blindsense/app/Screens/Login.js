import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup'
import jwtDecode from 'jwt-decode'

import Screen from '../Components/Screen';
import InputComponent from '../Components/InputComponent';
import Microphone from '../Components/Microphone';
import AppButton from '../Components/AppButton';
import ErrorMessage from '../Components/ErrorMessage';

import { Feather } from '@expo/vector-icons'

import dataApi from '../api/LoginPost'
import getData from '../api/getData'

import AuthContext from '../auth/context';

const validationSchema = Yup.object().shape({
    username: Yup.string().required().min(1).max(15).label('Username'),
    password: Yup.string().required().min(1).max(15).label('Password'),
})

function Login({navigation}) {
    const authContext = useContext(AuthContext);
    const [LoginFailed, setLoginFailed] = useState(false);

    const loadDevices = async (user) => {
        const response = await getData.getDevices(user);
        if(!response.ok){
            return console.log('No devices found for this user');
        }
        authContext.setDevices(response.data)
    }


    const handleSubmit = async (loginInfo) =>{
        const response = await dataApi.LoginPost(loginInfo);
        if(!response.ok){
            return setLoginFailed(true)
        }
        setLoginFailed(false)
        const user = jwtDecode(response.data)
        authContext.setUser(user)
        loadDevices(user)
        navigation.navigate('Home')
    }

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.Header}>
                    <Feather
                        style={styles.Arrow}
                        name='arrow-left'
                        color='#292929'
                        size={35}
                        onPress={()=>{navigation.navigate('Home')}}
                    />
                    <View style={styles.IconContainer}>
                        <Feather
                            name='log-in'
                            color='#fff'
                            size={16}
                        />
                    </View>
                </View>

                <Formik
                    validationSchema={validationSchema}
                    initialValues={{ username: '', password: '' }}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                        <View style={styles.login}>
                            <Text style={styles.title}>Login</Text>
                            <InputComponent
                                onBlur={() => setFieldTouched('username')}
                                onChangeText={handleChange('username')}
                                style={{ marginTop: 25 }}
                                textContentType={'username'}
                                maxLength={20}
                                placeholder={'Username'}
                                keyboardType={'default'}
                                icon='user'
                            />
                            <InputComponent
                                onBlur={() => setFieldTouched('password')}
                                onChangeText={handleChange('password')}
                                textContentType={'password'}
                                secureTextEntry
                                maxLength={20}
                                placeholder={'Password'}
                                icon='lock'
                            />
                            {LoginFailed == true && <ErrorMessage error={'Invalid username and/or password'} visible={LoginFailed}/>}
                            <AppButton title='Submit' onPress={handleSubmit} />
                            <Text onPress={()=>navigation.navigate('Register',{location:'Login'})} style={styles.register}>Register</Text>
                        </View>
                    )}
                </Formik>


                <Microphone navigation={navigation}/>
            </View>
        </Screen >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    login: {
        width: '100%',
        marginTop: 30,
    },
    title: {
        width: '100%',
        textAlign: 'center',
        color: '#292929',
        fontSize: 28,
        fontFamily: 'Poppins-SemiBold'
    },
    register: {
        fontFamily: 'Poppins-SemiBold',
        marginTop: 15,
        fontSize: 16,
        color: '#F66139',
        width:80
    },
    Header: {
        position: 'absolute',
        top: 0,
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
    
})

export default Login;