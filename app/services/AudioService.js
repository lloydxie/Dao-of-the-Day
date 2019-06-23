import { Audio } from 'expo';

export default class AudioService {
    audioFilesMap = {
        'BG_1': 'bg_1.mp3',
        'TYPE_1': 'type_1.mp3'
    }

    soundObjects = {}

    load = async (objectName, fileName) => {
        const soundObject = new Expo.Audio.Sound();

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
            // await this.soundObject.setIsLoopingAsync(true)
        } catch (error) {
            console.log(error)
        }

        return soundObject
    }
    
    loadFiles() {
        foreach (val, key audioFilesMap) {
            objectName = key; 
            fileName = val;
            soundObject = load(, )
            this.soundObjects[objectName] = soundObject;
        }
        /**
         * To play the exact sound, you will use AudioService.play(soundObject)
         * TODO:
         * 1) first test that the object returned has the callable play()
         * 2) call play() from the typewriter library for ONE sound file to test it out
         * 3) Finish implementing the map looping solution so it works for multiple sounds
         */
    }

    // play the background music!
    play = async (soundObject) => {
        await soundObject.setPositionAsync(0);
        await soundObject.playAsync();
    }

    unmount = async (soundObject) => {
        await soundObject.stopAsync();
    }
}
