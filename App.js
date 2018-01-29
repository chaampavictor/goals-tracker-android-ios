/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  SectionList,
  Text,
  View
} from 'react-native';

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
      <SectionList
        sections = {[
          {title: 'Short-term', data: ['Goal #1']},
          {title: 'Medium-term', data: ['Goal #2']},
          {title: 'Long-term', data: ['Goal #3']},
          ]}
          renderItem = {({item}) => <Text style = {styles.mainListViewRow}> {item} </Text> }
          renderSectionHeader = {({section}) => <Text style = {styles.mainListViewHeader}> {section.title} </Text>}
          keyExtractor = {(item, index) => index} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mainListViewRow: {
    fontSize: 24,
    textAlign: 'center',
    padding: 15,
  },
  mainListViewHeader: {
    fontSize: 40,
    padding: 25,
  },
});
