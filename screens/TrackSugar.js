import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActionButton from 'react-native-action-button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

const BloodSugarLevels = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text style={styles.header}>Blood Sugar Levels</Text>
      <View style={[styles.levelContainer, { backgroundColor: '#FFC107' }]}>
        <Text style={styles.level}>Low:</Text>
        <Text style={styles.description}>Under 70 mg/dL</Text>
        <Text style={styles.warning}>
          Warning: Low blood sugar levels can cause shakiness, dizziness, confusion, and fainting.
        </Text>
      </View>
      <View style={[styles.levelContainer, { backgroundColor: '#4CAF50' }]}>
        <Text style={styles.level}>Normal:</Text>
        <Text style={styles.description}>70-130 mg/dL</Text>
        <Text style={styles.normal}>
          Normal blood sugar levels are essential for good health and energy levels.
        </Text>
      </View>
      <View style={[styles.levelContainer, { backgroundColor: '#F44336' }]}>
        <Text style={styles.level}>High:</Text>
        <Text style={styles.description}>Over 130 mg/dL</Text>
        <Text style={styles.warning}>
          Warning: High blood sugar levels can lead to serious health issues such as diabetes and heart disease.
        </Text>
      </View>
      <View style={{marginTop:20}}>
      <TouchableOpacity
      onPress={() =>
        navigation.navigate('Track Sugar Level')
      }
      style={{
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}
    >
      <Text style={{ fontSize: 16, color: "#fff" }}>Track My Sugar Level</Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex:1,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor:'#fff'
    
  },
  header: {
    fontSize: 24,
    textAlign:'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  levelContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  level: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  warning: {
    fontSize: 16,
    color: '#fff',
  },
  normal: {
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default BloodSugarLevels;
