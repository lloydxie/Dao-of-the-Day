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
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <View>
          {
            scrapedDao.map( daoOfTheDay => {
              return (
                <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
                 <Text numberOfLines={4} style={styles.helpLinkText}> {daoOfTheDay.title} </Text>
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
