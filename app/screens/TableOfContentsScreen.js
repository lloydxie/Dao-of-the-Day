import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button
} from 'react-native';
import { scrapedDao } from './content/daoDeChing'

export default class TableOfContentsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          {
            scrapedDao.map((daoOfTheDay, index) => {
              return (
                <TouchableOpacity key={index} style={styles.helpLink}>
                  <Text onPress={() => { this.props.navigation.navigate('DaoText', { index: index }) }} numberOfLines={4} style={styles.helpLinkText}> Day {index} </Text>
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
    backgroundColor: 'black',
  },
  helpLink: {
    alignItems: 'center',
  },
  helpLinkText: {
    color: '#fff',
    fontSize: 18

  }
});
