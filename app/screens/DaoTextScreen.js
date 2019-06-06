import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { scrapedDao } from './content/daoDeChing'

export default class DaoTextScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    let numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 2));
    let daoOfTheDay = scrapedDao[numberOfTheDay].title;
    
    return (
      <View style={styles.container}>
        <Button
          title="Go back"
          onPress={() => {
            this.props.navigation.navigate('Contents');
          }}
        />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._playVoiceOfJesusAkaJoshEsguerra} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>{daoOfTheDay}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

_playVoiceOfJesusAkaJoshEsguerra = () => {

};
 
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  helpContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  helpLinkText: {
    fontSize: 18,
  }
});
