import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { scrapedDao, chineseText } from './content/daoDeChing'
import {withNavigationFocus} from 'react-navigation';
import TypeWriter from 'react-native-typewriter';
import AudioServiceSingleton from '../services/AudioService'
import { Ionicons } from '@expo/vector-icons';
import * as Brightness from 'expo-brightness';
import { TapGestureHandler } from 'react-native-gesture-handler';

const HIGH = 'HIGH';
const MUTE = 'MUTE';
const DAO_BLUE = "#22BAD9";
const BG_COLOR_1 = '#1f1f1f';
const BG_COLOR_2 = '#fff';
const BG_COLOR_3 = 'black';
const TEXT_COLOR_1 = DAO_BLUE;
const TEXT_COLOR_2 = 'black';
const TEXT_COLOR_3 = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },  
  contentContainer: {
    flex: 1,
  },
  helpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpLinkText: {
    fontSize: 20,
    fontFamily: 'smite',
    marginTop: -100
  },
  controlsHeader: {
    marginTop: 100,
    // flex: 1,
    // flexBasis: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems: 'center'
  }
});

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
    isExitingScreen: false,
    showAll: false,
    backgroundColor: BG_COLOR_1,
    textColor: TEXT_COLOR_1,
    showChineseText: false
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

  flashChineseFengShui = () => {
    this.setState({showChineseText: true})
  }
  
  skipForward = () => {
    this.setState({showAll: true})
  }
  
  changeColorScheme = () => {
    if (this.state.backgroundColor == BG_COLOR_1) {
      this.setState({
        backgroundColor: BG_COLOR_2,
        textColor: TEXT_COLOR_2
      })
    }
    else if (this.state.backgroundColor == BG_COLOR_2) {
      this.setState({
        backgroundColor: BG_COLOR_3,
        textColor: TEXT_COLOR_3
      })
    }
    else {
      this.setState({
        backgroundColor: BG_COLOR_1,
        textColor: TEXT_COLOR_1
      })
    }
  }

  render() {
    this.numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 81));
    this.daoOfTheDay = scrapedDao[this.numberOfTheDay].title;

    return (
      <View style={{
        ...styles.container,
        backgroundColor: this.state.backgroundColor
      }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View
            style={styles.controlsHeader}
          >
            <TouchableOpacity>
              <Ionicons 
                name={"md-skip-forward"}
                size={28}
                color={this.state.textColor}
                onPress={this.skipForward}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons 
                name={"md-color-palette"}
                size={28}
                color={this.state.textColor}
                onPress={this.changeColorScheme}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons 
                name={this.volumeLevelOptions[this.state.volumeLevel]} 
                size={28}
                color={this.state.textColor}
                onPress={this.changeVolume}
                style={
                  {marginLeft: this.state.volumeLevel == HIGH ? 0 : 10}
                }
              />
            </TouchableOpacity>
          </View>
          <View style={{
            ...styles.helpContainer,
            backgroundColor: this.state.backgroundColor
          }}>
              <TouchableOpacity
                onPress={this.flashChineseFengShui}
              >
                {
                  !this.state.showAll ? <TypeWriter
                  typing={1}
                  style={{
                    ...styles.helpLinkText,
                    color: this.state.textColor
                  }}
                  ref={ref => this.daoText = ref}
                  minDelay={50}
                  maxDelay={150}
                  fixed={true}
                  delayMap={delayMap}
                  onTyped={this.playOrPauseTyping}
                >{this.daoOfTheDay}</TypeWriter> : 
                <Text 
                  style={{
                    ...styles.helpLinkText,
                    color: this.state.textColor
                  }}
                >
                  {this.daoOfTheDay}
                </Text>
                }
              </TouchableOpacity>
            <Ionicons 
              name="md-arrow-down" 
              size={32}
              color={this.state.textColor}
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