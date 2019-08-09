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
  Image
} from 'react-native';

const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity)

const introLines = [
  'As we grow older we grow both more foolish and wiser at the same time.\n             - Anonymous',
  "Welcome to Wiser Each Dao.\nInspired by the life-altering reading of the Dao De Jing, this app is an interactive experience to help bring the most out of Lao Tzu's timeless wisdom.",
  "Lao Tzu was a well-esteemed royal court advisor and philosopher in Ancient China. A little before Buddha was born supposedly. The Dao De Jing is the most translated work in the world second to the Bible. ",
  "The best teachers are the ones who don’t just tell you what to do, but make you seek the answers yourself. They give you the space to find your own way. And that is precisely the method of Lao Tzu.",
  "Online and social media gurus can give you all the greatest advice in the world – but it will do nothing for you until you start doing things your own way.",
  "It is a waste of time to read the Dao De Jing when you have no patience for it.\nThis typing effect can help cultivate that patience by acting as a reading pacer.",
  "It is paradoxical wisdom that hopefully leaves you pondering each line.\nNot to be read like a book, but if anything, it is more akin to reading poetry.",
  "There is an option to switch between translations – if vague paradoxes find you frustrating, there is a 'No Bullshit' modern interpretation by Hogan.",
  "Our advice is to use it in the nighttime with headphones or speakers.\nBest enjoyed with the lush soundscapes of Debussy that come from the Ether, is it not?",
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
        <Image
          source={require('../assets/images/starry.jpg')}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            opacity: 0.4,
          }}
          resizeMode="stretch"
        />
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
          {
            this.state.introLineIndex == 2 ? <Image style={{width: '30%', height: '15%', top: '24%', position: 'absolute'}} source={require('../assets/images/lao_tzu.jpg')} /> :
            this.state.introLineIndex == 0 || this.state.introLineIndex == 1 ? 
              <Lottie
                autoPlay={true}
                source={require('../assets/lottie/ninja.json')}
                speed={0.7}
                style={styles.lottiePanda}
              /> :
            this.state.introLineIndex == 9 ? 
              <Lottie
                autoPlay={true}
                source={require('../assets/lottie/panda.json')}
                speed={0.6}
                style={styles.lottiePanda}
              /> : 
            this.state.introLineIndex == 5 ? 
              <Lottie
                autoPlay={true}
                source={require('../assets/lottie/headphones.json')}
                speed={0.5}
                style={styles.lottieHeadphones}
              /> : 
              this.state.introLineIndex == 8 ?
              <Lottie
                autoPlay={true}
                source={require('../assets/lottie/earphones.json')}
                speed={0.5}
                style={styles.lottieEarphones}
              /> : null
          }
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
    fontSize: 26 * (windowWidth / WIDTH_IPHONE_X),
    fontFamily: 'smite',
    color: DAO_BLUE
  },
  title: {
    fontSize: 38 * (windowWidth / WIDTH_IPHONE_X),
    fontFamily: 'smite',
    position: 'absolute',
    top: '12%',
    color: DAO_BLUE
  },
  subtitle: {
    fontSize: 22 * (windowWidth / WIDTH_IPHONE_X),
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
    marginTop: '10%'
  },
  lottiePanda: {
    width: '65%',
    height: '65%',
    position:'absolute',
    bottom: '29%',
    left: '12.5%'
  },
  lottieHeadphones: {
    width: '65%',
    height: '65%',
    position:'absolute',
    bottom: '8%',
    left: '11%'
  },
  lottieEarphones: {
    width: '55%',
    height: '55%',
    position:'absolute',
    bottom: '16%',
    left: '15%'
  },
})