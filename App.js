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
  constructor(props){
    super(props)
    this.state = {startDate:"2018-02-03", endDate: "2018-02-03", shortTermGoals: ["SG 1"], midTermGoals: ["MT 1"], longTermGoals: ["LT1"]};
    this.retrieveGoals();
  }
  async storeGoal(category, goal) {
    try{
      await AsyncStorage.setItem(category, JSON.stringify(goal));
    } catch (error) {
      console.log(error.message);
    }
  }

  async retrieveGoals() {
    try {
      const result = await AsyncStorage.getItem("Short-term");
      const shortTermGoals = JSON.parse(result);
      // const midTermGoals = await AsyncStorage.getItem("Mid-term");
      // const longTermGoals = await AsyncStorage.getItem("Long-term");
      if (shortTermGoals) {
        this.setState({shortTermGoals: shortTermGoals});
        console.log('Goal successfully retrieved.');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <SectionList
        sections = {[
          {title: 'Short-term', data: this.state.shortTermGoals},
          {title: 'Medium-term', data: ['Goal #2']},
          {title: 'Long-term', data: ['Goal #3']},
          ]}
          renderItem = {({item}) => <Text style = {styles.mainListViewRow}> {item} </Text> }
          renderSectionHeader = {({section}) => <Text style = {styles.mainListViewHeader}> {section.title} </Text>}
          keyExtractor = {(item, index) => index} />
          <FAB buttonColor="blue" visible={true} onClickAction={()=>{this.addNewGoalPopup.show();}}/>
          <PopupDialog ref = {(addNewGoalPopup) => { this.addNewGoalPopup = addNewGoalPopup;}}>
            <View>
              <Text
              style = {styles.popupTextHeader}>
              Add a new goal.
              </Text>
              <Text
              style = {styles.popupText}>
              Choose your start date.
              </Text>
              <DatePicker
               style={{width: 300}}
               date={this.state.startDate}
               mode="date"
               format="YYYY-MM-DD"
               minDate={this.state.startDate}
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
               onDateChange={(date) => {this.setState({startDate: date})}}
               />
            </View>
            <Text
            style = {styles.popupText}>
            Choose your end date.
            </Text>
            <DatePicker
             style={{width: 300}}
             date={this.state.endDate}
             mode="date"
             format="YYYY-MM-DD"
             minDate={this.state.endDate}
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
             onDateChange={(date) => {this.setState({endDate: date})}}
             />
             <View style = {styles.popupButtonView} >
             <Button
             onPress={()=>{
               // this.storeGoal(this.state.startDate);
               this.storeGoal("Short-term", [this.state.endDate]);
               this.addNewGoalPopup.dismiss();
             }}
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
    fontSize: 20,
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
