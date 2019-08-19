import React from 'react';
import { StyleSheet, Text, TextInput, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import Icon from "react-native-vector-icons/EvilIcons";
import {Calendar, CalendarList} from 'react-native-calendars';

export default class EditScreen extends React.Component {
    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            value: this.props.navigation.state.params,
            dueDate: this.props.navigation.state.params.dueDate,
            list: {},
            selected: {},
            day: date.getDate(),
            month: date.getMonth()+1,
            year: date.getFullYear(),
        }
    }

    componentDidMount = () => {
        this.loadGoals();
    }

    loadGoals = async () => {
        try {
          const getGoals = await AsyncStorage.getItem('goal');
          const parsedGoals = JSON.parse(getGoals);
          (this.setState({list: parsedGoals || {}}))
          {Object.values(parsedGoals).map(goal => {goal.id===this.state.value.id ? this.setState({selected:goal}):null})}
        } catch (err) {
          console.log(err);
        }
    };

    save = goal => {
      AsyncStorage.setItem('goal', JSON.stringify(goal))
    }

    add = () => {
      const {day,month,year} = this.state
      const id = this.state.value.id
      let copy = JSON.parse(JSON.stringify(this.state.list))
      copy[id]['dueDate'] = month+'/'+day+'/'+year
      this.save(copy)
      this.props.navigation.popToTop()
    }

    clear = () => {
      const id = this.state.value.id
      let copy = JSON.parse(JSON.stringify(this.state.list))
      copy[id]['dueDate'] = ''
      this.save(copy)
      this.props.navigation.popToTop()
    }

    navigate = () => {
      this.props.navigation.popToTop()
    }

    render() {
        const {list,value,selected,day,month,year,dueDate} = this.state;
        const noDueDate = value.dueDate === ''
        return(
            <LinearGradient style={styles.container} colors={['#303944', '#1f2833', '#0b0c10']}>
              <View style={styles.content}>
                <Text style={styles.input}>{selected.value}</Text>
                <Text style={styles.date}>
                  {noDueDate ? (
                    month+'/'+day+'/'+year
                  ) : (
                    dueDate
                  )}
                </Text>
                <TouchableOpacity onPressOut={this.clear}>
                  <Text style={styles.addclearText}>clear</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={this.add}>
                  {noDueDate ? (
                    <Text style={styles.addclearText}>add</Text>
                  ) : (
                    <Text style={styles.addclearText}>update</Text>
                  )}
                </TouchableOpacity>
                <Calendar style={{marginTop: 110,}} theme={styles.calendar}
                onDayPress={(obj) => {this.setState({day:obj.day,month:obj.month,year:obj.year,dueDate:obj.month+'/'+obj.day+'/'+obj.year})}} />
              </View>
              <TouchableOpacity style={styles.chevron} onPressOut={this.navigate}>
                <Icon name="chevron-left" size={50} color='#66fcf1' style={{position:'absolute',left:20}} />
                <Icon name="chevron-left" size={50} color='#66fcf1' style={{position:'absolute',left:8}} />
              </TouchableOpacity>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    paddingTop: 70,
    width: 370,
  },
  addclearText: {
    textAlign: 'center',
    fontFamily: 'AppleSDGothicNeo-Light',
    fontSize: 20,
    color: '#66fcf1',
    textTransform: 'uppercase',
    marginTop: 10,
  },
  date: {
    textAlign: 'center',
    fontFamily: 'AppleSDGothicNeo-Light',
    fontSize: 60,
    color: 'white',
    marginTop: 140,
  },
  calendar: {
    calendarBackground: 'transparent',
    textSectionTitleColor: 'rgba(173,179,187,0.5)',
    selectedDayBackgroundColor: '#66fcf1',
    selectedDayTextColor: 'black',
    todayTextColor: '#66fcf1',
    dayTextColor: 'white',
    textDisabledColor: 'rgba(173,179,187,0.5)',
    dotColor: 'white',
    selectedDotColor: 'white',
    arrowColor: '#66fcf1',
    monthTextColor: 'rgba(173,179,187,0.5)',
    textDayFontFamily: 'AppleSDGothicNeo-Light',
    textMonthFontFamily: 'AppleSDGothicNeo-Light',
    textDayHeaderFontFamily: 'AppleSDGothicNeo-Light',
    textDayFontSize: 20,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 16,
  },
  input: {
    fontFamily: 'AppleSDGothicNeo-Light',
    fontSize: 30,
    color: 'white',
    textAlign: 'right',
    paddingRight: 10,
  },
  chevron: {
    top: 65,
    left: 0,
    position:'absolute',
  }
})
