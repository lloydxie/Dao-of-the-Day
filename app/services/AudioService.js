import { Audio } from 'expo';
import bg from '../assets/bg';

export default class AudioService {
    backgroundMusicFilesMap = {
        'bg_1.mp3': null
    }

    lowSoundFilesMap = {
        'ios_type_low_1.mp3': null,
        'ios_type_low_2.mp3': null,
    }

    highSoundFilesMap = {
        'ios_type_high_1.mp3': null,
        'ios_type_high_2.mp3': null,
    }

    lowSoundKeys = [
        ' '
    ]

    lastPlayedHighSoundIndex = 0
    lastPlayedLowSoundIndex = 0

    load = async (fileName, isLooping = false) => {
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
            await soundObject.loadAsync(bg[fileName]);
            if (isLooping) {
                await soundObject.setIsLoopingAsync(true)
            }
        } catch (error) {
            console.log(error)
        }

        return soundObject
    }
    
    async loadFiles(fileMap) {
        for (var keyName in fileMap) {
            isLooping = keyName == 'bg_1.mp3' ? true : false
            soundObject = await this.load(keyName, isLooping)
            fileMap[keyName] = soundObject
        }
    }

    async loadAllFiles() {
        await Promise.all([
            this.loadFiles(this.backgroundMusicFilesMap),
            // this.loadFiles(this.lowSoundFilesMap),
            // this.loadFiles(this.highSoundFilesMap)
        ]);
    }

    // play the background music!
    play = async (soundObject) => {
        await soundObject.playAsync();
        await soundObject.setPositionAsync(0);
    }

    playTypingSoundOnIos = async (high = true) => {
        if (high) {
            soundObject = this.highSoundFilesMap[Object.keys(this.highSoundFilesMap)[this.lastPlayedHighSoundIndex]]
            this.lastPlayedHighSoundIndex = 1 - this.lastPlayedHighSoundIndex
        }
        else {
            soundObject = this.lowSoundFilesMap[Object.keys(this.lowSoundFilesMap)[this.lastPlayedLowSoundIndex]]
            this.lastPlayedLowSoundIndex = 1 - this.lastPlayedLowSoundIndex
        }
        await this.play(soundObject)
    }

    unmount = async (soundObject) => {
        await soundObject.stopAsync();
    }
}
