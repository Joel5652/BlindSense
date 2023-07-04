import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

import Login from '../Screens/Login';
import Register from '../Screens/Register';

const AuthNavigator = () =>
{
    return(
        <Stack.Navigator screenOptions={
            {headerShown:false}
        }>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Register' component={Register}/>
        </Stack.Navigator>
    )
}

export default AuthNavigator;