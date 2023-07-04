import React, {useContext} from 'react';
import {View} from 'react-native'
import { Feather } from '@expo/vector-icons'
import AuthContext from '../../auth/context';

function AccountAuth({ onPress, icon }) {

    const authContext = useContext(AuthContext);

        return (
                <Feather
                    onPress={onPress}
                    name={icon}
                    size={35}
                    color='#292929'
                    style={{paddingBottom:5, paddingLeft:5}}
                />
        )
    
}

export default AccountAuth;