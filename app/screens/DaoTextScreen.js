import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import TypeWriter from 'react-native-typewriter';
import AudioServiceSingleton from '../services/AudioService'
import { Ionicons } from '@expo/vector-icons';
import * as Brightness from 'expo-brightness';
import * as Animatable from 'react-native-animatable';

import GLOBAL_STATE from '../services/GlobalState';

const HIGH = 'HIGH';
const MUTE = 'MUTE';
export const DAO_BLUE = "#22BAD9";
const BG_COLOR_1 = '#1f1f1f';
const BG_COLOR_2 = '#ffffff';
const BG_COLOR_3 = 'black';
const TEXT_COLOR_1 = DAO_BLUE;
const TEXT_COLOR_2 = 'black';
const TEXT_COLOR_3 = '#ffffff';

const HEIGHT_IPHONE_X = 896;
const WIDTH_IPHONE_X = 414;

const B = (props) => 
  <Text 
    style={{
      fontSize: 20 * (windowWidth / WIDTH_IPHONE_X),
      fontWeight: 'bold'
    }}>
    {props.children}
  </Text>

const MIN_DELAY = {
  'x1': 80,
  'x2': 50,
  'x3': 30,
}

const MAX_DELAY = {
  'x1': 200,
  'x2': 150,
  'x3': 50,
}

class DaoTextScreen extends React.Component {
  constructor() {
    super()
    state = {
      isExitingScreen: false,
      showAll: false,
      backgroundColor: BG_COLOR_1,
      textColor: TEXT_COLOR_1,
      isTypingAudio: false,
      paused: false,
      dummy: false,
    }

    this.state = {...state, ...GLOBAL_STATE.DEFAULT_SETTINGS}
  }

  volumeLevelOptions = {
    HIGH: 'md-volume-high',
    MUTE: 'md-volume-mute'
  }

