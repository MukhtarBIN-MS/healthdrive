import React,{ useContext, useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import BottomTabNavigator from './BottomTabNavigator';
import { getDatabase, ref, onValue } from "firebase/database";
import { AuthContext } from '../Context/AuthContext';

const Drawer = createDrawerNavigator();

const db = getDatabase();
const no_avatar_image = 'https://firebasestorage.googleapis.com/v0/b/donordrive-9c333.appspot.com/o/no-avatar.jpg?alt=media&token=0fa6ee28-6c0d-437c-ae67-85cf7d6849ba';

const AppStack = () =>{
    const {user, Logout} = useContext(AuthContext)
    const [data, setData] = useState({});
    const [isData, setIsData] = useState(false)

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

    return(
        <Drawer.Navigator screenOptions={{ headerShown:false, drawerLabelStyle:{marginLeft:-25},
         drawerActiveBackgroundColor:'grey', drawerActiveTintColor:'#fff', drawerInactiveTintColor:'#333'}} drawerContent={(props) => {
            const filteredProps = {
                ...props,
                state: {
                  ...props.state,
                  routeNames: props.state.routeNames.filter(
                    (routeName) => {
                      routeName !== 'Patient Page' && routeName !== 'HiddenPage2';
                    }
                  ),
                  routes: props.state.routes.filter(
                    (route) =>
                      route.name !== 'Patient Page' && route.name !== 'HiddenPage2'
                  ),
                },
            };
            return (
                <View style={{flex:1}}>
                <DrawerContentScrollView {...filteredProps}   contentContainerStyle={{ backgroundColor:'darkgreen'}}>
                  <ImageBackground source={require('../assets/bg-7.jpg')} style={{ padding:20 }}>
                  <Image source={data['profile_picture'] ? {uri : data['profile_picture'] }  : require('../assets/no-avatar.jpg')} style={{width:80, height:80, borderRadius:40, marginBottom:10}} />
                  <Text style={{color:'white', fontFamily:'Roboto', fontSize:18}}>{isData ? data['name'] : user.email}</Text>
                  <View style={{flexDirection:'row'}}>
                     <Ionicons name="heart" size={11} color="white" style={{marginRight:5}}  />
                     <Text style={{color:'white', fontFamily:'Roboto', fontSize:11}}>Donor</Text>
                  </View>
                  </ImageBackground>
                  <View style={{flex:1, backgroundColor:'#fff', paddingTop:10}}>
                    <DrawerItemList {...filteredProps}  />
                  </View>
                </DrawerContentScrollView>
                <View style={{ padding:20, borderTopWidth:1, borderTopColor:'#ccc'}}> 
                 <TouchableOpacity onPress={()=>{}} style={{paddingVertical:15}}>
                   <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Ionicons name="share-social-outline" size={22}/>
                      <Text style={{ fontSize:15, fontFamily:'Roboto', marginLeft:5}}>Share</Text>
                   </View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={()=> Logout()} style={{paddingVertical:15}}>
                   <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Ionicons name="exit-outline" size={22}/>
                      <Text style={{ fontSize:15, fontFamily:'Roboto', marginLeft:5}}>Sign Out</Text>
                   </View>
                 </TouchableOpacity>
                </View>
                </View>
            );
          }}>
           <Drawer.Screen name="Home" component={BottomTabNavigator} options={{
            drawerIcon:({color})=> (
                <Ionicons name="home" size={20} color={color} />
            ),
           }} />

     </Drawer.Navigator>
    )
}

export default AppStack;