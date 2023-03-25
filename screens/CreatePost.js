import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Alert,
  ActivityIndicator
} from "react-native";
import { getDatabase, ref as ref2, set, onValue } from "firebase/database";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useContext, useEffect } from "react";
import ActionButton from "react-native-action-button";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, addDoc, collection, query, where } from "firebase/firestore";
import { app } from "../firebase-config";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import InputField from "../components/InputField";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../Context/AuthContext";

const bloodType = ["A+", "O", "B+", "AB"];
const donationType = ["Blood", "Kidney", "Heart", "Lung","Pancreas", "intestines"];

const db2 = getFirestore(app);
const db = getDatabase();

export default function CreatePost() {
  const { user } = useContext(AuthContext)
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({});
  const [isData, setIsData] = useState(false);
  const [uploadng, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [name, setName] = useState();
  const [clinicName, setClinicName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [donType, setDonType] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());


  useEffect(() => {
    const postListRef = ref2(db, `med-users/${user.uid}`);

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
      setAddress(data && data["address"] ? data["address"] : "");

    }
  }, [isData, data]);

  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={27} />
        <Text>Loading</Text>
      </View>
    );
  }

  const SubmitPost = async () =>{
    try{
      setLoading(true);
      const imageUrl = await upLoadImage();
      console.log(`imageUrl: ${imageUrl}`);

      await addDoc(collection(db2, "posts"), {
        id:user.uid,
        requestType: donType,
        bloodType: selectedValue,
        patientPic: imageUrl,
        contact: contact,
        Patient: name,
        BloodNeeds: "4 Units",
        clinicName: clinicName,
        deadLine: date.toDateString(),
        location: address,
        donateLabel: "View details",
        remaining: 2,
        timestamp: Date.now()
      }).then(()=>{
          setLoading(false);
          Alert.alert('Post Published', 'Your post has been published successfully')
      }).catch((err)=>{
        console.log(err)
      })
    }catch(err){
      console.log(err)
    }
  }

  const upLoadImage = async () => {
    if( image == null){
      return null
    }
    const uploadUri = image;
    const response = await fetch(uploadUri)
    const blobFile = await response.blob();
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1, uploadUri.length);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension
    const storage = getStorage();
    const storageRef = ref(storage, `photos/${filename}`);

   const task = async () =>{
    const metadata = {
      name: filename,
      contentType: 'image/jpeg',
    };
    await uploadBytes(storageRef, blobFile, metadata);
   }
    
    setUploading(true);
    try {
      await task()
      setUploading(false);
      setImage(null);
      const urL = getDownloadURL(storageRef);
      return urL;
    } catch (error) {
      console.log(error);
      return null;
    }
   
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
     
    }
  };
  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    
    }
  };

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontFamily: "serif",
            fontFamily: "Roboto",
            fontSize: 28,
            fontWeight: "500",
            marginBottom: 30,
          }}
        >
          Create New Patient
        </Text>

        <View>
          <InputField
            label={"Patient Name"}
            value={name}
            autoCapitalize={"none"}
            onChangeText={(val) => setName(val)}
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
            label={"Clinic Name"}
            value={clinicName}
            autoCapitalize={"none"}
            onChangeText={(val) => setClinicName(val)}
            icon={
              <MaterialIcons
                name="local-hospital"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
          />
          <InputField
            label={"Clinic Adress"}
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
          <InputField
            label={"Contact"}
            value={contact}
            autoCapitalize={"none"}
            onChangeText={(val) => setContact(val)}
            icon={
              <Ionicons
                name="call"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType={"phone-pad"}
          />
          <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <Text
            style={{ paddingVertical: 7, fontSize: 13, fontFamily: "serif" }}
          >
            Donation Type{'\n'}
          </Text>
          <SelectDropdown
            data={donationType}
            defaultValue={donType}
            onSelect={(donType) => {
              setDonType(donType);
              console.log(donType);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
          />
        </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <Text
              style={{ paddingVertical: 7, fontSize: 13, fontFamily: "serif" }}
            >
              Blood Type{'\n'}(patient blood type)
            </Text>
            <SelectDropdown
              data={bloodType}
              defaultValue={selectedValue}
              onSelect={(selectedValue) => {
                setSelectedValue(selectedValue);
                console.log(selectedValue);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <Text
              style={{ paddingVertical: 7, fontSize: 16, fontFamily: "serif" }}
            >
              Deadline
            </Text>
            <TouchableOpacity
              style={{
                borderStyle: "solid",
                borderWidth: 1,
                padding: 10,
                borderColor: "#ccc",
                marginBottom: 20,
              }}
              onPress={showDatepicker}
            >
              <Text style={{ color: "#666", marginLeft: 5, marginTop: 7 }}>
                {`${date.toDateString()}`}
              </Text>
              {show && (
                <DateTimePicker
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChangeDate}
                />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 50,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "serif" }}>
              Patient Picture
            </Text>
            <ActionButton style={styles.Act} buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item
                buttonColor="#9b59b6"
                title="Camera"
                onPress={pickImageCamera}
              >
                <Ionicons name="add" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor="#9b59b6"
                title="Library"
                onPress={pickImage}
              >
                <Ionicons name="add" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          <TouchableOpacity onPress={()=> SubmitPost()} style={{backgroundColor:'#D10000', justifyContent:'center', alignItems:'center', padding:20, borderRadius:10, marginBottom:30}}>
          <Text style={{ fontSize:16, color:'#fff'}}>Post</Text>
         </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  Act: {
    top: -37,
  },
});
