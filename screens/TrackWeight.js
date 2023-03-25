import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';


const WeightInformation = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState('');
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const bmi = weight / ((height / 100) * (height / 100));
    setResult(bmi.toFixed(2));
    setWeight('')
    setHeight('')

    if (bmi < 18.5) {
      setCategory('Underweight');
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setCategory('Normal');
    } else if (bmi >= 25 && bmi <= 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };
  return (
    <View style={styles.container}>
    <View style={{marginBottom:30}}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Body Mass Index (BMI) Categories:</Text>
      </View>
      <View style={styles.categoryContainer}>
        <View style={[styles.category, styles.underweight]}>
          <Text style={styles.categoryText}>Underweight</Text>
          <Text style={styles.categoryText}>&lt;18.5</Text>
        </View>
        <View style={[styles.category, styles.normal]}>
          <Text style={styles.categoryText}>Normal</Text>
          <Text style={styles.categoryText}>18.5-24.9</Text>
        </View>
        <View style={[styles.category, styles.overweight]}>
          <Text style={styles.categoryText}>Overweight</Text>
          <Text style={styles.categoryText}>25-29.9</Text>
        </View>
        <View style={[styles.category, styles.obese]}>
          <Text style={styles.categoryText}>Obese</Text>
          <Text style={styles.categoryText}>&gt;30</Text>
        </View>
      </View>
      </View>
      <View style={{ alignItems:'center', justifyContent:'center'}}>
      <Text style={styles.text}>Enter your weight in kg:</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        onChangeText={text => setWeight(text)}
        value={weight}
      />
      <Text style={styles.text}>Enter your height in cm:</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        onChangeText={text => setHeight(text)}
        value={height}
      />
      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Calculate BMI</Text>
      </TouchableOpacity>
      {result !== '' && (
        <Text style={{fontSize:20, marginTop:20, color: result < 18.8 ? 'lightblue': result >18.5 && result <24.6 ? 'lightgreen' : result>25.9 && result<29.9 ? 'yellow' : 'red'}}>
          Your BMI is: {result} ({category})
        </Text>
      )}
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
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center'
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category: {
    width: '45%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  categoryText: {
    fontSize: 18,
  },
  underweight: {
    backgroundColor: 'lightblue',
  },
  normal: {
    backgroundColor: 'lightgreen',
  },
  overweight: {
    backgroundColor: 'yellow',
  },
  obese: {
    backgroundColor: 'red',
  },
  text: {
    fontSize: 18,
  },
  input: {
    borderBottomColor:'#ccc',
     borderBottomWidth:1,
     paddingBottom:8,
     marginBottom:25,
     width:'80%', 
     padding:10
  },
  button: {
    backgroundColor: 'darkgreen',
    padding: 10,
    borderRadius: 5,
    width: '50%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default WeightInformation;
