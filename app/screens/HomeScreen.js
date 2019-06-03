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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    let numberOfTheDay = Math.floor(Math.random() * 2);
    let daoOfTheDay = scrapedDao[numberOfTheDay].title;
    return (
      <View style={styles.container}>
        <Button
          title="Go back"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Contents', {
              itemId: 86,
              otherParam: 'First Details',
            });
          }}
        />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>{daoOfTheDay}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

_handleHelpPress = () => {

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
