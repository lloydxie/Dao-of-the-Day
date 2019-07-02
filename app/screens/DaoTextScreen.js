import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { scrapedDao } from './content/daoDeChing'
import {withNavigationFocus} from 'react-navigation';
import TypeWriter from 'react-native-typewriter';
import AudioService from '../services/AudioService'
import { DangerZone, Font } from 'expo';
const { Lottie } = DangerZone;
import { Ionicons } from '@expo/vector-icons';

class DaoTextScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  loadAudioFiles = async () => {
    this.audioService = new AudioService()
    await this.audioService.loadAllFiles()
  };
  
  playBackgroundMusic = (audioObject) => {
    this.audioService.play(audioObject)
  }

  async componentDidMount() {
    await this.loadAudioFiles()
    setTimeout(() => {
      this.playBackgroundMusic(this.audioService.backgroundMusicFilesMap['bg_1.mp3'])
    }, 2000)
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("willFocus", () => {
      // this.daoText.fadeIn(2000)
    });
  }

  componentWillUnmount() {
    // this.audioService.unmount()
    this.focusListener.remove();
  }

  navigateAway = () => {
    this.props.navigation.replace('Contents')
  }

  render() {
    let numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 81));
    let daoOfTheDay = scrapedDao[numberOfTheDay].title;
    
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
                onTyped={this.onTyped}
              >{daoOfTheDay}</TypeWriter>
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
