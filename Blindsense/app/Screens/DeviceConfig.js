import React ,{useContext,useState} from 'react';
import LayoutScreen from './LayoutScreen';

import AuthContext from '../auth/context';

function DeviceConfig({navigation, route}) {

    const authContext = useContext(AuthContext);
    const {item} = route.params

    const ItemData = [
        {
            id: 0,
            icon: 'smartphone',
            content: item.DeviceName,
            title: 'DEVICE NAME'
        }
    ]

    if(item === authContext.connectedDevice){
        ItemData.push({
            id: 1,
            icon: 'rss',
            content: authContext.connectedDevice.range,
            title: 'DEVICE RANGE (M)'
        },
        {
            id: 2,
            icon: 'activity',
            content: authContext.connectedDevice.sensitivity,
            title: 'DEVICE SENSITIVITY'
        },
        {
            id: 3,
            icon: 'battery-charging',
            content: authContext.connectedDevice.battery,
            title: 'DEVICE BATTERY'
        },)
    }

    var [ one ] = ItemData

    const handleStatus = () => {
        
            let c = JSON.parse(JSON.stringify(authContext.devices))

            if(authContext.connectedDevice != item && authContext.connectedDevice){
                return console.log('Another device already connected');
            } 
            if(authContext.connectedDevice == item){
                c.push(item)
                authContext.setDevices(c)
                return authContext.setConnectedDevice(undefined)
            }

            let newArray = c.filter((d) => d.DeviceID != item.DeviceID)
            authContext.setDevices(newArray)

            authContext.setConnectedDevice(item)
    }

    return (
        <LayoutScreen Button={{
            title: authContext.connectedDevice == item ? 'Disconnect' : 'Connect',
        }} 
        buttonFunction={handleStatus}
        navigation={navigation} Scroll={true} Title={one.content} SubTitle='Configure your device' Data={ItemData} />
    );
}

export default DeviceConfig;