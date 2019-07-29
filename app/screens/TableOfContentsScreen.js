'use strict';
import React, {Component} from 'react';

import {
  View,
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import { scrapedDao } from './content/daoDeChing'

import GLOBAL_STATE from '../services/GlobalState';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <View style={{flex:1, marginTop:50}}>
          <SettingsList>
            <SettingsList.Header headerText='Table Of Contents' headerStyle={{color:'black'}}/>
              {
                scrapedDao.map((passage, key) => (
                  // <TouchableOpacity>
                    <SettingsList.Item
                      key={key}
                      hasNavArrow={true}
                      title={`Chapter ${key + 1}: ` + passage.title.substring(2, 25).replace(/\n/g, ' ') + '...'}
                      onPress={() => this.navigateToQuoteScreen(key)}
                      titleStyle={{fontSize: 20}}
                      // titleBoxStyle={{width: '100%'}}
                    />
                  // </TouchableOpacity>
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