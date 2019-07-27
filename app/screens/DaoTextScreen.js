import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions
} from 'react-native';
import { scrapedDao, chineseText } from './content/daoDeChing'
import {withNavigationFocus} from 'react-navigation';
import TypeWriter from 'react-native-typewriter';
import AudioServiceSingleton from '../services/AudioService'
import { Ionicons } from '@expo/vector-icons';
import * as Brightness from 'expo-brightness';
import * as Animatable from 'react-native-animatable';

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

const B = (props) => 
  <Text 
    style={{
      fontSize: 18 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
      fontFamily: 'dreamOrphans',
    }}>
    {props.children}
  </Text>

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
    showChineseText: false,
    isTypingAudio: false,
    paused: false 
  }

  componentWillMount() {
    this.numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 81));
    this.daoOfTheDay = scrapedDao[this.numberOfTheDay].title
    thirdLastOccurenceIndex = this.daoOfTheDay.lastIndexOf('\n', (this.daoOfTheDay.lastIndexOf('\n', this.daoOfTheDay.lastIndexOf('\n')-1) -1))
    this.quote = this.daoOfTheDay.substring(thirdLastOccurenceIndex + 1)
    this.daoOfTheDay = this.daoOfTheDay.substring(0, thirdLastOccurenceIndex + 1)

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
    this.oldBrightness = Brightness.getBrightnessAsync()
    this.brightnessValue = 0
    this.interval = setInterval(() => this.increaseBrightness(), 100);

    soundObject = await this.loadAudioFile(this.numberOfTheDay)
    setTimeout(() => {
      if (!this.state.isExitingScreen) {
        AudioServiceSingleton.play(soundObject)
      }
    }, 2000)

    setTimeout(() => {
      if (!this.state.isExitingScreen) {
        AudioServiceSingleton.play(AudioServiceSingleton.initialLoadMap['typing.mp3'])
        this.setState({isTypingAudio: true})
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
    this.props.navigation.navigate('Home')
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

  playOrPauseTyping(token) {
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
            onPress={this.slowDown}
          >
            <AnimatableIonicons
              animation='flash'
              delay='500'
              useNativeDriver='true' 
              name={"md-rewind"}
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
            onPress={this.playOrPause}
          >
            <AnimatableIonicons
              animation='flash'
              delay='600'
              useNativeDriver='true' 
              name={this.paused ? 'md-play' : 'md-pause'}
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
            onPress={this.speedUp}
          >
            <AnimatableIonicons
              animation='flash'
              delay='700'
              useNativeDriver='true' 
              name={"md-fastforward"}
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
            onPress={this.changeColorScheme}
          >
            <AnimatableIonicons
              animation='flash'
              delay='800'
              useNativeDriver='true' 
              name={"md-color-palette"}
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
            onPress={this.changeVolume}
          >
            <AnimatableIonicons
              animation='flash'
              delay='900'
              useNativeDriver='true' 
              name={this.volumeLevelOptions[this.state.volumeLevel]} 
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
                  minDelay={50}
                  maxDelay={130}
                  fixed={true}
                  delayMap={delayMap}
                  onTyped={() => this.playOrPauseTyping}
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
  },
  helpLinkText: {
    fontSize: 23 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    fontFamily: 'smite',
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
    flexBasis: '20%',
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