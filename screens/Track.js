import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrackingPage from './TrackingPage';
import TrackSugar from './TrackSugar'
import TrackSugarCreate from './TrackSugarCreate';
import TrackSugarHistory from './TrackSugarHistory'
import TrackWeight from './TrackWeight'
import TrackWeightHistory from './TrackWeightHistory'
import TrackBloodPressure from './TrackBloodPressure'
import TrackBloodPressureHistory from './TrackbloodPressureHistory'
import HealthTips from './HealthTips'
import Reminder from './Reminder'


const Stack = createNativeStackNavigator();
const StackOptions = () =>{
    const [name, setName] = useState('')
    const [screeValue, setScreenValue] = useState(true)
    if (name === 'TrackigPage'){
        setScreenValue(false)
    }else{
        setScreenValue(true)
    }
}

export default function Track() {
    return(
        <Stack.Navigator screenOptions={{ headerShown:true}} >
           <Stack.Screen options={{ headerShown:false}}  name="TrackingPage" component={TrackingPage}/>
           <Stack.Screen  name="Track Sugar" component={TrackSugar} />
           <Stack.Screen  name="Track Sugar Level" component={TrackSugarCreate} />
           <Stack.Screen  name="Track Weight" component={TrackWeight} />
           <Stack.Screen  name="Track Weight History" component={TrackWeightHistory} />
           <Stack.Screen  name="Track Blood Pressure" component={TrackBloodPressure} />
           <Stack.Screen  name="Track Blood Pressure History" component={TrackBloodPressureHistory} />
           <Stack.Screen  name="HealthTips" component={HealthTips} />
           <Stack.Screen  name="Reminder" component={Reminder} />
          
           
     </Stack.Navigator>
    )
}