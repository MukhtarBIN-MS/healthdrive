import {Text, TouchableOpacity } from 'react-native'


export default function CustomButton({ label, buttomFunction}) {
  return (
    <TouchableOpacity onPress={buttomFunction} style={{backgroundColor:'green', justifyContent:'center', alignItems:'center', padding:20, borderRadius:10, marginBottom:30}}>
    <Text style={{ fontSize:16, color:'#fff'}}>{label}</Text>
   </TouchableOpacity>
  )
}