import React,{useContext, useState} from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from 'react-native-animatable';
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import MyImage from "../assets/logo.png";
import Google from "../assets/google.png";
import Facebook from "../assets/facebook.png";
import Twitter from "../assets/twitter.png";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../Context/AuthContext";


export default function RegisterMedical({ navigation }) {
  
  const {RegisterAsMed} = useContext(AuthContext);

  const [display, setDisplay] = useState(false)
  const [display2, setDisplay2] = useState(false)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword ] = useState();
  const [contact, setContact] = useState('');

const createAccountMed =  (password, confirmPassword) => {
    try {
      if (password === confirmPassword) {
          RegisterAsMed(email, password);
      }
      else if(contact==''){
        alert('Please Provide Clinic RC NUMBER')
      }
      
      else {
        alert("Passwords don't match");
      }
    } catch (e) {
      alert('There was a problem creating your account');
    }
  };

  const upDateDisplay1 = () => {
      setDisplay(!display)
  }
  const upDateDisplay2 = () => {
    setDisplay2(!display2)
}

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
 

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
    setShow(true);
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#fff" }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <Animatable.Image animation="fadeInLeft" source={MyImage} style={{ width: 300, height: 300 }} />
        </View>
        <Animatable.View animation="fadeInUp">
        <Text
          style={{
            fontFamily: "serif",
            fontSize: 28,
            fontWeight: "500",
            marginBottom: 30,
          }}
        >
          Register
        </Text>
  
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image source={Google} style={{ width: 27, height: 27 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image source={Facebook} style={{ width: 27, height: 27 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Image source={Twitter} style={{ width: 27, height: 27 }} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: "serif",
            textAlign: "center",
            color: "#666",
            marginBottom: 30,
          }}
        >
          Or, Register with email ....
        </Text>


        <InputField
          label={"Medical Unit ID / Email"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType={"email-address"}
          value={email}
          autoCapitalize={'none'}
          onChangeText={(val)=>setEmail(val)}
        />
        <InputField
        label={"RC NUMBER"}
        value={contact}
        autoCapitalize={"none"}
        onChangeText={(val) => setContact(val)}
        icon={
          <Ionicons
            name="person"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
        }
        keyboardType={"phone-pad"}
      />
        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType={display ? 'text' :'password'}
          value={password}
          autoCapitalize={'none'}
          onChangeText={(val)=>setPassword(val)}
          extraIcon={<TouchableOpacity onPress={()=> upDateDisplay1()}>{display ? <Ionicons name="eye-outline" size={20} color="#666" style={{ marginRight:5}} /> : <Ionicons name="eye-off-outline" size={20} color="#666" style={{ marginRight:5}} /> }</TouchableOpacity>}  /> 

        <InputField
          label={" Confirm Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType={display2 ? 'text':'password'}
          labelValue={confirmPassword}
          autoCapitalize={'none'}
          onChangeText={(val)=>setConfirmPassword(val)}
          extraIcon={<TouchableOpacity onPress={()=> upDateDisplay2()}>{display2 ? <Ionicons name="eye-outline" size={20} color="#666" style={{ marginRight:5}} /> : <Ionicons name="eye-off-outline" size={20} color="#666" style={{ marginRight:5}} /> }</TouchableOpacity>}  /> 


        <CustomButton label={"Register"} buttomFunction={()=> {contact === '' ? alert('Please type your Clinic RC NUMBER') : password === confirmPassword ? RegisterAsMed(email, password) :  alert('Password dont match')}} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginMed")}>
            <Text style={{ color: "grey", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}
