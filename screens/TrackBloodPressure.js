import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from '@expo/vector-icons/Ionicons';

const BloodPressureInformation = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Blood Pressure Categories:</Text>
      </View>
      <View style={styles.categoryContainer}>
        <View style={[styles.category, styles.normalBP]}>
          <Text style={styles.categoryText}>Normal</Text>
          <Text style={styles.categoryText}>&lt;120 mmHg/80 mmHg</Text>
        </View>
        <View style={[styles.category, styles.elevatedBP]}>
          <Text style={styles.categoryText}>Elevated</Text>
          <Text style={styles.categoryText}>120-129 mmHg/&lt;80 mmHg</Text>
        </View>
        <View style={[styles.category, styles.highBP]}>
          <Text style={styles.categoryText}>High Blood Pressure (Stage 1)</Text>
          <Text style={styles.categoryText}>130-139 mmHg/80-89 mmHg</Text>
        </View>
        <View style={[styles.category, styles.hypertension]}>
          <Text style={styles.categoryText}>Hypertension (Stage 2)</Text>
          <Text style={styles.categoryText}>&gt;140 mmHg/&gt;90 mmHg</Text>
        </View>
      </View>
      <View style={{marginTop:20}}>
      <TouchableOpacity
      onPress={() =>
        navigation.navigate('Track Blood Pressure History')
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
      <Text style={{ fontSize: 16, color: "#fff" }}>Track My Blood Pressure</Text>
    </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#fff'
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category: {
    width: '45%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 15,
    textAlign:'center'
  },
  normalBP: {
    backgroundColor: 'lightgreen',
  },
  elevatedBP: {
    backgroundColor: 'yellow',
  },
  highBP: {
    backgroundColor: 'orange',
  },
  hypertension: {
    backgroundColor: 'red',
  },
});

export default BloodPressureInformation;
