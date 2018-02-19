/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PopupDialog from 'react-native-popup-dialog';
import DatePicker from 'react-native-datepicker'
import FAB from 'react-native-fab';
import * as Progress from 'react-native-progress';
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
    this.state = {startDate:moment(currentDate).format('YYYY-MM-DD').toString(), endDate: moment(currentDate).format('YYYY-MM-DD').toString(), shortTermGoals: [], midTermGoals: [], longTermGoals: []};
    this.retrieveGoals();
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
          renderItem = {({item}) =>
          <View style={{
            flexDirection: 'row',
          }}>
          <View style = {{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Text style = {styles.mainListViewRow}>{item.shortDescription + "\n" + item.startDate + " to " + item.endDate}</Text>
          </View>
          <View style ={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style ={{
            flexDirection: 'row',
            height: 8,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Progress.Bar progress={item.percentageDaysPassed} width={60} />
          </View>
          </View>
          </View>
          }
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
               var goal = new Goal(this.state.startDate, this.state.endDate, "Short Description","Long Description", 0.0);
               var goalCategory = "";
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
                     this.storeItem(goalCategory, goals);
                   } else {
                     var newGoals = [];
                     newGoals.push(goal);
                     var jsonversion = newGoals;
                     this.storeItem(goalCategory, jsonversion);
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

async storeItem(key, item) {
  try{
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
}

async retrieveGoals() {
  try {
    this.retrieveItem("Short-term").then((goals) => {
      if (goals) {
        var index = 0;
        goals.forEach(function (goal)
        {
          var updatedGoal = new Goal(goal.startDate, goal.endDate, goal.shortDescription, goal.longDescription, goal.percentageDaysPassed);
          updatedGoal.updatePercentageDaysPassed();
          goals[index] = updatedGoal;
          index++;
      });
        this.setState({shortTermGoals: goals});
      }
    }).catch((error) => {
            console.log('Promise is rejected with error: ' + error);
        });
    this.retrieveItem("Mid-term").then((goals) => {
      if (goals) {
        var index = 0;
        goals.forEach(function (goal)
        {
          var updatedGoal = new Goal(goal.startDate, goal.endDate, goal.shortDescription, goal.longDescription, goal.percentageDaysPassed);
          updatedGoal.updatePercentageDaysPassed();
          goals[index] = updatedGoal;
          index++;
      });
        this.setState({midTermGoals: goals});
      }
    }).catch((error) => {
            console.log('Promise is rejected with error: ' + error);
        });;
    this.retrieveItem("Long-term").then((goals) => {
      if (goals) {
        var index = 0;
        goals.forEach(function (goal)
        {
          var updatedGoal = new Goal(goal.startDate, goal.endDate, goal.shortDescription, goal.longDescription, goal.percentageDaysPassed);
          updatedGoal.updatePercentageDaysPassed();
          goals[index] = updatedGoal;
          index++;
      }).catch((error) => {
              console.log('Promise is rejected with error: ' + error);
          });;
        this.setState({longTermGoals: goals});
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}

async retrieveItem(key) {
  try{
    const retrievedItem =  await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    console.log(error.message);
  }
  return
}
}
var Goal = function (startDate, endDate, longDescription, shortDescription, percentageDaysPassed) {
  this.startDate = startDate;
  this.endDate = endDate;
  this.longDescription = longDescription;
  this.percentageDaysPassed = percentageDaysPassed;
  this.shortDescription = shortDescription;
  this.updatePercentageDaysPassed = function () {
    const startDate = moment(this.startDate);
    const endDate = moment(this.endDate);
    const currentDate = moment(new Date());
    const currentDifference = currentDate.diff(startDate, "days");
    const totalDifference = endDate.diff(startDate, "days");
    const ratio = currentDifference/totalDifference;
    if(ratio >= 0) {
      this.percentageDaysPassed = ratio;
    } else {
      this.percentageDaysPassed = 0.0;
    }

    };

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mainListViewRow: {
    fontSize: 12,
    textAlign: 'center',
    padding: 10,
  },
  mainListViewHeader: {
    fontSize: 28,
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
