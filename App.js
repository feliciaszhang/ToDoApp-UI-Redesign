import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './HomeScreen';
import CompleteScreen from './CompleteScreen';
import IncompleteScreen from './IncompleteScreen';
import Tab from './Tab';
import EditScreen from './EditScreen';

const GoalNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Complete: {
      screen: CompleteScreen,
      navigationOptions: {
        header: null
      }
    },
    Incomplete: {
      screen: IncompleteScreen,
      navigationOptions: {
        header: null
      }
    }
  },{
    tabBarComponent: props => <Tab {...props} />,
  }
)

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: GoalNavigator,
      navigationOptions: {
        header: null
      }
    },
    Edit: {
      screen: EditScreen,
      navigationOptions: {
        header: null
      }
    },
  }
)

const App = createAppContainer(HomeNavigator);

export default App;
