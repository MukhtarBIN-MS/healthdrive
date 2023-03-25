import {
  doc,
  getDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { app } from "../firebase-config";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../Context/AuthContext";

const db = getFirestore(app);

export default function RequestCard({ item }) {
  const [isLoading, setisLoading] = useState(false);
  const { userRole } = useContext(AuthContext);

  const navigation = useNavigation();
  const HandleRoute = async () => {
    setisLoading(true);
    const postRef = doc(db, "posts", item.id);
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
      const postData = postDoc.data();
      navigation.navigate("Patient Page", {
        postId: postData.id,
        patientName: postData.Patient,
        Request: postData.requestType,
        Needs: postData.BloodNeeds,
        AddressName: postData.clinicName,
        Address: postData.location,
        Picture: postData.patientPic,
        bloodType: postData.bloodType,
        contact: postData.contact,
        deadLine: postData.deadLine,
      });
      setisLoading(false);
    } else {
      console.log("No product with the given id");
    }
  };

  return (
    <View>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={27} />
          <Text>Loading</Text>
        </View>
      ) : (
        <View
          style={{
            borderStyle: "solid",
            backgroundColor: "#fff",
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 7,
            padding: 10,
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row", marginBottom:10 }}>
            <Text>{item.clinicName}</Text>
            <MaterialIcons
              name="verified"
              size={13}
              color="blue"
              style={{ marginTop: 3, marginLeft: 5 }}
            />
            </View>
            <View style={{alignItems:'center', marginBottom:20}}>
              <Image
                source={item.patientPic ? { uri: item.patientPic } : require('../assets/no-avatar.jpg')}
                style={{ width: 130, height: 130, borderRadius: 200 / 2 }}
              />      
          </View>
          <View style={{ marginBottom:30}}>
          <Text style={{fontSize: 13,fontWeight: "bold", fontFamily: "serif", }}>Patient Name : {item.Patient}</Text>
          <Text style={{fontSize: 13,fontWeight: "bold", fontFamily: "serif", }}>Request Type : {item.requestType} </Text>
          <Text style={{fontSize: 13,fontWeight: "bold", fontFamily: "serif", }}>Blood Type :  {item.bloodType}</Text>
          <Text style={{fontSize: 13,fontWeight: "bold", fontFamily: "serif", }}>Clinic Address : {item.location}</Text>   
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
           <Text style={{fontSize: 10,fontFamily: "serif", marginTop:10 }}>DeadLine: {item.deadLine}</Text>
           <TouchableOpacity
           onPress={userRole == 'Donor' ? HandleRoute : null}
           style={{
             backgroundColor: "green",
             marginBottom: 30,
             padding: 10,
             width: "30%",
            
             marginBottom: 10,
           }}
         >
           <Text
             style={{
               fontSize: 10,
               fontFamily: "serif",
               textAlign: "center",
               color: "#fff",
             }}
           >
             {userRole =='Donor' ? item.donateLabel :  <Ionicons name="trash-bin" size={23}  style={{ marginRight: 5 }} color="#fff" />}
           </Text>
         </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

{
  /** <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="heart"
                size={23}
                style={{ marginRight: 5 }}
                color="grey"
              />
              <Text
                style={{fontSize: 16,fontWeight: "bold", fontFamily: "serif", }}
              >{`${item.requestType} Request`}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View
                style={{
                  borderStyle: "solid",
                  backgroundColor: "#333",
                  color: "#fff",
                  borderWidth: 1,
                  borderRadius: 7,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 5,
                }}
              >
                <Text style={{ color: "#fff" }}>{item.bloodType}</Text>
              </View>
              <Image
                source={{ uri: item.patientPic }}
                style={{ width: 50, height: 50, borderRadius: 200 / 2 }}
              />
            </View>
          </View>

          <View style={{ flexDirection: "column", marginBottom: 20 }}>
            <Text
              style={{ fontSize: 12, fontWeight: "bold", fontFamily: "serif" }}
            >
              Patient : {item.Patient}
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: "bold", fontFamily: "serif" }}
            >
              Clinic Name: {item.clinicName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <Text
              style={{ fontSize: 10, fontWeight: "bold", fontFamily: "serif" }}
            >
              Blood Needs:{" "}
              {`${item.BloodNeeds} ${item.remaining} Units remaining`}
            </Text>
            <Text style={{ fontSize: 10, fontFamily: "serif" }}>
              Until: {item.deadLine.toString()}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Ionicons
                name="location"
                size={23}
                style={{ marginRight: 5 }}
                color="#333"
              />
              <Text
                style={{
                  fontfamily: "serif",
                  fontSize: 11,
                  width: 150,
                  color: "#333",
                }}
              >
                {item.location}
              </Text>
            </View>
            <TouchableOpacity
              onPress={userRole == 'Donor' ? HandleRoute : null}
              style={{
                backgroundColor: "green",
                marginBottom: 30,
                padding: 10,
                width: "30%",
               
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fonSize: 15,
                  fontfamily: "serif",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {userRole =='Donor' ? item.donateLabel :  <Ionicons name="trash-bin" size={23}  style={{ marginRight: 5 }} color="#fff" />}
              </Text>
            </TouchableOpacity>
          </View>
 */
}
