import {
  doc,
  getDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { app } from "../firebase-config";
import { StatusBar } from "expo-status-bar";
import Reminder from './Reminder'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  FlatList,
  ActivityIndicator
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Carousel from "react-native-snap-carousel";
import { SliderData } from "../model/Data";
import BannerSlider from "../components/BannerSlider";
import { WindowWidth } from "../utils/Dimensions";
import { AuthContext } from "../Context/AuthContext";
import RequestCard from "../components/RequestCard";



const db2 = getFirestore(app);

export default function HomeScreenMed({ navigation }) {
  const { userRole, user } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchPost = async () => {
      const q = query(collection(db2, "posts"), where("id", "==", user.uid), orderBy('timestamp', 'desc'));
      try {
        const lists = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const { requestType,bloodType,patientPic,labelStatus, Patient,BloodNeeds,clinicName, deadLine, location,donateLabel, remaining } = doc.data();
          lists.push({ id: doc.id, requestType, bloodType, patientPic, labelStatus,Patient,BloodNeeds,clinicName, deadLine, location, donateLabel,remaining,
          });
        });
  
        setPosts(lists);
        if (loading) {
          setLoading(false);
        }
      
      } catch (err) {
        console.log(err);
      }
    }
    fetchPost();
  }, []);


  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ImageBackground
        source={require("../assets/bg-8.jpg")}
        style={{ height: 110, padding: 20 }}
        imageStyle={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <MaterialIcons
                name="sort"
                size={27}
                color="#fff"
                style={{ marginRight: 7 }}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Roboto",
                  color: "#fff",
                  marginBottom: 5,
                }}
              >
                Good Morning Hero,
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Roboto",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {user.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              borderStyle: "solid",
              borderRadius: 200 / 2,
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#D10000",
            }}
            onPress={() => navigation.navigate("New Patient")}
          >
            <Ionicons name="add" style={styles.actionButtonIcon} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontFamily: "serif",
            fontWeight: "bold",
            fontSize: 17,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          My Posts
        </Text>
        {loading ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={27} />
        <Text>Loading</Text>
      </View>: 
        <View style={{marginBottom:170}}>
        
        <FlatList
          data={posts}
          renderItem={({ item }) => <RequestCard item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        </View>
      }

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
