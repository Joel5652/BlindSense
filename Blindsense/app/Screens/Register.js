import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Pressable } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Screen from '../Components/Screen';
import InputComponent from '../Components/InputComponent';
import Microphone from '../Components/Microphone';
import AppButton from '../Components/AppButton';
import ErrorMessage from '../Components/ErrorMessage';

import { Feather } from '@expo/vector-icons'

import dataApi from '../api/RegisterPost'

function Register({navigation}) {

    const [RegisterFailed, setRegisterFailed] = useState()

    const handleSubmit = async (values) => {
        const response = await dataApi.RegisterPost(values)
        if(!response.ok){
            return setRegisterFailed(true)
        }
        setRegisterFailed(false)
        setTimeout(()=>navigation.navigate('Login'), 1000)
        console.log(response.data);
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required().min(1, 'Too short').max(15).label('Username'),
        password: Yup.string().required().min(1).max(15).label('Password'),
    })

    return (
        <Screen>
            <ScrollView style={styles.container}>
                <View style={styles.Header}>
                    <Feather
                        style={styles.Arrow}
                        name='arrow-left'
                        color='#292929'
                        size={35}
                        onPress={()=>navigation.navigate('Login')}
                    />
                    <View style={styles.IconContainer}>
                        <Feather
                            name='users'
                            color='#fff'
                            size={16}
                        />
                    </View>
                </View>

                <Formik
                    initialValues={{  username: '', password: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                        <View style={styles.register}>
                            <Text style={styles.title}>Register</Text>

                            <InputComponent
                                onBlur={() => setFieldTouched('username')}
                                onChangeText={handleChange('username')}
                                textContentType={'username'}
                                maxLength={20}
                                placeholder={'Username'}
                                keyboardType={'default'}
                                icon='user'
                                style={{marginTop:25}}
                            />
                            {errors.username && touched.username ? (<ErrorMessage error={errors.username}/>) : null}
                            <InputComponent
                                onBlur={() => setFieldTouched('password')}
                                onChangeText={handleChange('password')}
                                textContentType={'password'}
                                secureTextEntry
                                maxLength={20}
                                placeholder={'Password'}
                                icon='lock'
                            />
                            
                            {errors.password && touched.password ? (<ErrorMessage error={errors.password}/>) : null}

                            {RegisterFailed === true && <ErrorMessage error={'That user already exists'} visible={RegisterFailed}/>}
                            {RegisterFailed === false && <ErrorMessage error={'Account created'} visible={RegisterFailed}/>}
                            <AppButton title='Submit' onPress={handleSubmit} />
                            <Text onPress={()=> navigation.navigate('Login')} style={styles.login}>Login</Text>
                        </View>
                    )}
                </Formik>


                <Microphone navigation={navigation}/>
            </ScrollView>
        </Screen >
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingTop: 0,
        height: '100%',
    },
    register: {
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
    login: {
        fontFamily: 'Poppins-SemiBold',
        marginTop: 15,
        fontSize: 16,
        color: '#F66139',
        width:60
    },
    Header: {
        marginTop: 10,
        marginBottom: 30,
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
    HeaderTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#292929',
        backgroundColor:'black'
    },
})

export default Register;