  componentWillMount() {
    GLOBAL_STATE.initializeStorageTriggers(this, this.reinitializeText)
    this.numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 81));
    this.reinitializeText()
    AnimatableIonicons = Animatable.createAnimatableComponent(Ionicons)
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
    this.blurAway = this.props.navigation.addListener("willBlur", () => {
      AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
      this.setState({paused: true})
    });

    this.oldBrightness = Brightness.getBrightnessAsync()
    this.brightnessValue = 0
    this.interval = setInterval(() => this.increaseBrightness(), 100);

    isCurrentlyPlayingMusic = await this.checkIfMusicIsPlaying()
    if (!isCurrentlyPlayingMusic) {
      soundObject = await this.loadAudioFile(this.numberOfTheDay)
      AudioServiceSingleton.play(soundObject)
    }

    this.reinitializeText()
    this.setState({dummy: true})
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

  reinitializeText = () => {
      if (this.daoText) {
        this.setState({paused: false})
        this.restartTyping(this.daoText)
      }
      this.numberOfTheDay = this.props.navigation.getParam('index', this.numberOfTheDay)
      this.daoOfTheDay = GLOBAL_STATE.TRANSLATIONS[this.state.translationIndex - 1][this.numberOfTheDay].title
      thirdLastOccurenceIndex = this.daoOfTheDay.lastIndexOf('\n', (this.daoOfTheDay.lastIndexOf('\n', this.daoOfTheDay.lastIndexOf('\n')-1) -1))
      this.quote = this.daoOfTheDay.substring(thirdLastOccurenceIndex + 1)
      this.daoOfTheDay = this.daoOfTheDay.substring(0, thirdLastOccurenceIndex + 1)
  }

  componentWillUnmount() {
    GLOBAL_STATE.unloadStorageTriggers(this)

    this.blurAway.remove()
  }

  navigateAway() {
    this.setState({isExitingScreen: true})
    AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
    this.props.navigation.navigate('Quote', {index: this.numberOfTheDay})
  }

  increaseBrightness() {
    if (this.brightnessValue > 0.99) {
      this.brightnessValue = this.oldBrightness
      clearInterval(this.interval)
      return
    }
    else {
      this.brightnessValue += 0.05
    }
    Brightness.setBrightnessAsync(this.brightnessValue)
  }

  playOrPauseTypingAudio = (token) => {
    if (this.state.typingSpeed == 'x1' && !this.state.paused) {
      if (token == '\n') {
        AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
        // this.setState({isTypingAudio: false})
      }
      else {
        // use state to store if already playing so that it doesn't play the first 2 seconds every damn character
        AudioServiceSingleton.play(AudioServiceSingleton.initialLoadMap['typing.mp3'])
        // this.setState({isTypingAudio: true})
      }
    }
  }

  flashChineseFengShui = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // this.setState({showChineseText: true})
    }
    else {
    }
  }
  
  skipForward() {
    this.setState({showAll: true})
    AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
  }

  restartTyping(daoText) {
    if (this.state.showAll) {
      this.setState({showAll: false})
    }
    else {
      daoText.setState({visibleChars: 0})
    }
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
    return (
      <View style={{
        ...styles.container,
        backgroundColor: this.state.backgroundColor
      }}>
        <View style={styles.titleView}>
          <TouchableOpacity
            style={{
              ...styles.iconContainer,
              left: 28 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
              top: -5 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
              position: "absolute"
            }}
          >
            <Ionicons 
              name="md-arrow-back" 
              color={this.state.textColor}
              onPress={() => this.navigateAway()}
              style={{
                ...styles.icon,
                fontSize: 36 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...styles.chapterTitle,
              color: this.state.textColor
            }}
          >{'Chapter ' + (this.numberOfTheDay+1) + '\n'}</Text>
        </View>
        <View
          style={styles.controlsHeader}
        >
          <TouchableOpacity
            style={{
              ...styles.iconContainer
            }}
            onPress={() => this.restartTyping(this.daoText)}
          >
            <AnimatableIonicons
              animation='flash'
              delay={700}
              useNativeDriver={true}
              name={"md-skip-backward"}
              color={this.state.textColor}
              style={{
                ...styles.icon
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.iconContainer
            }}
            onPress={() => {
              GLOBAL_STATE.toggleSetting(this, 'paused')
              AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
            }}
          >
            <AnimatableIonicons
              animation='flash'
              delay={600}
              useNativeDriver={true}
              name={this.state.paused ? 'md-play' : 'md-pause'}
              color={this.state.textColor}
              style={{
                ...styles.icon
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.iconContainer
            }}
            onPress={() => this.toggleTypingSpeed()}
          >
            <Animatable.Text
              animation='flash'
              delay={700}
              useNativeDriver={true}
              style={{
                ...styles.icon,
                color: this.state.textColor
              }}
            >{this.state.typingSpeed}</Animatable.Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.iconContainer
            }}
            onPress={() => this.skipForward()}
          >
            <AnimatableIonicons
              animation='flash'
              delay={900}
              useNativeDriver={true}
              name={"md-skip-forward"}
              color={this.state.textColor}
              style={{
                ...styles.icon,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.iconContainer
            }}
            onPress={() => this.props.navigation.navigate('Translation')}
          >
            <AnimatableIonicons
              animation='flash'
              delay={1100}
              useNativeDriver={true}
              name={"ios-book"}
              color={this.state.textColor}
              style={{
                ...styles.icon,
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          ref={ref => this._scrollView = ref}
          indicatorStyle='white'
        >
          <View style={{
            ...styles.helpContainer,
            backgroundColor: this.state.backgroundColor
          }}>
            {
              this.state.showChineseText ? 
              <Text 
                style={{
                  ...styles.helpLinkText,
                  color: this.state.textColor
                }}
              >
                {chineseText}
              </Text> :
              (
                !this.state.showAll ? <TypeWriter
                  typing={1}
                  style={{
                    ...styles.helpLinkText,
                    color: this.state.textColor
                  }}
                  ref={ref => this.daoText = ref}
                  minDelay={MIN_DELAY[this.state.typingSpeed]}
                  maxDelay={MAX_DELAY[this.state.typingSpeed]}
                  initialDelay={900}
                  fixed={true}
                  delayMap={delayMap}
                  onTyped={this.playOrPauseTypingAudio}
                  speed={this.state.typingSpeed}
                  paused={this.state.paused}
                >{this.daoOfTheDay}<B>{this.quote}</B></TypeWriter> : 
                <Text 
                  style={{
                    ...styles.helpLinkText,
                    color: this.state.textColor
                  }}
                >
                  {this.daoOfTheDay}<B>{this.quote}</B>
                </Text>
              )
            }
          </View>
        </ScrollView>
      </View> 
    );
  }

  toggleTypingSpeed() {
    if (this.state.typingSpeed == 'x3') {
      GLOBAL_STATE.updateSetting(this, 'typingSpeed', 'x1')  
    }
    else if (this.state.typingSpeed == 'x1') {
      GLOBAL_STATE.updateSetting(this, 'typingSpeed', 'x2') 
      AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3']) 
    }
    else {
      GLOBAL_STATE.updateSetting(this, 'typingSpeed', 'x3')  
      AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
    }
  }
}

export default withNavigationFocus(DaoTextScreen);

_playVoiceOfJesusAkaJoshEsguerra = () => {

};

const delayMap = [
  // increase delay by 1000ms at every semicolon
  { at: ';', delay: 500 },
]

// for ipads
const windowWidth = Dimensions.get('window').width > 900 ? 700 : Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1
  },  
  helpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpLinkText: {
    fontSize: 20 * (windowWidth / WIDTH_IPHONE_X),
    // fontFamily: 'smite',
    // justifyContent: 'center',
  },
  controlsHeader: {
    // marginTop: Dimensions.get('window').height / 10,
    marginBottom: Dimensions.get('window').height / 20,
    flexDirection: 'row',
    // backgroundColor: 'light'
  },
  icon: {
    fontSize: 28 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
  },
  iconContainer: {
    opacity: 0.6,
    flexBasis: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterTitle: {
    fontSize: 36 * (windowWidth / WIDTH_IPHONE_X),
    fontFamily: 'smite',
    opacity: 0.7
  },
  titleView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height / 15,
  }
});