import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import Lottie from 'lottie-react-native'
import TypeWriter from 'react-native-typewriter';
import AudioServiceSingleton from '../services/AudioService'
import * as Animatable from 'react-native-animatable';
import { DAO_BLUE } from './DaoTextScreen';

import GLOBAL_STATE from '../services/GlobalState';

NUM_COLUMNS = 3;
HEIGHT_IPHONE_X = 896;
WIDTH_IPHONE_X = 414;
const BG_COLOR_1 = '#181818';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  state = {
    speed: 0,
    isExitingScreen: false,
  };

  yinYangFade = new Animated.Value(0)  // Initial value for opacity: 0
  backgroundFade =  new Animated.Value(1)

  constructor() {
    super()
    AnimatedLottie = Animated.createAnimatedComponent(Lottie)
    this.state = {...this.state, ...GLOBAL_STATE.DEFAULT_SETTINGS}
  }

  componentDidMount() {
    this.lottieYinYang.play();
    this.lottieNinja.play();
    AudioServiceSingleton.play(AudioServiceSingleton.initialLoadMap['lily_1.mp3'])
    setTimeout(() => {
      if (!this.state.isExitingScreen) {
        AudioServiceSingleton.play(AudioServiceSingleton.initialLoadMap['typing.mp3'])
      }
    }, 3500)
    
    this.focusListener = this.props.navigation.addListener("willFocus", () => {
      this.setState(
        {
          speed: 0,
          isExitingScreen: false,
        }
      )
      this.yinYangFade = new Animated.Value(0)
      this.backgroundFade = new Animated.Value(1)
    });
  }

  componentWillMount() {
    GLOBAL_STATE.initializeStorageTriggers(this, this.fadeInYinYangLottie)
  }

  componentWillUnmount() {
    this.focusListener.remove();
    GLOBAL_STATE.unloadStorageTriggers(this)
  }


  playYinYangAnimation = () => {
    this.lottieYinYang.play()
    this.setState({speed: .6})
  }

  fadeInYinYangLottie = () => {
    setTimeout(() => {
      if (this.state.isFirstAppLoad) {
        this.playYinYangAnimation()
      }
      Animated.timing(                  // Animate over time
        this.yinYangFade,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 1500,              // Make it take a while
        }
      ).start();
    }, 1000)
  }
  

  navigateAway() {
    if (!this.state.isExitingScreen) {
      this.setState({isExitingScreen: true})
      Animated.timing(                  // Animate over time
        this.backgroundFade,            // The animated value to drive
        {
          toValue: 0,                   // Animate to opacity: 0 (opaque)
          duration: 500,              // Make it take a while
        }
      ).start()
      index = Math.floor(Math.random() * 81)
      AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
      
      setTimeout(() => {
        let nextScreen = this.state.isFirstAppLoad ? 'Intro' : 'Quote'
        this.props.navigation.navigate(nextScreen, { index: index })
        GLOBAL_STATE.updateSetting(this, 'isFirstAppLoad', false)
      }, 500)
    }
  }

  render() {
    return (
      <Animated.View
        style={{
          ...styles.container,
          backgroundColor: '#ffffff',
          opacity: this.backgroundFade,
        }}
      >
        <ScrollView 
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          decelerationRate='fast'
          snapToInterval={3}
          snapToAlignment={'center'}
        >
          <View style={styles.header}>
            <Animatable.Text
              style={{
                ...styles.title,
                marginTop: 50 * (Dimensions.get('window').height / HEIGHT_IPHONE_X)
              }}
              animation='zoomIn'
              direction='alternate'
              delay={250}
              duration={1500}
              useNativeDriver={true}
            >wiser each</Animatable.Text>
            <View style={styles.headerRow}>
              <Animatable.Text
                style={styles.title}
                animation='zoomIn'
                direction='alternate'
                delay={250}
                duration={1500}
                useNativeDriver={true}
              >da</Animatable.Text>
              <TouchableOpacity onPress={this.playYinYangAnimation}
                activeOpacity={0.4}
              >
                <Animated.View style={{
                  opacity: this.yinYangFade,
                }}>
                  <Lottie
                    ref={animation => {
                      this.lottieYinYang = animation;
                    }}
                    source={require('../assets/lottie/yin_yang.json')}
                    speed={this.state.speed}
                    style={styles.lottieYinYang}
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={120}
              maxDelay={200}
              initialDelay={2500}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >{this.state.isFirstAppLoad ? `Welcome, fellow adventurer!` : `Begin with intention yet again.`}
          </TypeWriter>
          <View style={styles.lottieNinja}>
            <Lottie
              ref={animation => {
                this.lottieNinja = animation;
              }}
              style={styles.lottieNinja}
              source={require('../assets/lottie/ninja.json')}
              onPress={() => this.lottieNinja.play()}
            />
          </View>
        </ScrollView>
        <Animatable.Text
          animation='fadeIn'
          iterationCount='infinite'
          direction='alternate'
          delay={0}
          iterationDelay={250}
          useNativeDriver={true}
          style={styles.beginReading}
          onPress={() => this.navigateAway()}
        >
          start reading
        </Animatable.Text>
      </Animated.View>
    );
  }
}

let delayMap = [
  { at: ' ', delay: 150 }
]

// for ipads
const windowWidth = Dimensions.get('window').width > 900 ? 700 : Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daoNumber: {
    color: '#ffffff',
    fontSize: 20 * (windowWidth / WIDTH_IPHONE_X),
    fontWeight: 'bold'
  },
  title: {
    fontSize: 52 * (windowWidth / WIDTH_IPHONE_X),
    color: '#181818',
    fontFamily: 'dreamOrphans',
  },
  title2: {
    fontSize: 24 * (windowWidth / WIDTH_IPHONE_X),
    color: '#181818',
    fontFamily: 'smite',
    marginTop: '15%'
  },
  lottieNinja: {
    width: 250 * (windowWidth / WIDTH_IPHONE_X),
    height: 250 * (windowWidth / WIDTH_IPHONE_X),
    aspectRatio: 1,
    marginTop: '-3%'
  },
  lottieYinYang: {
    width: 50 * (windowWidth / WIDTH_IPHONE_X),
    height: 50 * (windowWidth / WIDTH_IPHONE_X),
    aspectRatio: 2,
    marginLeft: '-9%',
    marginTop: '3.5%',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    width: windowWidth / 3.5,
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  beginReading: {
    fontSize: 42 * (windowWidth / WIDTH_IPHONE_X),
    fontFamily: 'dreamOrphans',
    color: DAO_BLUE,
    position: 'absolute',
    bottom: '7%'
  }
});
