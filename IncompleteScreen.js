import React from 'react';
import { StyleSheet, ScrollView, View, Text, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo';
import List from './List';

export default class IncompleteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incompletedList: {},
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
      const incompletedGoals = {}
      {Object.values(parsedGoals).filter(goal => {goal.isCompleted ? null:incompletedGoals[goal.id]=goal})}
      (this.setState({list: parsedGoals, incompletedList: incompletedGoals || {}}))
    } catch (err) {
      console.log(err);
    }
  };

  save = goal => {
    AsyncStorage.setItem('goal', JSON.stringify(goal))
  }

  complete = id => {
    let copy = JSON.parse(JSON.stringify(this.state.list))
    copy[id].isCompleted = true
    this.save(copy)
    this.setState({list: copy})
  }

  delete = id => {
    let copy = JSON.parse(JSON.stringify(this.state.list))
    delete copy[id]
    this.save(copy)
    this.setState({list: copy})
  }

   update = (id, value) => {
    let copy = JSON.parse(JSON.stringify(this.state.list))
    copy[id].value = value
    if (value == '') {
      delete copy[id]
    }
    this.save(copy)
    this.setState({list: copy})
  }

  navigateEdit = (id,dueDate) => {
    this.props.navigation.navigate('Edit', {id:id,dueDate:dueDate})
  }

  render() {
    const {incompletedList} = this.state;
    return (
      <LinearGradient style={styles.container} colors={['#303944', '#1f2833', '#0b0c10']}>
      <View style={styles.card}>
        <ScrollView contentContainerStyle={styles.listcontainer}>
          {Object.values(incompletedList).map(item => <List key={item.id} {...item} update={this.update} navigateEdit={this.navigateEdit}
          dueDate={item.dueDate} complete={this.complete} deleteItem={this.delete} textValue={item.value} />)}
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
