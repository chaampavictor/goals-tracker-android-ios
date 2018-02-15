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
import moment from 'moment';
export default class App extends Component<{}> {
  constructor(props){
    super(props)
    const currentDate = new Date();
    this.state = {startDate:moment(currentDate).format('YYYY-MM-DD').toString(), endDate: moment(currentDate).format('YYYY-MM-DD').toString(), shortTermGoals: ["SG 1"], midTermGoals: ["MT 1"], longTermGoals: ["LT 1"]};
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
      var result = await AsyncStorage.getItem("Short-term");
      const shortTermGoals = JSON.parse(result);
      result = await AsyncStorage.getItem("Mid-term");
      const midTermGoals = JSON.parse(result);
      result = await AsyncStorage.getItem("Long-term");
      const longTermGoals = JSON.parse(result);
      if (shortTermGoals) {
        //for some reason we need to do a double parse
        var shortGoals = JSON.parse(shortTermGoals);
        this.setState({shortTermGoals: shortGoals});
      }
      if (midTermGoals) {
        var midTermGoals = JSON.parse(midTermGoals);
        this.setState({midTermGoals: midTermGoals});
      }
      if (longTermGoals) {
        var longTermGoals = JSON.parse(longTermGoals);
        this.setState({longTermGoals: longTermGoals});      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async retrieveItem(name) {
    try{
      const retrievedItem =  await AsyncStorage.getItem(name);
      var newitem = await JSON.parse(retrievedItem);
      var item = await JSON.parse(newitem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  render() {
    return (
      <View style={styles.container}>
      <SectionList
        sections = {[
          {title: 'Short-term', data: this.state.shortTermGoals},
          {title: 'Medium-term', data: this.state.midTermGoals},
          {title: 'Long-term', data: this.state.longTermGoals},
          ]}
          renderItem = {({item}) => <Text style = {styles.mainListViewRow}> {item.startDate} {item.endDate} {item.description} </Text> }
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
               var goal = new Goal();
               var goalCategory = "";
               goal.startDate = this.state.startDate;
               goal.endDate = this.state.endDate;
               goal.description = "description has been set.";
               const startDate = moment(this.state.startDate);
               const endDate = moment(this.state.endDate);
               const difference = endDate.diff(startDate, "days");
               if (difference > 0 && difference < 30) {
                 goalCategory = "Short-term";
               } else if (difference >= 30 && difference < 90) {
                 goalCategory = "Mid-term";
               } else {
                 goalCategory = "Long-term";
               }
               this.retrieveItem(goalCategory).then((goals) => {
                   if (Array.isArray(goals)) {
                     goals.push(goal);
                     this.storeGoal(goalCategory, JSON.stringify(goals));
                   } else {
                     var newGoals = [];
                     newGoals.push(goal);
                     var jsonversion = JSON.stringify(newGoals);
                     this.storeGoal(goalCategory, jsonversion);
                   }
               });
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

var Goal = function () {
  this.startDate = "No Date";
  this.endDate = "No Date";
  this.description = "No description";
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
