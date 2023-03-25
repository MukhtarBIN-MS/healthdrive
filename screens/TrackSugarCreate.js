import * as firebase from 'firebase/app';
import  { Firestore, Timestamp } from 'firebase/firestore';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "firebase/database";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { app } from "../firebase-config";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  getDatabase,
  set,
  ref,
  query,
  orderByChild,
  child,
  push,
  update,
  onValue,
} from "firebase/database";
import { AuthContext } from "../Context/AuthContext";





let database = getDatabase(app);
const db2 = getFirestore(app);

const Good = () => {
  alert("Hi");
};

const TrackSugarCreate = (props) => {
  const { user } = useContext(AuthContext);
  const [sugarLevel, setSugarLevel] = useState("");
  const [data, setData] = useState();
  const [isData, setIsData] = useState(false);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
 

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
    setShow(true);
  };

  function writeNewPost(sugarLevel, date) {
    const db = database;

    if (sugarLevel == ''){
      alert('Select Your Sugar Level')
    } else{

    const postData = {
      sugarLevel: sugarLevel,
      date: date.toDateString(),
      timestamp: Date.now()
    };



    const newPostKey = push(child(ref(db), "sugarLevel")).key;

    const updates = {};
    updates[`sugarLevel/${user.uid}/${newPostKey}`] = postData;

    alert('Sugar Level Created')
    setSugarLevel('')
    return update(ref(db), updates);
    }
  }

  useEffect(() => {
    const db = database;
    const postListRef = query(
      ref(db, `sugarLevel/${user.uid}`),
      orderByChild('timestamp')
    );
    
    onValue(postListRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataSugarLevel = snapshot.val();
        const sortedData = Object.values(dataSugarLevel).sort((a, b) => b.timestamp - a.timestamp);
        console.log(sortedData)
        setData(sortedData);
        setIsData(true);
      } else {
        console.log("No data available");
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <View style={{marginBottom:20, padding:20, alignItems:'center'}}>
      <Text style={styles.title}>Track Sugar Level</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter Sugar Level"
        value={sugarLevel}
        onChangeText={(text) => setSugarLevel(text)}
      />
      <TouchableOpacity style={{borderStyle:'solid', borderWidth:0.5, padding:10, width:'80%'}} onPress={showDatepicker}>
        <Text style={{ color: "#666", marginLeft: 5, marginTop: 7 }}>
         Choose Date:  {`${date.toDateString()} `}
        </Text>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            maximumDate={new Date()}
            minimumDate={new Date("1980-01-01")}
            onChange={onChangeDate}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => writeNewPost(sugarLevel, date)}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      </View>
      <Text style={{marginBottom:10, textAlign:'center', fontSize:20, fontWeight:'bold', fontFamily:'serif'}}>My Sugar Level Records</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={{padding:20,}}>
        { isData
           ? (
          <View>
            {Object.keys(data).map((key) => (
              
              <View style={{flexDirection:'column', backgroundColor: data[key]["sugarLevel"] < 70 ? '#FFC107': data[key]["sugarLevel"] >= 70 && data[key]["sugarLevel"] <= 130 ? '#4CAF50' : '#F44336'  , marginBottom: 40 , borderRadius:10, borderStyle:'solid', borderWidth:0.5, padding:20}} key={key}>
               <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:15}}>
                <Text style={{fontFamily:'serif', fontSize:16, color: data[key]["sugarLevel"]  < 70 ? '#333' : '#fff'}}>SugarLevel : </Text>
                <Text  style={{fontFamily:'serif', fontSize:16, color: data[key]["sugarLevel"]  < 70 ? '#333' : '#fff'}}>{`${data[key]["sugarLevel"]} mg/dL`}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:15}}>
                <Text  style={{fontFamily:'serif', fontSize:16, color: data[key]["sugarLevel"]  < 70 ? '#333' : '#fff'}}>Date: </Text>
                <Text  style={{fontFamily:'serif', fontSize:16, color: data[key]["sugarLevel"]  < 70 ? '#333' : '#fff'}}>{data[key]["date"]}</Text>
                </View>
                <Text  style={{fontFamily:'serif', fontSize:16, color: data[key]["sugarLevel"]  < 70 ? '#333' : '#fff'}}>Status : {data[key]["sugarLevel"] < 70 ? 'Low Blood Sugar Level': data[key]["sugarLevel"] >= 70 && data[key]["sugarLevel"] <= 130 ? 'Normal Blood Sugar Level' : 'High Blood Sugar Level'}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>No Data Recorded Yet</Text>
        </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  title: {
    fontSize: 24,
    textAlign:'center',
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 8,
    marginBottom:10,
    padding: 8,
  },
  button: {
    width: "80%",
    backgroundColor: "darkgreen",
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default TrackSugarCreate;
