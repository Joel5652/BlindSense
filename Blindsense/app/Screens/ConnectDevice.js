import React, { useEffect } from 'react';
import LayoutScreen from './LayoutScreen';

const BluetoothData = [
    {
        id: 0,
        icon: 'bluetooth',
        content: 'DEVICE',
    },
    {
        id: 1,
        icon: 'bluetooth',
        content: 'DEVICE',
    },
    {
        id: 2,
        icon: 'bluetooth',
        content: 'DEVICE',
    },
    {
        id: 3,
        icon: 'bluetooth',
        content: 'DEVICE',
    },
    {
        id: 4,
        icon: 'bluetooth',
        content: 'DEVICE',
    },
    {
        id: 5,
        icon: 'bluetooth',
        content: 'DEVICE',
    },
    {
        id: 6,
        icon: 'bluetooth',
        content: 'DEVICE',
    },



]



function ConnectDevice({navigation}) {
    return (
        <LayoutScreen navigation={navigation} Scroll={true} Title='Bluetooth' SubTitle='Connect a device' Data={BluetoothData} />
    );
}

export default ConnectDevice;