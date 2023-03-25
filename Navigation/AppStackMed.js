import React,{ useContext } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import { AuthContext } from '../Context/AuthContext';
import DonorsScreen from '../screens/DonorsScreen';
import CreatePost from '../screens/CreatePost';
import ProfileScreenMed from '../screens/ProfileScreenMed';
import BottomTabNavigatorMed from './BottomTabNavigatorMed';

const Drawer = createDrawerNavigator();

const AppStackMed = () =>{
    const {LogoutAsMed} = useContext(AuthContext)
    return(
        <Drawer.Navigator screenOptions={{ headerShown:false, drawerLabelStyle:{marginLeft:-25},
         drawerActiveBackgroundColor:'grey', drawerActiveTintColor:'#fff', drawerInactiveTintColor:'#333'}} drawerContent={(props) => {
            const filteredProps = {
                ...props,
                state: {
                  ...props.state,
                  routeNames: props.state.routeNames.filter(
                    (routeName) => {
                      routeName !== 'Patient Page' && routeName !== 'Reset-Password';
                    }
                  ),
                  routes: props.state.routes.filter(
                    (route) =>
                      route.name !== 'Patient Page' && route.name !== 'ResetPassword'
                  ),
                },
            };
            return (
                <View style={{flex:1}}>
                <DrawerContentScrollView {...filteredProps}   contentContainerStyle={{ backgroundColor:'#D10000'}}>
                  <ImageBackground source={require('../assets/bg-8.jpg')} style={{ padding:20 }}>
                  <Image source={require('../assets/no-avatar.jpg')} style={{width:80, height:80, borderRadius:40, marginBottom:10}} />
                  <Text style={{color:'white', fontFamily:'Roboto', fontSize:18}}>Mukhtar Mahmud</Text>
                  <View style={{flexDirection:'row'}}>
                     <Ionicons name="medkit" size={11} color="white" style={{marginRight:5}}  />
                     <Text style={{color:'white', fontFamily:'Roboto', fontSize:11}}>10 Donors</Text>
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
                 <TouchableOpacity onPress={()=> LogoutAsMed()} style={{paddingVertical:15}}>
                   <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Ionicons name="exit-outline" size={22}/>
                      <Text style={{ fontSize:15, fontFamily:'Roboto', marginLeft:5}}>Sign Out</Text>
                   </View>
                 </TouchableOpacity>
                </View>
                </View>
            );
          }}>
           <Drawer.Screen name="Home" component={BottomTabNavigatorMed} options={{
            drawerIcon:({color})=> (
                <Ionicons name="home-outline" size={20} color={color} />
            ),
           }} />
           <Drawer.Screen name="Profie" component={ProfileScreenMed} options={{
            drawerIcon:({color})=> (
                <Ionicons name="person-outline" size={20} color={color} />
            ),
           }} />
           <Drawer.Screen name="Donors" component={DonorsScreen} options={{
            drawerIcon:({color})=> (
                <Ionicons name="heart" size={20} color={color} />
            ),
           }} />
           <Drawer.Screen name="New Patient" component={CreatePost} options={{
            drawerIcon:({color})=> (
                <Ionicons name="add" size={20} color={color} />
            ),
            headerShown:true
           }} />

     </Drawer.Navigator>
    )
}

export default AppStackMed;