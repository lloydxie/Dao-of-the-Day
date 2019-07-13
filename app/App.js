import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import * as Font from 'expo-font'
import AudioServiceSingleton from './services/AudioService'

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

async function cacheAudio() {
  isLooping = true
  soundObject = AudioServiceSingleton.load('lily_1.mp3', isLooping)
  typingObject = AudioServiceSingleton.load('typing.mp3', isLooping)
  loadedSoundObjects = await Promise.all([soundObject, typingObject]);
  
  AudioServiceSingleton.initialLoadMap['lily_1.mp3'] = loadedSoundObjects[0]
  AudioServiceSingleton.initialLoadMap['typing.mp3'] = loadedSoundObjects[1]
  
  return loadedSoundObjects
}

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      // consider using image for grid squares
    ]);

    const fontAssets = cacheFonts([
      {
        dreamOrphans: require('./assets/fonts/dream-orphans.regular.ttf'),
        smite: require('./assets/fonts/smite.regular.ttf')
      },
    ]);

    const audioAssets = cacheAudio();

    await Promise.all([...imageAssets, ...fontAssets, audioAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
