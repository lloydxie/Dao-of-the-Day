import { Audio } from 'expo-av';
import bg from '../assets/bg';

class AudioService {
    static instance = null;
    static createInstance() {
        var object = new AudioService();
        return object;
    }

    static getInstance () {
        if (!AudioService.instance) {
            AudioService.instance = AudioService.createInstance();
        }
        return AudioService.instance;
    }

    backgroundMusicFilesMap = {
        'bg_1.mp3': null,
        'lily_3.mp3': null,
        'lily_4.mp3': null
    }

    initialLoadMap = {
        'lily_1.mp3': null,
        'typing.mp3': null
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
        const soundObject = new Audio.Sound();

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
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                shouldDuckAndroid: false,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playThroughEarpieceAndroid: false,
                staysActiveInBackground: false
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
            soundObject = await this.load(keyName, true)
            fileMap[keyName] = soundObject
        }
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

    async checkIfMusicIsPlaying() {
        isCurrentlyPlayingMusic = false
        for (key in AudioServiceSingleton.backgroundMusicFilesMap) {
          soundObject = AudioServiceSingleton.backgroundMusicFilesMap[key]
          if (soundObject) {
            let audioStatus = await soundObject.getStatusAsync()
            if (audioStatus.isPlaying) {
              isCurrentlyPlayingMusic = true
            }
          }
        }
    
        return isCurrentlyPlayingMusic
      }
}

const AudioServiceSingleton = AudioService.getInstance();
export default AudioServiceSingleton;

// 1) stop existing sounds
    // loop through sound objects, call "stop"
// 2) prevent future plays (with if statement)
    // check if music or typing – must be able to identify from the sound object.