import React from 'react';
import { StyleSheet, Text, StatusBar, TextInput, ScrollView, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { LinearGradient, AppLoading } from 'expo';
import uuidv1 from 'uuid/v1';
import List from './List';
import Icon from "react-native-vector-icons/EvilIcons";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: '',
      list: {},
      loaded: false,
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
      this.setState({loaded: true, list: parsedGoals || {}});
    } catch (err) {
      console.log(err);
    }
  };

  handleAdd = value => {
    this.setState({goal: value})
  }

  save = goal => {
    AsyncStorage.setItem('goal', JSON.stringify(goal))
  }

  add = () => {
    const {goal} = this.state;
    if (goal !== '') {
        let copy = JSON.parse(JSON.stringify(this.state.list))
        const ID = uuidv1();
        copy[ID] = {id:ID,isCompleted:false,value:goal,dueDate:''}
        this.save(copy)
        this.setState({goal:'',list:copy})
    }
  }

  delete = id => {
    let copy = JSON.parse(JSON.stringify(this.state.list))
    delete copy[id]
    this.save(copy)
    this.setState({list: copy})
  }

  incomplete = id => {
    let copy = JSON.parse(JSON.stringify(this.state.list))
    copy[id].isCompleted = false
    this.save(copy)
    this.setState({list: copy})
  }

  complete = id => {
    let copy = JSON.parse(JSON.stringify(this.state.list))
    copy[id].isCompleted = true
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
    const {list, loaded} = this.state;
    if (!loaded) {
      return <AppLoading />;
    }
    return (
      <LinearGradient style={styles.container} colors={['#303944', '#1f2833', '#0b0c10']}>
      <StatusBar barStyle='light-content' />
      <View style={styles.card}>
        <TouchableOpacity>
          <Icon name="chevron-right" size={40} color='#66fcf1' style={{position:'absolute',top:15,left:-5}} />
          <Icon name="chevron-right" size={40} color='#66fcf1' style={{position:'absolute',top:15,left:-13}} />
        </TouchableOpacity>
        <TextInput style={styles.input} onSubmitEditing={this.add} value={this.state.goal}
        onChangeText={this.handleAdd} returnKeyType={'done'} placeholder='New Entry...' placeholderTextColor='rgba(173,179,187,0.5)' />
        <ScrollView contentContainerStyle={styles.listcontainer}>
          {Object.values(list).map(item => <List key={item.id} {...item} update={this.update} dueDate={item.dueDate}
          navigateEdit={this.navigateEdit} incomplete={this.incomplete} complete={this.complete} deleteItem={this.delete} textValue={item.value} />)}
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
  card: {
    flex: 1,
  },
  input: {
    width: 350,
    fontFamily: 'AppleSDGothicNeo-Light',
    padding: 20,
    fontSize: 20,
    color: '#66fcf1',
    paddingLeft: 35,
  },
  listcontainer: {
    alignItems: 'center',
  },
});
