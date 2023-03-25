import { View, Text, Image, Button, Platform, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { MaterialIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { AuthContext } from '../Context/AuthContext';

const db = getDatabase();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    autoDismiss: false
  }),
});


export default function PatientDetailScreen({navigation}) {
  const { user } = useContext(AuthContext)
  const [data, setData] = useState(null);
  const [isData, setIsData] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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

  const ListMe = () =>{
       Alert.alert('Profile Listed Successfully')
  }
  const NotSet = () =>{
    Alert.alert('Profile Need to be Set')
}
  

  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const route = useRoute();
  const { postId, patientName, Request, contact, Needs, AddressName, Address, Picture, bloodType, deadLine} = route.params;

  let normalDate = new Date(deadLine);
  const newDeadline = normalDate.getDate();

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Your Reminder",
        body: `${patientName} - ${Request} Donation \nAt ${AddressName}` ,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 86400  },
    }).then(()=>{
      console.log(newDeadline)
      Alert.alert('Remider', 'Reminder set successfully')
    })
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

  return (
    
    <SafeAreaView  style={{flex:1, backgroundColor:'#fff',padding:20, marginTop:30}}>
    <ScrollView>
    <TouchableOpacity onPress={() => navigation.navigate("home2")}>
    <MaterialIcons
      name="arrow-back"
      size={25}
      color="#666"
      style={{ alignItems: "flex-start", marginBottom:30 }}
    />
  </TouchableOpacity>
    <View style={{}}>
    <Text style={{marginBottom:30, fontSize:20, fontWeight:'bold'}}>{`${patientName}'s Detail Page`}</Text>
    <Image source={Picture ? {uri: Picture} : require('../assets/no-avatar.jpg')} style={{ marginBottom:10, height:110, width:110, borderRadius:200/2}}/> 
    <View style={{marginBottom:20, backgroundColor:'transparent', }}>
     <View style={{flexDirection:'row', marginBottom:10 }}>
     <Text style={{fontWeight:'bold', fontSize:17, marginRight:10}}>Patient Name :</Text> 
     <Text style={{fontSize:17}}>{patientName}</Text>
     </View> 
     <View style={{flexDirection:'row', marginBottom:10 }}>
     <Text style={{fontWeight:'bold',fontSize:17, marginRight:10}}>Request Type :</Text> 
     <Text style={{fontSize:17}}>{Request}</Text>
     </View> 
     <View style={{flexDirection:'row', marginBottom:10 }}> 
     <Text style={{fontWeight:'bold',fontSize:17, marginRight:10}}>Blood Type : </Text> 
     <Text style={{fontSize:17}}>{bloodType}</Text>
     </View> 
     <View style={{flexDirection:'row', marginBottom:10 }}> 
     <Text style={{fontWeight:'bold',fontSize:17, marginRight:10}}>Clinic Name: </Text>
      <Text style={{fontSize:17}}>{AddressName}</Text>
      </View> 
     <View style={{flexDirection:'row', marginBottom:10 }}> 
     <Text style={{fontWeight:'bold',fontSize:17, marginRight:10}}>Address: </Text> 
     <Text style={{fontSize:17}}>{Address}</Text>
     </View> 
     <View style={{flexDirection:'row', marginBottom:10  }}>
     <Text style={{fontWeight:'bold',fontSize:17, marginRight:10}}>Contact : </Text>
      <Text style={{fontSize:17}}>{contact ? contact :'no number'}</Text>
    </View>  
    <View style={{flexDirection:'row', marginBottom:10  }}>
    <Text style={{fontWeight:'bold',fontSize:17, marginRight:10}}>DeadLine : </Text>
     <Text style={{fontSize:17}}>{deadLine}</Text>
   </View>  
   </View>
    </View>
    <TouchableOpacity onPress={()=> refRBSheet2.current.open()} style={{backgroundColor:'green', justifyContent:'center', alignItems:'center', padding:20, borderRadius:10, marginBottom:30}}>
    <Text style={{ fontSize:16, color:'#fff'}}>List me as Donor</Text>
   </TouchableOpacity>
   <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{backgroundColor:'green', justifyContent:'center', alignItems:'center', padding:20, borderRadius:10, marginBottom:30}}>
   <Text style={{ fontSize:16, color:'#fff'}}>Schedule Reminder</Text>
  </TouchableOpacity>
  </ScrollView>


    <RBSheet
    animationType="slide"
    ref={refRBSheet}
    closeOnDragDown={true}
    closeOnPressMask={true}
    customStyles={{
      wrapper: {
        backgroundColor: "transparent"
      },
      draggableIcon: {
        backgroundColor: "#000"
      },
      container:{
        backgroundColor: "#e4e4e4",
        borderColor:'#333',
        borderStyle:'solid',
        borderTopLeftRadius:20,
        borderTopRightRadius:20
      }
    }}
  >
  <View style={{padding:10, alignItems:'center',}}>
  <View style={{marginBottom:20}}>
     <Text style={{fontSize:17, color:'#333', fontFamily:'serif', fontWeight:'bold', marginBottom:10}}>Title : {`${patientName} - ${Request} Donation`}</Text>
     <Text style={{fontSize:17, color:'#333', fontFamily:'serif', fontWeight:'bold',  marginBottom:10}}>At : {`${AddressName}`}</Text>
     <Text style={{fontSize:17, color:'#333', fontFamily:'serif', fontWeight:'bold',  marginBottom:10}}>Before : {`${deadLine}`}</Text>
     
     </View>
  </View>
  <View style={{alignItems:'center'}}>
  <TouchableOpacity onPress={()=> schedulePushNotification()} style={{backgroundColor:'green', width:'50%', justifyContent:'center', alignItems:'center', padding:20, borderRadius:10, marginBottom:30}}>
  <Text style={{ fontSize:16, color:'#fff'}}>Schedule Reminder</Text>
 </TouchableOpacity>
 </View>
  
  </RBSheet>

  <RBSheet
  animationType="slide"
  ref={refRBSheet2}
  closeOnDragDown={true}
  closeOnPressMask={true}
  customStyles={{
    wrapper: {
      backgroundColor: "transparent"
    },
    draggableIcon: {
      backgroundColor: "#000"
    },
    container:{
      backgroundColor: "#e4e4e4",
      borderColor:'#333',
      borderStyle:'solid',
      borderTopLeftRadius:20,
      borderTopRightRadius:20
    }
  }}
