import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import PatientDetailScreen from '../screens/PatientDetailScreen';
import Home from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Track from '../screens/Track';
import EditScreen from '../screens/EditProfileScreen';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () =>{

    return(
        <Tab.Navigator screenOptions={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarStyle:{ backgroundColor:'green',  borderTopRightRadius:15, borderTopLeftRadius:15},
            tabBarInactiveTintColor:'#fff',
            tabBarActiveTintColor:'yellow'
        }}>
           <Tab.Screen name="home2" component={Home} options={{
            tabBarIcon:({color})=> (
                <Ionicons name="home-outline" size={20} color={color} />
            ),
           }} />
           <Tab.Screen name="Patient Page" component={PatientDetailScreen} options={{
            tabBarIcon:({color})=> (
                <Ionicons name="home-outline" size={20} color={color} />
            ),
            headerShown:false,
            tabBarButton:()=> null, tabBarVisible:false,
            
           }} />
           <Tab.Screen name="Edit Profile" component={EditScreen} options={{
            tabBarIcon:({color})=> (
                <Ionicons name="home-outline" size={20} color={color} />
            ),
            headerShown:false,
            tabBarButton:()=> null, tabBarVisible:false,
            
           }} />
           <Tab.Screen name="Tracking" component={Track} options={{
            tabBarIcon:({color})=> (
                <Ionicons name="ios-pulse" size={20} color={color} />
            ),
            
           }} />

           <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon:({color})=> (
                <Ionicons name="person-outline" size={20} color={color} />
            ),
            headerShown:true
           }} />
           
     </Tab.Navigator>
    )
}

export default BottomTabNavigator;