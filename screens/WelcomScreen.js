import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { AuthContext } from "../Context/AuthContext";

export default function Welcome({ navigation }) {
  const { DonorClick, MedClick} = useContext(AuthContext);
  const Donor = () =>{
     DonorClick()
     navigation.navigate('Login')
  }
  const Med = () =>{
    MedClick()
    navigation.navigate('LoginMed')
 }
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor:'#fff' }}
    >
    <View style={{marginBottom:70, alignItems:'center'}}>
    <Animatable.Text animation="slideInDown" style={{marginBottom:7,color:'#D10000',  fontSize:30, fontWeight:'700', fontFamily:'serif'}}>Welcome Hero</Animatable.Text>
    <Text style={{ marginLeft:10,  marginRight:10,  fontSize:15, fontFamily:'serif'}}>Please choose how best you can become a </Text>
    <Animatable.Text animation="fadeInLeft"Text style={{color:'green', fontWeight:'bold', fontSize:25, marginTop:7}}>HealthDriver</Animatable.Text>
    </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "90%",
        }}
      >
        <View style={{flexDirection:'column', alignItems:'center'}}>
          <TouchableOpacity onPress={() => Med()}>
            <Animatable.Image animation="slideInLeft"
              source={require("../assets/plus.png")}
              style={{ width: 80, height: 80, paddingLeft:8 }}
            />
            <Text style={{textAlign:'center', }}>Medical Unit</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => Donor()}>
            <Animatable.Image animation="slideInRight"
              source={require("../assets/donor.png")}
              style={{ width: 80, height: 80,  }}
            />
            <Text style={{textAlign:'center'}}>Donor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