>
<View style={{padding:10, }}>
<View style={{ marginBottom:20}}>
<View style={{flexDirection:'row', justifyContent:'space-around'}}>
   <Text style={{fontSize:17, color:'#333', fontFamily:'serif', fontWeight:'bold', }}>My Name : </Text> 
   <Text style={{fontSize:17, color:'#333', fontFamily:'serif', fontWeight:'bold', }}> {isData ? data['name'] : 'Not Set'}</Text>
</View>
<View style={{flexDirection:'row', justifyContent:'space-around'}}>
   <Text style={{fontSize:17, color:'#333', fontFamily:'serif', fontWeight:'bold', }}>My Blood Tye : </Text> 
   <Text style={{fontSize:17, color:'#333', fontFamily:'serif', fontWeight:'bold', }}> {isData ? data['blood_type'] : 'Not Set'}</Text>
</View>
<View style={{flexDirection:'row', justifyContent:'space-around'}}>
   <Text style={{fontSize:17, color:'#333', fontFamily:'serif', fontWeight:'bold', }}>My Age : </Text> 
   <Text style={{fontSize:17, color:'#333', fontFamily:'serif', fontWeight:'bold', }}> {isData ? data['age'] : 'Not Set'}</Text>
</View>
<View style={{flexDirection:'row', justifyContent:'space-around'}}>
   <Text style={{fontSize:17, color:'#333', fontFamily:'serif', fontWeight:'bold', }}>My Contact : </Text> 
   <Text style={{fontSize:17, color:'#333', fontFamily:'serif', fontWeight:'bold', }}> {isData ? data['contact'] : 'Not Set'}</Text>
</View>
  
   </View>
</View>
<View style={{alignItems:'center'}}>
<TouchableOpacity onPress={()=> isData ? ListMe() : NotSet()} style={{backgroundColor:'green', width:'50%', justifyContent:'center', alignItems:'center', padding:20, borderRadius:10, marginBottom:30}}>
<Text style={{ fontSize:16, color:'#fff'}}>List me</Text>
</TouchableOpacity>
</View>

</RBSheet>

      
    </SafeAreaView>
  )
}

