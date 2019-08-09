'use strict';
import React, {Component} from 'react';

import {
  View,
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import { scrapedDao } from './content/daoDeChing'

import GLOBAL_STATE from '../services/GlobalState';

export default class TableOfContentsScreen extends Component {
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

  render() {
    return (
      <View style={{backgroundColor:'#1f1f1f',flex:1}}>
        <View style={{flex:1, marginTop:50}}>
        <SettingsList backgroundColor='#1f1f1f'>
            <SettingsList.Header headerText='Table Of Contents' headerStyle={{color:'#22BAD9', fontSize: 22, marginLeft: '3.5%'}}/>
              {
                scrapedDao.map((passage, key) => (
                    <SettingsList.Item
                      key={key}
                      hasNavArrow={true}
                      arrowStyle={{tintColor: '#22BAD9'}}
                      title={`Chapter ${key + 1}: ` + passage.title.substring(1, 20).replace(/\n/g, ' ') + '...'}
                      titleStyle={{color: '#22BAD9', fontSize: 20}}
                      onPress={() => this.navigateToQuoteScreen(key)}
                    />
                ))
              }
          </SettingsList>
        </View>
      </View>
    );
  }

  navigateToQuoteScreen(index) {
    this.props.navigation.navigate('Quote', {index: index})
  }
}