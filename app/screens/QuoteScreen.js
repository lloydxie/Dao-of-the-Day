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
      // this.daoText.fadeIn(2000)
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }

  navigateBack = () => {
    setTimeout(() => {this.props.navigation.navigate('Home')}, 500)
    this.setState({isExitingScreen: true})
  }

  navigateToDaoText = () => {
    this.setState({isExitingScreen: true})
    this.props.navigation.navigate('DaoText', { index: this.numberOfTheDay })
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
                animation={this.state.isExitingScreen ? 'fadeOutLeft' : ''}
            >
                {'Chapter ' + this.numberOfTheDay + '\n'}
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
                    animation={this.state.isExitingScreen ? 'fadeOutLeft' : ''}
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
                    animation={this.state.isExitingScreen ? 'fadeOutLeft' : 'pulse'}
                    direction='normal'
                    delay='900'
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
                    animation={this.state.isExitingScreen ? 'fadeOutLeft' : 'pulse'}
                    direction='normal'
                    delay='1000'
                    useNativeDriver={true}
                >
                    New random passage
                </Animatable.Text>
                <Animatable.Text
                    style={{
                        ...styles.helpLinkText,
                        color: this.state.textColor
                    }}
                    animation={this.state.isExitingScreen ? 'fadeOutLeft' : 'pulse'}
                    direction='normal'
                    delay='1100'
                    useNativeDriver={true}
                    onPress={() => this.navigateBack()}
                >
                    Go back home
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