import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const tips = [
  'Drink plenty of water',
  'Eat a balanced diet with plenty of fruits and vegetables',
  'Exercise regularly',
  'Get enough sleep',
  'Stay Positive',
  'Reduce stress through meditation or other methods',
  'Avoid unhealthy habits such as smoking and excessive alcohol consumption',
];

const HealthyTips = () => {
  return (
    <View style={styles.container}>
    <View style={{alignItems:'center'}}>
      <Text style={styles.title}> 7 Healthy Tips</Text>
      <Ionicons name="ios-medkit" size={64} color="#D10000" />
      </View>
      {tips.map((tip, index) => (
        <View key={index} style={styles.tipContainer}>
          <Text style={styles.tipNumber}>{index + 1}.</Text>
          <Text style={styles.tipText}>{tip}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding:30,
    backgroundColor:'#fff'
 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  tipNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  tipText: {
    fontSize: 15,
   
  },
});

export default HealthyTips;
