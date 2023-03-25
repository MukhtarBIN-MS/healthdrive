import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

export default function InputField({
    label,
    icon,
    inputType,
    keyboardType,
    extraIcon,
    value,
    onChangeText,
    autoCapitalize
}) {
  return (
    <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:8, marginBottom:25}}>
         {icon}
          { inputType == 'password' ?  <TextInput value={value} onChangeText={onChangeText} autoCapitalize={autoCapitalize} secureTextEntry={true}  placeholder={label} style={{flex:1, paddingVertical:0, fontSize:16}} keyboardType={keyboardType}/> : inputType == 'text' ?  <TextInput value={value} onChangeText={onChangeText} autoCapitalize={autoCapitalize} secureTextEntry={false}  placeholder={label} style={{flex:1, paddingVertical:0,fontSize:16}} keyboardType={keyboardType}/> : <TextInput  value={value} onChangeText={onChangeText} placeholder={label} style={{flex:1, paddingVertical:0}} keyboardType={keyboardType}/> }
          {extraIcon}
   </View>
  )
}