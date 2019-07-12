import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions
} from 'react-native';
import { scrapedDao, chineseText } from './content/daoDeChing'
import {withNavigationFocus} from 'react-navigation';
import AudioServiceSingleton from '../services/AudioService'
import { Ionicons } from '@expo/vector-icons';
import * as Brightness from 'expo-brightness';

const DAO_BLUE = "#22BAD9";
const BG_COLOR_1 = '#1f1f1f';
const BG_COLOR_2 = '#fff';
const BG_COLOR_3 = 'black';
const TEXT_COLOR_1 = DAO_BLUE;
const TEXT_COLOR_2 = 'black';
const TEXT_COLOR_3 = '#fff';

const HEIGHT_IPHONE_X = 896;
const WIDTH_IPHONE_X = 414;

export default class QuoteScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isExitingScreen: false,
    backgroundColor: BG_COLOR_1,
    textColor: TEXT_COLOR_1,
  }

  componentWillMount() {
    this.numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 81));
    this.daoOfTheDay = scrapedDao[this.numberOfTheDay].title
    thirdLastOccurenceIndex = this.daoOfTheDay.lastIndexOf('\n', (this.daoOfTheDay.lastIndexOf('\n', this.daoOfTheDay.lastIndexOf('\n')-1) -1))
    console.log(thirdLastOccurenceIndex)

    this.quote = this.daoOfTheDay.substring(thirdLastOccurenceIndex)
  }

  async componentDidMount() {
    this.oldBrightness = Brightness.getBrightnessAsync()
    this.brightnessValue = 0
    this.interval = setInterval(() => this.increaseBrightness(), 100);

    setTimeout(() => {
      if (!this.state.isExitingScreen) {
        // AudioServiceSingleton.play(soundObject)
      }
    }, 2000)

    const { navigation } = this.props;

    this.focusListener = navigation.addListener("willFocus", () => {
      // this.daoText.fadeIn(2000)
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }

  navigateAway = () => {
    this.setState({isExitingScreen: true})
    AudioServiceSingleton.unmount(AudioServiceSingleton.backgroundMusicFilesMap[this.keyName])
    AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
    this.props.navigation.navigate('DaoText', { index: index })
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

  render() {
    return (
      <View style={{
        ...styles.container,
        backgroundColor: this.state.backgroundColor
      }}>

          <View style={{
            ...styles.helpContainer,
            backgroundColor: this.state.backgroundColor
          }}>
            <Text 
                style={{
                ...styles.helpLinkText,
                color: this.state.textColor
                }}
            >
                {this.quote}
            </Text>
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
                  fontSize: 36 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
                }}
              />
            </TouchableOpacity>
          </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },  
  scrollContainer: {
  },
  helpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpLinkText: {
    fontSize: 20 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    fontFamily: 'smite',
  },
  icon: {
    fontSize: 28 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
  },
  iconContainer: {
    opacity: 0.5,
    flexBasis: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});