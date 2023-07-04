import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

import WelcomeScreen from '../Screens/WelcomeScreen';
import Account from '../Screens/Account';
import DeviceConfig from '../Screens/DeviceConfig';
import ConnectDevice from '../Screens/ConnectDevice';
import Login from '../Screens/Login';
import Register from '../Screens/Register';

const MainAppNavigator = () =>
{
    return(
        <Stack.Navigator screenOptions={
            {headerShown:false}
        }>
                <Stack.Screen name='Home' component={WelcomeScreen}/>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Register' component={Register}/>
                <Stack.Screen name='Account' component={Account}/>
                <Stack.Screen name='DeviceConfig' component={DeviceConfig}/>
                <Stack.Screen name='ConnectDevice' component={ConnectDevice}/>
        </Stack.Navigator>
    )
}

export default MainAppNavigator;