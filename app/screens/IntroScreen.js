'use strict';
import React, {Component} from 'react';
import TypeWriter from 'react-native-typewriter';
import * as Animatable from 'react-native-animatable';
import Lottie from 'lottie-react-native'

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
} from 'react-native';

const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity)

const introLines = [
  'As we grow older we grow both more foolish and wiser at the same time.\n             - Anonymous',
  "Welcome to Wiser Each Dao. Inspired by the life-altering reading of the Dao De Ching, this app is an interactive experience to help bring the most out of Lao Tzu's timeless wisdom.",
  "Lao Tzu was a well-esteemed royal court advisor and philosopher in Ancient China. The Dao De Ching is like a bible for the Hero's Journey. ",
  "The best teachers are the ones who don’t just tell you what to do, but make you seek the answers yourself. They give you the space to find your own way. And that is precisely the method of Lao Tzu.",
  "Online and social media gurus can give you all the greatest advice in the world – but it will do nothing for you until you start doing things your own way.",
  "It is a waste of time to read the Dao De Ching when you have no patience for it. This app will help cultivate that patience whilst reading it because of a typing effect that acts as a reading pacer.",
  "These are dense, mysterious words. This is not to be read the way you read a book. If anything, it is more akin to reading a poem. It is paradoxical wisdom that hopefully leaves you pondering each line.",
  "There is an option to switch between translations – if vague paradoxes find you frustrating, there is a 'No Bullshit' modern interpretation by Hogan.",
  "Our best advice is to use it in the nighttime with headphones or speakers.",
  "Now fellow adventurer, embark on your own journey toward that which you seek...\n\nAnd don't forget to enjoy it every step of the way."
]

const DAO_BLUE = "#22BAD9";
const BG_COLOR_1 = '#181818';
WIDTH_IPHONE_X = 414;

export default class IntroScreen extends Component {
  state = {
    introLineIndex: 0
  };
  
  constructor(){
    super()
    this.finishedTyping = false
    this.hasRefreshed = false
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <View
        style={styles.container}
      >
          <Text
            style={styles.title}
          >
            {"Intro"}
          </Text>
          <Text
            style={styles.subtitle}
          >
            {(this.state.introLineIndex + 1) + " / 10"}
          </Text>
          <AnimatableTouchableOpacity
            direction={this.finishedTyping ? 'alternate' : 'normal'}
            iterationCount={this.finishedTyping ? 'infinite' : 1}
            duration={this.finishedTyping ? 1000 : 800}
            iterationDelay={250}
            useNativeDriver={true}
            style={styles.textContainer}
            ref={ref => this.view = ref}
            onPress={() => this.fadeOutLine()}
          >
            <TypeWriter
                ref={ref => this.daoText = ref}
                typing={1}
                style={styles.text}
                minDelay={30}
                maxDelay={50}
                initialDelay={800}
                delayMap={delayMap}
                fixed={true}
                onTypingEnd={() => this.onTypingEnd()}
                >
              {introLines[this.state.introLineIndex]}
            </TypeWriter>
          </AnimatableTouchableOpacity>
          {
            this.state.introLineIndex == 2 ? <Image style={{width: '15%', height: '15%', top: '26%', position: 'absolute'}} source={require('../assets/images/lao_tzu.jpg')} /> :
            this.state.introLineIndex == 1 ? 
              <Lottie
                autoPlay={true}
                source={require('../assets/lottie/panda.json')}
                speed={0.8}
                style={styles.lottieYinYang}
              /> : 
            this.state.introLineIndex == 4 ? 
              <Lottie
                autoPlay={true}
                source={require('../assets/lottie/headphones.json')}
                speed={0.8}
                style={styles.lottieYinYang}
              /> : 
              this.state.introLineIndex == 8 ?
              <Lottie
                autoPlay={true}
                source={require('../assets/lottie/earphones.json')}
                speed={0.8}
                style={styles.lottieYinYang}
              /> : null
          }
      </View>
    );
  }

  fadeOutLine() {
    if (this.finishedTyping) {
      this.hasRefreshed = false
      this.finishedTyping = false
      this.view.fadeOut(200).then(() => {
        if (this.state.introLineIndex < 9) {
          this.loadNextLine()          
        }
        else {
          this.props.navigation.navigate('Quote')
        }
      })
    }
  }

  loadNextLine() {
    this.daoText.setState({visibleChars: 0})
    this.setState({introLineIndex: this.state.introLineIndex + 1})
    this.view.fadeIn(500).then(() => {
    })
  }

  onTypingEnd() {
    this.finishedTyping = true
    if (!this.hasRefreshed) {
      setTimeout(() => {
        if (this.finishedTyping && this.state.introLineIndex == 0) {
          this.view.bounce(1000)
        }
        this.setState({dummy: true})
        this.hasRefreshed = true   
      }, 2000);
    }
  }
}

let delayMap = [
  { at: '–', delay: 500 },
]

// for ipads
const windowWidth = Dimensions.get('window').width > 900 ? 700 : Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818'
  },
  text: {
    fontSize: 26 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    fontFamily: 'smite',
    color: DAO_BLUE
  },
  title: {
    fontSize: 38 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    fontFamily: 'smite',
    position: 'absolute',
    top: '12%',
    color: DAO_BLUE
  },
  subtitle: {
    fontSize: 22 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    fontFamily: 'smite',
    position: 'absolute',
    top: '18%',
    color: DAO_BLUE
  },
  textContainer: {
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  lottieYinYang: {
    width: 50 * (windowWidth / WIDTH_IPHONE_X),
    height: 50 * (windowWidth / WIDTH_IPHONE_X),
    aspectRatio: 2,
  },
})