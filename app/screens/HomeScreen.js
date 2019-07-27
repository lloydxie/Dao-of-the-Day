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

NUM_COLUMNS = 3;
HEIGHT_IPHONE_X = 896;
WIDTH_IPHONE_X = 414;
const BG_COLOR_1 = '#1f1f1f';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  state = {
    speed: 0,
    yinYangFade: new Animated.Value(0),  // Initial value for opacity: 0
    isExitingScreen: false,
    backgroundFade: new Animated.Value(1)
  };

  constructor() {
    super()
    console.log(Dimensions.get('window').width)
    AnimatedLottie = Animated.createAnimatedComponent(Lottie)
  }

  componentDidMount() {
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
          duration: 1500,              // Make it take a while
        }
      ).start();  
    }, 1000)

    this.focusListener = this.props.navigation.addListener("willFocus", () => {
      this.setState(
        {
          speed: 0,
          yinYangFade: new Animated.Value(0),  // Initial value for opacity: 0
          isExitingScreen: false,
          backgroundFade: new Animated.Value(1)
        }
      )
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }


  playYinYangAnimation = () => {
    this.setState({speed: .6})
  }

  navigateAway() {
    this.setState({isExitingScreen: true})
    Animated.timing(                  // Animate over time
      this.state.backgroundFade,            // The animated value to drive
      {
        toValue: 0,                   // Animate to opacity: 0 (opaque)
        duration: 500,              // Make it take a while
      }
    ).start()
    index = Math.floor(Math.random() * 81)
    AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['lily_1.mp3'])
    AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
    
    setTimeout(() => {
      this.props.navigation.navigate('Quote', { index: index })
      this.setState({isExitingScreen: false})
    }, 500)
  }

  render() {
    return (
      <Animated.View
        style={{
          ...styles.container,
          backgroundColor: '#fff',
          opacity: this.state.backgroundFade,
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
                marginTop: 100 * (Dimensions.get('window').height / HEIGHT_IPHONE_X)
              }}
              animation='zoomIn'
              direction='alternate'
              delay='250'
              duration='1500'
              useNativeDriver={true}
            >wiser each</Animatable.Text>
            <View style={styles.headerRow}>
              <Animatable.Text
                style={styles.title}
                animation='zoomIn'
                direction='alternate'
                delay='250'
                duration='1500'
                useNativeDriver={true}
              >da</Animatable.Text>
              <TouchableOpacity onPress={this.playYinYangAnimation}
                style={{
                  // marginTop: 100 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
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
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >Welcome, fellow adventurer...
              Read with intention...
          </TypeWriter>
          <Animatable.Text
            animation='fadeIn'
            iterationCount='infinite'
            direction='alternate'
            delay='0'
            iterationDelay='250'
            useNativeDriver={true}
            style={styles.beginReading}
            onPress={() => this.navigateAway()}
          >
            start reading
          </Animatable.Text>
        </ScrollView>
      </Animated.View>
    );
  }
}

let delayMap = [
  { at: ' ', delay: 250 }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 52 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    color: '#1f1f1f',
    fontFamily: 'dreamOrphans',
  },
  title2: {
    fontSize: 26 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    marginTop: 5 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
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
    aspectRatio: 2,
    marginLeft: '-9%',
    marginTop: '3.5%',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('window').width / 3.5,
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  beginReading: {
    fontSize: 30,
    fontFamily: 'dreamOrphans',
    marginTop: 60 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
    color: DAO_BLUE
  }
});
