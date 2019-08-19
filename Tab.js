import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Tab extends React.Component{
    navigationComplete = () => {
        this.props.navigation.navigate('Complete')
    }

    navigationIncomplete = () => {
        this.props.navigation.navigate('Incomplete')
    }

    navigationHome = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        const {index} = this.props.navigation.state
        return(
            <View style={styles.container}>
                <View style={[styles.indicator, index===0 ? styles.indicatorM:index===1 ? styles.indicatorC:styles.indicatorI]}/>
                <TouchableOpacity onPress={this.navigationHome}>
                    <Text style={styles.title}>all</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigationComplete}>
                    <Text style={styles.text}>Complete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigationIncomplete}>
                    <Text style={styles.text}>Incomplete</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303944',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    padding: 20,
  },
  indicator: {
    top: 110,
    position: 'absolute',
    borderBottomWidth: 2,
    borderBottomColor: '#66fcf1',
    shadowColor: '#66fcf1',
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  indicatorM: {
    left: 20,
    width: 90,
  },
  indicatorC: {
    left: 150,
    width: 94,
  },
  indicatorI: {
    right: 22,
    width: 110,
  },
  title: {
    fontFamily: 'AppleSDGothicNeo-Light',
    textTransform: 'uppercase',
    fontSize: 55,
    fontWeight: 'bolder',
    color: 'white',
    },
  text: {
    fontFamily: 'AppleSDGothicNeo-Light',
    textTransform: 'uppercase',
    fontSize: 20,
    color: 'white',
    paddingTop: 30,
  },
})
