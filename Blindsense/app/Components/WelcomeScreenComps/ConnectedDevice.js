import React, {useRef, useContext} from 'react';
import {StyleSheet, View, Text,Dimensions} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Feather } from '@expo/vector-icons';
import AuthContext from '../../auth/context';

function Device({ name, item, renderRight ,navigation}) {

    const authContext = useContext(AuthContext);

    var colour;
    var textColour;
    var text;
    if (authContext.connectedDevice === item){
        text = 'Connected'
        colour = '#292929';
        textColour = '#F3F3F3';
    } else {
        colour = '#F3F3F3';
        text = 'Disconnected'
        textColour = '#292929';
    }

    const SwipeableRef = useRef(null)

    const CloseSwipeable = () => {
        SwipeableRef.current.close();
    }

    return (
        <Swipeable 
            ref={SwipeableRef}
            renderRightActions={renderRight}
            friction={3}
            rightThreshold={20}
            leftThreshold={20}
            overshootRight={false}
            overshootLeft={false}
            renderLeftActions={() => {
                
                
                return (
                    <View style={{
                        width:80,
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        left:30
                        }}>
                        <Feather
                            name='tool'
                            size={30}
                            color='#292929'
                            onPress={() => {
                                navigation.navigate('DeviceConfig', {item:item})
                                CloseSwipeable()
                            }
                        }
                        />
                    </View>
                )
                
            }}
            >
            <View style={[styles.container, {backgroundColor: colour}]}>
                <Text style={[styles.title, {color: textColour}]}>{name}</Text>
                <Text style={[styles.status, {color: textColour}]}>{text}</Text>
                <View style={styles.ImageContainer}>
                    <Feather name='smartphone' size={25} color={textColour} />
                </View>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container:{
        width: Dimensions.get('window').width - 60,
        height:90,
        borderRadius:30,
        padding:30,
        display:'flex',
        justifyContent:'center',
        position:'relative',
        marginLeft:30,
        marginRight:30,
        marginVertical:30
    },
    title:{
        fontSize:16,
        fontFamily:'Poppins-Bold'
    },
    status:{
        marginTop:5,
        fontSize:14,
        fontFamily:'Poppins-Light'
    },
    ImageContainer:{
        height:'100%',
        width:'40%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:0,
    },
})

export default Device;