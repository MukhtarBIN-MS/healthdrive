import {
  doc,
  getDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { getDatabase, ref, set, onValue } from "firebase/database";

import { app } from "../firebase-config";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../Context/AuthContext";
import SelectDropdown from "react-native-select-dropdown";
import InputField from "../components/InputField";

const db2 = getFirestore(app);
const db = getDatabase();



export default function EditProfileScreen({ navigation }) {
  const refRBSheet = useRef();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [clinicname, setClinicName] = useState("");
  const [rcnumber, setRCNumber] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");



 

  
  useEffect(() => {
    const postListRef = ref(db, `med-users/${user.uid}`);

    onValue(postListRef, (snapshot) => {
      if (snapshot.exists()) {
        const profile = snapshot.val();

        setIsData(true);
        setData(profile);
      } else {
        console.log("No data available");
      }
    });
  }, []);
  useEffect(() => {
    if (isData) {
      setClinicName(data && data["clinicname"] ? data["clinicname"] : "");
      setRCNumber(data && data["rcnumber"] ? data["rcnumber"] : "");
      setAddress(data && data["address"] ? data["address"] : "");
      setState(data && data["state"] ? data["state"] : "");

    }
  }, [isData, data]);

  const { user, LogoutAsMed } = useContext(AuthContext);

  const  writeUserData = async (clinicname, rcnumber, state, address)  => {
    setIsLoading(true);
    const db = getDatabase();
    await set(ref(db, "med-users/" + user.uid), {
      clinicname:clinicname,
      rcnumber:rcnumber,
      state: state,
      address: address,
     

    })
      .then(() => {
        setIsLoading(false);
        Alert.alert("Edit Profile", "Profile Edited Successfully");
        navigation.navigate("Profile");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={27} />
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <MaterialIcons
            name="arrow-back"
            size={25}
            color="#666"
            style={{ alignItems: "flex-start", marginLeft: 20, marginTop: 15 }}
          />
        </TouchableOpacity>
        <View style={styles.container}>

          <Text style={styles.userName}>
            {data && data["clinicname"] ? data["clinicname"] : user.email}
          </Text>
        </View>

        <View style={{ flex: 3, padding: 30 }}>
          <InputField
            label={"Clinic Name"}
            value={clinicname}
            autoCapitalize={"none"}
            onChangeText={(val) => setClinicName(val)}
            icon={
              <MaterialIcons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
          />
          <InputField
            label={"RC NUMBER"}
            value={rcnumber}
            autoCapitalize={"none"}
            onChangeText={(val) => setRCNumber(val)}
            icon={
              <MaterialIcons
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType={"phone-pad"}
          />
      
          <InputField
            label={"State"}
            value={state}
            autoCapitalize={"none"}
            onChangeText={(val) => setState(val)}
            icon={
              <Ionicons
                name="location"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
          />
          <InputField
          label={"Address"}
          value={address}
          autoCapitalize={"none"}
          onChangeText={(val) => setAddress(val)}
          icon={
            <Ionicons
              name="location"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />

          <TouchableOpacity
            onPress={() => writeUserData(clinicname, rcnumber, state, address)}
            style={{
              backgroundColor: "#D10000",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              borderRadius: 10,
              marginBottom: 30,
            }}
          >
            <Text style={{ fontSize: 16, color: "#fff" }}>Edit</Text>
          </TouchableOpacity>
  
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#333333",
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
});
