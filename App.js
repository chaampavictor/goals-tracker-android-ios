/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PopupDialog from 'react-native-popup-dialog';
import DatePicker from 'react-native-datepicker'
import FAB from 'react-native-fab';
import {
  AsyncStorage,
  Platform,
  StyleSheet,
  SectionList,
  Text,
  View,
  Button
} from 'react-native';

export default class App extends Component<{}> {

  async storeGoal(goal) {
    try{
      await AsyncStorage.setItem('Test Goal', goal);
    } catch (error) {
      console.log(error.message);
    }
  }

  async retrieveGoal(key) {
    try {
      value = AsyncStorage.getItem('Test Goal');
    } catch (error) {
      console.log(error.message);
    }
    AsyncStorage.getItem(key);
  }
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
          <FAB buttonColor="blue" visible={true} onClickAction={()=>{this.addNewGoalPopup.show();}}/>
          <PopupDialog ref = {(addNewGoalPopup) => { this.addNewGoalPopup = addNewGoalPopup;}}>
            <View>
              <Text style = {styles.popupTextHeader}> Add a new goal. </Text>
              <Text style = {styles.popupText}> Choose your start date. </Text>
              <DatePicker
               style={{width: 300}}
               date={"2018-01-30"}
               mode="date"
               format="YYYY-MM-DD"
               minDate="2018-01-30"
               maxDate="2019-12-31"
               confirmBtnText="Confirm"
               cancelBtnText="Cancel"
               customStyles={{
                 dateIcon: {
                   position: 'absolute',
                   top: 16,
                   left: 40,
                 },
                 dateInput: {
                   top: 16,
                   marginLeft: 100,
                 }
               }}
               onDateChange={(date) => {this.setState({date: date})}}
               />
            </View>
            <Text style = {styles.popupText}> Choose your end date. </Text>
            <DatePicker
             style={{width: 300}}
             date={"2018-01-30"}
             mode="date"
             format="YYYY-MM-DD"
             minDate="2018-01-30"
             maxDate="2019-12-31"
             confirmBtnText="Confirm"
             cancelBtnText="Cancel"
             customStyles={{
               dateIcon: {
                 position: 'absolute',
                 top: 16,
                 left: 40,
               },
               dateInput: {
                 top: 16,
                 marginLeft: 100,
               }
             }}
             onDateChange={(date) => {this.setState({date: date})}}
             />
             <View style = {styles.popupButtonView} >
             <Button
             onPress={()=>{this.addNewGoalPopup.dismiss();}}
             title="Submit"
             color="#42a1f4"
             />
             </View>
          </PopupDialog>
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
    textAlign: 'left',
    padding: 25,
  },
  popupTextHeader: {
    fontSize: 24,
    marginTop: 24,
    textAlign: 'center',
  },
  popupText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  popupButtonView: {
    justifyContent: 'center',
    marginTop: 24,
  },
});
