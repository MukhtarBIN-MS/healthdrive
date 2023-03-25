import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreenMed from '../screens/HomeScreenMed';
import ProfileScreenMed from '../screens/ProfileScreenMed';
import EditProfileScreen from '../screens/EditProfileScreenMed';



const Tab = createBottomTabNavigator();

const BottomTabNavigatorMed = () =>{

    return(
        <Tab.Navigator screenOptions={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarStyle:{ backgroundColor:'#D10000',  borderTopRightRadius:15, borderTopLeftRadius:15},
            tabBarInactiveTintColor:'#fff',
            tabBarActiveTintColor:'yellow'
        }}>
           <Tab.Screen name="home2" component={HomeScreenMed} options={{
            tabBarIcon:({color})=> (
                <Ionicons name="home-outline" size={20} color={color} />
            ),
           }} />
           <Tab.Screen name="Edit Profile" component={EditProfileScreen} options={{
            tabBarIcon:({color})=> (
                <Ionicons name="home-outline" size={20} color={color} />
            ),
            headerShown:false,
            tabBarButton:()=> null, tabBarVisible:false,
            
           }} />
 
           <Tab.Screen name="Profile" component={ProfileScreenMed} options={{
            tabBarIcon:({color})=> (
                <Ionicons name="person-outline" size={20} color={color} />
            ),
           }} />
           
     </Tab.Navigator>
    )
}

export default BottomTabNavigatorMed;