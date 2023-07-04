import React from 'react';
import {Pressable,View} from 'react-native'
import {Feather} from '@expo/vector-icons'

function DeviceListDelete({onPress}) {
    return (
        <View style={{
            width:80,
            position:'relative',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
            }}>          
                <Pressable onPress={onPress}>
                    <Feather 
                        name='trash-2'
                        size={30}
                        color={'#292929'}
                    />
                </Pressable>           
            </View>
        
    );
}           

export default DeviceListDelete;