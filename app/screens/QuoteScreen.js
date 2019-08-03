import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions
} from 'react-native';
import { scrapedDao } from './content/daoDeChing'
import * as Animatable from 'react-native-animatable';

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
    GLOBAL_STATE.initializeStorageTriggers(this)
    this.numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 81));
    this.reinitializeText()
  }

  reinitializeText() {
    this.numberOfTheDay = this.props.navigation.getParam('index', this.numberOfTheDay)
    this.daoOfTheDay = GLOBAL_STATE.TRANSLATIONS[this.state.translationIndex - 1][this.numberOfTheDay].title
    thirdLastOccurenceIndex = this.daoOfTheDay.lastIndexOf('\n', (this.daoOfTheDay.lastIndexOf('\n', this.daoOfTheDay.lastIndexOf('\n')-1) -1))
    this.quote = this.daoOfTheDay.substring(thirdLastOccurenceIndex + 1)
  }

  async componentDidMount() {
    setTimeout(() => {
      if (!this.state.isExitingScreen) {
        // AudioServiceSingleton.play(soundObject)
      }
    }, 2000)

    const { navigation } = this.props;

    this.focusListener = navigation.addListener("willFocus", () => {
      this.setState({isExitingScreen: false})
      this.reinitializeText()
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
    GLOBAL_STATE.unloadStorageTriggers(this)
  }

  navigateBack = () => {
    setTimeout(() => {this.props.navigation.navigate('Home')}, 1000)
    this.setState({isExitingScreen: true})
  }

  navigateToDaoText = () => {
    this.setState({isExitingScreen: true})
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
      this.daoOfTheDay = scrapedDao[this.numberOfTheDay].title
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
            <Animatable.Text 
                style={{
                    ...styles.helpLinkText,
                    color: this.state.textColor
                }}
                animation={this.state.isExitingScreen ? 'fadeOutLeft' : 'fadeInRight'}
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
                    animation={this.state.isExitingScreen ? 'fadeOutLeft' : 'fadeInRight'}
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
                <Animatable.Text
                    style={{
                        ...styles.helpLinkText,
                        color: this.state.textColor
                    }}
                    animation={this.state.isExitingScreen ? 'fadeOutLeft' : 'fadeInRight'}
                    direction='normal'
                    duration={1000}
                    delay={this.state.isExitingScreen ? 0: 900}
                    useNativeDriver={true}
                    onPress={() => this.navigateToDaoText()}
                >
                    Continue reading...
                </Animatable.Text>
                <Animatable.Text
                    style={{
                        ...styles.helpLinkText,
                        color: this.state.textColor
                    }}
                    animation={this.state.isExitingScreen ? 'fadeOutLeft' : 'fadeInRight'}
                    direction='normal'
                    duration={1000}
                    delay={this.state.isExitingScreen ? 0: 1100}
                    useNativeDriver={true}
                    onPress={() => this.newPassage()}
                >
                    New random passage
                </Animatable.Text>
                <Animatable.Text
                    style={{
                        ...styles.helpLinkText,
                        color: this.state.textColor
                    }}
                    animation={this.state.isExitingScreen ? 'fadeOutLeft' : 'fadeInRight'}
                    direction='normal'
                    duration={1000}
                    delay={this.state.isExitingScreen ? 0: 1300}
                    useNativeDriver={true}
                    onPress={() => this.navigateBack()}
                >
                    Go back home
                </Animatable.Text>
                <Animatable.Text
                    style={{
                        ...styles.helpLinkText,
                        color: this.state.textColor
                    }}
                    animation={this.state.isExitingScreen ? 'fadeOutLeft' : 'fadeInRight'}
                    direction='normal'
                    duration={1000}
                    delay={this.state.isExitingScreen ? 0: 1500}
                    useNativeDriver={true}
                    onPress={() => this.navigateToContents()}
                >
                    Table of Contents
                </Animatable.Text>
            </View>
          </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },  
  helpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpLinkText: {
    fontSize: 23 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    fontFamily: 'smite',
  },
  icon: {
    fontSize: 28 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
  },
  actionsContainer: {
    // opacity: 0.5,
    flexBasis: '33.33%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  chapterTitle: {
    fontSize: 36 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    fontFamily: 'smite',
  },
});