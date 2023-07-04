import React, { useState, useContext } from 'react';
import { TouchableHighlight, Alert,StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import AuthContext from '../auth/context';

const recordingOptions = {
    // android not currently in use. Not getting results from speech to text with .m4a
    // but parameters are required
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

function Microphone({navigation}) {

    const authContext = useContext(AuthContext);

    const [microphoneState, setMicrophoneState] = useState(false)
    const [recording, setRecording] = useState()
    const [isRecording, setIsRecording] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [transcript, setTranscript] = useState()
    const [sound, setSound] = useState()

    const startRecording = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') return;

        setMicrophoneState(true)
        setIsRecording(true);

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });

        console.log('Starting recording...');

        const recording = new Audio.Recording();

        try {
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();
        } catch (error) {
            console.log(error);
            stopRecording();
        }
        console.log('Recording started!');
        setRecording(recording);
    }


    const stopRecording = async () => {
        console.log('Stopping recording...');
        setMicrophoneState(false)
        try {
            await recording.stopAndUnloadAsync();
        } catch (error) {
            // Do nothing -- we are already unloaded.
        }
        console.log('Recording stopped!');
        const object = await FileSystem.getInfoAsync(recording.getURI())
        if(object.exists == true){
            const { sound } = await Audio.Sound.createAsync(    
                { uri: recording.getURI() }
            )
            setSound(sound);
                
            console.log('Playing Sound');
            await sound.playAsync();
            getTranscription()
        } else {
            console.log('Error: No sound found')
        }
    }

    const getTranscription = async () => {

        console.log('Sending data!');

        try {
            const info = await FileSystem.getInfoAsync(recording.getURI());

            const options = {
                httpMethod: 'POST',
                mimeType: 'audio',
                fieldName: 'text2speech.wav',
            }

            FileSystem.uploadAsync(
                'http://192.168.0.78:3005/speech',
                info.uri,
                options,
            ).then(({ body }) => {
                let response = body;
                if(response.length < 1){
                } else {

                    response = response.split(' ')

                    console.log(response);

                    if(response.indexOf('navigate') === 0){
                        console.log('Navigate first word');
                        let c = response[2].trim().replace(/^\w/, (c) => c.toUpperCase());
                        console.log(c);
                        if(c == 'Account' && authContext.user == undefined){
                            throw('Error you are not logged in')
                        } else if (c === 'Login' || c === 'Register' && authContext.user){
                            throw('error - you are already logged in')
                        } else {
                            navigation.navigate(c)
                        }
                    } else {
                        try {
                            console.log('Navigate not first word');
                            
                            const result = response.join(' ').split(' navigate ')
                            
                            console.log(result);

                            if(result.length !== 2){
                                throw('Invalid command')
                            } else {
                                let a = result[1].split(' ')
                                console.log(a);
                
                                if(a.length === 2){
                                    let c = a[1].trim().replace(/^\w/, (c) => c.toUpperCase());
                                    if(c == 'Account' && authContext.user.username == undefined){
                                        throw('Error you are not logged in')
                                    } else if (c === 'Login' || c === 'Register' && authContext.user){
                                        throw('error - you are already logged in')
                                    } else {
                                        navigation.navigate(c)
                                    }
                                }
                            }

                        }catch {
                            throw('error')
                        }
                    }
                    

                }
            }).catch(error => {
                console.error(error);
            });
            

        } catch (error) {
            console.log('There was an error reading file', error);
            stopRecording();
            resetRecording();
        }
    }

    const deleteRecordingFile = async () => {
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI());
            await FileSystem.deleteAsync(info.uri)
        } catch (error) {
            console.log("There was an error deleting recording file", error);
        }
    }


    const resetRecording = () => {
        deleteRecordingFile();
        setRecording(null);
    };

    const handleShortPress = ()=>{
        Alert.alert('Voice activation', 'Press and hold this box to record a voice command', [
            {
                text: 'Okay',
            },
        ]);
    }

    if (microphoneState == false) {
        return (
            <>
            <TouchableHighlight underlayColor={'#eee'} onPress={handleShortPress} onLongPress={startRecording} style={styles.container}>
                <Feather
                    name="mic-off"
                    size={50}
                    color={'#292929'}
                />
            </TouchableHighlight>
            </>
        )
    } else {
        return (
            <>
            <TouchableHighlight underlayColor={'#eee'} onPressOut={stopRecording}
            style={styles.container}>
                <Feather
                    name="mic"
                    size={50}
                    color={'#292929'}
                />
            </TouchableHighlight>
            </>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        borderRadius: 30,
        padding: 65,
        marginTop: 30,
        marginBottom: 30,
    }
})

export default Microphone;