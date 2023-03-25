import React, {useContext, useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main from "../screens/OnboardingScreen";
import Login from "../screens/LoginScreen";
import Register from '../screens/RegisterScreen';
import Welcome from '../screens/WelcomScreen';
import LoginMedical from '../screens/LoginMedicalUnit'
import RegisterMedical from '../screens/RegisterMedicalUnit';
import ResetPassword from '../screens/ResetPassword';
import { AuthContext } from '../Context/AuthContext';

const Stack = createNativeStackNavigator();

const AuthStack = () =>{
    const {Page,  whichRole } = useContext(AuthContext)
    const [isFirstLauch, setisFirstLaunch] = useState(null)
    useEffect(()=>{
        AsyncStorage.getItem('alreadyLaunched').then(value =>{
            if(value ==  null){
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setisFirstLaunch(true);
            }else{
                setisFirstLaunch(false);
            }
        })
    }, []);

    if(isFirstLauch === null){
        return null
    }else if(isFirstLauch === true){
        return(
            <Stack.Navigator screenOptions={{ headerShown:false}} >
               <Stack.Screen name="OnboardingScreen" component={Main}/>
               <Stack.Screen name="Welcome" component={Welcome} />
               <Stack.Screen name="Login" component={Login} />
               <Stack.Screen name="LoginMed" component={LoginMedical} />
               <Stack.Screen name="Register" component={Register} />
               <Stack.Screen name="RegisterMed" component={RegisterMedical} />
               
         </Stack.Navigator>
        )
    }else{
        return(
            <Stack.Navigator screenOptions={{ headerShown:false}} >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login } />
            <Stack.Screen name="Reset-Password" component={ResetPassword} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="LoginMed" component={LoginMedical} />
            <Stack.Screen name="RegisterMed" component={RegisterMedical} />
         </Stack.Navigator>
        )
    }
}

export default AuthStack;