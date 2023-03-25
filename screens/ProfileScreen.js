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
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebase-config";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../Context/AuthContext";

const db2 = getFirestore(app);
const db = getDatabase();

export default function ProfileScreenMed({ navigation }) {
  const { user, LogoutAsMed } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [isData, setIsData] = useState(false);

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", }}>
      {isData ? (
        <View style={styles.container}>
        <View style={{alignItems:'center'}}>

            <Image
              style={styles.userImg}
              source={data['profile_picture'] ? {uri : data['profile_picture'] } : require('../assets/no-avatar.jpg')}
            />
            <Text style={styles.userName}>{isData ? data['username']: user.email}</Text>
            <View style={styles.userBtnWrapper}>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => LogoutAsMed()}
              >
                <Text style={styles.userBtnText}>Logout</Text>
              </TouchableOpacity>
              </View>
          </View>
          <View style={{padding: 10, flexDirection: "column", marginBottom:10, borderRadius:10, borderStyle:'solid', borderWidth:1, borderColor:'#666'  }}>
            <Text
              style={{
             
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: 17,
                textAlign: "center",
              }}
            >
              My Details
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  Full Name :
                </Text>
              </View>
              <Text style={{ textAlign: "center", fontSize: 17 }}>
               {data['name']}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  Gender :
                </Text>
              </View>
              <Text style={{ textAlign: "center", fontSize: 17 }}> {data['gender']}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>Age :</Text>
              </View>
              <Text style={{ textAlign: "center", fontSize: 17 }}> {data['age']}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Fontisto
                  name="blood-test"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  Blood Group :
                </Text>
              </View>
              <Text style={{ textAlign: "center", fontSize: 17 }}> {data['blood_type']}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="call"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  Contact :
                </Text>
              </View>
              <Text style={{ textAlign: "center", fontSize: 17 }}>
              {data['contact']}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="location"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  State :
                </Text>
              </View>
              <Text style={{ textAlign: "center", fontSize: 17 }}> {data['state']}</Text>
            </View>
          </View>
          <TouchableOpacity
          onPress={() =>
            navigation.navigate('Edit Profile')
          }
          style={{
            backgroundColor: "green",
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
      ) : (
        <View style={styles.container}>
        <View style={{alignItems:'center'}}>

            <Image
              style={styles.userImg}
              source={require("../assets/no-avatar.jpg")}
            />
            <Text style={styles.userName}>{user.email}</Text>
            <View style={styles.userBtnWrapper}>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => LogoutAsMed()}
              >
                <Text style={styles.userBtnText}>Logout</Text>
              </TouchableOpacity>
              </View>
          </View>
          <View style={{ flex: 2, padding: 30, flexDirection: "column",  marginBottom:10, borderRadius:10, borderStyle:'solid', borderWidth:1, borderColor:'#666' }}>
            <Text
              style={{
                marginBottom: 30,
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: 17,
                textAlign: "center",
              }}
            >
              My Details
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  Full Name :
                </Text>
              </View>
              <Text style={{ textAlign: "center", fontSize: 17 }}>
            Not Set
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  Gender :
                </Text>
              </View>
              <Text style={{ textAlign: "center", fontSize: 17 }}> Not Set</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons
                  name="person-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>Age :</Text>
              </View>
              <Text style={{ textAlign: "center", fontSize: 17 }}> Not Set</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Fontisto
                  name="blood-test"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  Blood Group :
                </Text>
              </View>
              <Text style={{ textAlign: "center", fontSize: 17 }}> Not Set </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="call"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  Contact :
                </Text>
              </View>
              <Text style={{ textAlign: "center", fontSize: 17 }}>
              Not Set
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="location"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  State :
                </Text>
              </View>
              <Text style={{ textAlign: "center", fontSize: 17 }}> Not Set</Text>
            </View>
          </View>
          <TouchableOpacity
          onPress={() =>
            navigation.navigate('Edit Profile')
          }
          style={{
            backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <Text style={{ fontSize: 16, color: "#fff" }}>Edit</Text>
        </TouchableOpacity>

        </View>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    
 
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
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  userBtnText: {
    color: "#333",
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
