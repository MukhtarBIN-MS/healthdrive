import {
  doc,
  getDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { app } from "../firebase-config";
import { StatusBar } from "expo-status-bar";
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
import { getDatabase, ref, onValue } from "firebase/database";
import Ionicons from "@expo/vector-icons/Ionicons";
import Carousel from "react-native-snap-carousel";
import { SliderData } from "../model/Data";
import BannerSlider from "../components/BannerSlider";
import { WindowWidth } from "../utils/Dimensions";
import { AuthContext } from "../Context/AuthContext";
import RequestCard from "../components/RequestCard";


const db2 = getFirestore(app);
const db = getDatabase();



export default function Home({ navigation }) {
  const [data, setData] = useState({})
  const [isData, setIsData] = useState(false);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(()=>{
   
    const fetchPost = async () => {
      const q = query(collection(db2, "posts"), orderBy('timestamp', 'desc'));
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

  useEffect(() => {
    const postListRef = ref(db, `users/${user.uid}`);

    onValue(postListRef, (snapshot) => {
      if (snapshot.exists()) {
        const profile = snapshot.val();
        setData(profile);
        setIsData(true)
      } else {
        console.log("No data available");
      }
    });
  }, []);

  const { user } = useContext(AuthContext);
  const [requestListTab, setRequestListTab] = useState(1);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = (value) => {
    setRequestListTab(value);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="auto" />
      <ImageBackground
        source={require("../assets/bg-7.jpg")}
        style={{ height: 110, padding: 15 }}
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
                  fontSize: 17,
                  fontFamily: "Roboto",
                  color: "#fff",
                  marginBottom: 5,
                }}
              >
                Good day Hero,
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Roboto",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {isData ? data['name']: user.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={data['profile_picture'] ? {uri : data['profile_picture'] } : require('../assets/no-avatar.jpg')}
              style={{ width: 40, height: 40, borderRadius: 200 / 2 }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>


        <ScrollView style={{ padding: 10 ,}}>
      
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginVertical: 15,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 16, fontFamily: "Roboto", fontWeight: "bold" }}
            >
              Healthy Tips
            </Text>
            <TouchableOpacity>
              <Text style={{ color: "#0aada8" }}>...</Text>
            </TouchableOpacity>
          </View>

          <Carousel
            data={SliderData}
            renderItem={renderBanner}
            sliderWidth={WindowWidth - 40}
            itemWidth={300}
            loop={true}
          />
       
         
            <View style={{padding: 10 }}>
     
            {loading 
              ?
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={27} />
              <Text>Loading</Text>
            </View>:
            posts ?
            /*  <FlatList
              data={posts}
              renderItem={({ item }) => <RequestCard item={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />*/ posts.map((item)=>(
                 <View key={item.id}>
                 <RequestCard item={item} />
                 </View>
            ))
            
            : <Text style={{textAlign:'center', fontSize:20}}>No Data</Text> }

          </View>
        
          
          </ScrollView>
         
     
       
    
    </SafeAreaView>
  );
}
