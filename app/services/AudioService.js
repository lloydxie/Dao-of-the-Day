import { Audio } from 'expo';

export default class AudioService {
    load = async () => {
        this.soundObject = new Expo.Audio.Sound();

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
            await this.soundObject.loadAsync(require('../assets/bg/bg_1.mp3'));
            await this.soundObject.setIsLoopingAsync(true)
        } catch (error) {
            console.log(error)
        }
    }

    // play the background music!
    play = async () => {
        await this.soundObject.setPositionAsync(0);
        await this.soundObject.playAsync();
    }

    unmount = async () => {
        await this.soundObject.stopAsync();
    }
}
