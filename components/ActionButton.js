import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ActionBtn({navigation}){
  return (
    <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
    <ActionButton buttonColor="rgba(231,76,60,1)">
      <ActionButton.Item buttonColor='#9b59b6' title="New Post" onPress={() => navigation.navigate('Create Post')}>
        <Ionicons name="add" style={{ fontSize:20, height:22, color:'#fff'}} />
      </ActionButton.Item>
    </ActionButton>
  </View>
  )
}
const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });