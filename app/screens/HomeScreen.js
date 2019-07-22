import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
  FlatList
} from 'react-native';
import { scrapedDao } from './content/daoDeChing'
import Lottie from 'lottie-react-native'
import TypeWriter from 'react-native-typewriter';
import AudioServiceSingleton from '../services/AudioService'
import * as Animatable from 'react-native-animatable';
import { DAO_BLUE } from './DaoTextScreen';

NUM_COLUMNS = 3;
HEIGHT_IPHONE_X = 896;
WIDTH_IPHONE_X = 414;
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  state = {
    speed: 0,
    yinYangFade: new Animated.Value(0),  // Initial value for opacity: 0
    isExitingScreen: false
  };

  constructor() {
    super()
    console.log(Dimensions.get('window').width)
    AnimatedLottie = Animated.createAnimatedComponent(Lottie)
  }

  async componentDidMount() {
    this.lottieNinja.play();
    this.lottieYinYang.play();
    // AudioServiceSingleton.play(AudioServiceSingleton.initialLoadMap['lily_1.mp3'])
    setTimeout(() => {
      console.log(this.state.isExitingScreen)
      if (!this.state.isExitingScreen) {
        // AudioServiceSingleton.play(AudioServiceSingleton.initialLoadMap['typing.mp3'])
      }
    }, 1250)
    setTimeout(() => {
      Animated.timing(                  // Animate over time
        this.state.yinYangFade,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 2500,              // Make it take a while
        }
      ).start();  
    }, 5000)
  }

  playYinYangAnimation = () => {
    this.setState({speed: .6})
  }

  navigateAway(index) {
    this.setState({isExitingScreen: true})
    AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['lily_1.mp3'])
    AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
    this.props.navigation.replace('Quote', { index: index })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
          decelerationRate='fast'
          snapToInterval={3}
          snapToAlignment={'center'}
        >
          <View style={styles.header}>
            <TypeWriter
              typing={1}
              style={styles.title}
              minDelay={100}
              maxDelay={200}
              delayMap={delayMap}
              fixed={true}
            >Wiser Each Da</TypeWriter>
            <TouchableOpacity onPress={this.playYinYangAnimation}
              style={{
                marginTop: 100 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
              }}
              activeOpacity={0.4}
            >
              <Animated.View style={{
                opacity: this.state.yinYangFade,
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
          <View style={styles.lottieNinja}>
            <Lottie
              ref={animation => {
                this.lottieNinja = animation;
              }}
              style={styles.lottieNinja}
              source={require('../assets/lottie/ninja.json')}
            />
          </View>
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={100}
              maxDelay={200}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
            >Welcome back traveler!</TypeWriter>
          <Animatable.Text
            animation='fadeIn'
            iterationCount='infinite'
            direction='alternate'
            delay='1000'
            useNativeDriver={true}
            style={styles.beginReading}
          >
            start reading
          </Animatable.Text>
        </ScrollView>
      </View>
    );
  }
}

let delayMap = [
  { at: ' ', delay: 250 }
]

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  daoNumber: {
    color: '#fff',
    fontSize: 20 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    fontWeight: 'bold'
  },
  grid: {
    backgroundColor: '#22BAD9',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    marginVertical: 30 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
    height: Dimensions.get('window').width / (NUM_COLUMNS * 1.5),
    width: Dimensions.get('window').width / (NUM_COLUMNS * 1.5),
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ffe'
  },
  title: {
    fontSize: 32 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    marginTop: 100 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
    color: '#1f1f1f',
    fontFamily: 'dreamOrphans',
  },
  title2: {
    fontSize: 32 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    marginTop: 100 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
    color: '#1f1f1f',
    fontFamily: 'dreamOrphans',
  },
  lottieNinja: {
    width: 300 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    height: 300 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    aspectRatio: 1
  },
  lottieYinYang: {
    width: 50 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    height: 50 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    aspectRatio: 1.05,
    marginLeft: '-9%',
    marginTop: '-2.2%',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width / 2,
    justifyContent: 'center'
  },
  beginReading: {
    fontSize: 24,
    fontFamily: 'dreamOrphans',
    marginTop: 10 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
    color: DAO_BLUE
  }
});
