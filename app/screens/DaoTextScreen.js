import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { scrapedDao } from './content/daoDeChing'
import {withNavigationFocus} from 'react-navigation';
import TypeWriter from 'react-native-typewriter';
import AudioService from '../services/AudioService'

class DaoTextScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  loadAudioFiles = () => {
    this.audioService = new AudioService()
    this.audioService.load()
  };
  
  play = () => {
    this.audioService.play()
  }

  componentDidMount() {
    this.loadAudioFiles()
    const { navigation } = this.props;
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

  render() {
    let numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 2));
    let daoOfTheDay = scrapedDao[numberOfTheDay].title;
    let arrayOfLines = daoOfTheDay.split("\n");
    
    return (
      <View style={styles.container}>
        <Button
          title="Go back"
          onPress={this.navigateAway}
        />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.play} style={styles.helpLink}>
              <TypeWriter
                typing={1}
                style={styles.helpLinkText}
                ref={ref => this.daoText = ref}
                minDelay={60}
                maxDelay={250}
                fixed={true}
                delayMap={delayMap}
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
  // increase delay by 1000ms at every newline
  { at: '\n', delay: 1500 },
  { at: '\n\n', delay: 1000 },
  { at: ';', delay: 1000 },
]
 
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },  
  contentContainer: {
    flexGrow: 1,
  },
  helpContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  helpLinkText: {
    color: '#fff',
    fontSize: 17
  }
});
