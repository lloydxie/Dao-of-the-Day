import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Modal
} from 'react-native';
import { scrapedDao, chineseText } from './content/daoDeChing'
import { chineseTranslation } from './content/wikiSource'
import { hoganDao } from './content/hoganSource'
import {withNavigationFocus} from 'react-navigation';
import TypeWriter from 'react-native-typewriter';
import AudioServiceSingleton from '../services/AudioService'
import { Ionicons } from '@expo/vector-icons';
import * as Brightness from 'expo-brightness';
import * as Animatable from 'react-native-animatable';
import TranslationScreen from './TranslationScreen'

import GLOBAL_STATE from '../services/GlobalState';

const HIGH = 'HIGH';
const MUTE = 'MUTE';
export const DAO_BLUE = "#22BAD9";
const BG_COLOR_1 = '#1f1f1f';
const BG_COLOR_2 = '#fff';
const BG_COLOR_3 = 'black';
const TEXT_COLOR_1 = DAO_BLUE;
const TEXT_COLOR_2 = 'black';
const TEXT_COLOR_3 = '#fff';

const HEIGHT_IPHONE_X = 896;
const WIDTH_IPHONE_X = 414;

const TRANSLATIONS = [
  hoganDao,
  scrapedDao,
  chineseTranslation,
]

const B = (props) => 
  <Text 
    style={{
      fontSize: 18 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
      fontFamily: 'dreamOrphans',
    }}>
    {props.children}
  </Text>

const MIN_DELAY = {
  'x1': 100,
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
    GLOBAL_STATE.initializeStorageTriggers(this)
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
      this.keyName = Object.keys(backgroundMusicFilesMap)[0];
    }
    else {
      this.keyName = Object.keys(backgroundMusicFilesMap)[0];
    }
    
    if (!AudioServiceSingleton.backgroundMusicFilesMap[this.keyName]) {
      soundObject = await AudioServiceSingleton.load(this.keyName, isLooping);
      AudioServiceSingleton.backgroundMusicFilesMap[this.keyName] = soundObject;
    }

    return AudioServiceSingleton.backgroundMusicFilesMap[this.keyName]
  };

  async componentDidMount() {
    this.blurAway = this.props.navigation.addListener("willBlur", () => {
      this.setState({paused: true})
    });

    this.willFocus = this.props.navigation.addListener("willFocus", () => {
      setTimeout(() => {
         this.reinitializeText()
      }, 50)
    })

    this.oldBrightness = Brightness.getBrightnessAsync()
    this.brightnessValue = 0
    this.interval = setInterval(() => this.increaseBrightness(), 100);

    setTimeout(() => {
      if (!this.state.isExitingScreen) {
        AudioServiceSingleton.play(AudioServiceSingleton.initialLoadMap['typing.mp3'])
        this.setState({isTypingAudio: true})
      }
    }, 5000)

    soundObject = await this.loadAudioFile(this.numberOfTheDay)
    setTimeout(() => {
      if (!this.state.isExitingScreen) {
        AudioServiceSingleton.play(soundObject)
      }
    }, 2000)

    this.reinitializeText()
    this.setState({dummy: true})
  }

  reinitializeText() {
      if (this.daoText) {
        this.restartTyping(this.daoText)
      }
      console.log(this.state.translationIndex)
      this.daoOfTheDay = TRANSLATIONS[this.state.translationIndex - 1][14].title
      thirdLastOccurenceIndex = this.daoOfTheDay.lastIndexOf('\n', (this.daoOfTheDay.lastIndexOf('\n', this.daoOfTheDay.lastIndexOf('\n')-1) -1))
      this.quote = this.daoOfTheDay.substring(thirdLastOccurenceIndex + 1)
      this.daoOfTheDay = this.daoOfTheDay.substring(0, thirdLastOccurenceIndex + 1)
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
    GLOBAL_STATE.unloadStorageTriggers(this)

    this.blurAway.remove()
  }

  navigateAway = () => {
    this.setState({isExitingScreen: true})
    AudioServiceSingleton.unmount(AudioServiceSingleton.backgroundMusicFilesMap[this.keyName])
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

  playOrPauseTypingAudio(token) {
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

  flashChineseFengShui = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // this.setState({showChineseText: true})
    }
    else {
    }
  }
  
  skipForward = () => {
    this.setState({showAll: true})
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
          <Text
            style={{
              ...styles.chapterTitle,
              color: this.state.textColor
            }}
          >{'Chapter ' + this.numberOfTheDay + '\n'}</Text>
        </View>
        <View
          style={styles.controlsHeader}
        >
          <TouchableOpacity
            style={{
              ...styles.iconContainer
            }}
            onPress={this.speedUp}
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
              onPress={() => this.restartTyping(this.daoText)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.iconContainer
            }}
            onPress={this.playOrPause}
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
              onPress={() => GLOBAL_STATE.toggleSetting(this, 'paused')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.iconContainer
            }}
            onPress={this.speedUp}
          >
            <Animatable.Text
              animation='flash'
              delay={700}
              useNativeDriver={true}
              style={{
                ...styles.icon,
                color: this.state.textColor
              }}
              onPress={() => this.toggleTypingSpeed()}
            >{this.state.typingSpeed}</Animatable.Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.iconContainer
            }}
            onPress={this.changeVolume}
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
              onPress={() => this.skipForward()}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.iconContainer
            }}
            onPress={this.changeVolume}
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
              onPress={() => this.props.navigation.navigate('Translation')}
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
                  fixed={true}
                  delayMap={delayMap}
                  onTyped={() => this.playOrPauseTypingAudio}
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
            <TouchableOpacity
              style={{
                ...styles.iconContainer
              }}
            >
              <Ionicons 
                name="md-arrow-down" 
                color={this.state.textColor}
                onPress={this.navigateAway}
                style={{
                  ...styles.icon,
                  marginBottom: '5%',
                  marginTop: '12%',
                  fontSize: 36 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
                }}
              />
            </TouchableOpacity>
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
    }
    else {
      GLOBAL_STATE.updateSetting(this, 'typingSpeed', 'x3')  
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
    fontSize: 20 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
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
    opacity: 0.5,
    flexBasis: '16.66%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterTitle: {
    fontSize: 36 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    fontFamily: 'smite',
  },
  titleView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height / 15,
  }
});