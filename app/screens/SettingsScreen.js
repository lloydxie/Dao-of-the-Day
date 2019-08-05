'use strict';
import React, {Component} from 'react';

import {
  View,
  Share,
  AsyncStorage,
  Alert
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import { StoreReview } from 'expo';

import GLOBAL_STATE from '../services/GlobalState';

export default class SettingsScreen extends Component {
  constructor(){
    super()
    this.state = GLOBAL_STATE.DEFAULT_SETTINGS
  }

  componentWillMount() {
    GLOBAL_STATE.initializeStorageTriggers(this)
  }

  componentWillUnmount() {
    GLOBAL_STATE.unloadStorageTriggers(this)
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'https://apps.apple.com/us/app/garageband/id408709785'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <View style={{flex:1, marginTop:50}}>
          <SettingsList>
            <SettingsList.Header headerText='Settings' headerStyle={{color:'black'}}/>
              <SettingsList.Item
                hasNavArrow={false}
                title='Why did I create this?'
                onPress={() => this.props.navigation.navigate('About')}
              />
              <SettingsList.Item
                hasNavArrow={false}
                switchState={this.state.typingSoundToggle}
                switchOnValueChange={() => GLOBAL_STATE.toggleSetting(this, 'typingSoundToggle')}
                hasSwitch={true}
                title='Typing Sound FX'/>
              <SettingsList.Item
                hasNavArrow={true}
                switchState={this.state.musicToggle}
                switchOnValueChange={() => GLOBAL_STATE.toggleSetting(this, 'musicToggle')}
                hasSwitch={true}
                onPress={() => this.navigateToMusicSelection()}
                title='BG Music (turn off for slower phones)'/>
              <SettingsList.Item
                hasNavArrow={false}
                title='Rate the App'
                onPress={StoreReview.requestReview}
              />
              <SettingsList.Item
                hasNavArrow={false}
                title='Share me'
                onPress={this.onShare}
              />
              <SettingsList.Item
                hasNavArrow={false}
                title='Reset Default Settings'
                onPress={this.resetSettingsAlert}
              />
          </SettingsList>
        </View>
      </View>
    );
  }

  navigateToMusicSelection() {
    this.props.navigation.navigate('MusicSelection')
  }

  resetSettingsAlert() {
    Alert.alert(
      'Are you sure you want to reset?',
      'You will be shown the intro again the next app load',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => AsyncStorage.clear()}
      ],
      { cancelable: true }
    )
  }
}