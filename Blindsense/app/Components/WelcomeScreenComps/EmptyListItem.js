import React, {useContext} from 'react';
import { StyleSheet, TouchableHighlight, Dimensions, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'
import AuthContext from '../../auth/context';



function EmptyListItem({navigation}) {

    const authContext = useContext(AuthContext);

    const createTwoButtonAlert = () => {

        if (authContext.user)
        {
            Alert.alert('Connect a device', 'You do not currently have any saved devices', [
                
                { text: 'Connect a device', onPress: () =>navigation.navigate('ConnectDevice') },
                {
                    text: 'Cancel',
                },
            ]);
        } else {
            Alert.alert('Login to proceed', 'You must be logged in to view your saved devices', [
                {
                    text: 'Cancel',
                },
                { text: 'Login', onPress: () =>navigation.navigate('Login') },
            ]);
        }     

    }

    return (
        <TouchableHighlight onPress={createTwoButtonAlert} underlayColor={'#eee'} style={styles.container}>
            <Feather
                name='plus-square'
                color='#292929'
                size={40}
            />
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 60,
        height: 90,
        borderRadius: 30,
        backgroundColor: '#F3F3F3',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginLeft: 30,
        marginRight: 30
    },
})

export default EmptyListItem;