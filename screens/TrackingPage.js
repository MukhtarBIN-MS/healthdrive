import React, { useContext, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../Context/AuthContext';

const db = getDatabase();

const TrackingPage = ({navigation}) => {
  const [data, setData] = useState(null);
  const [isData, setIsData] = useState(false)

  useEffect(() => {
    const postListRef = ref(db, `users/${user.uid}`);

    onValue(postListRef, (snapshot) => {
      if (snapshot.exists()) {
        const profile = snapshot.val();
        setData(profile);
        setIsData(true);
      } else {
        console.log("No data available");
      }
    });
  }, []);

  const { user } = useContext(AuthContext)
  return (
    <View style={styles.container}>
    <Text style={styles.header}>{ isData ? `Welcome ${data['name']} to \n your Health Tracker Page ` : `Welcome ${user.email} to \n your Health Tracker `  }</Text>
      <View style={styles.gridContainer}>
        <TouchableOpacity onPress={()=> navigation.navigate('Track Sugar')} style={[styles.gridItem, styles.trackingSugar]}>
          <Ionicons name="ios-thermometer" size={50} color="#fff" />
          <Text style={styles.gridItemText}>Track Sugar Level</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Track Weight')}  style={[styles.gridItem, styles.trackingWeight]}>
          <Ionicons name="ios-person" size={50} color="#fff" />
          <Text style={styles.gridItemText}>My Weight</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridContainer}>
        <TouchableOpacity onPress={()=> navigation.navigate('Track Blood Pressure')}  style={[styles.gridItem, styles.trackingBlood]}>
          <Ionicons name="ios-pulse" size={50} color="#fff" />
          <Text style={styles.gridItemText}>Track Blood Pressure</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('HealthTips')}  style={[styles.gridItem, styles.healthyTips]}>
          <Ionicons name="ios-bulb" size={50} color="#fff" />
          <Text style={styles.gridItemText}>Healthy Tips</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  gridContainer: {
    flexDirection: 'row',
  },
  gridItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
    flex: 1,
    height: 150,
    margin: 10,
  },
  gridItemText: {
    fontSize: 20,
    color: '#fff',
    marginTop: 10,
  },
  trackingSugar: {
    backgroundColor: '#f44336',
  },
  trackingWeight: {
    backgroundColor: '#4caf50',
  },
  trackingBlood: {
    backgroundColor: '#2196f3',
  },
  healthyTips: {
    backgroundColor: '#ff9800',
  },
  header: {
    fontSize: 21,
    padding:10,
    textAlign:'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default TrackingPage;
