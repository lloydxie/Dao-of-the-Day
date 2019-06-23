import { Audio } from 'expo';

export default class AudioService {
    play = async () => {
        const soundObject = new Expo.Audio.Sound();

        console.log('we in')
        initialStatus = {
            progressUpdateIntervalMillis: 500,
            positionMillis: 0,
            shouldPlay: true,
            rate: 1.0,
            shouldCorrectPitch: false,
            volume: 1.0,
            isMuted: false,
            isLooping: true,
        };

        try {
            await Audio.setIsEnabledAsync(true);
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                allowsRecordingIOS: false,
                interruptionModeIOS: Expo.Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                shouldDuckAndroid: false,
                interruptionModeAndroid: Expo.Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playThroughEarpieceAndroid: false
            });
            console.log('1')
            await soundObject.loadAsync(require('../assets/bg/type_1.mp3'));
            console.log('2')
            // play the background music!
            await soundObject.playAsync();
            console.log('3')
        } catch (error) {
            console.log(error)
        }
    }

    unmount = async () => {
        await soundObject.stopAsync();
    }
}
