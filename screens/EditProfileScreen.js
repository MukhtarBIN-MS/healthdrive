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
import * as ImagePicker from "expo-image-picker";
import { getStorage,ref as ref2, uploadBytes, getDownloadURL } from "firebase/storage";
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
const no_avatar_image = 'https://firebasestorage.googleapis.com/v0/b/donordrive-9c333.appspot.com/o/no-avatar.jpg?alt=media&token=0fa6ee28-6c0d-437c-ae67-85cf7d6849ba';

const genderSelect = ["Male", "Female"];
const bloodType = ["A+", "O", "B+", "AB"];

export default function EditProfileScreen({ navigation }) {
  const refRBSheet = useRef();
  const [image, setImage] = useState(null);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [selectedValue, setSelectedValue] = useState("");


 

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
    const storageRef = ref2(storage, `user_photos/${filename}`);

   const task = async () =>{
    const metadata = {
      name: filename,
      contentType: 'image/jpeg',
    };
    await uploadBytes(storageRef, blobFile, metadata);
   }
    
    try {
      await task()
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

  useEffect(() => {
    const postListRef = ref(db, `users/${user.uid}`);

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
      setImage(data && data["profile_picture"] ? data["profile_picture"] : "")
      setName(data && data["name"] ? data["name"] : "");
      setAge(data && data["age"] ? data["age"] : "");
      setGender(data && data["gender"] ? data["gender"] : "");
      setSelectedValue(data && data["blood_type"] ? data["blood_type"] : "");
      setContact(data && data["contact"] ? data["contact"] : "");
      setState(data && data["state"] ? data["state"] : "");
    }
  }, [isData, data]);

  const { user, LogoutAsMed } = useContext(AuthContext);

  const  writeUserData = async (name, age, state, contact, blood_type, gender,) => {
    setIsLoading(true);
    const imageUrl = await upLoadImage();
    console.log(`imageUrl: ${imageUrl}`);
    const db = getDatabase();
    await set(ref(db, "users/" + user.uid), {
      name: name,
      age: age,
      state: state,
      contact: contact,
      blood_type: blood_type,
      gender: gender,
      profile_picture: imageUrl
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
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.userImg}
          />
        ) : (
          <Image
          style={styles.userImg}
          source={data['profile_picture'] ? {uri : data['profile_picture'] } : require('../assets/no-avatar.jpg')}
        />
        )}

          </TouchableOpacity>
          <Text style={styles.userName}>
            {data && data["name"] ? data["name"] : user.email}
          </Text>
        </View>

        <View style={{ flex: 3, padding: 30 }}>
          <InputField
            label={"Full Name"}
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
            label={"Age"}
            value={age}
            autoCapitalize={"none"}
            onChangeText={(val) => setAge(val)}
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
              Gender{"\n"}
            </Text>
            <SelectDropdown
              data={genderSelect}
              defaultValue={gender}
              onSelect={(gender) => {
                setGender(gender);
                console.log(gender);
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
              Blood Type
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

          <TouchableOpacity
            onPress={() => writeUserData(name, age, state, contact, selectedValue, gender)}
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
      </ScrollView>
      <RBSheet
        animationType="slide"
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            backgroundColor: "#e4e4e4",
            borderColor: "#333",
            borderStyle: "solid",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: "green",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              borderRadius: 10,
              marginBottom: 30,
            }}
          >
          <View style={{flexDirection:'row'}}>
          <MaterialIcons
          name="add-photo-alternate"
          size={25}
          color="#fff"
          style={{  marginRight:5}}
        />
            <Text style={{ fontSize: 16, color: "#fff" }}>
              Choose from gallery
            </Text>
            </View>
          </TouchableOpacity>

          <View style={{ alignItems: "center", flexDirection:'row' }}>

          <TouchableOpacity
            onPress={pickImageCamera}
            style={{
              backgroundColor: "green",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              borderRadius: 10,
              marginBottom: 30,
            }}
          >
          <View style={{flexDirection:'row'}}>
          <MaterialIcons
          name="camera-alt"
          size={25}
          color="#fff"
          style={{  marginRight:5}}
        />
            <Text style={{ fontSize: 16, color: "#fff" }}>
             Take from camera
            </Text>
            </View>
          </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
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
