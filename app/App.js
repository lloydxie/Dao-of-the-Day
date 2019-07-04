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
    this.audioService = AudioServiceSingleton
    isLooping = true
    soundObject = await this.audioService.load('lily_1.mp3', isLooping)
    return this.audioService.initialLoadMap['lily_1.mp3'] = soundObject
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
