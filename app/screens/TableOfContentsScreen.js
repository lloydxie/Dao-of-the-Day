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

NUM_COLUMNS = 3;
HEIGHT_IPHONE_X = 896;
WIDTH_IPHONE_X = 414;
export default class TableOfContentsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  state = {
    fontLoaded: false,
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
      if (!this.state.isExitingScreen) {
        // AudioServiceSingleton.play(AudioServiceSingleton.initialLoadMap['typing.mp3'])
      }
    }, 2750)
    setTimeout(() => {
      Animated.timing(                  // Animate over time
        this.state.yinYangFade,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 5500,              // Make it take a while
        }
      ).start();  
    }, 5250)
  }

  playYinYangAnimation = () => {
    this.setState({speed: .5})
  }

  navigateAway(index) {
    this.setState({isExitingScreen: true})
    AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['lily_1.mp3'])
    AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])
    this.props.navigation.navigate('DaoText', { index: index })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollContainer} 
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
              minDelay={130}
              maxDelay={250}
              delayMap={delayMap}
              fixed={true}
            >  Da</TypeWriter>
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
            <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={130}
              maxDelay={250}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
            >    A Day</TypeWriter>
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
          <FlatList
            data={scrapedDao}
            renderItem={({daoText, index}) => {
              return (
                <TouchableOpacity 
                  onPress={() => this.navigateAway(index)}
                  style={styles.grid}
                  activeOpacity={0.4}
                >
                  <Text style={styles.daoNumber}>{index + 1}</Text>
                </TouchableOpacity>
              );
            }}
            numColumns={NUM_COLUMNS}
            keyExtractor={(item, index) => index}
            contentContainerStyle={styles.gridContainer}
            style={styles.gridContainerStyles}
            decelerationRate='fast'
            snapToInterval={3}
            snapToAlignment={'center'}
          >
          </FlatList>
        </ScrollView>
      </View>
    );
  }
}

let delayMap = [
  { at: ' ', delay: 1000 }
]

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    // flex: 1,
    // backgroundColor: '#fff',
    // marginTop: 40,
  },
  daoNumber: {
    color: '#fff',
    fontSize: 20 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    fontWeight: 'bold'
  },
  gridContainer: {
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  gridContainerStyles: {
    // width: Dimensions.get('window').width
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
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ffe'
  },
  title: {
    fontSize: 32 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    marginTop: 100 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
    color: '#1f1f1f',
    fontFamily: 'dreamOrphans',
    // marginLeft: '20%',
  },
  title2: {
    fontSize: 32 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    marginTop: 100 * (Dimensions.get('window').height / HEIGHT_IPHONE_X),
    color: '#1f1f1f',
    fontFamily: 'dreamOrphans',
    // marginRight: '20%',
    // left: -300 * (Dimensions.get('window').width / WIDTH_IPHONE_X) + 200
    // left: -100
    //2.47
    //decrease for iphoneX, increase for 
  },
  lottieNinja: {
    width: 300 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    height: 300 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    // backgroundColor: '#fff',
    // flex: 1,
    aspectRatio: 1
  },
  lottieYinYang: {
    width: 50 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    height: 50 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    aspectRatio: 1.05,
    marginLeft: '-9%',
    marginTop: '-2.2%'
    // flex: 1,
    // aspectRatio: 5.0 * (Dimensions.get('window').height / HEIGHT_IPHONE_X) - (1 * (Dimensions.get('window').height / HEIGHT_IPHONE_X)),
    // top: 108,
    // right: 40 * (Dimensions.get('window').width / WIDTH_IPHONE_X) 
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width / 2,
    justifyContent: 'center'
  }
});
