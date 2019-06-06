import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { scrapedDao } from './content/daoDeChing'

export default class TableOfContentsScreen extends React.Component {
  static navigationOptions = {
    // header: null,
    title: 'Table Of Contents',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          {
            scrapedDao.map((daoOfTheDay, index) => {
              return (
                <TouchableOpacity style={styles.helpLink}>
                  <Text onPress={() => { this.props.navigation.navigate('DaoText', { index: index }) }} numberOfLines={4} style={styles.helpLinkText}> {daoOfTheDay.title} </Text>
                </TouchableOpacity>
              );
            })
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  helpLink: {

  },
  helpLinkText: {

  }
});
