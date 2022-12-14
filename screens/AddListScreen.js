/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, TextInput, Keyboard, Alert, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../components/CustomButton';
import { Colors } from '../constants';
import globalStyles from '../styles/global';
import { createList } from '../store/actions/listActions';

const AddListScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const { lists } = useSelector(state => state.list);

  const submitHandler = () => {
    // check if list has no name
    if (name.trim() === '') {
      return Alert.alert('Validation', 'Name is required!');
    }
    // check if there is already an list with same name
    const alreadyExist = lists.find(l => l.name.toLowerCase() === name.trim().toLowerCase());
    if (alreadyExist) {
      return Alert.alert('Validation', 'List with this name already exist!');
    }

    dispatch(createList(
      name,
      () => {
        ToastAndroid.show(`List "${name}" created!`, ToastAndroid.LONG);
        Keyboard.dismiss();
        navigation.navigate('Home');
      },
      () => { ToastAndroid.show('Something went wrong, please try again!', ToastAndroid.LONG); },
    ));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TextInput style={globalStyles.input} value={name} onChangeText={(val) => setName(val)} placeholder="List name" placeholderTextColor={Colors.tertiary} />
        <CustomButton text="Submit" onPress={submitHandler} round />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default AddListScreen;
