import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/EvilIcons";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      value: props.textValue,
    }
  }

  toggle = () => {
    const {isCompleted, incomplete, complete, id} = this.props
    if (isCompleted) {
      incomplete(id);
    } else {
      complete(id);
    }
  }

  startEdit = () => {
    this.setState({isEditing: true})
  }

  finishEdit = () => {
    const {value} = this.state;
    const {id, update} = this.props;
    update(id, value);
    this.setState({isEditing: false})
  }

  handleEdit = value => {
    this.setState({value: value,})
  }

  navigateEdit = () => {
    const {navigateEdit,id,dueDate} = this.props
    this.setState({isEditing: false})
    navigateEdit(id,dueDate)
  }

  render() {
    const {isEditing, value} = this.state;
    const {textValue, isCompleted, id, deleteItem, dueDate} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.rowcontainer}>
          <TouchableOpacity onPress={this.toggle}>
            <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.incompleteCircle]} />
            <View style={[isCompleted? styles.innercircle : null]}/>
          </TouchableOpacity>
          {isEditing ? (
              <TextInput value={value} style={[styles.text, styles.edit, isCompleted? styles.completeText : styles.incompleteText]}
              multiline={true} turnKeyType={'done'} onChangeText={this.handleEdit} onBlur={this.finishEdit} autoFocus={true} />
            ) : (
              <TouchableOpacity onPressOut={this.navigateEdit}>
                <Text multiline={true} style={[styles.text, isCompleted? styles.completeText : styles.incompleteText]}>
                  {textValue}
                </Text>
                <Text style={[styles.text,styles.date]}>{dueDate}</Text>
              </TouchableOpacity>
            )}
        </View>
        {isCompleted ? (
          null
        ) : (
          <View>
          {isEditing ? (
            <View style={styles.button}>
              <TouchableOpacity onPressOut={this.finishEdit}>
                <Icon name="check" size={40} color='#66fcf1' />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.button}>
              <TouchableOpacity onPressOut={this.startEdit}>
                <Icon name="pencil" size={40} color='rgba(173,179,187,0.5)' />
              </TouchableOpacity>
              <TouchableOpacity onPressOut={() => deleteItem(id)}>
                <Icon name="close-o" size={40} color='rgba(173,179,187,0.5)' />
              </TouchableOpacity>
            </View>
          )}
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    borderBottomColor: 'rgba(173,179,187,0.5)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  edit: {
    marginTop: 0,
    width: 270,
  },
  text: {
    fontFamily: 'AppleSDGothicNeo-Light',
    fontSize: 20,
    marginLeft: 10,
    marginVertical: 10,
    width: 240,
    marginBottom: 0,
    marginTop: 20,
  },
  date: {
    color: 'rgba(173,179,187,0.5)',
    fontSize: 15,
    marginTop: 0,
  },
  completeText: {
    color: 'rgba(173,179,187,0.5)',
    width: 300,
  },
  incompleteText: {
    color: '#66fcf1',
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
  },
  innercircle: {
    position: 'absolute',
    left: 5,
    top: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#66fcf1',
  },
  completeCircle: {
    borderColor: 'rgba(173,179,187,0.5)',
  },
  incompleteCircle: {
    borderColor: '#66fcf1',
  },
})
