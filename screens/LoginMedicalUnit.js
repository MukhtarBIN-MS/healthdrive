import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import MyImage from "../assets/logo.png";
import Google from "../assets/google.png";
import Facebook from "../assets/facebook.png";
import Twitter from "../assets/twitter.png";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../Context/AuthContext";


export default function LoginMed({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [display, setDisplay] = useState(false);

  const upDateDisplay = () => {
    setDisplay(!display);
  };

  const { LoginAsMed } = useContext(AuthContext);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#fff" }}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Animatable.Image
            animation="fadeInDown"
            source={MyImage}
            style={{ width: 300, height: 300 }}
          />
        </View>
        <Animatable.View animation="fadeInUp">
          <Text
            style={{
              fontFamily: "serif",
              fontFamily: "Roboto",
              fontSize: 28,
              fontWeight: "500",
              marginBottom: 30,
            }}
          >
            Login
          </Text>
          <InputField
            label={"Medical Unit ID / Email"}
            value={email}
            autoCapitalize={"none"}
            onChangeText={(val) => setEmail(val)}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType={"email-address"}
          />

          <InputField
            label={"Password"}
            value={password}
            autoCapitalize={"none"}
            onChangeText={(val) => setPassword(val)}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            inputType={display ? "text" : "password"}
            extraIcon={
              <TouchableOpacity onPress={() => upDateDisplay()}>
                {display ? (
                  <Ionicons
                    name="eye-outline"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                  />
                ) : (
                  <Ionicons
                    name="eye-off-outline"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                  />
                )}
              </TouchableOpacity>
            }
          />
          <TouchableOpacity onPress={()=> navigation.navigate('Reset-Password')}><Text style={{textAlign:'right', marginBottom:10, color:'#ccc'}}>Forgot password ?</Text></TouchableOpacity>

          <CustomButton label={"Login"} buttomFunction={()=> LoginAsMed(email, password)} />
          
          <Text
            style={{
              fontFamily: "serif",
              textAlign: "center",
              fontSize: 14,
              color: "#666",
              marginBottom: 30,
            }}
          >
            Or, login with ....
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
              onPress={()=> {}}
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
              onPress={()=> {}}
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
              onPress={()=>{}}
            >
              <Image source={Twitter} style={{ width: 27, height: 27 }} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text>New Hero ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("RegisterMed")}>
              <Text style={{ color: "grey", fontWeight: "700" }}>
               
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
}
