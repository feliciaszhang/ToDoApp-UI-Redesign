import React from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo';
import List from './List';

export default class CompleteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completedList: {},
      list: {},
    }
  }

  componentDidUpdate = () => {
    this.loadGoals();
  }

  componentDidMount = () => {
    this.loadGoals();
  }

  loadGoals = async () => {
    try {
      const getGoals = await AsyncStorage.getItem('goal');
      const parsedGoals = JSON.parse(getGoals);
      const completedGoals = {}
      {Object.values(parsedGoals).filter(goal => {goal.isCompleted ? completedGoals[goal.id]=goal:null})}
      (this.setState({list: parsedGoals, completedList: completedGoals || {}}))
    } catch (err) {
      console.log(err);
    }
  };

  save = goal => {
    AsyncStorage.setItem('goal', JSON.stringify(goal))
  }

  incomplete = id => {
    let copy = JSON.parse(JSON.stringify(this.state.list))
    copy[id].isCompleted = false
    this.save(copy)
    this.setState({list: copy})
  }
  
  render() {
    const {completedList} = this.state;
    return (
      <LinearGradient style={styles.container} colors={['#303944', '#1f2833', '#0b0c10']}>
      <View style={styles.card}>
        <ScrollView contentContainerStyle={styles.listcontainer}>
          {Object.values(completedList).map(item => <List key={item.id} {...item}
          incomplete={this.incomplete} textValue={item.value} />)}
        </ScrollView>
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tab: {
    paddingTop: 60,
  },
  title: {
    fontFamily: 'AppleSDGothicNeo-Light',
    fontSize: 55,
    color: 'white',
  },
  text: {
    fontFamily: 'AppleSDGothicNeo-Light',
    fontSize: 20,
    marginLeft: 10,
    marginVertical: 10,
    width: 240,
  },
  card: {
    flex: 1,
  },
  listcontainer: {
    alignItems: 'center',
  },
})
