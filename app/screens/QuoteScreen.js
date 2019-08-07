import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AudioServiceSingleton from '../services/AudioService'

import GLOBAL_STATE from '../services/GlobalState';

const DAO_BLUE = "#22BAD9";
const BG_COLOR_1 = '#1f1f1f';
const BG_COLOR_2 = '#fff';
const BG_COLOR_3 = 'black';
const TEXT_COLOR_1 = DAO_BLUE;
const TEXT_COLOR_2 = 'black';
const TEXT_COLOR_3 = '#fff';

const HEIGHT_IPHONE_X = 896;
const WIDTH_IPHONE_X = 414;

const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity)

export default class QuoteScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isExitingScreen: false,
    backgroundColor: BG_COLOR_1,
    textColor: TEXT_COLOR_1,
  }

  constructor() {
    super()
    this.state = {...this.state, ...GLOBAL_STATE.DEFAULT_SETTINGS}
  }

  componentWillMount() {
    GLOBAL_STATE.initializeStorageTriggers(this, this.reinitializeText)
    this.numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 81));
    this.reinitializeText()
  }

  reinitializeText = () => {
    this.numberOfTheDay = this.props.navigation.getParam('index', this.numberOfTheDay)
    this.daoOfTheDay = GLOBAL_STATE.TRANSLATIONS[this.state.translationIndex - 1][this.numberOfTheDay].title
    thirdLastOccurenceIndex = this.daoOfTheDay.lastIndexOf('\n', (this.daoOfTheDay.lastIndexOf('\n', this.daoOfTheDay.lastIndexOf('\n')-1) -1))
    this.quote = this.daoOfTheDay.substring(thirdLastOccurenceIndex + 1)
    this.setState({isExitingScreen: false})
  }

  componentDidMount() {
    setTimeout(() => {
      if (!this.state.isExitingScreen) {
        // AudioServiceSingleton.play(soundObject)
      }
    }, 2000)
  }

  componentWillUnmount() {
    GLOBAL_STATE.unloadStorageTriggers(this)
  }

  navigateBack = () => {
    setTimeout(() => {this.props.navigation.navigate('Home')}, 1000)
    this.setState({isExitingScreen: true})
  }

  navigateToDaoText = () => {
    this.setState({isExitingScreen: true})
    AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['lily_1.mp3'])
    setTimeout(() => this.props.navigation.navigate('DaoText', {index: this.numberOfTheDay}), 1000)
  }

  navigateToContents() {
    this.setState({isExitingScreen: true})
    setTimeout(() => this.props.navigation.navigate('Contents', {index: this.numberOfTheDay}), 1000)
  }

  newPassage = () => {
    // fade out old quote 
    this.setState({isExitingScreen: true})


    // fade in new one
    setTimeout(() => {
      this.numberOfTheDay = Math.floor(Math.random() * 81)
      this.daoOfTheDay = GLOBAL_STATE.TRANSLATIONS[this.state.translationIndex - 1][this.numberOfTheDay].title
      thirdLastOccurenceIndex = this.daoOfTheDay.lastIndexOf('\n', (this.daoOfTheDay.lastIndexOf('\n', this.daoOfTheDay.lastIndexOf('\n')-1) -1))
      this.quote = this.daoOfTheDay.substring(thirdLastOccurenceIndex + 1)
      this.setState({isExitingScreen: false})
    }, 1000)
  }

  capitalize(str){
    return str.charAt().toUpperCase() + str.slice(1);
  }

  render() {
    handleViewRef = ref => this.view = ref;

    fadeOut = () => this.view.fadeOut(1500).then()
    return (
      <View style={{
        ...styles.container,
        backgroundColor: this.state.backgroundColor
      }}>
          <View style={{
            ...styles.helpContainer,
            backgroundColor: this.state.backgroundColor
          }}>
            <AnimatableTouchableOpacity
              style={{
                position: 'absolute',
                top: '7%',
                left: '5%',
              }}
              animation={this.state.isExitingScreen ? 'fadeOutLeftBig' : 'fadeInLeftBig'}
              direction='normal'
              duration={1000}
              useNativeDriver={true}
              onPress={() => this.navigateToDaoText()}
            >
              <Animatable.Text
                  style={{
                      ...styles.helpLinkText,
                      color: this.state.textColor,
                      ...styles.actionsContainer,
                  }}
              >
                  {`Continue
Reading...`}
              </Animatable.Text>
            </AnimatableTouchableOpacity> 
            <AnimatableTouchableOpacity
              style={{
                position: 'absolute',
                ...styles.actionsContainer,
                top: '7.4%',
                right: '5%'
              }}
              animation={this.state.isExitingScreen ? 'fadeOutRightBig' : 'fadeInRightBig'}
              direction='normal'
              duration={1000}
              useNativeDriver={true}
              onPress={() => this.newPassage()}
            >
            <Animatable.Text
                style={{
                    ...styles.helpLinkText,
                    color: this.state.textColor,
                    ...styles.actionsContainer,
                }}
            >
                New Passage
            </Animatable.Text>
            </AnimatableTouchableOpacity> 
            <AnimatableTouchableOpacity
              style={{
                position: 'absolute',
                ...styles.actionsContainer,
                bottom: '5%',
                left: '5%'
              }}
              animation={this.state.isExitingScreen ? 'fadeOutLeftBig' : 'fadeInLeftBig'}
              direction='normal'
              duration={1000}
              useNativeDriver={true}
              onPress={() => this.navigateBack()}
            >
            <Animatable.Text
                style={{
                    ...styles.helpLinkText,
                    color: this.state.textColor,
                    ...styles.actionsContainer,
                }}
            >
                Go Back Home
            </Animatable.Text>
            </AnimatableTouchableOpacity> 
            <AnimatableTouchableOpacity
              style={{
                position: 'absolute',
                ...styles.actionsContainer,
                bottom: '5%',
                right: '5%'
              }}
              animation={this.state.isExitingScreen ? 'fadeOutRightBig' : 'fadeInRightBig'}
              direction='normal'
              duration={1000}
              useNativeDriver={true}
              onPress={() => this.navigateToContents()}
            >
            <Animatable.Text
                style={{
                    ...styles.helpLinkText,
                    color: this.state.textColor,
                    ...styles.actionsContainer,
                }}
            >
                Select Passage
            </Animatable.Text>
            </AnimatableTouchableOpacity> 
            <Animatable.Text 
                style={{
                    ...styles.helpLinkText,
                    color: this.state.textColor,
                    marginBottom: '10%',
                }}
                animation={this.state.isExitingScreen ? 'fadeOutLeftBig' : 'fadeInRightBig'}
            >
                {'Chapter ' + (this.numberOfTheDay+1) + '\n'}
            </Animatable.Text>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={this.fadeOut}
            >
                <Animatable.Text 
                    style={{
                    ...styles.helpLinkText,
                    color: this.state.textColor
                    }}
                    ref={this.handleViewRef}
                    animation={this.state.isExitingScreen ? 'fadeOutLeftBig' : 'fadeInRightBig'}
                    direction='alternate'
                >
                    {this.capitalize(this.quote) + '\n                        – Lao Tzu'}
                </Animatable.Text>
            </TouchableOpacity>
            <View
              style={{
                ...styles.actionsContainer
              }}
            >
            </View>
          </View>
      </View> 
    );
  }
}

// for ipads
const windowWidth = Dimensions.get('window').width > 900 ? 700 : Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  
  helpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpLinkText: {
    fontSize: 23 * (windowWidth / WIDTH_IPHONE_X),
    fontFamily: 'smite',
  },
  actionsContainer: {
    opacity: 0.5
  },
  chapterTitle: {
    fontSize: 36 * (windowWidth / WIDTH_IPHONE_X),
    fontFamily: 'smite',
  },
});