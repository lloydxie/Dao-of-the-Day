import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { scrapedDao } from './content/daoDeChing'
import {withNavigationFocus} from 'react-navigation';
import TypeWriter from 'react-native-typewriter';
import AudioServiceSingleton from '../services/AudioService'
import { Ionicons } from '@expo/vector-icons';
import * as Brightness from 'expo-brightness';

class DaoTextScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  loadAudioFile = async (numberOfTheDay) => {
    isLooping = true;
    backgroundMusicFilesMap = AudioServiceSingleton.backgroundMusicFilesMap;
    if (numberOfTheDay < 25) {
      this.keyName = Object.keys(backgroundMusicFilesMap)[0];
    }
    else if (numberOfTheDay < 50) {
      this.keyName = Object.keys(backgroundMusicFilesMap)[1];
    }
    else {
      this.keyName = Object.keys(backgroundMusicFilesMap)[2];
    }
    soundObject = await AudioServiceSingleton.load(this.keyName, isLooping);
    AudioServiceSingleton.backgroundMusicFilesMap[this.keyName] = soundObject;
    return soundObject;
  };
  
  playBackgroundMusic = (audioObject) => {
    
    
  }

  async componentDidMount() {
    this.oldBrightness = Brightness.getBrightnessAsync()
    this.brightnessValue = 0
    this.interval = setInterval(() => this.increaseBrightness(), 1000);

    soundObject = await this.loadAudioFile(this.numberOfTheDay)
    setTimeout(() => {
      AudioServiceSingleton.play(soundObject)
      // this.playBackgroundMusic(AudioServiceSingleton.backgroundMusicFilesMap[this.keyName])
    }, 2000)
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("willFocus", () => {
      // this.daoText.fadeIn(2000)
    });
  }

  componentWillUnmount() {
    // AudioServiceSingleton.unmount()
    this.focusListener.remove();
  }

  navigateAway = () => {
    this.props.navigation.replace('Contents')
  }

  increaseBrightness() {
    if (this.brightnessValue > 0.95) {
      this.brightnessValue = this.oldBrightness
      clearInterval(this.interval)
      return
    }
    else {
      this.brightnessValue += 0.1
    }
    Brightness.setBrightnessAsync(this.brightnessValue)
  }

  render() {
    this.numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 81));
    this.daoOfTheDay = scrapedDao[this.numberOfTheDay].title;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.helpContainer}>
            <Ionicons 
              name="md-arrow-down" 
              size={32}
              color="white"
              onPress={this.navigateAway}
            />
            <TouchableOpacity style={styles.helpLink}>
              <TypeWriter
                typing={1}
                style={styles.helpLinkText}
                ref={ref => this.daoText = ref}
                minDelay={50}
                maxDelay={200}
                fixed={true}
                delayMap={delayMap}
              >{this.daoOfTheDay}</TypeWriter>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View> 
    );
  }
}

export default withNavigationFocus(DaoTextScreen);

_playVoiceOfJesusAkaJoshEsguerra = () => {

};

const delayMap = [
  // increase delay by 1000ms at every semicolon
  { at: ';', delay: 1000 },
]
 
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1f1f1f'
  },  
  contentContainer: {
    flexGrow: 1,
  },
  helpContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
  },
  helpLinkText: {
    color: '#22BAD9',
    fontSize: 20,
    fontFamily: 'smite',
  }
});
