import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { scrapedDao, chineseText } from './content/daoDeChing'
import {withNavigationFocus} from 'react-navigation';
import TypeWriter from 'react-native-typewriter';
import AudioServiceSingleton from '../services/AudioService'
import { Ionicons } from '@expo/vector-icons';
import * as Brightness from 'expo-brightness';

const HIGH = 'HIGH';
const MUTE = 'MUTE'

class DaoTextScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  volumeLevelOptions = {
    HIGH: 'md-volume-high',
    MUTE: 'md-volume-mute'
  }

  state = {
    volumeLevel: HIGH,
    isExitingScreen: false
  }

  loadAudioFile = async (numberOfTheDay) => {
    isLooping = true;
    backgroundMusicFilesMap = AudioServiceSingleton.backgroundMusicFilesMap;
    if (numberOfTheDay < 25) {
      this.keyName = Object.keys(backgroundMusicFilesMap)[0];
    }
    else if (numberOfTheDay < 50) {
      this.keyName = Object.keys(backgroundMusicFilesMap)[1];
    }
    else {
      this.keyName = Object.keys(backgroundMusicFilesMap)[2];
    }
    
    if (!AudioServiceSingleton.backgroundMusicFilesMap[this.keyName]) {
      soundObject = await AudioServiceSingleton.load(this.keyName, isLooping);
      AudioServiceSingleton.backgroundMusicFilesMap[this.keyName] = soundObject;
    }

    return AudioServiceSingleton.backgroundMusicFilesMap[this.keyName]
  };

  async componentDidMount() {
    this.oldBrightness = Brightness.getBrightnessAsync()
    this.brightnessValue = 0
    this.interval = setInterval(() => this.increaseBrightness(), 1000);

    soundObject = await this.loadAudioFile(this.numberOfTheDay)
    setTimeout(() => {
      if (!this.state.isExitingScreen) {
        AudioServiceSingleton.play(soundObject)
      }
    }, 2000)

    setTimeout(() => {
      if (!this.state.isExitingScreen) {
        AudioServiceSingleton.play(AudioServiceSingleton.initialLoadMap['typing.mp3'])
      }
    }, 5000)
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("willFocus", () => {
      // this.daoText.fadeIn(2000)
    });
  }

  changeVolume = () => {
    if (this.state.volumeLevel == HIGH) {
      AudioServiceSingleton.initialLoadMap['typing.mp3'].setVolumeAsync(0)
      this.setState({volumeLevel: MUTE})
    }
    else if (this.state.volumeLevel == MUTE) {
      AudioServiceSingleton.initialLoadMap['typing.mp3'].setVolumeAsync(1)
      this.setState({volumeLevel: HIGH})
    }
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  navigateAway = () => {
    this.setState({isExitingScreen: true})
    AudioServiceSingleton.unmount(AudioServiceSingleton.backgroundMusicFilesMap[this.keyName])
    AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
    this.props.navigation.replace('Contents')
  }

  increaseBrightness() {
    if (this.brightnessValue > 0.95) {
      this.brightnessValue = this.oldBrightness
      clearInterval(this.interval)
      return
    }
    else {
      this.brightnessValue += 0.1
    }
    Brightness.setBrightnessAsync(this.brightnessValue)
  }

  playOrPauseTyping(token) {
    if (token == '\n') {
      AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
    }
    else {
      AudioServiceSingleton.play(AudioServiceSingleton.initialLoadMap['typing.mp3'])
    }
  }

  render() {
    this.numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 81));
    this.daoOfTheDay = scrapedDao[this.numberOfTheDay].title;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.helpContainer}>
            <TouchableOpacity style={styles.helpLink}>
              <Ionicons 
                name={this.volumeLevelOptions[this.state.volumeLevel]} 
                size={32}
                color="#22BAD9"
                onPress={this.changeVolume}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpLink}>
              <Ionicons 
                name={"md-skip-forward"}
                size={32}
                color="#22BAD9"
                onPress={this.skipForward}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpLink}>
              <TypeWriter
                typing={1}
                style={styles.helpLinkText}
                ref={ref => this.daoText = ref}
                minDelay={50}
                maxDelay={150}
                fixed={true}
                delayMap={delayMap}
                onTyped={this.playOrPauseTyping}
              >{this.daoOfTheDay}</TypeWriter>
            </TouchableOpacity>
            <Ionicons 
              name="md-arrow-down" 
              size={32}
              color="#22BAD9"
              onPress={this.navigateAway}
            />
          </View>
        </ScrollView>
      </View> 
    );
  }
}

export default withNavigationFocus(DaoTextScreen);

_playVoiceOfJesusAkaJoshEsguerra = () => {

};

const delayMap = [
  // increase delay by 1000ms at every semicolon
  { at: ';', delay: 1000 },
]
 
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1f1f1f'
  },  
  contentContainer: {
    flexGrow: 1,
  },
  helpContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
  },
  helpLinkText: {
    color: '#22BAD9',
    fontSize: 20,
    fontFamily: 'smite',
  }
});
