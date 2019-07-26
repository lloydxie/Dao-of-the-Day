'use strict';
import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SettingsList from 'react-native-settings-list';

import GLOBAL_STATE from '../services/GlobalState';

export default class MusicSelectionScreen extends Component {
  constructor(){
    super()
    this.state = GLOBAL_STATE.DEFAULT_SETTINGS
  }

  componentWillMount() {
    // AsyncStorage.getItem(ASYNC_STORAGE_KEY).then((oldSetting) => {
    //   if (!oldSetting) {
    //       AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS))
    //       console.log('1')
    //       console.log(oldSetting)
    //   }
    //   console.log('2')
    //   console.log(JSON.parse(oldSetting))
    //   this.setState(JSON.parse(oldSetting))
    // })

    // const { navigation } = this.props;
    // this.focusListener = navigation.addListener("willFocus", () => {
    //     AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(this.state))
    // });

    GLOBAL_STATE.initializeStorageTriggers(this)
  }

  componentWillUnmount() {
    GLOBAL_STATE.unloadStorageTriggers(this)
  }

  render() {
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <View style={{flex:1, marginTop:50}}>
          <SettingsList>
          <SettingsList.Header headerText='Settings' headerStyle={{color:'black'}}/>
            <SettingsList.Item
              hasNavArrow={false}
              title='About the App'/>
            <SettingsList.Item
              hasNavArrow={false}
              title='Rate the App'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.typingSoundToggle}
              switchOnValueChange={() => this.toggleSetting('typingSoundToggle')}
              hasSwitch={true}
              title='Typing Sound FX'/>
            <SettingsList.Item
              hasNavArrow={true}
              switchState={this.state.musicToggle}
              switchOnValueChange={() => this.toggleSetting('musicToggle')}
              hasSwitch={true}
              title='BG Music (turn off for slower phones)'/>
              onPress={() => this.navigateToMusicSelection}
            <SettingsList.Item
              hasNavArrow={false}
              title='Share me'/>
          </SettingsList>
        </View>
      </View>
    );
  }

  toggleSetting(key) {
    let oldValue = this.state[key]
    let newState = {}
    newState[key] = !oldValue
    this.setState(newState)
  }

  updateSetting(key, value) {
    let newState = {}
    newState[key] = value
    this.setState(newState)
  }

  navigateToMusicSelection() {
    this.props.navigation.navigate('MusicSelection')
  }
}