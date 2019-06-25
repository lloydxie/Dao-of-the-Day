import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { scrapedDao } from './content/daoDeChing'
import {withNavigationFocus} from 'react-navigation';
import TypeWriter from 'react-native-typewriter';
import AudioService from '../services/AudioService'
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

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
    this.playBackgroundMusic(this.audioService.backgroundMusicFilesMap['bg_1.mp3'])
    const { navigation } = this.props;
    this.animation.play();
    this.focusListener = navigation.addListener("willFocus", () => {
      // this.daoText.fadeIn(2000)
    });
  }

  componentWillUnmount() {
    this.audioService.unmount()
    this.focusListener.remove();
  }

  navigateAway = () => {
  }

  onTyped = (token, previousVisibleCharacters) => {
    // this.playTypingSoundOnIos(token, previousVisibleCharacters)
    // this.showBlinkingCursor(token, previousVisibleCharacters)
  }
  
  playTypingSoundOnIos = (token, previousVisibleCharacters) => {
    if (this.audioService.lowSoundKeys.includes(token)) {
        this.audioService.playTypingSoundOnIos(false)
    }
    else {
        this.audioService.playTypingSoundOnIos() 
    }
  }
  
  showBlinkingCursor = (token, previousVisibleCharacters) => {
    keyMap = this.audioService.getKeyMap()
  
    delayMap.forEach(({ at, delay }) => {
      if (at === visibleChars || currentToken.match(at)) {
        timeout += delay;
      }
    });
  
    // above instead of below
      
    if (token in lowSoundKeys) {
        this.audioService.play(audioObject)
    }
    else {
        this.audioService.play(audioObject) 
    }
  }

  render() {
    let numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 2));
    let daoOfTheDay = scrapedDao[numberOfTheDay].title;
    
    return (
      <View style={styles.container}>
        <Button
          title="Go back"
          onPress={this.navigateAway}
        />
        <Lottie
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 200,
            height: 200,
            backgroundColor: '#1f1f1f',
          }}
          source={require('../assets/lottie/yin_yang.json')}
        />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.helpContainer}>
            <TouchableOpacity style={styles.helpLink}>
              <TypeWriter
                typing={1}
                style={styles.helpLinkText}
                ref={ref => this.daoText = ref}
                minDelay={60}
                maxDelay={250}
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
    fontSize: 17,
    fontWeight: 'bold'
  }
});
