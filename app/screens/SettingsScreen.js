'use strict';
import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  AsyncStorage
} from 'react-native';
import SettingsList from 'react-native-settings-list';

const ASYNC_STORAGE_KEY = 'GoLloyd'

import loadPastState from '../services/GlobalState';
import GLOBAL from './global.js'

let DEFAULT_SETTINGS = {
  'typingSoundToggle': false,
  'musicToggle': false
}

// simple example
export default class SettingsScreen extends Component {
  constructor(){
    super()
    this.state = DEFAULT_SETTINGS
  }

  componentWillMount() {
    AsyncStorage.getItem(ASYNC_STORAGE_KEY).then((oldSetting) => {
      if (!oldSetting) {
          AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS))
          console.log('1')
          console.log(oldSetting)
      }
      console.log('2')
      console.log(JSON.parse(oldSetting))
      this.setState(JSON.parse(oldSetting))
    })

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("willFocus", () => {
        AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(this.state))
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    GLOBAL.state = this;
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
            <SettingsList.Item
              hasNavArrow={false}
              title='Share me'/>
          </SettingsList>
        </View>
      </View>
    );
  }

  toggleSetting = async (key) => {
    oldValue = await this.getSetting(key)
    AsyncStorage.setItem(key, !oldValue)
    // GLOBAL.state.setState({switchValue: value});
  }

  getSetting = async (key) => {
    try {
      const oldSetting = await AsyncStorage.getItem(key)    
      return oldSetting
    }
    catch (error) {
      console.log(error)
    } 
  }

  updateSetting = async (key, value) => {
    AsyncStorage.setItem(key, value)
    // GLOBAL.state.setState({switchValue: value});
  }
}